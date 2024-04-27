import DefaultLayout from "../../../layout/DefaultLayout";
import { useState } from "react";
import axios from "axios";
import FormInput from "../../../components/form/FormInput";
import { useNavigate } from "react-router-dom";

const AddUserPage = () => {
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

  return (
    <DefaultLayout>
      <h1>Tambah Pengguna</h1>
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
          <FormInput
            label="Role"
            value={formData.role}
            onChange={handleInputChange}
            name="role"
            placeholder="Role"
            error={errors.role}
          />
        </div>
        <div className="mt-8">
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Tambah Pengguna"}
          </button>
        </div>
      </form>
    </DefaultLayout>
  );
};

export default AddUserPage;
