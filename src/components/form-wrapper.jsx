// Define a functional component named "FormWrapper" that takes children as input
export function FormWrapper({ children }) {
  return (
    <div className="flex flex-col gap-1">
      {/* Render the children components within a flex container */}
      {children}
    </div>
  );
}
