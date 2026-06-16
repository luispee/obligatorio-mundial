from src.database.get_connection import get_connection
from src.repositories.sector_repository import SectorRepository
from src.repositories.estadio_repository import EstadioRepository

class EventoRepository:

  @staticmethod
  def get_evento_by_id(id):
    conn = get_connection()
    if not conn:
      raise RuntimeError("No se pudo conectar a la base de datos")
    
    try:
      cursor = conn.cursor(dictionary=True)
      cursor.execute(
        """
        SELECT
          e.codigo_seleccion_local,
          pl.nombre AS nombre_seleccion_local,
          e.codigo_seleccion_visitante,
          pv.nombre AS nombre_seleccion_visitante,
          e.fecha_hora,
          est.id AS estadio_id,
          est.ciudad,
          est.nombre AS estadio_nombre,
          p.nombre AS pais_sede
        FROM evento e
        JOIN estadio est ON est.id = e.id_estadio
        JOIN pais p ON p.codigo = est.codigo_pais_sede
        JOIN pais pl ON pl.codigo = e.codigo_seleccion_local
        JOIN pais pv ON pv.codigo = e.codigo_seleccion_visitante
        WHERE e.id = %s
        """, (id,)
      )
      row = cursor.fetchone()

      if not row:
        return None

      cursor.execute(
        """
        SELECT
          s.id,
          s.nombre,
          se.precio,
          se.capacidad_disponible > 0 AS disponibilidad
        FROM sector_evento se
        JOIN sector s ON s.id = se.id_sector
        WHERE se.id_evento = %s
        """, (id,)
      )
      sectores = cursor.fetchall()

      return {
        "id": id,
        "seleccion_local": {
          "codigo": row['codigo_seleccion_local'],
          "nombre": row['nombre_seleccion_local']
        },
        "seleccion_visitante": {
          "codigo": row['codigo_seleccion_visitante'],
          "nombre": row['nombre_seleccion_visitante']
        },
        "fecha_hora": row['fecha_hora'].isoformat(),
        "estadio": {
          "id": row['estadio_id'],
          "nombre": row['estadio_nombre'],
          "ciudad": row['ciudad'],
          "pais_sede": row['pais_sede'],
          "sectores": [
          {
            "id": s['id'],
            "precio": float(s['precio']),
            "nombre": s['nombre'],
            "disponible": bool(s['disponibilidad'])
          } for s in sectores
        ]
        },
      }
    finally:
      cursor.close()
      conn.close()

  @staticmethod
  def get_eventos():
    conn = get_connection()
    if not conn:
      raise RuntimeError("No se pudo conectar a la base de datos")

    try:
      cursor = conn.cursor(dictionary=True)
      cursor.execute("""
        SELECT
          e.id,
          e.fecha_hora,

          e.codigo_seleccion_local,
          pl.nombre AS nombre_seleccion_local,

          e.codigo_seleccion_visitante,
          pv.nombre AS nombre_seleccion_visitante,

          est.id AS estadio_id,
          est.nombre AS estadio_nombre,
          est.ciudad,
          pe.nombre AS pais_sede

        FROM evento e

        JOIN seleccion sl ON sl.codigo_pais = e.codigo_seleccion_local

        JOIN pais pl ON pl.codigo = sl.codigo_pais

        JOIN seleccion sv ON sv.codigo_pais = e.codigo_seleccion_visitante

        JOIN pais pv ON pv.codigo = sv.codigo_pais

        JOIN estadio est ON est.id = e.id_estadio

        JOIN pais pe ON pe.codigo = est.codigo_pais_sede

        WHERE e.activo = 1 AND

        e.fecha_hora >= NOW()

        ORDER BY e.fecha_hora ASC
      """)

      rows = cursor.fetchall()

      eventos = []

      for row in rows:
        eventos.append({
          "id": row['id'],
          "fecha_hora": row['fecha_hora'].isoformat(),
          "seleccion_local": {
            "codigo": row['codigo_seleccion_local'],
            "nombre": row['nombre_seleccion_local']
          },
          "seleccion_visitante": {
            "codigo": row['codigo_seleccion_visitante'],
            "nombre": row['nombre_seleccion_visitante']
          },
          "estadio": {
            "id": row['estadio_id'],
            "nombre": row['estadio_nombre'],
            "ciudad": row['ciudad'],
            "pais_sede": row['pais_sede']
          }
        })

      return eventos
    finally:
      cursor.close()
      conn.close()

  @staticmethod
  def get_evento_summary(id):
    conn = get_connection()
    if not conn:
      raise RuntimeError("No se pudo conectar a la base de datos")

    cursor = conn.cursor(dictionary=True)
    try:
      cursor.execute("""
        SELECT
          e.id,
          e.fecha_hora,

          e.codigo_seleccion_local,
          pl.nombre AS nombre_seleccion_local,

          e.codigo_seleccion_visitante,
          pv.nombre AS nombre_seleccion_visitante,

          est.id AS estadio_id,
          est.nombre AS estadio_nombre,
          est.ciudad,
          pe.nombre AS pais_sede

        FROM evento e

        JOIN seleccion sl ON sl.codigo_pais = e.codigo_seleccion_local

        JOIN pais pl ON pl.codigo = sl.codigo_pais

        JOIN seleccion sv ON sv.codigo_pais = e.codigo_seleccion_visitante

        JOIN pais pv ON pv.codigo = sv.codigo_pais

        JOIN estadio est ON est.id = e.id_estadio

        JOIN pais pe ON pe.codigo = est.codigo_pais_sede

        WHERE e.id = %s

      """, (id,))

      row = cursor.fetchone()

      if row is None:
        return None

      return {
        "id": row['id'],
        "fecha_hora": row['fecha_hora'].isoformat(),
        "seleccion_local": {
          "codigo": row['codigo_seleccion_local'],
          "nombre": row['nombre_seleccion_local']
        },
        "seleccion_visitante": {
          "codigo": row['codigo_seleccion_visitante'],
          "nombre": row['nombre_seleccion_visitante']
        },
        "estadio": {
          "id": row['estadio_id'],
          "nombre": row['estadio_nombre'],
          "ciudad": row['ciudad'],
          "pais_sede": row['pais_sede']
        }
      }
    finally:
      cursor.close()
      conn.close()

  @staticmethod
  def create_evento(data):
    conn = get_connection()
    if not conn:
      raise RuntimeError("No se pudo conectar a la base de datos")

    cursor = conn.cursor()

    try:
      cursor.execute(
        """
        INSERT INTO evento (
          codigo_seleccion_local,
          codigo_seleccion_visitante,
          fecha_hora,
          id_estadio
        ) VALUES (%s, %s, %s, %s)
        """,
        (
          data['codigo_seleccion_local'],
          data['codigo_seleccion_visitante'],
          data['fecha_hora'],
          data['estadio']['id']
        )
      )

      evento_id = cursor.lastrowid

      sector_ids = [sector['id'] for sector in data['estadio']['sectores']]

      for sector_id in sector_ids:
        cursor.execute(
          "SELECT id FROM sector WHERE id = %s AND id_estadio = %s",
          (sector_id, data['estadio']['id'])
        )
        if not cursor.fetchone():
          raise ValueError(f"El sector con id {sector_id} no pertenece al estadio con id {data['estadio']['id']}")

      capacidades = SectorRepository.get_sectores_by_estadio(
        data['estadio']['id'],
        sector_ids,
        cursor   
      )

      for sector in data['estadio']['sectores']:

        capacidad = capacidades.get(sector['id'])
      
        cursor.execute(
          """
          INSERT INTO sector_evento (
            id_evento,
            id_sector,
            precio,
            capacidad_disponible
          ) VALUES (%s, %s, %s, %s)
          """,
          (
            evento_id,
            sector['id'],
            sector['precio'],
            capacidades.get(sector['id'], 0)
          )
        )

      conn.commit()

      return evento_id
      
    except Exception as e:
      conn.rollback()
      raise e
    finally:
      cursor.close()
      conn.close()

  @staticmethod
  def update_evento(id, data):
    conn = get_connection()
    if not conn:
      raise RuntimeError("No se pudo conectar a la base de datos")

    cursor = conn.cursor()

    try:
      cursor.execute(
        """
        UPDATE evento
        SET
          codigo_seleccion_local = %s,
          codigo_seleccion_visitante = %s,
          fecha_hora = %s,
          id_estadio = %s
        WHERE id = %s
        """,
        (
          data['codigo_seleccion_local'],
          data['codigo_seleccion_visitante'],
          data['fecha_hora'],
          data['estadio']['id'],
          id
        )
      )


      sector_ids = [sector['id'] for sector in data['estadio']['sectores']]

      for sector_id in sector_ids:
        cursor.execute(
          "SELECT id FROM sector WHERE id = %s AND id_estadio = %s",
          (sector_id, data['estadio']['id'])
        )
        if not cursor.fetchone():
          raise ValueError(f"El sector con id {sector_id} no pertenece al estadio con id {data['estadio']['id']}")

      capacidades = SectorRepository.get_sectores_by_estadio(
        data['estadio']['id'],
        sector_ids,
        cursor   
      )

      cursor.execute("DELETE FROM sector_evento WHERE id_evento = %s", (id,))

      for sector in data['estadio']['sectores']:
        cursor.execute(
          """
          INSERT INTO sector_evento (
            id_evento,
            id_sector,
            precio,
            capacidad_disponible)
          VALUES (%s, %s, %s, %s)
          """,
          (
            id,
            sector['id'],
            sector['precio'],
            capacidades.get(sector['id'], 0)
          )
        )

      conn.commit()

    except Exception as e:
      conn.rollback()
      raise e
    finally:
      cursor.close()
      conn.close()
