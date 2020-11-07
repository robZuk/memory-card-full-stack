import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paragraph from '../atoms/Paragraph.js';
import styled from 'styled-components';

const StyledParagraph = styled(Paragraph)`
  background-color: ${({ activecolor, theme }) => theme[activecolor]};
  margin: 2% 0;
  padding: 1%;
  @media ${({ theme }) => theme.breakpoints.tablet} {
    font-size: ${({ theme }) => theme.fontSize.s};
    margin: 1% 0;
  }
`;

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => {
    const { msg, alertType, id } = alert;
    return (
      <StyledParagraph key={id} activecolor={alertType}>
        {msg}
      </StyledParagraph>
    );
  });

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert, //state.alert fro reducer
});

export default connect(mapStateToProps)(Alert);
