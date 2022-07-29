import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from 'components/Spinner';
import { loginUser, reset } from 'features/auth/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => ({ ...state.auth })
  );

  const emailRef = useRef();
  const [formData, setFormData] = useState(null);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      ...formData,
    };

    dispatch(loginUser({ userData, toast }));
  };

  useEffect(() => {
    emailRef.current.focus();
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
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>

      <section className='form'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              id='email'
              type='email'
              name='email'
              placeholder='Enter your email'
              className='form-control'
              ref={emailRef}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <input
              id='password'
              type='password'
              name='password'
              placeholder='Enter password'
              className='form-control'
              onChange={handleChange}
              minLength={8}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
