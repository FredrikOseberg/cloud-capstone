import React, { useState } from "react";
import { ConditionallyRender } from "react-util-kit";

import { getFlightsData } from "../../../../data/data";

import "./FlightsSelector.css";

const FlightsSelector = props => {
  const { selectedAirport, setState, actionProvider } = props;

  const getFlights = async type => {
    const flights = await getFlightsData(selectedAirport, type);
    const filteredFlights = flights.filter(item => item.Status === null);

    setState(state => ({
      ...state,
      flights: filteredFlights,
      flightType: type
    }));
    actionProvider.handleFlightTypeChoice(type);
  };

  return (
    <div>
      <h1 className="flight-selector-header">Arrival or departure?</h1>
      <div className="flight-selector-button-container">
        <button
          className="flights-selector-button"
          onClick={() => getFlights("arrival")}
        >
          Arrival
        </button>
        <button
          className="flights-selector-button"
          onClick={() => getFlights("departure")}
        >
          Departure
        </button>
      </div>
    </div>
  );
};

export default FlightsSelector;
