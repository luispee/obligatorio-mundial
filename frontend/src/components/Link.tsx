type LinkProps = {
  href: string;
  text: string;
};

export default function Link({ href, text }: LinkProps) {
  return (
    <a href={href} className="text-green font-semibold hover:underline">
      {text}
    </a>
  );
}
