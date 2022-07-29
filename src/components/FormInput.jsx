import PropTypes from 'prop-types';

const FormInput = ({ name, type, label, ...rest }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <input {...rest} type={type} name={name} className='form-control' />
    </div>
  );
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default FormInput;
