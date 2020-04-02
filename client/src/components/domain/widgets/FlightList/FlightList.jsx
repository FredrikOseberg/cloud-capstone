import React from "react";

import { ReactComponent as DepartureFlight } from "../../../../assets/icons/plane-departure.svg";

import "./FlightList.css";

const FlightList = ({ flights }) => {
  const flightSlice = flights.slice(0, 5);
  console.log(flightSlice);

  return (
    <div className="flight-list-container">
      <div className="flight-header-container">
        <div className="flight-id-header">FligthId</div>
        <div className="flight-airport-header">To</div>
        <div className="flight-time-header">At</div>
        <div className="flight-time-gate">Gate</div>
      </div>
      <ul className="flight-list">
        {flightSlice.map(flight => {
          return (
            <li className="flight-list-item" key={flight.FlightId}>
              <div className="flight-list-icon-container">
                <DepartureFlight className="flightlist-icon" />
              </div>

              <div className="flight-id">{flight.FlightId}</div>
              <div className="flight-airport">{flight.AirportToOrFrom}</div>
              <div className="flight-time">{flight.ScheduledTime}</div>
              <div className="flight-gate">{flight.Gate}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FlightList;
