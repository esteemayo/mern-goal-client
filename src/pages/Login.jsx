import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from 'components/Spinner';
import FormInput from 'components/FormInput';
import FormButton from 'components/FormButton';
import { loginUser, reset } from 'features/auth/authSlice';

const Login = ({ loginInputs }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => ({ ...state.auth })
  );

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
          {loginInputs.map((input) => {
            const { id, type, name, placeholder } = input;
            return (
              <FormInput
                id={id}
                key={id}
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                autoFocus={name === 'email' ? true : false}
              />
            );
          })}
          <FormButton text='Login' />
        </form>
        <p>
          <Link to='/forgot'>Forgot your password?</Link>
        </p>
      </section>
    </>
  );
};

Login.propTypes = {
  loginInputs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    })
  ),
};

export default Login;
