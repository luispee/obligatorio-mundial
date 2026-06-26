import { useAuth } from '../../auth/contexts/AuthContext';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import FlagSelect from '../../../components/PaisSelect';
import TelefonoSection from '../../auth/components/TelefonoSection';
import { useEffect, useState } from 'react';
import { RegisterFormDataResponse } from '../../auth/api/authResponses';
import { useFuncionario } from '../contexts/FuncionarioContext';
import { UpdateFuncionarioRequest } from '../api/funcionarioRequests';
import { useParams } from 'react-router-dom';
import ConfirmBajaFuncionarioModal from '../components/ConfirmBajaFuncionarioModal';
import { useNavigate } from 'react-router-dom';

export default function UpdateFuncionario() {
  const { getRegisterFormData } = useAuth();
  const { error, loading, updateFuncionario, getFuncionario, deactivateFuncionario } =
    useFuncionario();
  const [formData, setFormData] = useState<RegisterFormDataResponse | null>(null);
  const [updated, setUpdated] = useState(false);
  const [displayBajaModal, setDisplayBajaModal] = useState(false);
  const [form, setForm] = useState<UpdateFuncionarioRequest>({
    mail: '',
    codigo_pais_documento: '',
    numero_legajo: '',
    id_tipo_documento: 2,
    numero_documento: '',
    codigo_pais_residencia: '',
    localidad: '',
    calle: '',
    numero_puerta: '',
    codigo_postal: '',
    telefonos: [''],
  });

  const navigate = useNavigate();

  const { mail } = useParams<{ mail: string }>();

  useEffect(() => {
    async function fetchData() {
      try {
        const formData = await getRegisterFormData();
        setFormData(formData);
        const funcionario = await getFuncionario(mail);
        setForm(funcionario);
      } catch (error) {
        console.error('Error al obtener datos del formulario de registro:', error);
      }
    }
    fetchData();
  }, []);

  const handleChange =
    (field: keyof UpdateFuncionarioRequest) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSelectChange =
    (field: keyof UpdateFuncionarioRequest) => (value: string | number) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async () => {
    await updateFuncionario(form.mail, form);
    setUpdated(true);
  };

  const handleConfirmBaja = async () => {
    try {
      await deactivateFuncionario(mail);
      setDisplayBajaModal(false);
      navigate('/funcionarios');
    } catch (error) {
      console.error('Error deactivating funcionario:', error);
    }
  };

  const successMessage = updated ? 'Datos actualizados correctamente' : null;
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8">
      <form
        className="relative flex flex-col gap-4 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg shadow-gray"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {displayBajaModal && (
          <ConfirmBajaFuncionarioModal
            onClose={() => setDisplayBajaModal(false)}
            onConfirm={handleConfirmBaja}
          />
        )}
        <div className="absolute top-4 right-4">
          <Button text="Dar de baja" color="red" onClick={() => setDisplayBajaModal(true)} />
        </div>
        <h1 className="text-left text-3xl font-bold text-gray-dark mb-6 uppercase">
          Modificar funcionario
        </h1>
        <p>
          <strong>Mail:</strong> {mail}
        </p>

        <Input
          label="Número de legajo"
          type="text"
          placeholder="Ingresa nº legajo"
          value={form.numero_legajo}
          onChange={handleChange('numero_legajo')}
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

        <Input
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

        <Input
          label="Localidad"
          type="text"
          placeholder="Ingresa tu localidad"
          value={form.localidad}
          onChange={handleChange('localidad')}
        />
        <Input
          label="Calle"
          type="text"
          placeholder="Ingresa tu calle"
          value={form.calle}
          onChange={handleChange('calle')}
        />
        <Input
          label="Número de puerta"
          type="number"
          placeholder="Ingresa el número de puerta"
          value={form.numero_puerta}
          onChange={handleChange('numero_puerta')}
        />

        <Input
          label="Código postal"
          type="text"
          placeholder="Ingresa tu código postal"
          value={form.codigo_postal}
          onChange={handleChange('codigo_postal')}
        />

        <div className="text-center min-h-[20px]">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="text-green-500">{successMessage}</p>
          )}
        </div>

        <Button
          text={` ${loading ? 'Cargando...' : 'Guardar Cambios'}`}
          type="submit"
          disabled={loading}
        />
      </form>
    </main>
  );
}
