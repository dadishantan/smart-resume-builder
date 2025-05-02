export default function FormCard({ title, children }) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          {title && (
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
              {title}
            </h2>
          )}
          {children}
        </div>
      </div>
    );
  }
  