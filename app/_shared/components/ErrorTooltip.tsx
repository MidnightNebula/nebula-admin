export function ErrorTooltip({ error }: { error: any }) {
  return (
    <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
      <p className="pointer-events-auto text-center text-4xl text-gray-400">{error}</p>
    </div>
  );
}
