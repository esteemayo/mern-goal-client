import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import FormInput from './FormInput';
import FormButton from './FormButton';
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
        <FormInput
          id='text'
          name='text'
          type='text'
          label='Goal'
          onChange={(e) => setText(e.target.value)}
        />
        <FormButton text='Add Goal' />
      </form>
    </section>
  );
};

export default GoalForm;
