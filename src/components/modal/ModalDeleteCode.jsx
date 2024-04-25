import axios from "axios";
import PropTypes from "prop-types";
import Spinner from "../spinner/Spinner";
import { useState } from "react";

const ModalDeleteCode = ({ setIsOpenModal, codeName, id, fetchCode }) => {
  const [loading, setLoading] = useState(false);
  const deleteCode = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:5000/${codeName}/${id}`
      );
      setIsOpenModal(false);
      fetchCode();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-index-top">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="absolute flex flex-col">
          <div className="p-10 bg-white rounded-xl">
            <h4 className="mb-4 text-xl font-semibold text-center">
              Hapus Kode
            </h4>
            <p className="text-lg font-medium text-center">
              Anda yakin ingin menghapus kode ini?
            </p>
            <div className="flex items-center mt-4 place-items-center">
              <button
                disabled={loading}
                className="w-full btn-primary"
                onClick={deleteCode}
              >
                Ya
              </button>
              <button
                onClick={() => setIsOpenModal(false)}
                className="w-full btn-secondary "
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
  codeName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  fetchCode: PropTypes.func.isRequired,
};

export default ModalDeleteCode;
