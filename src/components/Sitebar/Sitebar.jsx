import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import { uniqueId } from "lodash";
import * as actions from "../../redux/actions";
import img from "./shnape/Shape.svg";
import { getChecked, getTickets } from "../../redux/selectors";

const actionCreators = {
  addChecked: actions.addChecked,
  removeTickets: actions.removeTickets,
  getId: actions.getId,
};

const mapStateToProps = (state) => {
  const props = {
    checked: getChecked(state),
    tickets: getTickets(state),
  };
  return props;
};

const mapping = {
  all: "Все",
  zero: "Без пересадок",
  one: "1 пересадка",
  two: "2 пересадки",
  three: "3 пересадки",
};

const Sitebar = (props) => {
  const { checked, addChecked, getId } = props;
  useEffect(() => {
    getId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, checked);

  const labelsRender = (ob) => {
    return Object.keys(ob).map((key) => {
      return (
        <Label>
          <Input
            type="checkbox"
            id={uniqueId()}
            checked={ob[key]}
            name={key}
            onChange={checkboxHandler(key)}
          ></Input>
          <Checkbox></Checkbox>
          <Span>{mapping[key]}</Span>
        </Label>
      );
    });
  };

  const checkboxHandler = (name) => (e) => {
    e.stopPropagation();
    addChecked({ name });
  };

  return (
    <WrapperForm>
      <Title>Количество пересадок</Title>
      {labelsRender(checked)}
    </WrapperForm>
  );
};

Sitebar.propTypes = {
  checked: PropTypes.object.isRequired,
  addChecked: PropTypes.func.isRequired,
  addSearchId: PropTypes.func.isRequired,
};

const WrapperForm = styled.div`
  background: #fff;
  padding-top: 8px;
  padding-bottom: 10px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  width: 230px;
  display: flex;
  flex-direction: column;
  @media (max-width: 900px) {
    padding: 20px;
  }
`;

const Title = styled.h3`
  text-transform: uppercase;
  margin-left: 20px;
  font-size: 12px;
  @media (max-width: 900px) {
    margin: 0 0 10px 0;
  }
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
    border:
        :checked {
            border: 1px solid #2196f3;
            background: no-repeat url('${img}') center;
        }
`;

const Span = styled.span`
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
`;

export default connect(mapStateToProps, actionCreators)(Sitebar);
