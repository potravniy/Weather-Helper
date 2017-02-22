import { ENTER_NEW_PLACE_NAME } from '_intl/defaultMessages.json'

export default function(event) {
  const name = prompt( this.props.intl.formatMessage( ENTER_NEW_PLACE_NAME ) )
  if( name ){
    this.props.addPlace({
      name: name,
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    })
  }
}