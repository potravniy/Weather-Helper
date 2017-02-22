import { ENTER_NEW_PLACE_NAME } from '_intl/defaultMessages.json'

export default function() {
  if ( this.map && this.searchInput && this.closeBtn && (this.state.geoBtnClick ? this.geoBtn : true) ) {
    const props = {
      map: this.map,
      input: this.searchInput,
      markers: this.state.markers,
      searchPlaceholder: this.props.intl.formatMessage( ENTER_NEW_PLACE_NAME ),
      addPlace: this.props.addPlace
    }
    this.removeSearchListeners = this.mapSearchInit(props)
    this.map.controls[window.google.maps.ControlPosition.TOP_RIGHT]
      .push(this.closeBtn)
    this.geoBtn && this.map.controls[window.google.maps.ControlPosition.LEFT_TOP]
      .push(this.geoBtn)

    const onOrientationChange = () => {
      setTimeout(() => {
        this.setMapBounds()
      }, 500)
    }

    window.addEventListener('orientationchange', onOrientationChange)
    this.removeOrientationListener = () => {
      window.removeEventListener('orientationchange', onOrientationChange)
    }
    this.setMapBounds()
  }
}