import { useContext, useEffect, useState } from 'react';
import PaisSelect from '../../../components/PaisSelect';
import Select from '../../../components/Select';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import SectorRow from '../components/SectorRow';
import { useEvento } from '../contexts/EventoContext';
import { FormEventoResponse } from '../api/eventoResponses';

export default function CreateEvento() {
  const { loading, error, getFormData, createEvento } = useEvento();
  const [formData, setFormData] = useState<FormEventoResponse | null>(null);
  const [form, setForm] = useState<CreateEventoForm>({
    codigo_seleccion_local: '',
    codigo_seleccion_visitante: '',
    fecha_hora: '',
    estadio: {
      id: 0,
      sectores: [],
    },
  });

  const handleChange =
    (field: keyof CreateEventoForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSelectChange = (field: keyof CreateEventoForm) => (value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSectorToggle = (sectorId: number) => {
    setForm((prev) => {
      const sectores = prev.estadio.sectores;
      const index = sectores.findIndex((s) => s.id === sectorId);
      if (index === -1) {
        return {
          ...prev,
          estadio: {
            ...prev.estadio,
            sectores: [...sectores, { id: sectorId, precio: '' }],
          },
        };
      } else {
        return {
          ...prev,
          estadio: {
            ...prev.estadio,
            sectores: sectores.filter((s) => s.id !== sectorId),
          },
        };
      }
    });
  };

  useEffect(() => {
    async function fetchFormData() {
      try {
        const data = await getFormData();
        setFormData(data);
      } catch (error) {
        console.error('Error al obtener datos del formulario de registro:', error);
      }
    }
    fetchFormData();
  }, []);

  const handleSubmit = async () => {
    const request: CreateEventoRequest = {
      ...form,
      estadio: {
        ...form.estadio,
        sectores: form.estadio.sectores.map((s) => ({
          id: s.id,
          precio: Number(s.precio.replace(',', '.')),
        })),
      },
    };

    await createEvento(request);
  };

  const selectedEstadio = formData?.estadios.find((e) => e.id === form.estadio.id);

  const capacidadTotal = () => {
    let capacidad = 0;
    for (let i = 0; i < selectedEstadio?.sectores.length!; i++) {
      if (form.estadio.sectores.some((s) => s.id === selectedEstadio?.sectores[i].id)) {
        capacidad += selectedEstadio?.sectores[i].capacidad!;
      }
    }
    return capacidad;
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
          Crear Evento
        </h1>

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
                  sectores: estadio?.sectores.map((s) => ({ id: s.id, precio: '' })) || [],
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
          />
        </ul>
        <p>Capacidad: {capacidadTotal()}</p>

        <div className="flex flex-col gap-2">
          {selectedEstadio?.sectores.map((sector, index) => (
            <SectorRow
              key={sector.id}
              number={index + 1}
              sector={sector}
              precio={form.estadio.sectores.find((s) => s.id === sector.id)?.precio}
              onToggle={() => handleSectorToggle(sector.id)}
              isSelected={form.estadio.sectores.some((s) => s.id === sector.id)}
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
          ))}
        </div>

        <div className="text-center text-red-500 min-h-[20px]">{error ?? ''}</div>

        <Button text={` ${loading ? 'Cargando...' : 'Crear Evento'}`} type="submit" />

        <div></div>
      </form>
    </main>
  );
}
