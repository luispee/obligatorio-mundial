from src.database.get_connection import get_connection

class TransferenciaRepository:
    @staticmethod
    def create_transferencia(id_entrada, mail_destinatario, mail_remitente):
        conn = get_connection()
        if not conn:
            raise RuntimeError("No se pudo conectar a la base de datos")
        
        try:
            cursor = conn.cursor()

            cursor.execute("SELECT id FROM entrada WHERE id = %s AND mail_cliente_propietario = %s", (id_entrada, mail_remitente))
            if not cursor.fetchone():
                raise ValueError("La entrada no existe o no le pertenece al cliente")

            cursor.execute("""
                SELECT 1
                FROM transferencia
                WHERE id_entrada = %s AND id_estado_transferencia IN (1, 2)
            """, (id_entrada,))
            if cursor.fetchone():
                raise ValueError("La entrada ya está en proceso de transferencia")

            cursor.execute("""
                INSERT INTO transferencia (id_entrada, mail_cliente_destinatario, mail_cliente_remitente, fecha_hora, id_estado_transferencia)
                VALUES (%s, %s, %s, NOW(), 1)
            """, (id_entrada, mail_destinatario, mail_remitente))

            conn.commit()

        finally:
            cursor.close()
            conn.close()

    @staticmethod
    def get_transferencias_by_usuario(mail_usuario):
        conn = get_connection()
        if not conn:
            raise RuntimeError("No se pudo conectar a la base de datos")
        
        try:
            cursor = conn.cursor(dictionary=True)

            BASE_QUERY = """
                SELECT
                    ev.codigo_seleccion_local,
                    ev.codigo_seleccion_visitante,
                    ev.fecha_hora AS fecha_hora_evento,

                    s.nombre AS sector_nombre,

                    es.ciudad,
                    es.nombre AS estadio_nombre,
                    ps.nombre AS pais_sede,

                    t.id,
                    t.mail_cliente_remitente,
                    t.mail_cliente_destinatario,
                    t.fecha_hora AS fecha_hora_transferencia,
                    et.estado AS estado_transferencia,

                    pl.nombre AS nombre_seleccion_local,
                    pv.nombre AS nombre_seleccion_visitante
                FROM transferencia t
                JOIN estado_transferencia et ON t.id_estado_transferencia = et.id
                JOIN entrada en ON t.id_entrada = en.id
                JOIN evento ev ON en.id_evento = ev.id
                JOIN pais pl ON ev.codigo_seleccion_local = pl.codigo
                JOIN pais pv ON ev.codigo_seleccion_visitante = pv.codigo
                JOIN estadio es ON es.id = ev.id_estadio
                JOIN pais ps ON ps.codigo = es.codigo_pais_sede
                JOIN sector s ON s.id = en.id_sector
                WHERE {}
                ORDER BY t.fecha_hora DESC
            """

            cursor.execute(BASE_QUERY.format("t.mail_cliente_destinatario = %s AND t.id_estado_transferencia != 3"), (mail_usuario,))
            recibidas_raw = cursor.fetchall()

            cursor.execute(BASE_QUERY.format("t.mail_cliente_remitente = %s"), (mail_usuario,))
            enviadas_raw = cursor.fetchall()

            def mapear(t, es_recibida=False):
                base = {
                    "id": t["id"],
                    "estado": t["estado_transferencia"],
                    "fecha_hora": t["fecha_hora_transferencia"].isoformat() if t["fecha_hora_transferencia"] else None,
                    "evento": {
                        "seleccion_local": {
                            "codigo": t["codigo_seleccion_local"],
                            "nombre": t["nombre_seleccion_local"],
                        },
                        "seleccion_visitante": {
                            "codigo": t["codigo_seleccion_visitante"],
                            "nombre": t["nombre_seleccion_visitante"],
                        },
                        "fecha_hora": t["fecha_hora_evento"].isoformat() if t["fecha_hora_evento"] else None,
                        "estadio": {
                            "nombre": t["estadio_nombre"],
                            "ciudad": t["ciudad"],
                            "pais_sede": t["pais_sede"],
                            "sector": t["sector_nombre"],
                        },
                    },
                }
                if es_recibida:
                    base["mail_remitente"] = t["mail_cliente_remitente"]
                else:
                    base["mail_destinatario"] = t["mail_cliente_destinatario"]
                return base

            return {
                "recibidas": [mapear(t, es_recibida=True) for t in recibidas_raw],
                "enviadas": [mapear(t) for t in enviadas_raw],
            } 

        finally:
            cursor.close()
            conn.close()