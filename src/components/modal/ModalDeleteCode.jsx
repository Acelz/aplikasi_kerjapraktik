import { HiOutlineXCircle } from "react-icons/hi2";
import axios from "axios";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ModalDeleteCode = ({ setIsOpenModal, updateTable }) => {
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
              Hapus Kode
            </h4>
            <p className="text-center font-medium text-lg">
              Anda yakin ingin menghapus kode ini?
            </p>
            <div className="mt-4 flex items-center place-items-center">
              <button className="btn-primary w-full ">Ya</button>
              <button
                onClick={() => setIsOpenModal(false)}
                className="btn-secondary w-full "
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ModalDeleteCode.propTypes = {
  setIsOpenModal: PropTypes.func.isRequired,
};

export default ModalDeleteCode;
