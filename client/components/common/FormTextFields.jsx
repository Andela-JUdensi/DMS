import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const styles = {
  formStyle: {
    margin: 15,
  },
  button: {
    margin: 1,
    width: '',
    display: 'inline-block',
    position: 'relative',
  },
  formElement: {
    margin: 5,
  },
};

const FormTexFields = ({ field, value, label, type, onChange }) => (
  <TextField
    style={styles.formElement}
    hintText={label}
    floatingLabelText={label}
    type={type}
    name={field}
    value={value}
    onChange={onChange}
  />
);

FormTexFields.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

FormTexFields.defaultProps = {
  type: 'text',
};

export default FormTexFields;
