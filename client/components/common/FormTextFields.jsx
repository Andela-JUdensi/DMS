import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import styles from '../../assets/styles';

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
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

FormTexFields.defaultProps = {
  type: 'text',
  value: ''
};

export default FormTexFields;
