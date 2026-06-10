import AuthInput from '../components/AuthInput';
import Link from '../../../components/Link';
import Select from '../../../components/Select';
import TelefonoSection from '../components/TelefonoSection';
import Button from '../../../components/Button';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { RegisterFormDataResponse } from '../api/authResponses';

export default function Register() {
  const { getRegisterFormData } = useAuth();
  const [formData, setFormData] = useState<RegisterFormDataResponse | null>(null);

  useEffect(() => {
    async function fetchRegisterFormData() {
      try {
        const data = await getRegisterFormData();
        setFormData(data);
      } catch (error) {
        console.error('Error al obtener datos del formulario de registro:', error);
      }
    }
    fetchRegisterFormData();
  }, []);
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8">
      <form className="flex flex-col gap-4 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg shadow-gray">
        <h1 className="text-center text-3xl font-bold text-gray-dark mb-6">Registrarse</h1>
        <AuthInput
          label="Correo Electrónico"
          type="email"
          placeholder="Ingresa tu correo electrónico"
          value={''}
          onChange={() => {}}
        />
        <AuthInput
          label="Contraseña"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={''}
          onChange={() => {}}
        />
        <AuthInput
          label="Confirmar Contraseña"
          type="password"
          placeholder="Confirma tu contraseña"
          value={''}
          onChange={() => {}}
        />

        <TelefonoSection />

        <hr className="border-gray-500" />

        <Select
          label="Tipo de documento"
          options={
            formData?.tipos_documento.map((tipo) => ({ value: tipo.id, label: tipo.nombre })) || []
          }
          value={''}
          onChange={() => {}}
        />

        <Select
          label="País del documento"
          options={
            formData?.paises.map((pais) => ({ value: pais.codigo, label: pais.nombre })) || []
          }
          value={''}
          onChange={() => {}}
        />

        <AuthInput
          label="Número de documento"
          type="text"
          placeholder="Ingresa nº documento"
          value={''}
          onChange={() => {}}
        />

        <hr className="border-gray-500" />

        <Select
          label="País de residencia"
          options={
            formData?.paises.map((pais) => ({ value: pais.codigo, label: pais.nombre })) || []
          }
          value={''}
          onChange={() => {}}
        />
        <AuthInput
          label="Localidad"
          type="text"
          placeholder="Ingresa tu localidad"
          value={''}
          onChange={() => {}}
        />
        <AuthInput
          label="Calle"
          type="text"
          placeholder="Ingresa tu calle"
          value={''}
          onChange={() => {}}
        />
        <AuthInput
          label="Número de puerta"
          type="number"
          placeholder="Ingresa el número de puerta"
          value={''}
          onChange={() => {}}
        />

        <AuthInput
          label="Código postal"
          type="text"
          placeholder="Ingresa tu código postal"
          value={''}
          onChange={() => {}}
        />

        <Button text="Registrarse" onClick={() => {}} type="submit" />

        <p>
          ¿Ya tienes cuenta? <Link href="/login" text="Inicia sesión aquí" />
        </p>
      </form>
    </main>
  );
}
