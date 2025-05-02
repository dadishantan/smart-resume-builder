export default function Button({ children, ...props }) {
    return (
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
        {...props}
      >
        {children}
      </button>
    );
  }
  