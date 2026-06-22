import { useNavigate, useParams } from 'react-router-dom';
import { FormEventoResponse } from '../api/eventoResponses';
import { useEvento } from '../contexts/EventoContext';
import { useEffect, useState } from 'react';
import PaisSelect from '../../../components/PaisSelect';
import Select from '../../../components/Select';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import SectorRow from '../components/SectorRow';
import { CreateEventoForm as UpdateEventoForm } from '../types/createEventoForm';
import { CreateEventoRequest as UpdateEventoRequest } from '../api/eventoRequests';
import ConfirmBajaEventoModal from '../components/ConfirmBajaEventoModal';

export default function EditEvento() {
  const { loading, error, getFormData, clearError, updateEvento, getEvento, deactivateEvento } =
    useEvento();
  const [formData, setFormData] = useState<FormEventoResponse | null>(null);
  const [emptyPrecio, setEmptyPrecio] = useState(false);
  const [showBajaConfirm, setShowBajaConfirm] = useState(false);
  const [form, setForm] = useState<UpdateEventoForm>({
    codigo_seleccion_local: '',
    codigo_seleccion_visitante: '',
    fecha_hora: '',
    estadio: {
      id: 0,
      sectores: [],
    },
  });

  const navigate = useNavigate();

  const { id } = useParams();

  const handleChange =
    (field: keyof UpdateEventoForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSelectChange = (field: keyof UpdateEventoForm) => (value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSectorToggle = (sectorId: number) => {
    setForm((prev) => ({
      ...prev,
      estadio: {
        ...prev.estadio,
        sectores: prev.estadio.sectores.map((s) =>
          s.id === sectorId ? { ...s, activo: !s.activo } : s
        ),
      },
    }));
  };

  useEffect(() => {
    async function fetchAll() {
      try {
        const [evento, data] = await Promise.all([getEvento(Number(id)), getFormData()]);
        console.log(evento);
        setFormData(data);
        setForm({
          codigo_seleccion_local: evento?.seleccion_local.codigo || '',
          codigo_seleccion_visitante: evento?.seleccion_visitante.codigo || '',
          fecha_hora: evento?.fecha_hora.slice(0, 16) || '',
          estadio: {
            id: evento?.estadio.id || 0,
            sectores:
              evento?.estadio.sectores.map((s) => ({
                id: s.id,
                precio: String(s.precio),
                activo: s.activo,
              })) || [],
          },
        });
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    }
    fetchAll();
  }, []);

  const handleDeactivate = async () => {
    try {
      await deactivateEvento(Number(id));
      navigate('/');
    } catch (error) {
      console.error('Error al dar de baja el evento:', error);
    }
  };

  const handleSubmit = async () => {
    setEmptyPrecio(false);
    clearError();
    try {
      for (const sector of form.estadio.sectores) {
        if (sector.activo && !sector.precio) {
          setEmptyPrecio(true);
          return;
        }
      }

      const request: UpdateEventoRequest = {
        ...form,
        estadio: {
          ...form.estadio,
          sectores: form.estadio.sectores.map((s) => ({
            id: s.id,
            precio: Number(s.precio.replace(',', '.')) || 0,
            activo: s.activo,
          })),
        },
      };

      await updateEvento(Number(id), request);
      navigate('/');
    } catch (error) {
      console.error('Error al actualizar el evento:', error);
    }
  };

  const selectedEstadio = formData?.estadios.find((e) => e.id === form.estadio.id);

  const capacidadTotal = () => {
    let capacidad = 0;
    for (const sector of selectedEstadio?.sectores || []) {
      const formSector = form.estadio.sectores.find((s) => s.id === sector.id);
      if (formSector?.activo) {
        capacidad += sector.capacidad!;
      }
    }
    return capacidad;
  };

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 py-8">
      <form
        className="relative flex flex-col gap-4 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg shadow-gray"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {showBajaConfirm && (
          <ConfirmBajaEventoModal
            onClose={() => setShowBajaConfirm(false)}
            onConfirm={handleDeactivate}
          />
        )}
        <h1 className="text-center text-3xl font-bold text-gray-dark mb-6 uppercase">
          Editar Evento
        </h1>
        <div className="absolute top-4 right-4">
          <Button
            text="Dar de baja"
            color="red"
            onClick={() => setShowBajaConfirm(true)}
            type="button"
          />
        </div>

        <ul className="grid w-full grid-cols-2 gap-4 md:grid-cols-2">
          <PaisSelect
            label="Seleccion local"
            options={
              formData?.selecciones.map((seleccion) => ({
                value: seleccion.codigo,
                label: seleccion.nombre,
              })) || []
            }
            value={form.codigo_seleccion_local}
            onChange={handleSelectChange('codigo_seleccion_local')}
          />
          <PaisSelect
            label="Seleccion visitante"
            options={
              formData?.selecciones.map((seleccion) => ({
                value: seleccion.codigo,
                label: seleccion.nombre,
              })) || []
            }
            value={form.codigo_seleccion_visitante}
            onChange={handleSelectChange('codigo_seleccion_visitante')}
          />

          <Select
            label="Estadio"
            options={
              formData?.estadios.map((estadio) => ({
                value: estadio.id,
                label: estadio.nombre + ' (' + estadio.ciudad + ')',
              })) || []
            }
            value={form.estadio.id}
            onChange={(value) => {
              const estadio = formData?.estadios.find((e) => e.id === Number(value));
              setForm((prev) => ({
                ...prev,

                estadio: {
                  id: Number(value),
                  sectores:
                    estadio?.sectores.map((s) => ({ id: s.id, precio: '', activo: true })) || [],
                },
              }));
            }}
          />
          <Input
            label="Fecha y Hora"
            value={form.fecha_hora}
            onChange={handleChange('fecha_hora')}
            placeholder=""
            type="datetime-local"
            pointer
          />
        </ul>
        {selectedEstadio && <p>Capacidad: {capacidadTotal()}</p>}

        <div className="flex flex-col gap-2">
          {selectedEstadio?.sectores.map((sector, index) => {
            const formSector = form.estadio.sectores.find((s) => s.id === sector.id);
            return (
              <SectorRow
                key={sector.id}
                number={index + 1}
                sector={sector}
                precio={formSector?.precio}
                onToggle={() => handleSectorToggle(sector.id)}
                isSelected={formSector?.activo ?? false}
                onChange={(precio) => {
                  setForm((prev) => ({
                    ...prev,
                    estadio: {
                      ...prev.estadio,
                      sectores: prev.estadio.sectores.map((s) =>
                        s.id === sector.id ? { ...s, precio } : s
                      ),
                    },
                  }));
                }}
              />
            );
          })}
        </div>

        <div className="text-center text-red-500 min-h-[20px]">
          {emptyPrecio ? 'Debe ingresar un precio para cada sector seleccionado' : error ?? ''}
        </div>

        <Button text={` ${loading ? 'Cargando...' : 'Editar Evento'}`} type="submit" />
      </form>
    </main>
  );
}
