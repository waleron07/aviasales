/* eslint-disable array-callback-return */
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  getFilterTickets,
  getChecked,
  getSort,
} from "../../../redux/selectors";
import "./Tickets.scss";

const WrapperTickets = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin: 20px 0 20px 0;
  padding: 20px;
`;

const HeaderTicket = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PraicTicket = styled.h3`
  margin: 0;
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  color: #2196f3;
`;

const LogoTicket = styled.img``;

const ThereTicket = styled.div`
  display: flex;
  flex-direction: column;
`;

const ThereTicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  color: #a0b0b9;
  line-height: 18px;
`;

const ThereTicketValue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BackTicket = styled.div`
  display: flex;
  flex-direction: column;
`;

const BackTicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  color: #a0b0b9;
  line-height: 18px;
  margin-top: 10px;
`;

const BackTicketValue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const mapStateToProps = (state) => {
  const props = {
    tickets: getFilterTickets(state),
    tick: getFilterTickets(state),
    checked: getChecked(state),
    sort: getSort(state),
  };
  return props;
};

const Tickets = (props) => {
  const formatsTransfer = (data) => {
    if (data.length === 0) {
      return "Без пересадок";
    }

    if (data.length === 1) {
      return "1 пересадка";
    }

    return data.length + " пересадки";
  };

  const { tickets } = props;
  return tickets.map((ticket, i) => {
    if (i >= 5) {
      return;
    }
    const { price, id, img, back, there } = ticket;
    const newPrice = price.toLocaleString("ru");
    return (
      <WrapperTickets key={id}>
        <HeaderTicket>
          <PraicTicket>{newPrice} P</PraicTicket>
          <LogoTicket src={img}></LogoTicket>
        </HeaderTicket>
        <ThereTicket>
          <ThereTicketHeader>
            <span className="thereTicketHeader__way way__left">
              {there.origin}-{there.destination}
            </span>
            <span className="thereTicketHeader__time time__center">В пути</span>
            <span className="thereTicketHeader__transfer transfer__right">
              {formatsTransfer(there.stops)}
            </span>
          </ThereTicketHeader>
          <ThereTicketValue>
            <span className="thereTicketValue__text way__left">
              {there.arrival}-{there.departure}
            </span>
            <span className="thereTicketValue__text time__center">
              {there.tripTime}
            </span>
            <span className="thereTicketValue__text transfer__right">
              {there.stops.map((city) => city).join(" ")}
            </span>
          </ThereTicketValue>
        </ThereTicket>
        <BackTicket>
          <BackTicketHeader>
            <span className="backTicketHeader__way way__left">
              {back.origin}-{back.destination}
            </span>
            <span className="backTicketHeader__time time__center">В пути</span>
            <span className="backTicketHeader__transfer transfer__right">
              {formatsTransfer(back.stops)}
            </span>
          </BackTicketHeader>
          <BackTicketValue>
            <span className="backTicketValue__text way__left">
              {back.arrival}-{back.departure}
            </span>
            <span className="backTicketValue__text time__center">
              {back.tripTime}
            </span>
            <span className="backTicketValue__text transfer__right">
              {back.stops.map((city) => city).join(" ")}
            </span>
          </BackTicketValue>
        </BackTicket>
      </WrapperTickets>
    );
  });
};

Tickets.propTypes = {
  tickets: PropTypes.array,
};

export default connect(mapStateToProps)(Tickets);
