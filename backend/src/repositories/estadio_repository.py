from src.database.get_connection import get_connection

class EstadioRepository:
  @staticmethod
  def get_estadios(pais_sede):
    conn = get_connection()
    if not conn:
      raise RuntimeError("No se pudo conectar a la base de datos")

    try:
      cursor = conn.cursor(dictionary=True)

      cursor.execute("""
                        SELECT
                            e.id AS id_estadio,
                            s.id AS id_sector,
                            e.nombre AS nombre_estadio,
                            e.ciudad,
                            s.nombre,
                            s.capacidad_maxima AS capacidad_maxima
                        FROM estadio e
                        JOIN sector s ON e.id = s.id_estadio
                        WHERE codigo_pais_sede = %s
                        ORDER BY e.nombre ASC
                    """, (pais_sede,))

      rows = cursor.fetchall()

      estadios = {}

      for row in rows:
        estadio_id = row["id_estadio"]

        if estadio_id not in estadios:
          estadios[estadio_id] = {
            "id": estadio_id,
            "nombre": row["nombre_estadio"],
            "ciudad": row["ciudad"],
            "sectores": []
          }

        estadios[estadio_id]["sectores"].append({
          "id": row["id_sector"],
          "nombre": row["nombre"],
          "capacidad": row["capacidad_maxima"]
        })

      return list(estadios.values())

    finally:
      cursor.close()
      conn.close()