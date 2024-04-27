import axios from "axios";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import FormInput from "../form/FormInput"; // Sesuaikan dengan path FormInput

const ModalUpdateCode = ({ setIsOpenModal, codeName, id, fetchCode }) => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchDistrict = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/${codeName}/${id}`
      );
      setName(response.data.result.name);
      setNumber(response.data.result.number);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCode = async (e) => {
    e.preventDefault();

    // Validasi input
    if (!number || !name) {
      setErrors({
        number: !number ? "Nomor harus diisi" : null,
        name: !name ? "Nama harus diisi" : null,
      });
      return;
    }

    try {
      setLoading(true);
      await axios.patch(`http://localhost:5000/${codeName}/${id}`, {
        number,
        name,
      });
      setLoading(false);
      setIsOpenModal(false);
      fetchCode();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDistrict();
  }, [id]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-index-top">
      <div className="p-10 bg-white rounded-xl">
        <h4 className="mb-4 text-xl font-semibold text-center">Ubah Kode</h4>
        <form onSubmit={updateCode}>
          <FormInput
            label="Kecamatan"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors({ ...errors, name: null });
            }}
            type="text"
            placeholder="Malalayang"
            error={errors.name}
            required
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          <FormInput
            label="Kode"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
              setErrors({ ...errors, number: null });
            }}
            type="text"
            placeholder="John"
            error={errors.number}
            required
          />
          {errors.number && (
            <p className="text-sm text-red-500">{errors.number}</p>
          )}
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

ModalUpdateCode.propTypes = {
  setIsOpenModal: PropTypes.func.isRequired,
  codeName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  fetchCode: PropTypes.func.isRequired,
};

export default ModalUpdateCode;
