import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps/lib";
import { injectIntl } from 'react-intl'

import CloseIcon from '_icons/CloseIcon'

import propsToLocalMapState from '_utils/propsToLocalMapState'
import mapSearchInit from '_utils/mapSearchInit'
import infoWindow from '_utils/infoWindow'
import defaultMapOptions from '_utils/defaultMapOptions'

import { addPlace, removePlace } from '_actions/addRemovePlace'
import { hideMap } from '_actions/changePlaces'

import {
  BTN_REMOVE,
  CURRENT_POSITION,
  ENTER_NEW_PLACE_NAME,
  WHAT_PLACE_WOULD_YOU_ADD
} from '_intl/defaultMessages.json'

class MapComponent extends Component {
  constructor(props){
    super(props)
    this.state = propsToLocalMapState(props)
    this.formatMessage = props.intl.formatMessage
  }
  componentWillReceiveProps(newProps){
    this.setState( propsToLocalMapState(newProps) )
    infoWindow({ close: true })
  }
  componentDidUpdate(){
    this.setMapBounds()
    setTimeout(() => {
      if ( window.innerWidth !== this.props.viewport.width || window.innerHeight !== this.props.viewport.height ) {
        window.dispatchEvent(new Event('resize'))
        console.log('resize')
      }
    }, 100)
  }
  componentWillUnmount(){
    this.removeSearchListeners()
    this.removeOrientationListener()
  }
  initMapControls(){
    if ( this.map && this.searchInput && this.closeBtn ) {
      const props = {
        map: this.map,
        input: this.searchInput,
        markers: this.state.markers,
        searchPlaceholder: this.formatMessage( ENTER_NEW_PLACE_NAME ),
        addPlace: this.props.addPlace
      }
      this.removeSearchListeners = mapSearchInit(props)
      this.map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(this.closeBtn)
      const onOrientationChange = () => {
        setTimeout(() => {
          this.setMapBounds()
        }, 200)
      }
      window.addEventListener('orientationchange', onOrientationChange)
      this.removeOrientationListener = () => {
        window.removeEventListener('orientationchange', onOrientationChange)
      }
      this.setMapBounds()
    }
  }
  handleMapClick(event) {
    const name = prompt( this.formatMessage( ENTER_NEW_PLACE_NAME ) )
    if( name ){
      this.props.addPlace({
        name: name,
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      })
    }
  }
  handleMarkerClick(targetMarker){
    infoWindow({
      placeName: targetMarker.placeName === 'Current position'
        ? this.formatMessage( CURRENT_POSITION )
        : targetMarker.placeName,
      id: targetMarker.id,
      position: targetMarker.position,
      btnRemoveTxt: this.formatMessage( BTN_REMOVE ),
      removePlace: this.props.removePlace.bind(this, targetMarker.id),
      hideRemoveBtn: targetMarker.placeName === 'Current position'
    })
    .open(this.map)
  }
  setMapBounds(){
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
  setMapBounds = this.setMapBounds.bind(this);
  handleMapClick = this.handleMapClick.bind(this);
  hideMap = this.props.hideMap.bind(this)

  render(){
    const mapStyle = {
      width: this.props.viewport.width,
      height: this.props.viewport.height
    }
    const markers =  this.state.markers.map(marker => {
      return <Marker { ...marker } onClick={this.handleMarkerClick.bind(this, marker)} />
    })

    return (
      <section className="map" style={ mapStyle }>
        <GoogleMapLoader
          containerElement={
            <div className="map_container"/>
          }
          googleMapElement={
            <GoogleMap
              ref={map => {
                    if( this.map || !map ) return
                    this.map = map.props.map
                    this.initMapControls()
              }}
              defaultZoom={6}
              defaultCenter={this.state.center}
              defaultOptions={defaultMapOptions}
              onClick={this.handleMapClick}
            >
              { markers }
            </GoogleMap>
          }
        />
        <input
          id="pac-input"
          className="controls search"
          type="text"
          placeholder={this.formatMessage( WHAT_PLACE_WOULD_YOU_ADD )}
          ref={searchInput => {
            if( this.searchInput || !searchInput ) return
            this.searchInput = searchInput
            this.initMapControls()
          }}
          style={{
            width: this.props.viewport.width < 362 ? this.props.viewport.width - 62 : 300
          }}
        />
        <div
          className='controls close-control'
          ref={closeBtn => {
            if( this.closeBtn || !closeBtn ) return
            this.closeBtn = closeBtn
            this.initMapControls()
          }}
          onClick={this.hideMap}
        >
          <CloseIcon/>
        </div>
      </section>
    );
  }
}

MapComponent.propTypes = {
  intl: PropTypes.object.isRequired,
  places: PropTypes.array.isRequired,
  viewport: PropTypes.object.isRequired,
  addPlace: PropTypes.func.isRequired,
  removePlace: PropTypes.func.isRequired,
  hideMap: PropTypes.func.isRequired
}
function mapStateToProps (state) {
  return {
    places: state.places,
    viewport: state.viewport
  }
}
function mapDispatchToProps (dispatch) {
  return {
    addPlace: (place) => dispatch( addPlace(place) ),
    removePlace: (id) => dispatch( removePlace(id) ),
    hideMap: () => dispatch( hideMap() )
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(injectIntl( MapComponent ))