import { useParams } from 'react-router-dom';
import { useVenta } from '../contexts/VentaContext';
import Input from '../../../components/Input';
import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import TimerCompra from '../components/TimerCompra';
import { useNavigate } from 'react-router-dom';

export default function ConfirmarCompra() {
  const { pagarVenta, cancelarVenta, error } = useVenta();
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [timerExpired, setTimerExpired] = useState(false);
  const [stopTimer, setStopTimer] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    numero_tarjeta: '',
    codigo_seguridad: '',
    fecha_vencimiento: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate('/');
    }
    if (timerExpired && !successMessage) {
      cancelarVenta(Number(id));
    }
  }, [id, timerExpired, navigate]);

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleCancel = async () => {
    if (!id) return;
    try {
      await cancelarVenta(Number(id));
      navigate('/');
    } catch (error) {
      console.error('Error al cancelar compra:', error);
    }
  };

  const handleSubmit = async () => {
    if (!id) return;
    try {
      const response = await pagarVenta(Number(id));
      setStopTimer(true);
      setSuccessMessage(response.message || 'Compra confirmada exitosamente');
    } catch (error) {
      console.error('Error al confirmar compra:', error);
    }
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
        <div>
          <h1 className="text-center text-3xl font-bold text-gray-dark mb-6 uppercase">
            Confirmar Compra
          </h1>
          <TimerCompra
            initialSeconds={300}
            onExpire={() => setTimerExpired(true)}
            stop={stopTimer}
          />
        </div>

        <Input
          label="Nombre"
          placeholder="Ingresa tu nombre"
          value={form.nombre}
          onChange={handleChange('nombre')}
          type="text"
        />

        <Input
          label="Apellido"
          placeholder="Ingresa tu apellido"
          value={form.apellido}
          onChange={handleChange('apellido')}
          type="text"
        />

        <Input
          label="Número de tarjeta"
          placeholder="Ingresa tu número de tarjeta"
          value={form.numero_tarjeta}
          onChange={handleChange('numero_tarjeta')}
          type="number"
        />

        <Input
          label="Código de seguridad"
          placeholder="Ingresa el código de seguridad"
          value={form.codigo_seguridad}
          onChange={handleChange('codigo_seguridad')}
          type="number"
        />

        <Input
          label="Fecha de vencimiento"
          placeholder=""
          value={form.fecha_vencimiento}
          onChange={handleChange('fecha_vencimiento')}
          type="month"
        />

        <div className="text-center min-h-[20px]">
          {successMessage ? (
            <p className="text-green-600">{successMessage}</p>
          ) : (
            (error && <p className="text-red-600 font-semibold">{error}</p>) || (
              <p className="text-gray-dark">
                ¿Estás seguro de que deseas confirmar tu compra? Una vez confirmada, no podrás
                cancelar la venta.
              </p>
            )
          )}
        </div>

        {timerExpired && !successMessage ? (
          <Button
            text="Volver al Inicio"
            onClick={() => navigate('/')}
            color="blue"
            type="button"
          />
        ) : successMessage ? (
          <Button
            text="Mis Entradas"
            onClick={() => navigate('/mis-entradas')}
            color="blue"
            type="button"
          />
        ) : (
          <div className="flex flex-col gap-4 md:flex-row justify-center">
            <Button type="button" onClick={handleCancel} text="Cancelar Compra" color="red" />

            <Button type="submit" onClick={handleSubmit} text="Confirmar Compra" />
          </div>
        )}
      </form>
    </main>
  );
}
