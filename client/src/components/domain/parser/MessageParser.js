class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    if (this.containsFlightId(message)) {
      const id = this.containsFlightId(message);
      this.actionProvider.handleFlightIdMatch(id);
    }

    if (
      message.includes("options") ||
      message.includes("help") ||
      message.includes("do for me")
    ) {
      this.actionProvider.handleOptions();
    }
  }

  containsFlightId = message => {
    const regexp = /[A-Z]{2,}[0-9]{2,}/gim;
    return message.match(regexp);
  };
}

export default MessageParser;
