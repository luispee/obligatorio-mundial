class SefdValidator:
    @staticmethod
    def validate_data(data):
        mail_funcionario = data.get('mail_funcionario')
        id_dispositivo = data.get('id_dispositivo')

        if not mail_funcionario or "@" not in mail_funcionario:
            raise ValueError("El mail del funcionario es requerido y debe ser válido")
        if id_dispositivo is None or not isinstance(id_dispositivo, int):
            raise ValueError("El id_dispositivo es requerido y debe ser un número entero")
        return True