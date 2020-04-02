import React from "react";
import { createChatBotMessage } from "../components/Chat/chatUtils";

import AirportSelector from "../components/domain/widgets/AirportSelector/AirportSelector";
import Options from "../components/domain/widgets/Options/Options";
import FlightsSelector from "../components/domain/widgets/FlightsSelector/FlightsSelector";
import FlightList from "../components/domain/widgets/FlightList/FlightList";

const botName = "Skybot";

const config = {
  apiUrl: "https://atsl2nsysg.execute-api.eu-north-1.amazonaws.com",
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
    selectedAirport: "OSL",
    flightType: "",
    flights: []
  },
  widgets: [
    {
      widgetName: "airportSelector",
      widgetFunc: props => <AirportSelector {...props} />,
      mapStateToProps: ["messages", "selectedAirport"],
      props: [],
      updateKey: "selectedAirport"
    },
    {
      widgetName: "options",
      widgetFunc: props => <Options {...props} />,
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
    }
  ]
};

export default config;
