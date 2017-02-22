import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { showMap } from '_actions/changePlaces'
import { changeLang } from '_actions/langChange'
import { expandPlace, collapsePlace } from '_actions/expandPlace'
import { expandDay, collapseDay } from '_actions/expandDay'

import Header from '_components/Header'
import Footer from '_components/Footer'
import PlacesLayout from '_components/PlacesLayout'
import MapContainer from '_containers/MapContainer'

import scrollToTop from '_utils/scrollToTop'

class Container extends Component {
  render() {
    const {
      isMapVisible,
      expandedPlaceID,
      viewport,
      places
    } = this.props

    const expandedPlace = !!expandedPlaceID
      && places.find(place => place.id === expandedPlaceID)
    const isViewportBig = viewport.isWide || viewport.isUltrawide
    const isPlaceAmongCollapsed = place => {
      return isViewportBig ? true : place.id !== expandedPlaceID
    }
    const collapsedPlaces = places.filter(isPlaceAmongCollapsed)
    const showTips = places.length < 2

    return (
      <div className='container' >
        <Header
          blur={isMapVisible}
          changeLang={this.props.changeLang}
          lang={this.props.lang}
          showMap={this.props.showMap}
          viewport={viewport}
        />
        {
          showTips && <Footer/>
        }
        {
          isMapVisible
            ? <MapContainer />
            : <PlacesLayout
                collapsePlace={this.props.collapsePlace}
                collapseDay={this.props.collapseDay}
                collapsedPlaces={collapsedPlaces}
                expandDay={this.props.expandDay}
                expandPlace={this.props.expandPlace}
                expandedPlace={expandedPlace}
                showTips={showTips}
                viewport={viewport}
              />
        }
      </div>
    )
  }
}

Container.propTypes = {
  changeLang: PropTypes.func.isRequired,
  collapseDay: PropTypes.func.isRequired,
  collapsePlace: PropTypes.func.isRequired,
  expandDay: PropTypes.func.isRequired,
  expandPlace: PropTypes.func.isRequired,
  expandedPlaceID: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  places: PropTypes.array.isRequired,
  showMap: PropTypes.func.isRequired,
  viewport: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    expandedPlaceID: state.expandedPlaceID,
    isMapVisible: state.isMapVisible,
    lang: state.lang,
    places: state.places,
    viewport: state.viewport
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeLang: () => dispatch(changeLang()),
    collapseDay: (data) => dispatch(collapseDay(data)),
    collapsePlace: (data) => {
      dispatch(collapsePlace())
      dispatch(collapseDay(data))
    },
    expandDay: (data) => dispatch(expandDay(data)),
    expandPlace: (id) => {
      dispatch(expandPlace(id))
      scrollToTop()
    },
    showMap: () => dispatch(showMap())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)
