import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaTimesCircle } from 'react-icons/fa';

import { removeGoal } from 'features/goals/goalSlice';

const GoalItem = ({ _id: id, text, createdAt }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(removeGoal({ id, toast }));
  };

  return (
    <div className='goal'>
      <div>{new Date(createdAt).toLocaleString('en-us')}</div>
      <h2>{text}</h2>
      <button className='close' onClick={() => handleDelete(id)}>
        <FaTimesCircle />
      </button>
    </div>
  );
};

export default GoalItem;
