import { createSelector } from "reselect";

export const getChecked = (state) => state.checked;
export const getSort = (state) => state.sort;
export const getTickets = (state) => state.tickets;

export const getFilterTickets = createSelector(
  [getTickets, getChecked],
  (tickets, checked) =>
    checked.all ? tickets : filterTickets(tickets, checked)
);

const filterTickets = (tickets, checked) => {
  var newTickets = [];
  for (var key in checked) {
    if (checked[key]) {
      // eslint-disable-next-line no-loop-func
      const filterTicket = tickets.filter((ticket) => ticket.transfer === key);
      newTickets = newTickets.concat(filterTicket);
    }
  }
  return newTickets;
};

export const getSortTickets = createSelector(
  [getFilterTickets, getSort],
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
