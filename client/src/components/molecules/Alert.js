import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paragraph from '../atoms/Paragraph/Paragraph';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => {
    const { msg, alertType, id } = alert;
    return (
      <Paragraph key={id} activeColor={alertType}>
        {msg}
      </Paragraph>
    );
  });

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert, //state.alert fro reducer
});

export default connect(mapStateToProps)(Alert);
