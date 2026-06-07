type Props = { className?: string; color?: string };

export function LogoIcon({ className }: Props) {
  return <img className={className} src="/world-cup-logo-wbg.svg" alt="Fifa World Cup" />;
}
