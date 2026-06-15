export function DecorativePattern() {
  return (
    <svg className="absolute opacity-10" width="200" height="200" viewBox="0 0 200 200" fill="none">
      <pattern id="peruvian" patternUnits="userSpaceOnUse" width="40" height="40">
        <path d="M20 0L40 20L20 40L0 20Z" stroke="#C75D3A" strokeWidth="1" fill="none" />
        <circle cx="20" cy="20" r="4" fill="#C75D3A" />
      </pattern>
      <rect width="200" height="200" fill="url(#peruvian)" />
    </svg>
  );
}
