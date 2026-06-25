from src.validators.auth_validator import AuthValidator
import re

class FuncionarioValidator:
    @staticmethod
    def validate_funcionario(data):
        AuthValidator.validate_register(data)

        numero_legajo = data.get('numero_legajo')

        if not numero_legajo or not isinstance(numero_legajo, str) or len(numero_legajo.strip()) == 0:
            raise ValueError("El legajo es requerido")
        
        return True