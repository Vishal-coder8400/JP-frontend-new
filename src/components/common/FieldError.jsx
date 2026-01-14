const FieldError = ({ error }) => {
  if (!error) return null;

  return (
    <p className="text-red-500 text-sm mt-1">
      {Array.isArray(error) ? error[0] : error}
    </p>
  );
};

export default FieldError;
