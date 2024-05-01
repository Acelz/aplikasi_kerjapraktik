import propTypes from "prop-types";

const FormInput = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  error,
  name,
}) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 ${
        error ? "border-red-500" : ""
      }`}
    />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

FormInput.propTypes = {
  label: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  type: propTypes.string,
  placeholder: propTypes.string,
  error: propTypes.string,
  name: propTypes.string,
};

export default FormInput;
