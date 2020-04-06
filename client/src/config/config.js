import React from "react";
import { createChatBotMessage } from "../components/Chat/chatUtils";

import AirportSelector from "../components/domain/widgets/AirportSelector/AirportSelector";
import FlightsSelector from "../components/domain/widgets/FlightsSelector/FlightsSelector";
import FlightList from "../components/domain/widgets/FlightList/FlightList";
import SingleFlight from "../components/domain/widgets/SingleFlight/SingleFlight";
import GeneralOptions from "../components/domain/widgets/GeneralOptions/GeneralOptions";
import ParkingOptions from "../components/domain/widgets/ParkingOptions/ParkingOptions";
import BookParkingLink from "../components/domain/widgets/Link/BookParkingLink";
import ManageParkingLink from "../components/domain/widgets/Link/ManageParkingLink";
import LostBaggageLink from "../components/domain/widgets/Link/LostBaggageLink";

const botName = "Skybot";

const config = {
  botName: botName,
  lang: "en",
  initialMessages: [
    createChatBotMessage(`Hi I'm ${botName}.`, {
      loading: true,
      terminateLoading: true
    }),
    createChatBotMessage(
      "First things first, which airport are you looking for information from?",
      {
        widget: "airportSelector",
        loading: true,
        terminateLoading: true,
        delay: 500
      }
    )
  ],
  state: {
    airports: [],
    selectedAirport: { iata: "OSL", nameCompact: "Oslo" },
    flightType: "",
    selectedFlightId: "",
    selectedFlight: null,
    flights: []
  },
  widgets: [
    {
      widgetName: "airportSelector",
      widgetFunc: props => <AirportSelector {...props} />,
      mapStateToProps: ["messages", "selectedAirport", "airports"],
      props: [],
      updateKey: "selectedAirport"
    },
    {
      widgetName: "options",
      widgetFunc: props => <GeneralOptions {...props} />,
      props: [],
      mapStateToProps: []
    },
    {
      widgetName: "flightSelector",
      widgetFunc: props => <FlightsSelector {...props} />,
      props: [],
      mapStateToProps: ["selectedAirport"]
    },
    {
      widgetName: "flightList",
      widgetFunc: props => <FlightList {...props} />,
      props: [],
      mapStateToProps: ["flights", "flightType"]
    },
    {
      widgetName: "singleFlight",
      widgetFunc: props => <SingleFlight {...props} />,
      props: [],
      mapStateToProps: [
        "selectedFlightId",
        "flights",
        "selectedAirport",
        "selectedFlight"
      ]
    },
    {
      widgetName: "parkingOptions",
      widgetFunc: props => <ParkingOptions {...props} />,
      props: [],
      mapStateToProps: []
    },
    {
      widgetName: "bookParkingLink",
      widgetFunc: props => <BookParkingLink {...props} />,
      props: [],
      mapStateToProps: ["selectedAirport"]
    },
    {
      widgetName: "manageParkingLink",
      widgetFunc: props => <ManageParkingLink {...props} />,
      props: [],
      mapStateToProps: ["selectedAirport"]
    },
    {
      widgetName: "lostLuggageLink",
      widgetFunc: props => <LostBaggageLink {...props} />
    }
  ]
};

export default config;
