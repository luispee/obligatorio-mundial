class SectorRepository:

  @staticmethod
  def get_sectores_by_estadio(estadio_id, sector_ids, cursor):
    placeholders = ', '.join(['%s'] * len(sector_ids))
    query = f"""
      SELECT id, capacidad_maxima
      FROM sector
      WHERE id_estadio = %s
      AND id IN ({placeholders})
    """

    cursor.execute(
      query,
      (estadio_id, *sector_ids)
    )

    return {
      row[0]: row[1]
      for row in cursor.fetchall()
    }