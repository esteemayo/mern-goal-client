import PropTypes from 'prop-types';

const FormButton = ({ type, text, ...rest }) => {
  return (
    <div className='form-group'>
      <button {...rest} type={type} className='btn btn-block'>
        {text}
      </button>
    </div>
  );
};

FormButton.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default FormButton;
