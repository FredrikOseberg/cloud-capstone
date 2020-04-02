export const uniqueIdGenerator = () => {
  let id = 0;
  return () => {
    id++;
    return id;
  };
};

const uniqueId = uniqueIdGenerator();

export const botMessage = message => {
  if (message.type === "bot") {
    return true;
  }
  return false;
};

export const createChatMessage = (message, type) => {
  return {
    message: message,
    type: type,
    id: uniqueId()
  };
};

export const createChatBotMessage = (message, options) => {
  return {
    ...createChatMessage(message, "bot"),
    ...options
  };
};

export const lastMessageTypeIsBot = (arr, index) => {
  return arr[index - 1] && arr[index - 1].type === "bot";
};

export const lastMessageTypeDoesNotHaveWidget = (arr, index) => {
  return arr[index - 1] && arr[index - 1].widget == false;
};
