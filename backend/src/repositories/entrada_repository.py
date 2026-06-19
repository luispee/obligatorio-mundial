from src.database.get_connection import get_connection

class EntradaRepository:
    @staticmethod
    def get_entradas(mail_cliente):
        conn = get_connection()
        if not conn:
            raise RuntimeError("No se pudo conectar a la base de datos")

        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT
            en.cantidad_transferencias,
            en.usada,
            en.id AS id_entrada,

            ev.codigo_seleccion_local,
            ev.codigo_seleccion_visitante,
            ev.fecha_hora,

            s.nombre AS sector_nombre,

            es.ciudad,
            es.nombre AS estadio_nombre,
            ps.nombre AS pais_sede,

            pl.nombre AS nombre_seleccion_local,
            pv.nombre AS nombre_seleccion_visitante,

            EXISTS (
                SELECT 1 FROM transferencia t
                WHERE t.id_entrada = en.id AND t.id_estado_transferencia = 1
            ) AS transferencia_pendiente

            FROM entrada en
            JOIN evento ev ON en.id_evento = ev.id
            JOIN pais pl ON ev.codigo_seleccion_local = pl.codigo
            JOIN pais pv ON ev.codigo_seleccion_visitante = pv.codigo
            JOIN estadio es ON es.id = ev.id_estadio
            JOIN pais ps ON ps.codigo = es.codigo_pais_sede
            JOIN venta v ON v.id = en.id_venta
            JOIN sector s ON s.id = en.id_sector
            WHERE en.mail_cliente_propietario = %s
            AND v.id_estado_venta = 2
            ORDER BY v.fecha_hora DESC;
        """, (mail_cliente,))

        entradas = cursor.fetchall()

        cursor.close()
        conn.close()

        return [
        {
            "evento": {
                "seleccion_local": {
                    "codigo": e["codigo_seleccion_local"],
                    "nombre": e["nombre_seleccion_local"],
                },
                "seleccion_visitante": {
                    "codigo": e["codigo_seleccion_visitante"],
                    "nombre": e["nombre_seleccion_visitante"],
                },
                "fecha_hora": e["fecha_hora"].isoformat() if e["fecha_hora"] else None,
                "estadio": {
                    "ciudad": e["ciudad"],
                    "nombre": e["estadio_nombre"],
                    "pais_sede": e["pais_sede"],
                    "sector": e["sector_nombre"],
                },
            },
            "id": e["id_entrada"],
            "limite_transferencias_alcanzado": e["cantidad_transferencias"] >= 3,
            "usada": bool(e["usada"]),
            "transferencia_pendiente": bool(e["transferencia_pendiente"])
        }
        for e in entradas
        ]

    @staticmethod
    def get_entrada(entrada_id, mail_cliente):
        conn = get_connection()
        if not conn:
            raise RuntimeError("No se pudo conectar a la base de datos")

        try: 
            cursor = conn.cursor(dictionary=True)
            cursor.execute("""
                SELECT
                en.usada,

                s.id AS sector_id,

                ev.id AS id_evento

                FROM entrada en
                JOIN evento ev ON en.id_evento = ev.id
                JOIN venta v ON v.id = en.id_venta
                JOIN sector s ON s.id = en.id_sector
                WHERE en.mail_cliente_propietario = %s
                AND v.id_estado_venta = 2
                AND en.id = %s

                AND NOT EXISTS (
                    SELECT 1 FROM transferencia t
                    WHERE t.id_entrada = en.id AND t.id_estado_transferencia = 1
                );
            """, (mail_cliente, entrada_id))

            entrada = cursor.fetchone()

            if not entrada:
                return None

            if entrada["usada"]:
                raise ValueError("La entrada ya fue usada")

            

            if not entrada:
                return None

            return {
                "id_evento": entrada["id_evento"],
                "id_sector": entrada["sector_id"]
            }
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def validar_entrada(id_entrada, id_sector, id_evento, mail_funcionario, token_entrada):
        conn = get_connection()
        if not conn:
            raise RuntimeError("No se pudo conectar a la base de datos")

        try:
            cursor = conn.cursor(dictionary=True)

            cursor.execute("""
                SELECT id_dispositivo
                FROM sector_evento_funcionario_dispositivo
                WHERE mail_funcionario = %s
                AND id_evento = %s
                AND id_sector = %s
                LIMIT 1;
            """, (mail_funcionario, id_evento, id_sector))

            autorizacion = cursor.fetchone()
            
            cursor.execute("""
                SELECT
                en.mail_cliente_propietario AS mail,

                ev.codigo_seleccion_local,
                ev.codigo_seleccion_visitante,
                ev.fecha_hora,

                s.nombre AS sector_nombre,

                es.ciudad,
                es.nombre AS estadio_nombre,
                ps.nombre AS pais_sede,

                pl.nombre AS nombre_seleccion_local,
                pv.nombre AS nombre_seleccion_visitante

                FROM entrada en
                JOIN evento ev ON en.id_evento = ev.id
                JOIN pais pl ON ev.codigo_seleccion_local = pl.codigo
                JOIN pais pv ON ev.codigo_seleccion_visitante = pv.codigo
                JOIN estadio es ON es.id = ev.id_estadio
                JOIN pais ps ON ps.codigo = es.codigo_pais_sede
                JOIN sector s ON s.id = en.id_sector
                WHERE en.id = %s
                AND en.id_sector = %s
                AND en.id_evento = %s
                AND en.usada = FALSE;
            """, (id_entrada, id_sector, id_evento))

            entrada_info = cursor.fetchone()

            if not entrada_info:
                return {"valid": False, "entrada": None}

            entrada = { 
                "mail": entrada_info["mail"],
                    "evento": {
                        "seleccion_local": {
                            "codigo": entrada_info["codigo_seleccion_local"],
                            "nombre": entrada_info["nombre_seleccion_local"],
                        },
                        "seleccion_visitante": {
                            "codigo": entrada_info["codigo_seleccion_visitante"],
                            "nombre": entrada_info["nombre_seleccion_visitante"],
                        },
                        "fecha_hora": entrada_info["fecha_hora"].isoformat() if entrada_info["fecha_hora"] else None,
                        "estadio": {
                            "ciudad": entrada_info["ciudad"],
                            "nombre": entrada_info["estadio_nombre"],
                            "pais_sede": entrada_info["pais_sede"],
                            "sector": entrada_info["sector_nombre"],
                        },
                    }
            }

            if not autorizacion:
                return {"valid": False, "entrada": entrada, "message": "Evento o sector incorrecto."}

            cursor.execute("""
                UPDATE entrada
                SET usada = TRUE
                WHERE id = %s
                AND usada = FALSE
            """, (id_entrada,))

            if cursor.rowcount == 0:
                return {"valid": False, "entrada": entrada, "message": "La entrada ya fue usada."}

            cursor.execute("""
                INSERT INTO validacion (
                id_entrada, mail_funcionario, fecha_hora, codigo_qr, id_dispositivo
                ) VALUES (%s, %s, NOW(), %s, %s)
            """, (id_entrada, mail_funcionario, token_entrada, autorizacion["id_dispositivo"]))

            conn.commit()


            return {
                "valid": True,
                "entrada": entrada,
                "message": "Entrada validada exitosamente"
            }
        except Exception as e:
            raise e
        finally:
            cursor.close()
            conn.close()