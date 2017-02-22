
export default function(){
  if( this.state.markers.length > 1 ){
    const bounds = new window.google.maps.LatLngBounds()
    this.state.markers.forEach((marker) => {
      bounds.extend(new window.google.maps.LatLng(marker.position.lat, marker.position.lng))
    })
    this.map.fitBounds(bounds)
  } else {
    this.map.panTo(this.state.center)
  }
}