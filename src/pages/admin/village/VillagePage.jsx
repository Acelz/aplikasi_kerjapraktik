import DefaultLayout from "../../../layout/DefaultLayout";
import { useState, useEffect } from "react";
import ModalAddCode from "../../../components/modal/ModalAddCode.jsx";
import ModalDeleteCode from "../../../components/modal/ModalDeleteCode.jsx";
import ModalUpdateCode from "../../../components/modal/ModalUpdateCode.jsx";
import axios from "axios";
import Pagination from "../../../components/pagination/Pagination.jsx";

const VillagePage = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [page, setPage] = useState(0);
  const limit = 10;
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [villages, setVillages] = useState([]);
  const [id, setId] = useState("");

  const fetchCode = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/villages?search_query=${keyword}&page=${page}&limit=${limit}`
      );
      setVillages(response.data.result);
      setPage(response.data.page);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCode();
  }, []);

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

  return (
    <DefaultLayout>
      {openModalAdd && (
        <ModalAddCode
          setIsOpenModal={setOpenModalAdd}
          codeName="village"
          fetchCode={fetchCode}
        />
      )}
      {openModalDelete && (
        <ModalDeleteCode
          setIsOpenModal={setOpenModalDelete}
          id={id}
          fetchCode={fetchCode}
          codeName="village"
        />
      )}
      {openModalUpdate && (
        <ModalUpdateCode
          setIsOpenModal={setOpenModalUpdate}
          codeName="village"
          id={id}
          fetchCode={fetchCode}
        />
      )}
      <div className="flex flex-wrap mb-5 -mx-3">
        <div className="w-full max-w-full px-3 mx-auto mb-6">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-solid bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  Data Desa/Kelurahan
                </h3>

                <button
                  onClick={() => setOpenModalAdd(true)}
                  className="btn-primary"
                >
                  Tambah Kode Desa/Kelurahan
                </button>
              </div>
              <div className="flex-auto block py-8 pt-6 px-9">
                <div className="overflow-x-auto">
                  <table className="w-full my-0 align-middle text-dark border-neutral-200">
                    <thead className="align-bottom">
                      <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                        <th className="pb-3 text-center ">No</th>
                        <th className="pb-3 text-center">Desa/Kelurahan</th>
                        <th className="pb-3 text-center">Kode</th>
                        <th className="pb-3 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {villages.map((item, index) => (
                        <tr
                          key={index}
                          className="border-b border-dashed last:border-b-0"
                        >
                          <td className="p-3 text-center">{index + 1}</td>
                          <td className="p-3 text-center">{item.name}</td>
                          <td className="p-3 text-center">{item.number}</td>
                          <td className="flex items-center justify-center p-3 space-x-4">
                            <button
                              onClick={() => {
                                setOpenModalUpdate(true);
                                setId(item.uuid);
                              }}
                              className="cursor-pointer w-max hover:border-b-2 hover:border-gray-300"
                            >
                              Ubah
                            </button>
                            <p
                              onClick={() => {
                                setId(item.uuid);
                                setOpenModalDelete(true);
                              }}
                              className="cursor-pointer w-max hover:border-b-2 hover:border-gray-300"
                            >
                              Hapus
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <Pagination
                pageCount={Math.min(10, pages)}
                onPageChange={changePage}
                rows={rows}
                page={page}
                pages={pages}
              />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default VillagePage;
