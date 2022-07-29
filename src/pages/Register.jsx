import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import app from '../firebase';
import Spinner from 'components/Spinner';
import { registerUser, reset } from 'features/auth/authSlice';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => ({ ...state.auth })
  );

  const nameRef = useRef();
  const [per, setPer] = useState(null);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState(initialState);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { password, confirmPassword } = formData;

  useEffect(() => {
    const uploadFile = () => {
      const fileName = `${new Date().getTime()}-${file.name}`;

      const storage = getStorage(app);
      const storageRef = ref(storage, `users/${fileName}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPer(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData((prev) => ({ ...prev, avatar: downloadURL }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    const userData = {
      ...formData,
    };

    dispatch(registerUser({ userData, toast }));
  };

  useEffect(() => {
    nameRef.current.focus();
    isError && toast.error(message);
    isSuccess && user && navigate('/');
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='file'
              name='file'
              id='file'
              className='form-control'
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Enter your name'
              className='form-control'
              ref={nameRef}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Enter your email'
              className='form-control'
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Enter password'
              className='form-control'
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='confirmPassword'
              id='confirmPassword'
              placeholder='Confirm password'
              className='form-control'
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <button
              type='submit'
              className='btn btn-block'
              disabled={per !== null && per < 100}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
