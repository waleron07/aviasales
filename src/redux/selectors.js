import { createSelector } from "reselect";

export const getChecked = (state) => state.checked;
export const getSort = (state) => state.sort;
export const getTickets = (state) => state.tickets;

export const getSortTickets = createSelector(
  [getTickets, getSort],
  (tickets, sort) =>
    [...tickets].sort(function (a, b) {
      if (a[sort] > b[sort]) {
        return 1;
      }
      if (a[sort] < b[sort]) {
        return -1;
      }
      return 0;
    })
);

export const getFilterTickets = createSelector(
  [getSortTickets, getChecked],
  (tickets, checked) =>
    checked.all ? tickets : filterTickets(tickets, checked)
);

const filterTickets = (tickets, checked) => {
  var newTickets = [];
  for (var key in checked) {
    if (checked[key] === true) {
      // eslint-disable-next-line no-loop-func
      newTickets = tickets.filter((ticket) => ticket.transfer === key);
    }
  }
  return newTickets;
};
