import React from "react";
import img from "./logo/Logo.png";
import styled from "styled-components";

const WrapperHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-top: 50px;
`;

const LogoDiv = styled.div`
  width: 70px;
  height: 70px;
  background-image: url('${img}');
  background-position: center;
  margin: 15px auto;
`;

const Header = () => {
  return (
    <WrapperHeader>
      <LogoDiv />
    </WrapperHeader>
  );
};

export default Header;
