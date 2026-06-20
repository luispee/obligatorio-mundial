import Overlay from '../components/Overlay';
import Scanner from '../components/Scanner';
import { useEntrada } from '../contexts/EntradaContext';
import { ValidarEntradaRequest } from '../api/entradaRequests';
import { ValidarEntradaResponse } from '../api/entradaResponses';
import { useState } from 'react';

export default function Funcionario() {
  const { validarEntrada } = useEntrada();
  const [validacion, setValidacion] = useState<ValidarEntradaResponse | null>(null);

  const handleValidarEntrada = async (data: ValidarEntradaRequest) => {
    try {
      const response = await validarEntrada(data);
      console.log('Respuesta de validación:', response);
      if (response.valid) {
        setValidacion(response);
      } else {
        setValidacion(response);
      }
    } catch (err: any) {
      setValidacion({
        valid: false,
        message: err.message || 'Error al validar la entrada',
        entrada: null,
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <Scanner onScan={handleValidarEntrada} />
      {validacion && <Overlay validacion={validacion} />}
    </div>
  );
}
