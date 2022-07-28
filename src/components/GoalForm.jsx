import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { createNewGoal } from 'features/goals/goalSlice';

const GoalForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createNewGoal({ goal: text, toast }));
  };

  return (
    <section className='form'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Goal</label>
          <input
            id='text'
            type='text'
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-block'>
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
