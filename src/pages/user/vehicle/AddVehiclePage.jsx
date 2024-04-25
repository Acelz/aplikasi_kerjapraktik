import DefaultLayout from "../../../layout/DefaultLayout";
import Spinner from "../../../components/spinner/Spinner";
import { useState, useEffect } from "react";
import axios from "axios";

const AddVehiclePage = () => {
  const [licensePlate, setLicensePlate] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [yearMade, setYearMade] = useState("");
  const [color, setColor] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [model, setModel] = useState("");
  const [cylinderCapacity, setCylinderCapacity] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [districtId, setDistrictId] = useState(null);
  const [villageId, setVillageId] = useState(null);
  const [regencyOrMunicipalityId, setRegencyOrMunicipalityId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [villages, setVillages] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [regencyOrMunicipalities, setRegencyOrMunicipalities] = useState([]);

  const addVehicle = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios.post("http://localhost:5000/vehicles", {
        licensePlate: licensePlate,
        brand: brand,
        type: type,
        yearMade: yearMade,
        color: color,
        vehicleType: vehicleType,
        model: model,
        cylinderCapacity: cylinderCapacity,
        ownerName: ownerName,
        ownerAddress: ownerAddress,
        districtId: districtId,
        villageId: villageId,
        regencyOrMunicipalityId: regencyOrMunicipalityId,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const fetchVillages = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/villages/all`);
      setVillages(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDistrict = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/districts/all`);
      setDistricts(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRegencyOrMunicipality = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/regency-municipalities/all`
      );
      setRegencyOrMunicipalities(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchVillages();
    fetchDistrict();
    fetchRegencyOrMunicipality();
  }, []);

  return (
    <DefaultLayout>
      <h1 className="mb-4 text-3xl">Tambah Kendaraan</h1>
      <div>
        <form onSubmit={addVehicle}>
          <div className="grid grid-cols-2 gap-4 place-content-center">
            <div>
              <div>
                <label
                  htmlFor="licensePlate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nomor Plat
                </label>
                <input
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  type="text"
                  id="licensePlate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nomor Plat"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Merek
                </label>
                <input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  type="text"
                  id="brand"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Merek"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tipe
                </label>
                <input
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  type="text"
                  id="type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tipe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="yearMade"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tahun Dibuat
                </label>
                <input
                  value={yearMade}
                  onChange={(e) => setYearMade(e.target.value)}
                  type="text"
                  id="yearMade"
                  className="input"
                  placeholder="Tahun Dibuat"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="color"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Warna
                </label>
                <input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  type="text"
                  id="color"
                  className="input"
                  placeholder="Warna"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="vehicleType"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Jenis Kendaraan
                </label>
                <input
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  type="text"
                  id="vehicleType"
                  className="input"
                  placeholder="Jenis Kendaraan"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="model"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Model
                </label>
                <input
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  type="text"
                  id="model"
                  className="input"
                  placeholder="Model"
                  required
                />
              </div>
            </div>
            <div>
              <div>
                <label
                  htmlFor="cylinderCapacity"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Kapasitas Silinder
                </label>
                <input
                  value={cylinderCapacity}
                  onChange={(e) => setCylinderCapacity(e.target.value)}
                  type="text"
                  id="cylinderCapacity"
                  className="input"
                  placeholder="Kapasitas Silinder"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="ownerName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nama Pemilik
                </label>
                <input
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  type="text"
                  id="ownerName"
                  className="input"
                  placeholder="Nama Pemilik"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="ownerAddress"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Alamat Pemilik
                </label>
                <input
                  value={ownerAddress}
                  onChange={(e) => setOwnerAddress(e.target.value)}
                  type="text"
                  id="ownerAddress"
                  className="input"
                  placeholder="Alamat Pemilik"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="village"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Keluraha/Desa
                </label>
                <select
                  className="input"
                  value={villageId}
                  onChange={(e) => setVillageId(e.target.value)}
                  name="village"
                  id="village"
                >
                  {villages.map((village) => (
                    <option value={village.id} key={village.id}>
                      {village.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="district"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Kecamatan
                </label>
                <select
                  className="input"
                  value={districtId}
                  onChange={(e) => setDistrictId(e.target.value)}
                  name="district"
                  id="district"
                >
                  {districts.map((district) => (
                    <option value={district.id} key={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="regencyOrMunicipalities"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Provinsi
                </label>
                <select
                  className="input"
                  value={regencyOrMunicipalityId}
                  onChange={(e) => setRegencyOrMunicipalityId(e.target.value)}
                  name="regencyOrMunicipalities"
                  id="regencyOrMunicipalities"
                >
                  {regencyOrMunicipalities.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-4 place-items-center">
            {loading ? (
              <button className="w-full btn-primary" disabled>
                <Spinner />
                Menyimpan...
              </button>
            ) : (
              <button type="submit" className="w-full btn-primary">
                Simpan
              </button>
            )}
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default AddVehiclePage;
