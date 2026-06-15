class VentaValidator:
  @staticmethod
  def validar_venta(data):

    if not data:
      raise ValueError("Body vacío")

    if "id_evento" not in data:
      raise ValueError("id_evento obligatorio")

    if "sectores" not in data:
      raise ValueError("sectores obligatorios")

    id_evento = data["id_evento"]
    sectores = data["sectores"]

    for s in sectores:
      if "id" not in s:
        raise ValueError("id_sector obligatorio en cada sector")
      if str(s["id"]) == "":
        raise ValueError("Debe ingresar un sector para cada entrada")

