class DispositivoValidator:
    @staticmethod
    def validate_dispositivo(data):
        modelo = data.get('modelo')
        numero_serie = data.get('numero_serie')

        if not modelo or not isinstance(modelo, str) or len(modelo.strip()) == 0:
            raise ValueError("El modelo del dispositivo es requerido y debe ser válido")
            
        if not numero_serie or not isinstance(numero_serie, str) or len(numero_serie.strip()) == 0:
            raise ValueError("El número de serie es requerido y debe ser válido")
            
        return True
