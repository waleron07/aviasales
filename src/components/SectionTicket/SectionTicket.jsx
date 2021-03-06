import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as actions from "../../redux/actions";
import { getSort, getSortTickets } from "../../redux/selectors";
import Tickets from "../Tickets";
import NoTickets from "../NoTickets";

const actionCreators = {
  changedSort: actions.changedSort,
};

const mapStateToProps = (state) => {
  const props = {
    sort: getSort(state),
    tickets: getSortTickets(state),
  };
  return props;
};

const SectionTicket = (props) => {
  const { sort, changedSort, tickets } = props;
  const handleClickBtn = (name) => {
    changedSort(name);
    return;
  };

  return (
    <WrapperDiv>
      <BtnContainer>
        <Btn
          name="price"
          active={sort === "price" ? "active" : null}
          onClick={() => handleClickBtn("price")}
        >
          самый дешевый
        </Btn>
        <Btn
          name="speed"
          active={sort === "duration" ? "active" : null}
          onClick={() => handleClickBtn("duration")}
        >
          самый быстрый
        </Btn>
      </BtnContainer>
      <div className="wrapperTickets">
        {tickets.length === 0 ? <NoTickets /> : <Tickets></Tickets>}
      </div>
    </WrapperDiv>
  );
};

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const BtnContainer = styled.div`
  display: flex;
`;

const Btn = styled.button`
  display: flex;
  justify-content: center;
  text-decoration: none;
  padding: 15px;
  width: 50%;

  border: 1px solid #dfe5ec;
  font-family: Open Sans;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  cursor: pointer;
  :focus {
    outline: none;
  }
  ${(props) =>
    props.active === "active" ? `color: #fff;` : `color: #4a4a4a;`};
  ${(props) =>
    props.active === "active" ? `background: #2196F3;` : `background: white;`};
`;

SectionTicket.propTypes = {
  sort: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, actionCreators)(SectionTicket);
