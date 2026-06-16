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
                          AND e.activo = TRUE
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

  @staticmethod
  def get_estadios_by_pais_sede(pais_sede):

    conn = get_connection()

    if not conn:
        raise RuntimeError("No se pudo conectar a la base de datos")

    try:
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                e.id,
                e.nombre,
                e.ciudad,
                p.nombre AS pais_sede
            FROM estadio e
            JOIN pais p
                ON p.codigo = e.codigo_pais_sede
            WHERE codigo_pais_sede = %s
              AND e.activo = TRUE
            ORDER BY e.nombre
        """, (pais_sede,))

        return cursor.fetchall()

    finally:
       cursor.close()
       conn.close()

  @staticmethod
  def get_estadio_by_id(id_estadio):
      conn = get_connection()

      if not conn:
          raise RuntimeError("No se pudo conectar a la base de datos")

      try:
          cursor = conn.cursor(dictionary=True)

          cursor.execute("""
              SELECT
                  e.id,
                  e.ciudad,
                  e.nombre,
                  p.nombre AS pais_sede,
                  s.id AS id_sector,
                  s.nombre AS nombre_sector,
                  s.capacidad_maxima
              FROM estadio e
              JOIN pais p
                  ON p.codigo = e.codigo_pais_sede
              JOIN sector s
                  ON s.id_estadio = e.id
              WHERE e.id = %s
                AND e.activo = TRUE
          """, (id_estadio,))

          rows = cursor.fetchall()

          if not rows:
              return None

          estadio = {
              "id": rows[0]["id"],
              "nombre": rows[0]["nombre"],
              "ciudad": rows[0]["ciudad"],
              "pais_sede": rows[0]["pais_sede"],
              "sectores": []
          }

          for row in rows:
              estadio["sectores"].append({
                  "id": row["id_sector"],
                  "nombre": row["nombre_sector"],
                  "capacidad": row["capacidad_maxima"]
              })

          return estadio

      finally:
          cursor.close()
          conn.close()

  @staticmethod
  def baja_estadio(id_estadio):
    conn = get_connection()

    if not conn:
        raise RuntimeError("No se pudo conectar a la base de datos")

    try:
        cursor = conn.cursor()

        cursor.execute("""
            UPDATE estadio
            SET activo = FALSE
            WHERE id = %s
              AND activo = TRUE
        """, (id_estadio,))

        conn.commit()

        return cursor.rowcount > 0

    finally:
        cursor.close()
        conn.close()



  @staticmethod
  def update_estadio(id_estadio, data):
    conn = get_connection()

    if not conn:
        raise RuntimeError("No se pudo conectar a la base de datos")

    try:
        cursor = conn.cursor()

        # actualizar estadio (solo si está activo)
        cursor.execute("""
            UPDATE estadio
            SET nombre = %s,
                ciudad = %s
            WHERE id = %s
              AND activo = TRUE
        """, (
            data["nombre"],
            data["ciudad"],
            id_estadio
        ))

        if cursor.rowcount == 0:
            return False

        # actualizar sectores (no se crean ni eliminan, solo update)
        for sector in data["sectores"]:
            cursor.execute("""
                UPDATE sector
                SET nombre = %s,
                    capacidad_maxima = %s
                WHERE id = %s
                  AND id_estadio = %s
            """, (
                sector["nombre"],
                sector["capacidad"],
                sector["id"],
                id_estadio
            ))

        conn.commit()
        return True

    finally:
        cursor.close()
        conn.close()


