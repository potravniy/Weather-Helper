import {
  GET_COORDS_REQUEST,
  GET_COORDS_SUCCESS,
  GET_COORDS_FAILURE
} from '_constants/actions'

import { CALL_API } from 'redux-api-middleware'

export const getCoords = (id) => {
  return {
    [CALL_API]: {
      endpoint: "coords",
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"considerIp": "true"}) ,
      types: [
        { type: GET_COORDS_REQUEST, meta: {id} },
        { type: GET_COORDS_SUCCESS, meta: {id} },
        { type: GET_COORDS_FAILURE, meta: {id} }
      ]
    }
  }
}