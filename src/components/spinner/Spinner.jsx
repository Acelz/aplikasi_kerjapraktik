const Spinner = () => {
  return (
    <div
      className="animate-spin inline-block w-3 h-3 border-[3px] border-current border-t-transparent text-gray-400 rounded-full"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
