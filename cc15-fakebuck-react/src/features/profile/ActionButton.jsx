export default function ActionButton({ children, onClick }) {
  return (
    <button
      className="bg-gray-300 px-3 py-2 rounded-lg font-semibold hover:bg-gray-400 flex gap-2 items-center border-gray-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
