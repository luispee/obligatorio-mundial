from dataclasses import dataclass

@dataclass
class Usuario:
    mail: str
    hash_contrasena: str

    codigo_pais_documento: str
    id_tipo_documento: int
    numero_documento: str

    codigo_pais_residencia: str
    localidad: str
    calle: str
    numero_puerta: str
    codigo_postal: str | None