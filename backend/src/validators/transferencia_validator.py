class TransferenciaValidator:
  @staticmethod
  def validate_transferencia_data(data):
    required_fields = ['id_entrada', 'mail_destinatario']
    missing_fields = [field for field in required_fields if field not in data]

    if missing_fields:
      raise ValueError(f'Missing fields: {", ".join(missing_fields)}')

    mail_destinatario = data['mail_destinatario']
    if not isinstance(mail_destinatario, str) or '@' not in mail_destinatario:
      raise ValueError('Ingrese un mail válido')