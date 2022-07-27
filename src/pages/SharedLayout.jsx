import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from 'components/Navbar';
import 'react-toastify/dist/ReactToastify.css';

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default SharedLayout;
