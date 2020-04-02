import { APIGatewayProxyHandler } from "aws-lambda";
import fetch from "node-fetch";
import "source-map-support/register";

export const handler: APIGatewayProxyHandler = async (_, _context) => {
  let airports;
  try {
    airports = await fetch(
      "https://restapi2.avinor.no/airport/v1/airports?language=no&avinorAirport=true"
    );

    airports = await airports.json();
  } catch (e) {
    console.log(e);
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: "Could not retrieve airports"
      })
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({
      airports: airports
    })
  };
};
