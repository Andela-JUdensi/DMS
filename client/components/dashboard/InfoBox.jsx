import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { white } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import styles from '../../assets/styles';



const InfoBox = (props) => {
  const { color, title, value, Icon } = props;
  const iconSpan = {
    float: 'left',
    height: 90,
    width: 90,
    textAlign: 'center',
    backgroundColor: color
  };
  return (
    <MuiThemeProvider>
      <Paper>
        <span style={iconSpan} >
          <Icon
            color={white}
            style={styles.icon}
          />
        </span>

        <div style={styles.content}>
          <span style={styles.text}>{title}</span>
          <span style={styles.number}>{value}</span>
        </div>
      </Paper>
    </MuiThemeProvider>
  );
};


InfoBox.propTypes = {
  Icon: PropTypes.any, // eslint-disable-line
  title: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  color: PropTypes.string.isRequired
};

export default InfoBox;

