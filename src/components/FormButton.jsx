import PropTypes from 'prop-types';

const FormButton = ({ text, ...rest }) => {
  return (
    <div className='form-group'>
      <button {...rest} type='submit' className='btn btn-block'>
        {text}
      </button>
    </div>
  );
};

FormButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default FormButton;
