import { get, includes } from 'lodash'
import { CURRENT_POSITION_NAME } from'_constants/currentPositionName'

const propsToLocalMapState = props => {
  return {
    markers: props.places.map(p => {
      return {
        key: p.id,
        placeName: p.placeName,
        id: p.id,
        position: {
          lat: get(p, 'coords.lat'),
          lng: get(p, 'coords.lng')
        },
        title: p.placeName,
        defaultAnimation: 2
      }
    }),
    center: {
      lat: get(props, 'places[0].coords.lat') || 49.0275009,
      lng: get(props, 'places[0].coords.lng') || 31.4822306
    },
    geoBtnClick: includes(props.places.map(p => p.placeName), CURRENT_POSITION_NAME)
                        ? null
                        : addCurrentPosition.bind(null, props.addPlace)
  }
}

function addCurrentPosition(addPlace) {
  const success = (position) => {
    addPlace({
      name: CURRENT_POSITION_NAME,
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  }
  const error = (error) => {
    error.code === 1 && alert("User denied Geolocation in browser.")
  }
  navigator.geolocation.getCurrentPosition(success, error, {maximumAge: 3600000})
}

export default propsToLocalMapState