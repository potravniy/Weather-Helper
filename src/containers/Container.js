import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { showMap } from '_actions/changePlaces'
import { changeLang } from '_actions/langChange'

import Header from '_components/Header'
import PlaceList from '_components/PlaceList'
import MapContainer from '_containers/MapContainer'

class Container extends Component {
  render() {
    const {
      isMapVisible,
      expandedPlace,
      viewport,
      places
    } = this.props
    const expandedPlaceItem = !!expandedPlace
      && places.find(place => place.id === expandedPlace)

    const isViewportBig = viewport.isWide || viewport.isUltrawide
    const collapsedPlaces = places.filter(p => {
      return isViewportBig ? true : p.id !== expandedPlace
    })
    const showTips = places.length < 2

    return (
      <div className='container' >
        <Header
          lang={this.props.lang}
          showMap={this.props.showMap}
          changeLang={this.props.changeLang}
          viewport={viewport}
          blur={isMapVisible}
        />
        {
          isMapVisible
            ? <MapContainer />
            : <PlaceList
                expandedPlace={expandedPlaceItem}
                collapsedPlaces={collapsedPlaces}
                showTips={showTips}
              />
        }
      </div>
    )
  }
}

Container.propTypes = {
  lang: PropTypes.string.isRequired,
  showMap: PropTypes.func.isRequired,
  changeLang: PropTypes.func.isRequired,
  viewport: PropTypes.object.isRequired,
  places: PropTypes.array.isRequired,
  expandedPlace: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return {
    lang: state.lang,
    isMapVisible: state.isMapVisible,
    viewport: state.viewport,
    places: state.places,
    expandedPlace: state.expandedPlace
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showMap: () => dispatch(showMap()),
    changeLang: () => dispatch(changeLang())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
