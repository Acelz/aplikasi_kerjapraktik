import Logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../features/authSlice";
import { useState } from "react";
import { useEffect } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
        <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-md shadow-md sm:px-6 md:px-8 lg:px-10">
          <div className="flex items-center mb-5 place-content-center">
            <img src={Logo} alt="logo" className="w-40 h-40" />
          </div>
          {isError && (
            <p className="p-2 mb-4 font-medium text-center text-red-700 bg-red-300 rounded-md">
              {message}
            </p>
          )}
          <div className="w-full bg-white divide-y divide-gray-200 rounded-lg">
            <form onSubmit={Auth} className="px-5 py-7">
              <label className="block pb-1 text-sm font-semibold text-gray-600">
                Nama Pengguna
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg"
              />
              <label className="block pb-1 text-sm font-semibold text-gray-600">
                Kata Sandi
              </label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg"
              />
              <button
                type="submit"
                className="transition duration-200 bg-red-500 hover:bg-red-600 focus:bg-red-700 focus:shadow-sm focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">
                  {isLoading ? "Memuat..." : "Masuk"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
