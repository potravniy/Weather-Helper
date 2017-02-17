import {
  GET_WEATHER_REQUEST,
  GET_WEATHER_SUCCESS,
  GET_WEATHER_FAILURE
} from '_constants/actions'

import { CALL_API } from 'redux-api-middleware'

export const getWeather = (props) => {
  const {
    id,
    lat,
    lng,
    lang
  } = props
  
  return {
    [CALL_API]: {
      endpoint: `weather/${lat},${lng}?units=si&lang=${lang}&exclude=minutely,flags`,
      method: 'GET',
      headers: {
        'Accept': 'text/plain',
        'Content-Language': 'uk, ru, en',
        'Content-Type': 'text/plain'
      },
      types: [
        { type: GET_WEATHER_REQUEST, meta: { id } },
        { type: GET_WEATHER_SUCCESS, meta: { id } },
        { type: GET_WEATHER_FAILURE, meta: { id } }
      ]
    }
  }
}