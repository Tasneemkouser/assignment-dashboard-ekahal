import axios from "axios";

const services = (() => {
  const BASE_URL = `https://api.data.gov.in/resource`;
  const API_RESOURCE_ID = `9f30daab-93cc-4f34-9541-78d28abfbfa8`;
  const API_KEY = `579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b`;
  const API_RESPONSE_FORMAT = `json`;

  const apiCache = {};

  const fetchTemperature = async ({ offset = 0 }) => {
    const TEMPERATURE_API_ENDPOINT = `${BASE_URL}/${API_RESOURCE_ID}?api-key=${API_KEY}&format=${API_RESPONSE_FORMAT}&offset=${offset}`;
    if (apiCache[TEMPERATURE_API_ENDPOINT]) {
      return apiCache[TEMPERATURE_API_ENDPOINT];
    }
    const apiResponse = await axios.get(TEMPERATURE_API_ENDPOINT);
    const response = apiResponse.data;
    apiCache[TEMPERATURE_API_ENDPOINT] = response;
    return apiCache[TEMPERATURE_API_ENDPOINT];
  };

  return {
    fetchTemperature
  };
})();

export default services;
