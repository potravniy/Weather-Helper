import React, { PropTypes } from 'react'

const Search = (props) => {
  const {
    map,
    input,
    markers,
    searchPlaceholder,
    addPlace
  } = props

  const searchBox = new window.google.maps.places.SearchBox(input);
  map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

  map.addListener('bounds_changed', () => {
    searchBox.setBounds(map.getBounds());
  });

  searchBox.addListener('places_changed', () => {
    var places = searchBox.getPlaces();
    if (places.length == 0) return
    places.forEach((place) => {
      const name = prompt(searchPlaceholder, place.name)
      if( name ){
        addPlace({
          name: name,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        })
      }
    })
    input.value = ''
  })

  return (
    () => {
      window.google.maps.event.clearListeners(map, 'bounds_changed')
      window.google.maps.event.clearListeners(searchBox, 'places_changed')
    }
  )
}

Search.propTypes = {
  map: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  markers: PropTypes.array.isRequired,
  addPlace: PropTypes.func.isRequired
}

export default Search