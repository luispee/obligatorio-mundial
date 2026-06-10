type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  color?: 'green' | 'red' | 'white';
  textColor?: 'white' | 'black' | 'blue';
};

export default function Button({
  text,
  onClick,
  type,
  disabled,
  color = 'green',
  textColor = 'white',
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`button bg-${color} text-${textColor}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
