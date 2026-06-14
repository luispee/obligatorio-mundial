import CantidadEntradasButton from './CantidadEntradasButton';

type SelectCantidadEntradasProps = {
  cantidad: number;
  onChange: (cantidad: number) => void;
};

export default function SelectCantidadEntradas({
  cantidad,
  onChange,
}: SelectCantidadEntradasProps) {
  const cantidadMaxima = 5;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="cantidadEntradas" className="text-gray-dark font-medium">
        Cantidad de Entradas
      </label>
      <div className="flex gap-2">
        {[...Array(cantidadMaxima)].map((_, index) => (
          <CantidadEntradasButton
            key={index}
            label={(index + 1).toString()}
            onClick={() => onChange(index + 1)}
            selected={cantidad === index + 1}
          />
        ))}
      </div>
    </div>
  );
}
