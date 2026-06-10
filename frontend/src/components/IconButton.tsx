type IconButtonProps = {
  icon: React.ReactNode;
  onClick: () => void;
};

export default function IconButton({ icon, onClick }: IconButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="cursor-pointer text-white hover:opacity-60 hover:scale-130 active:scale-70 active:opacity-60 transition duration-200 rounded-md p-1"
    >
      {icon}
    </button>
  );
}
