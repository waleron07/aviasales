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

const App = () => {
  return (
    <Provider store={store}>
      <div className="container">
        <Header />
        <Main>
          <FiltersBlock>
            <Sitebar />
          </FiltersBlock>
          <TicketsBlock>
            <SectionTicket />
          </TicketsBlock>
        </Main>
      </div>
    </Provider>
  );
};

const Main = styled.main`
  display: flex;
  justify-content: center;
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
  }
`;

const TicketsBlock = styled.aside`
  min-width: 500px;
  @media (max-width: 900px) {
    align-self: center;
    margin: 10px;
    min-width: 0;
  }
`;

const FiltersBlock = styled.aside`
  margin-right: 20px;
  @media (max-width: 900px) {
    align-self: center;
    margin: 10px;
  }
`;

export default App;
