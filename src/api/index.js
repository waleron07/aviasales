import axios from "axios";
import { format, addMinutes, parseISO } from "date-fns";
import { uniqueId } from "lodash";

export const baseUrl = "https://front-test.beta.aviasales.ru/";

export const getSearchId = async () => {
  const url = await new URL("search", baseUrl);
  const response = await axios.post(url);
  return response.data;
};

const normalaizTicket = (data) => {
  const arrivalTime = parseISO(data.date);
  const departureTime = addMinutes(arrivalTime, data.duration);
  const departure = format(arrivalTime, "k:mm");
  const arrival = format(departureTime, "k:mm");
  const tripTime = `${Math.round(data.duration / 60)}ч ${data.duration % 60}м`;

  return {
    arrivalTime,
    departureTime,
    departure,
    arrival,
    tripTime,
  };
};

const normalaizTransfer = (data) => {
  if (data === 0) {
    return "zero";
  }
  if (data === 1) {
    return "one";
  }
  if (data === 2) {
    return "two";
  }
  if (data === 3) {
    return "three";
  }
  return "all";
};

export const getTickets = async (searchId) => {
  const url = new URL(`tickets?searchId=${searchId}`, baseUrl);
  const response = await axios.post(url);
  const { stop, tickets } = await response.data;

  const newTickets = tickets.map((ticket) => {
    const {
      price,
      carrier,
      segments: [there, back],
    } = ticket;

    const newDataThere = normalaizTicket(there);
    const newDataBack = normalaizTicket(back);
    const duration = there.duration + back.duration;
    return {
      id: uniqueId(),
      price,
      transfer: normalaizTransfer(there.stops.length + back.stops.length),
      img: `//pics.avs.io/99/36/${carrier}.png`,
      duration,
      there: {
        departure: newDataThere.departure,
        arrival: newDataThere.arrival,
        tripTime: newDataThere.tripTime,
        destination: there.destination,
        stops: there.stops,
        origin: there.origin,
      },

      back: {
        departure: newDataBack.departure,
        arrival: newDataBack.arrival,
        tripTime: newDataBack.tripTime,
        destination: back.destination,
        stops: back.stops,
        origin: back.origin,
      },
    };
  });
  return { tickets: newTickets, stop };
};
