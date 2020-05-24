import React from "react";
import styled from "styled-components";

const WrapperDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin: 20px;
  height: 50px;
`;

const HeaderTickets = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  color: #2196f3;
`;

const NoTickets = () => {
  return (
    <WrapperDiv>
      <HeaderTickets>Билетов не найдено</HeaderTickets>
    </WrapperDiv>
  );
};

export default NoTickets;
