import { useEffect } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useSelector, useDispatch } from "react-redux";
import { getMe } from "../features/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return <DefaultLayout></DefaultLayout>;
};

export default Dashboard;
