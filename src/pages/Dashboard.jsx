import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Spinner from 'components/Spinner';
import GoalForm from 'components/GoalForm';
import GoalItem from 'components/GoalItem';
import { fetchGoals, reset } from 'features/goals/goalSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { goals, isError, isLoading, message } = useSelector((state) => ({
    ...state.goals,
  }));

  useEffect(() => {
    isError && toast.error(message);
    dispatch(fetchGoals());
    return () => dispatch(reset());
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user?.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((item) => {
              return <GoalItem key={item._id} {...item} />;
            })}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
};

export default Dashboard;
