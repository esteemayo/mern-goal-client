import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from 'components/Navbar';
import DarkMode from 'components/DarkMode';
import 'react-toastify/dist/ReactToastify.css';

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <ToastContainer style={{ fontSize: '14px' }} />
      <DarkMode />
      <Outlet />
    </>
  );
};

export default SharedLayout;
