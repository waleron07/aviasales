import { createAction } from "redux-actions";
import { getTickets, getSearchId } from "../helpers/helpers";

export const addTicketsSuccess = createAction("DOWLOAD_TICKETS_SUCCESS");
export const addTicketsRequest = createAction("DOWLOAD_TICKETS_REQUEST");
export const addTicketsFailure = createAction("DOWLOAD_TICKETS_FAILURE");

export const searchIdSuccess = createAction("DOWLOAD_SEARCH_SUCCESS");
export const searchIdRequest = createAction("DOWLOAD_SEARCH_REQUEST");
export const searchIdFailure = createAction("DOWLOAD_SEARCH_FAILURE");

export const addChecked = createAction("CHECKED_ADD");
export const changedSort = createAction("CHANGE_ADD");

export const filterTickets = createAction("TICKETS_FILTER");
export const removeTickets = createAction("TICKETS_REMOVE");

export const addSearchId = () => async (dispatch) => {
  dispatch(searchIdRequest());
  try {
    const { searchId } = await getSearchId();
    dispatch(addTicket(searchId));
  } catch (e) {
    console.log("что-то пошло не так, повторим запрос. Подождите");
    dispatch(addSearchId);
    throw e;
  }
};

export const addTicket = (searchId) => async (dispatch) => {
  dispatch(addTicketsRequest());
  try {
    const response = await getTickets(searchId);
    const { tickets, stop } = response;
    dispatch(
      addTicketsSuccess({
        newTickets: tickets,
        stop: stop,
      })
    );
    stop
      ? console.log("Запрос выполнен успешно")
      : dispatch(addTicket(searchId));
  } catch (e) {
    dispatch(
      addTicketsFailure({
        stop: false,
      })
    );
    dispatch(addTicket(searchId));
    console.log("что-то пошло не так, повторим запрос. Подождите");
    throw e;
  }
};
