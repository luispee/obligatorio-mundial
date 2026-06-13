import Button from '../../../components/Button';
import AuthInput from '../../../components/Input';

export default function VerifyMail() {
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
          value=""
          onChange={() => {}}
        />

        <Button text="Verificar" onClick={() => {}} />

        <span className="text-gray-500 text-sm">
          Puedes solicitar un nuevo código de verificación en cualquier momento.
        </span>
      </div>
    </main>
  );
}
