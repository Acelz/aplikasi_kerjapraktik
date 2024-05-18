import DefaultLayout from "../../../layout/DefaultLayout";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../../features/authSlice";
import * as XLSX from "xlsx"; // Import the XLSX library

const VehiclePage = () => {
  const [vehicles, setVehicles] = useState([]);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const fetchVehicles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/vehicles");
      setVehicles(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(vehicles);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Vehicles");
    XLSX.writeFile(wb, "vehicles.xlsx");
  };

  return (
    <DefaultLayout>
      <div className="flex flex-wrap mb-5 -mx-3">
        <div className="w-full max-w-full px-3 mx-auto mb-6">
          <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div className="relative flex flex-col min-w-0 break-words border border-solid bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  Data Kendaraan
                </h3>
                {user && user.role === "user" ? (
                  <Link to="/vehicles/add" className="btn-primary">
                    Tambah Kendaraan
                  </Link>
                ) : (
                  <button onClick={exportToExcel} className="btn-primary">
                    Ekspor Data Kendaraan
                  </button>
                )}
              </div>
              <div className="flex-auto block py-8 pt-6 px-9">
                <div className="overflow-x-auto">
                  <table className="w-full my-0 align-middle text-dark border-neutral-200">
                    <thead className="align-bottom">
                      <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                        <th className="pb-3 text-center ">No</th>
                        <th className="pb-3 text-center">Nomor Polisi</th>
                        <th className="pb-3 text-center">Nama Pemilik</th>
                        <th className="pb-3 text-center">Alamat</th>
                        <th className="pb-3 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicles?.map((vehicle, index) => {
                        return (
                          <tr
                            key={vehicle.uuid}
                            className="border-b border-dashed last:border-b-0"
                          >
                            <td className="p-3 text-center">{index + 1}</td>
                            <td className="p-3 text-center">
                              {vehicle.licensePlate}
                            </td>
                            <td className="p-3 text-center">
                              {vehicle.ownerName}
                            </td>
                            <td className="p-3 text-center">
                              {vehicle.ownerAddress}
                            </td>
                            <td className="flex justify-center p-3">
                              <p className="cursor-pointer w-max hover:border-b-2 hover:border-gray-300">
                                Detail
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default VehiclePage;
