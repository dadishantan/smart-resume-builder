export default function Input({ ...props }) {
    return (
      <input
        className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    );
  }
  