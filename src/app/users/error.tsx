'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <h2 className="text-lg font-semibold text-red-500">Error loading data</h2>
      <p className="text-gray-700">{error.message}</p>
      <button
        onClick={() => reset()}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
}
