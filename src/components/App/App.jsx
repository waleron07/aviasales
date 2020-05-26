import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";
import "./App.scss";
import styled from "styled-components";
import Header from "../Header";
import Sitebar from "../Sitebar";
import SectionTicket from "../SectionTicket";
import redusers from "../../redux/redusers";

const store = createStore(redusers, compose(applyMiddleware(thunk)));

const Main = styled.main`
  display: flex;
  justify-content: center;
`;

const AsideRight = styled.aside`
  min-width: 500px;
`;

const AsideLeft = styled.aside`
  margin-right: 20px;
`;

const App = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <Header />
        <Main>
          <AsideLeft>
            <Sitebar />
          </AsideLeft>
          <AsideRight>
            <SectionTicket />
          </AsideRight>
        </Main>
      </div>
    </Provider>
  );
};

export default App;
