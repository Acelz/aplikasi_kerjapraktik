import propTypes from "prop-types";

const FormSelect = ({ label, options, value, onChange, error }) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      className={`input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
        error ? "border-red-500" : ""
      }`}
    >
      <option value="">Pilih...</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

FormSelect.propTypes = {
  label: propTypes.string.isRequired,
  options: propTypes.array.isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
  error: propTypes.string,
};

export default FormSelect;
