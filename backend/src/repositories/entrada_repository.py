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