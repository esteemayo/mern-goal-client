import { toast } from 'react-toastify';
import { FaUserCog } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import FormInput from 'components/FormInput';
import FormButton from 'components/FormButton';
import { reset, resetPassword } from 'features/auth/authSlice';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, isSuccess, message } = useSelector((state) => ({
    ...state.auth,
  }));

  const [formData, setFormData] = useState(null);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = {
      ...formData,
    };

    dispatch(resetPassword({ token, credentials, toast }));
  };

  useEffect(() => {
    isError && toast.error(message);
    isSuccess && navigate('/login');
    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUserCog /> Reset Password
        </h1>
        <p>Reset your password and start setting goals</p>
      </section>
      <section className='form'>
        <form onSubmit={handleSubmit}>
          <FormInput
            id='password'
            type='password'
            name='password'
            label='Password'
            placeholder='********'
            onChange={handleChange}
            autoFocus
          />
          <FormInput
            id='confirmPassword'
            type='password'
            name='confirmPassword'
            label='Confirm Password'
            placeholder='********'
            onChange={handleChange}
          />
          <FormButton text='Submit' />
        </form>
      </section>
    </>
  );
};

export default ResetPassword;
