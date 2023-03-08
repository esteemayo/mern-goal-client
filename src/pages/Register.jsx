import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import Spinner from 'components/Spinner';
import app from '../firebase';
import FormButton from 'components/FormButton';
import { registerUser, reset } from 'features/auth/authSlice';
import FormInput from 'components/FormInput';

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = ({ inputs }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => ({ ...state.auth })
  );

  const [per, setPer] = useState(null);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState(initialState);

  const handleChange = (input) => {
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
    isError && toast.error(message);
    isSuccess && user && navigate('/');
    return () => dispatch(reset());
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
          {inputs.map((input) => {
            const { id, type, name, placeholder } = input;
            return (
              <FormInput
                id={id}
                key={id}
                type={type}
                name={name}
                autoFocus={name === 'name' ? true : false}
                placeholder={type !== 'file' ? placeholder : null}
                onChange={({ target }) =>
                  type === 'file'
                    ? setFile(target.files[0])
                    : handleChange(target)
                }
              />
            );
          })}
          <FormButton text='Submit' disabled={per !== null && per < 100} />
        </form>
      </section>
    </>
  );
};

Register.propTypes = {
  registerInputs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    })
  ),
};

export default Register;
