import React from "react";

import "./Options.css";

const Options = props => {
  const options = [
    {
      name: "flights",
      handler: props.actionProvider.handleFlightsChoice,
      id: 1
    },
    { name: "baggage", handler: () => {}, id: 2 },
    { name: "parking", handler: () => {}, id: 3 },
    { name: "taxfree", handler: () => {}, id: 4 }
  ];
  return (
    <div className="options">
      <h1 className="options-header">Options</h1>
      <div className="options-container">
        {options.map(option => {
          return (
            <div
              className="option-item"
              onClick={option.handler}
              key={option.id}
            >
              {option.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Options;
