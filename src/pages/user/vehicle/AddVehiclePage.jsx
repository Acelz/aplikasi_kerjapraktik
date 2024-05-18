import DefaultLayout from "../../../layout/DefaultLayout";
import Spinner from "../../../components/spinner/Spinner";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../components/form/FormInput";

const AddVehiclePage = () => {
  const [formData, setFormData] = useState({
    licensePlate: "",
    brand: "",
    type: "",
    yearMade: "",
    color: "",
    vehicleType: "",
    model: "",
    cylinderCapacity: "",
    ownerName: "",
    ownerAddress: "",
    districtId: 1,
    villageId: 1,
    regencyOrMunicipalityId: 1,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [villages, setVillages] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [regencyOrMunicipalities, setRegencyOrMunicipalities] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const [villageData, districtData, regencyData] = await Promise.all([
          axios.get("http://localhost:5000/villages/all"),
          axios.get("http://localhost:5000/districts/all"),
          axios.get("http://localhost:5000/regency-municipalities/all"),
        ]);
        setVillages(villageData.data.result);
        setDistricts(districtData.data.result);
        setRegencyOrMunicipalities(regencyData.data.result);
      } catch (error) {
        console.error("Failed to fetch location data", error);
      }
    };
    fetchLocations();
  }, []);

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
      "licensePlate",
      "brand",
      "type",
      "yearMade",
      "color",
      "vehicleType",
      "model",
      "cylinderCapacity",
      "ownerName",
      "ownerAddress",
    ];
    fieldsToValidate.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Field ini harus diisi";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addVehicle = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/vehicles", formData);

      setFormData({
        licensePlate: "",
        brand: "",
        type: "",
        yearMade: "",
        color: "",
        vehicleType: "",
        model: "",
        cylinderCapacity: "",
        ownerName: "",
        ownerAddress: "",
        districtId: "",
        villageId: "",
        regencyOrMunicipalityId: "",
      });
      setErrors({});
      navigate("/vehicles");
    } catch (error) {
      console.error("Failed to add vehicle", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <h1 className="mb-4 text-3xl">Tambah Kendaraan</h1>
      <form onSubmit={addVehicle}>
        <div className="grid grid-cols-2 gap-4 place-content-center">
          <div>
            <FormInput
              label="Nomor Plat"
              value={formData.licensePlate}
              onChange={handleInputChange}
              name="licensePlate"
              placeholder="Nomor Plat"
              error={errors.licensePlate}
            />

            <FormInput
              label="Merek"
              value={formData.brand}
              onChange={handleInputChange}
              name="brand"
              placeholder="Merek"
              error={errors.brand}
            />
            <FormInput
              label="Tipe"
              value={formData.type}
              onChange={handleInputChange}
              name="type"
              placeholder="Tipe"
              error={errors.type}
            />
            <FormInput
              label="Tahun Dibuat"
              value={formData.yearMade}
              onChange={handleInputChange}
              name="yearMade"
              placeholder="Tahun Dibuat"
              error={errors.yearMade}
            />
            <FormInput
              label="Warna"
              value={formData.color}
              onChange={handleInputChange}
              name="color"
              placeholder="Warna"
              error={errors.color}
            />
            <FormInput
              label="Jenis Kendaraan"
              value={formData.vehicleType}
              onChange={handleInputChange}
              name="vehicleType"
              placeholder="Jenis Kendaraan"
              error={errors.vehicleType}
            />
            <FormInput
              label="Model"
              value={formData.model}
              onChange={handleInputChange}
              name="model"
              placeholder="Model"
              error={errors.model}
            />
          </div>
          <div>
            <FormInput
              label="Kapasitas Silinder"
              value={formData.cylinderCapacity}
              onChange={handleInputChange}
              name="cylinderCapacity"
              placeholder="Kapasitas Silinder"
              error={errors.cylinderCapacity}
            />
            <FormInput
              label="Nama Pemilik"
              value={formData.ownerName}
              onChange={handleInputChange}
              name="ownerName"
              placeholder="Nama Pemilik"
              error={errors.ownerName}
            />
            <FormInput
              label="Alamat Pemilik"
              value={formData.ownerAddress}
              onChange={handleInputChange}
              name="ownerAddress"
              placeholder="Alamat Pemilik"
              error={errors.ownerAddress}
            />
            <div>
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Kelurahan
              </label>
              <select
                value={formData.villageId}
                onChange={handleInputChange}
                name="villageId"
                id="villageId"
                className={`input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              >
                {villages.map((option) => (
                  <option key={option.value} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Kecamatan
              </label>
              <select
                value={formData.districtId}
                onChange={handleInputChange}
                name="districtId"
                className={`input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              >
                {districts.map((option) => (
                  <option key={option.value} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Kabupaten / Kota
              </label>
              <select
                value={formData.regencyOrMunicipalityId}
                onChange={handleInputChange}
                name="regencyOrMunicipalityId"
                id="regencyOrMunicipalityId"
                className={`input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
              >
                {regencyOrMunicipalities.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center mt-4 place-items-center">
          <button
            type="submit"
            className="w-full btn-primary"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Simpan"}
          </button>
        </div>
      </form>
    </DefaultLayout>
  );
};

export default AddVehiclePage;
