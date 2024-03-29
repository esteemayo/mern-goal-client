import { FaUsersCog } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import FormInput from 'components/FormInput';
import { forgotPassword, reset } from 'features/auth/authSlice';
import FormButton from 'components/FormButton';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { isError, message } = useSelector((state) => ({ ...state.auth }));

  const [email, setEmail] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword({ email, toast }));
  };

  useEffect(() => {
    isError && toast.error(message);
    dispatch(reset());
  }, [isError, message, dispatch]);

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUsersCog /> Forgot Password
        </h1>
      </section>
      <section className='form'>
        <form onSubmit={handleSubmit}>
          <FormInput
            id='email'
            type='email'
            name='email'
            label='Email Address'
            placeholder='you@user.com'
            onChange={({ target }) => setEmail(target.value)}
            autoFocus
          />
          <FormButton text='Submit' />
        </form>
      </section>
    </>
  );
};

export default ForgotPassword;
