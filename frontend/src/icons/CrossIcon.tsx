export default function CrossIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <path d="M15 9L9 15" stroke="#ffffff" stroke-width="2" stroke-linecap="round"></path>{' '}
        <path d="M9 9L15 15" stroke="#ffffff" stroke-width="2" stroke-linecap="round"></path>{' '}
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="9"
          stroke="#ffffff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></rect>{' '}
      </g>
    </svg>
  );
}
