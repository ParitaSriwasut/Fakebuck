export default function FormButton({ children, onClick }) {
  return (
    <div>
      <button
        className="px-3 py-1.5 hover:bg-gray-200 text-blue-500 rounded-md"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
