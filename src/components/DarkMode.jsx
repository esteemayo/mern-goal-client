import { useDispatch } from 'react-redux';
import { toggle } from 'features/darkMode/darkModeSlice';

const DarkMode = () => {
  const dispatch = useDispatch();

  return (
    <div className='container-darkmode'>
      <div className='wrapper' onClick={() => dispatch(toggle())}>dark</div>
    </div>
  );
};

export default DarkMode;
