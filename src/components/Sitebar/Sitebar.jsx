import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import * as actions from "../../redux/actions";
import img from "./shnape/Shape.svg";
import { getChecked, getTickets } from "../../redux/selectors";

const actionCreators = {
  addChecked: actions.addChecked,
  addTicket: actions.addTicket,
  removeTickets: actions.removeTickets,
};

const WrapperForm = styled.div`
  background: #fff;
  padding-top: 8px;
  padding-bottom: 20px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 230px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  text-transform: uppercase;
  margin-left: 20px;
  font-size: 12px;
`;

const Label = styled.label`
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 0;
  :hover {
    background: #f1fcff;
    cursor: pointer;
  }
`;

const Input = styled.input`
    position: absolute;
    appearance: none;
    &:checked + span {
        border: 1px solid #2196f3;
        background: url('${img}') no-repeat center center;
      }
`;

const Checkbox = styled.span`
    display: block;
    position: relative;
    width: 20px;
    height: 20px;
    border: 1px solid #9abbce;
    border-radius: 2px;
    margin-left: 20px;
    margin-right: 10px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    align-self: center;
    background-size: 12 auto;
        :checked {
            border: 1px solid #2196f3;
            background: no-repeat url('${img}') center;
        }
`;

const Span = styled.span`
  font-weight: normal;
  font-size: 13px;
`;

const mapStateToProps = (state) => {
  const props = {
    checked: getChecked(state),
    tickets: getTickets(state),
  };
  return props;
};

const Sitebar = (props) => {
  const { checked, addChecked, addTicket, removeTickets } = props;

  const checkboxHandler = (id) => (e) => {
    e.stopPropagation();
    addChecked({ id });
    addTicket();
    if (id === "all" && checked[id]) {
      removeTickets();
    }
    return;
  };

  useEffect(() => {
    addTicket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WrapperForm>
      <Title>Количество пересадок</Title>
      <Label>
        <Input
          type="checkbox"
          checked={checked.all}
          id="all"
          onChange={checkboxHandler("all")}
        ></Input>
        <Checkbox></Checkbox>
        <Span>Все</Span>
      </Label>
      <Label>
        <Input
          type="checkbox"
          checked={checked.zero}
          id="zero"
          onChange={checkboxHandler("zero")}
        ></Input>
        <Checkbox></Checkbox>
        <Span>Без пересадок</Span>
      </Label>
      <Label>
        <Input
          type="checkbox"
          checked={checked.one}
          id="one"
          onChange={checkboxHandler("one")}
        ></Input>
        <Checkbox></Checkbox>
        <Span>1 пересадка</Span>
      </Label>
      <Label>
        <Input
          type="checkbox"
          checked={checked.two}
          id="two"
          onChange={checkboxHandler("two")}
        ></Input>
        <Checkbox></Checkbox>
        <Span>2 пересадки</Span>
      </Label>
      <Label>
        <Input
          type="checkbox"
          checked={checked.three}
          id="three"
          onChange={checkboxHandler("three")}
        ></Input>
        <Checkbox></Checkbox>
        <Span>3 пересадки</Span>
      </Label>
    </WrapperForm>
  );
};

Sitebar.propTypes = {
  checked: PropTypes.object.isRequired,
  addChecked: PropTypes.func.isRequired,
  addTicket: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, actionCreators)(Sitebar);
