export default function CrossIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path d="M15 9L9 15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"></path>{' '}
        <path d="M9 9L15 15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"></path>{' '}
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="9"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></rect>{' '}
      </g>
    </svg>
  );
}
