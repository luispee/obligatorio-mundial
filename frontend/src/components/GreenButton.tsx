type GreenButtonProps = {
  text: string;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
};

export default function GreenButton({ text, onClick, type }: GreenButtonProps) {
  return (
    <button type={type} className="green-button" onClick={onClick}>
      {text}
    </button>
  );
}
