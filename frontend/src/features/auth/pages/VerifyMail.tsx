import { useState } from 'react';
import Button from '../../../components/Button';
import AuthInput from '../../../components/Input';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function VerifyMail() {
  const [mail, setMail] = useState('');
  const [message, setMessage] = useState('');
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();

  const { verifyUser, error, loading, clearError } = useAuth();

  const handleVerify = async () => {
    setMessage('');
    clearError();
    try {
      await verifyUser({ mail: mail });
      setVerified(true);
      setMessage('Correo verificado correctamente.');
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  };

  return (
    <main className="mx-auto  flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8">
      <div className="flex flex-col gap-4 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg shadow-gray">
        <h1 className="text-3xl text-center font-bold text-gray-dark mb-4">
          Verificar Correo Electrónico
        </h1>

        <p className="text-gray-600 mb-6">
          Te hemos enviado un correo de verificación. Por favor, revisa tu bandeja de entrada.
        </p>

        <AuthInput
          label="Ingresa el código de verificación"
          type="text"
          placeholder="Código de verificación"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />

        <div className="min-h-[30px] text-center">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="text-green-500">{message}</p>
          )}
        </div>

        {verified ? (
          <Button text="Volver al inicio" onClick={() => navigate('/')} />
        ) : (
          <Button
            text={`${loading ? 'Verificando...' : 'Verificar'}`}
            onClick={handleVerify}
            disabled={loading}
          />
        )}

        <span className="text-gray-500 text-sm">
          Puedes solicitar un nuevo código de verificación en cualquier momento.
        </span>
      </div>
    </main>
  );
}
