import axios from "axios";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";

const ModalUpdateCode = ({ setIsOpenModal, codeName, id, fetchCode }) => {
  const [number, setNumber] = useState(0);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

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

    if (number === 0 || name === "") {
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
    <>
      <div className="fixed inset-0 flex items-center justify-center z-index-top">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="absolute flex flex-col">
          <div className="p-10 bg-white rounded-xl">
            <h4 className="mb-4 text-xl font-semibold text-center">
              Ubah Kode
            </h4>
            <form onSubmit={updateCode}>
              <div>
                <label
                  htmlFor="district"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Kecamatan
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="ditrict"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Malalayang"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="code"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Kode
                </label>
                <input
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  type="text"
                  id="code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required
                />
              </div>
              <div className="flex items-center mt-4 place-items-center">
                <button
                  type="submit"
                  className="w-full btn-primary"
                  disabled={loading}
                >
                  {loading ? <Spinner /> : "Simpan"}
                </button>
                <button
                  onClick={() => setIsOpenModal(false)}
                  className="w-full btn-secondary "
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

ModalUpdateCode.propTypes = {
  setIsOpenModal: PropTypes.func.isRequired,
  codeName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  fetchCode: PropTypes.func.isRequired,
};

export default ModalUpdateCode;
