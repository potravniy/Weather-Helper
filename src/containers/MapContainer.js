import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps/lib";
import { injectIntl } from 'react-intl'

import CloseIcon from '_icons/CloseIcon'

import propsToLocalMapState from '_utils/map/propsToLocalMapState'
import mapSearchInit from '_utils/map/mapSearchInit'
import infoWindow from '_utils/map/infoWindow'
import defaultMapOptions from '_utils/map/defaultMapOptions'
import initMapControls from '_utils/map/initMapControls'
import handleMapClick from '_utils/map/handleMapClick'
import handleMarkerClick from '_utils/map/handleMarkerClick'
import setMapBounds from '_utils/map/setMapBounds'

import { addPlace, removePlace } from '_actions/addRemovePlace'
import { hideMap } from '_actions/changePlaces'

import { WHAT_PLACE_WOULD_YOU_ADD } from '_intl/defaultMessages.json'

class MapComponent extends Component {
  constructor(props){
    super(props)
    this.state = propsToLocalMapState(props)
    this.initMapControls = initMapControls
    this.mapSearchInit = mapSearchInit
    this.infoWindow = infoWindow
    this.handleMapClick = handleMapClick.bind(this)
    this.handleMarkerClick = handleMarkerClick.bind(this)
    this.setMapBounds = setMapBounds.bind(this)
  }
  componentWillReceiveProps(newProps){
    this.setState( propsToLocalMapState(newProps) )
    this.infoWindow({ close: true })
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
          placeholder={this.props.intl.formatMessage( WHAT_PLACE_WOULD_YOU_ADD )}
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
          onClick={this.props.hideMap}
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl( MapComponent ))