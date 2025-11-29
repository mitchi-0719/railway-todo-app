export const AppButton = ({ children, className, ...props }) => {
  return (
    <button className={`app_button ${className}`} {...props}>
      {children}
    </button>
  );
};
