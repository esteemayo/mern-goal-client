import { useDispatch } from 'react-redux';

const DarkMode = () => {
  const dispatch = useDispatch();

  return (
    <div className='container-darkmode'>
      <div className='wrapper'>dark</div>
    </div>
  );
};

export default DarkMode;
