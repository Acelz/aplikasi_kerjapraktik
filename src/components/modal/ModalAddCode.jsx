import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import FormInput from "../form/FormInput"; // Sesuaikan dengan path FormInput

const ModalAddCode = ({ setIsOpenModal, codeName, fetchCode }) => {
  const [formData, setFormData] = useState({
    number: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Menghapus pesan error yang sudah ada sebelumnya
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const addCode = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!formData.number || !formData.name) {
      setErrors({
        number: !formData.number ? "Nomor harus diisi" : "",
        name: !formData.name ? "Nama harus diisi" : "",
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post(`http://localhost:5000/${codeName}`, formData);
      setLoading(false);
      setIsOpenModal(false);
      fetchCode();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-index-top">
      <div className="p-10 bg-white rounded-xl">
        <h4 className="mb-4 text-xl font-semibold text-center">Tambah Kode</h4>
        <form onSubmit={addCode}>
          <FormInput
            label="Kecamatan"
            value={formData.name}
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="Malalayang"
            error={errors.name}
            required
          />
          <FormInput
            label="Kode"
            value={formData.number}
            onChange={handleChange}
            name="number"
            type="text"
            placeholder="John"
            error={errors.number}
            required
          />
          <div className="flex items-center mt-4">
            <button
              type="submit"
              className="w-full btn-primary"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Simpan"}
            </button>
            <button
              onClick={() => setIsOpenModal(false)}
              className="w-full ml-2 btn-secondary"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ModalAddCode.propTypes = {
  setIsOpenModal: PropTypes.func.isRequired,
  codeName: PropTypes.string.isRequired,
  fetchCode: PropTypes.func.isRequired,
};

export default ModalAddCode;
