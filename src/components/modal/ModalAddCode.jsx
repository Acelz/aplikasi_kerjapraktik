import { HiOutlineXCircle } from "react-icons/hi2";
import axios from "axios";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ModalAddCode = ({ setIsOpenModal, updateTable }) => {
  const [divisions, setDivisons] = useState([]);
  const [name, setName] = useState("");
  const [divisionId, setDivisionId] = useState(1);

  const fetchDivisions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/divisions");
      console.log(response.data);
      setDivisons(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const addCode = async (e) => {
    try {
    } catch (error) {}
  };

  useEffect(() => {
    fetchDivisions();
  }, []);
  return (
    <>
      <div className="fixed inset-0 z-index-top flex items-center justify-center">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="absolute flex flex-col">
          <div className="p-10 bg-white rounded-xl">
            <h4 className="text-xl text-center font-semibold mb-4">
              Tambah Kode
            </h4>
            <form onClick={addCode}>
              <div>
                <label
                  htmlFor="district"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Kecamatan
                </label>
                <input
                  type="text"
                  id="ditrict"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
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
                  type="text"
                  id="code"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="John"
                  required
                />
              </div>
              <div className="mt-4 flex items-center place-items-center">
                <button className="btn-primary w-full ">Simpan</button>
                <button
                  onClick={() => setIsOpenModal(false)}
                  className="btn-secondary w-full "
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

ModalAddCode.propTypes = {
  setIsOpenModal: PropTypes.func.isRequired,
};

export default ModalAddCode;
