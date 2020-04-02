export class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleOptions = () => {
    const message = this.createChatBotMessage(
      "How can I help you? Below are some possible options.",
      { widget: "options", loading: true, terminateLoading: true }
    );

    this.addMessageToState(message);
  };

  handleFlightsChoice = () => {
    const message = this.createChatBotMessage(
      "Awesome. I just need a little more information",
      {
        widget: "flightSelector",
        withAvatar: true,
        loading: true,
        terminateLoading: true
      }
    );
    this.addMessageToState(message);
  };

  handleFlightTypeChoice = type => {
    const message = this.createChatBotMessage(
      `Thanks. I'll retrieve the next 5 ${type} flights from your chosen airport. If you are searching for a specific flight, try typing in the flightID? (example: SK1423)`,
      {
        loading: true,
        terminateLoading: true,
        withAvatar: true,
        widget: "flightList"
      }
    );

    this.addMessageToState(message);
  };

  handleFlightIdMatch = flightId => {
    const message = this.createChatBotMessage(
      `Thanks. I found the following results for this flight.`,
      {
        loading: true,
        terminateLoading: true,
        withAvatar: true,
        widget: "singleFlight"
      }
    );

    this.addMessageToState(message);
  };

  addMessageToState = message => {
    this.setState(state => ({
      ...state,
      messages: [...state.messages, message]
    }));
  };
}
