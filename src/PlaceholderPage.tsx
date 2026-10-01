export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-[calc(100vh-73px)] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md">
        <svg className="w-24 h-24 text-gray-700 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
        <p className="text-brand-text-muted text-lg mb-8">
          This section is currently under development. Please check back later!
        </p>
        <button onClick={() => window.history.back()} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors">
          Go Back
        </button>
      </div>
    </div>
  );
}
