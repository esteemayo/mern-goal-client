import { BiSun } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegMoon } from 'react-icons/fa';

import { toggle } from 'features/darkMode/darkModeSlice';

const DarkMode = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => ({ ...state.darkMode }));

  return (
    <div className='container-darkmode'>
      <div className='wrapper' onClick={() => dispatch(toggle())}>dark</div>
    </div>
  );
};

export default DarkMode;
