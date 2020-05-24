import { createAction } from "redux-actions";
import { getTickets } from "../helpers/helpers";

export const addTicketsSuccess = createAction("DOWLOAD_TICKETS_SUCCESS");
export const addTicketsRequest = createAction("DOWLOAD_TICKETS_REQUEST");
export const addTicketsFailure = createAction("DOWLOAD_TICKETS_FAILURE");

export const addChecked = createAction("Checked_ADD");
export const changedSort = createAction("CHANGE_ADD");

export const filterTickets = createAction("TICKETS_FILTER");
export const removeTickets = createAction("TICKETS_REMOVE");

export const addTicket = () => async (dispatch) => {
  dispatch(addTicketsRequest());
  try {
    const response = await getTickets();
    const { tickets, stop } = response;

    dispatch(
      addTicketsSuccess({
        newTickets: tickets,
        stop: stop,
      })
    );
  } catch (e) {
    dispatch(
      addTicketsFailure({
        stop: false,
      })
    );
    console.log("error");
    throw e;
  }
};
