type CantidadEntradasButtonProps = {
  label: string;
  onClick?: () => void;
  selected?: boolean;
};

export default function CantidadEntradasButton({
  label,
  onClick,
  selected,
}: CantidadEntradasButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded ${
        selected ? 'bg-green text-white' : 'bg-gray'
      } cursor-pointer shadow shadow-md shadow-gray border border-gray hover:border-green transition-colors`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
