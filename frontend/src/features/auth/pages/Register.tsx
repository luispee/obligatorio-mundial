import AuthInput from '../../../components/Input';
import Link from '../../../components/Link';
import Select from '../../../components/Select';
import TelefonoSection from '../components/TelefonoSection';
import Button from '../../../components/Button';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { RegisterFormDataResponse } from '../api/authResponses';
import { RegisterRequest } from '../api/authRequests';
import FlagSelect from '../../../components/PaisSelect';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { getRegisterFormData, register, error, loading, clearError } = useAuth();
  const [formData, setFormData] = useState<RegisterFormDataResponse | null>(null);
  const [confirmContrasena, setConfirmContrasena] = useState('');
  const [contrasenaError, setContrasenaError] = useState<string | null>(null);

  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterRequest>({
    mail: '',
    contrasena: '',
    codigo_pais_documento: '',
    id_tipo_documento: 2,
    numero_documento: '',
    codigo_pais_residencia: '',
    localidad: '',
    calle: '',
    numero_puerta: '',
    codigo_postal: '',
    telefonos: [''],
  });

  const handleChange =
    (field: keyof RegisterRequest) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSelectChange = (field: keyof RegisterRequest) => (value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

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

  const handleSubmit = async () => {
    clearError();
    if (form.contrasena !== confirmContrasena) {
      setContrasenaError('Las contraseñas no coinciden');
      return;
    }
    setContrasenaError(null);
    try {
      await register(form);
      navigate('/register/verify-mail');
    } catch (err) {
      console.error('Error en registro', err);
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8">
      <form
        className="flex flex-col gap-4 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg shadow-gray"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h1 className="text-center text-3xl font-bold text-gray-dark mb-6 uppercase">
          Registrarse
        </h1>
        <AuthInput
          label="Correo Electrónico"
          type="text"
          placeholder="Ingresa tu correo electrónico"
          value={form.mail}
          onChange={handleChange('mail')}
        />
        <AuthInput
          label="Contraseña"
          type="password"
          placeholder="Ingresa tu contraseña"
          value={form.contrasena}
          onChange={handleChange('contrasena')}
        />
        <AuthInput
          label="Confirmar Contraseña"
          type="password"
          placeholder="Confirma tu contraseña"
          value={confirmContrasena}
          onChange={(e) => setConfirmContrasena(e.target.value)}
        />

        <TelefonoSection
          telefonos={form.telefonos}
          onChange={(telefonos) => setForm({ ...form, telefonos })}
        />

        <hr className="border-gray-500" />

        <Select
          label="Tipo de documento"
          options={
            formData?.tipos_documento.map((tipo) => ({ value: tipo.id, label: tipo.nombre })) || []
          }
          value={form.id_tipo_documento}
          onChange={handleSelectChange('id_tipo_documento')}
        />

        <FlagSelect
          label="País del documento"
          options={
            formData?.paises.map((pais) => ({ value: pais.codigo, label: pais.nombre })) || []
          }
          value={form.codigo_pais_documento}
          onChange={handleSelectChange('codigo_pais_documento')}
        />

        <AuthInput
          label="Número de documento"
          type="text"
          placeholder="Ingresa nº documento"
          value={form.numero_documento}
          onChange={handleChange('numero_documento')}
        />

        <hr className="border-gray-500" />

        <FlagSelect
          label="País de residencia"
          options={
            formData?.paises.map((pais) => ({ value: pais.codigo, label: pais.nombre })) || []
          }
          value={form.codigo_pais_residencia}
          onChange={handleSelectChange('codigo_pais_residencia')}
        />

        <AuthInput
          label="Localidad"
          type="text"
          placeholder="Ingresa tu localidad"
          value={form.localidad}
          onChange={handleChange('localidad')}
        />
        <AuthInput
          label="Calle"
          type="text"
          placeholder="Ingresa tu calle"
          value={form.calle}
          onChange={handleChange('calle')}
        />
        <AuthInput
          label="Número de puerta"
          type="number"
          placeholder="Ingresa el número de puerta"
          value={form.numero_puerta}
          onChange={handleChange('numero_puerta')}
        />

        <AuthInput
          label="Código postal"
          type="text"
          placeholder="Ingresa tu código postal"
          value={form.codigo_postal}
          onChange={handleChange('codigo_postal')}
        />

        <p className="text-center text-red-500 min-h-[20px]">{contrasenaError || error || ''}</p>

        <Button
          text={` ${loading ? 'Cargando...' : 'Registrarse'}`}
          type="submit"
          disabled={loading}
        />

        <p>
          ¿Ya tienes cuenta? <Link href="/login" text="Inicia sesión aquí" />
        </p>
      </form>
    </main>
  );
}
