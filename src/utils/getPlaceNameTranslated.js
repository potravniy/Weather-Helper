import React from 'react'
import { FormattedMessage } from 'react-intl'
import { CURRENT_POSITION } from '_intl/defaultMessages.json'

export default (place) => {
  const placeName = place.placeName === "Current position"
    ? <FormattedMessage { ...CURRENT_POSITION } />
    : <span>{place.placeName}</span>
  return placeName
}
