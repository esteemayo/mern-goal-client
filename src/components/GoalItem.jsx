import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { FaTimesCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { removeGoal } from 'features/goals/goalSlice';

const GoalItem = ({ _id: id, text, createdAt }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this goal?'))
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

GoalItem.propTypes = {
  _id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default GoalItem;
