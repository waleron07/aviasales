import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import * as actions from "./actions";

const initChecked = {
  all: true,
  zero: true,
  one: true,
  two: true,
  three: true,
};

const checked = handleActions(
  {
    [actions.addChecked](state, { payload: { id } }) {
      if (id === "all" && !state[id]) {
        return initChecked;
      }

      if (id === "all" && state[id]) {
        return {
          all: false,
          zero: false,
          one: false,
          two: false,
          three: false,
        };
      }

      const value = !state[id];
      return {
        ...state,
        [id]: value,
        all: false,
      };
    },
  },
  initChecked
);

const tickets = handleActions(
  {
    [actions.addTicketsSuccess](state, { payload: { newTickets } }) {
      return [...state, ...newTickets];
    },
    [actions.removeTickets](state) {
      return [];
    },
  },
  []
);

const stop = handleActions(
  {
    [actions.addTicketsSuccess](state, { payload: { stop } }) {
      return stop;
    },
  },
  false
);

const sort = handleActions(
  {
    [actions.changedSort](state, { payload }) {
      return payload;
    },
  },
  "price"
);

export default combineReducers({
  checked,
  sort,
  tickets,
  stop,
});
