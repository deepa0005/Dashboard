const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export { Button };
