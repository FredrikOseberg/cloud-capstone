import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult
} from "aws-lambda";
import fetch from "node-fetch";
import "source-map-support/register";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  let flights;

  const iata = event.queryStringParameters.iata;
  const direction = event.queryStringParameters.direction;

  let type;

  if (direction === "arrival") {
    type = "a";
  } else {
    type = "d";
  }

  const date = new Date();
  let dateNumString;
  let monthString;
  let yesterDayString;
  let yesterDay = date.getDate() - 1;
  const dateNum = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  if (dateNum < 10) {
    dateNumString = `0${dateNum}`;
  }

  if (yesterDay < 10) {
    yesterDayString = `0${yesterDay}`;
  }

  if (month < 10) {
    monthString = `0${month}`;
  }

  const todayDateString = `${year}-${monthString}-${dateNumString}`;
  const yesterdayDateString = `${year}-${monthString}-${yesterDayString}`;
  try {
    flights = await fetch(
      `https://avinor.no/Api/Flights/Airport/${iata}?direction=${type}&start=${yesterdayDateString}T22:00:00Z&end=${todayDateString}T21:59:59Z&language=en`
    );

    flights = await flights.json();
  } catch (e) {
    console.log(e);
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: "Could not retrieve flights"
      })
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      flights: flights
    })
  };
};
