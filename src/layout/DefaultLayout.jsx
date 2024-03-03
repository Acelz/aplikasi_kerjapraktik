import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Link } from "react-router-dom";

const DefaultLayout = ({ children }) => {
  const [open, setOpen] = useState(true);

  const Menus = [
    { title: "Dasbor", icon: <MdDashboard />, to: "/dashboard" },
    { title: "Data Kendaraan", icon: <MdDashboard />, to: "/vehicles" },
    {
      title: "Kode Kabupaten/Kota",
      icon: <MdDashboard />,
      to: "/regency-municipalities",
    },
    { title: "Kode Kecamatan", icon: <MdDashboard />, to: "/districts" },
    { title: "Kode Kelurahan/Desa", icon: <MdDashboard />, to: "/villages" },
    { title: "Data Pengguna", icon: <MdDashboard />, to: "/users" },
  ];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-white h-screen p-5 shadow-md  pt-8 relative duration-300`}
      >
        <IoIosArrowDroprightCircle
          className={`absolute cursor-pointer -right-3 top-9 w-8 bg-white h-8 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />

        <div className="flex gap-x-4 items-center">
          <h1
            className={` origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <Link
              to={Menu?.to}
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white font-medium text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <span>{Menu.icon}</span>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </Link>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">{children}</div>
    </div>
  );
};
export default DefaultLayout;
