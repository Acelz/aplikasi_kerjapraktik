import DefaultLayout from "../../../layout/DefaultLayout";
import { useState, useEffect } from "react";
import axios from "axios";

const DashboardUser = () => {
  const [data, setData] = useState(null);
  const fetch = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dashboard");
      const data = response.data.result;
      console.log(data);
      const dataFiltered = data.filter((item) => item.name === "Kendaraan");
      setData(dataFiltered);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <DefaultLayout>
      <div className="grid grid-cols-4 gap-4">
        {data?.map((item, index) => (
          <div
            key={index}
            className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="flex items-baseline text-gray-900 dark:text-white">
              <span className="text-5xl font-extrabold tracking-tight">
                {item.count}
              </span>
            </div>
            <h5 className="mt-4 text-xl font-medium text-gray-500 dark:text-gray-400">
              {item.name}
            </h5>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default DashboardUser;
