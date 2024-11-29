const InputForm = ({
  label,
  type,
  placeholder,
  handleInput,
  name,
  hasDefaultValue,
  defaultValue,
}) => {
  const handleKeyDown = (e) => {
    if (
      type === "number" &&
      (e.key === "." || e.key === "," || e.key === "e" || e.key === "-")
    ) {
      e.preventDefault();
    }
  };

  const handleInputValidation = (e) => {
    if (type === "number") {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    }
    handleInput(e);
  };
  return (
    <label className="flex flex-col gap-1">
      {label}
      <input
        className="border-b-2 border-black p-2 rounded-lg border-t-0 border-x-0 text-black"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={handleInputValidation}
        onKeyDown={handleKeyDown}
        defaultValue={hasDefaultValue && defaultValue}
        step={type === "number" ? "0" : ""}
      />
    </label>
  );
};
export default InputForm;
