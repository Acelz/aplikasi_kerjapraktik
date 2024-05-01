import DefaultLayout from "../../../layout/DefaultLayout";
import { useState } from "react";
import axios from "axios";
import FormInput from "../../../components/form/FormInput";
import { useNavigate } from "react-router-dom";

const UpdateUserPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (!value) {
      setErrors((prev) => ({ ...prev, [name]: "Field ini harus diisi" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const fieldsToValidate = [
      "username",
      "name",
      "password",
      "confirmPassword",
      "role",
    ];
    fieldsToValidate.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Field ini harus diisi";
      }
    });

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword =
        "Password dan Konfirmasi Password harus cocok";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/user", formData);
      setFormData({
        username: "",
        name: "",
        password: "",
        confirmPassword: "",
        role: "",
      });
      setErrors({});
      navigate("/users");
    } catch (error) {
      console.error("Failed to add user", error);
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: "admin", name: "Admin" },
    { value: "user", name: "User" },
  ];
  return (
    <DefaultLayout>
      <h1 className="mb-4 text-3xl font-bold">Tambah Pengguna</h1>
      <form onSubmit={addUser}>
        <div>
          <FormInput
            label="Username"
            value={formData.username}
            onChange={handleInputChange}
            name="username"
            placeholder="Username"
            error={errors.username}
          />
          <FormInput
            label="Nama"
            value={formData.name}
            onChange={handleInputChange}
            name="name"
            placeholder="Nama"
            error={errors.name}
          />
          <FormInput
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
            name="password"
            type="password"
            placeholder="Password"
            error={errors.password}
          />
          <FormInput
            label="Konfirmasi Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            name="confirmPassword"
            type="password"
            placeholder="Konfirmasi Password"
            error={errors.confirmPassword}
          />
          <div>
            <label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Role
            </label>
            <select
              label="Role"
              value={formData.role}
              onChange={handleInputChange}
              name="role"
              className={`input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-8">
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </DefaultLayout>
  );
};

export default UpdateUserPage;
