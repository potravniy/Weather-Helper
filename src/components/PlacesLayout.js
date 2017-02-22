import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'

import ExpandedPlaceView from '_components/ExpandedPlaceView'
import CollapsedPlaceView from '_components/CollapsedPlaceView'

const PlacesLayout = (props) => {
  const {
    collapseDay,
    collapsePlace,
    collapsedPlaces,
    expandDay,
    expandPlace,
    expandedPlace,
    viewport
  } = props

  return (
    <main className='main clearfix'>
      {
        expandedPlace &&
        <section className="expanded-place">
          <ExpandedPlaceView
            key={expandedPlace.id}
            collapseDay={collapseDay}
            collapsePlace={collapsePlace}
            expandDay={expandDay}
            place={expandedPlace}
            viewport={viewport}
          />
        </section>
      }
      {
        <section className="collapsed-places clearfix">
          {collapsedPlaces.map(p => {
            return (
              <CollapsedPlaceView
                key={p.id}
                collapsePlace={collapsePlace}
                expandPlace={expandPlace}
                expandedPlaceID={expandedPlace.id}
                place={p}
                viewport={viewport}
              />
            )
          })}
        </section>
      }
    </main>
  )
}

PlacesLayout.propTypes = {
  collapseDay: PropTypes.func.isRequired,
  collapsePlace: PropTypes.func.isRequired,
  collapsedPlaces: PropTypes.array.isRequired,
  expandDay: PropTypes.func.isRequired,
  expandPlace: PropTypes.func.isRequired,
  expandedPlace: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool
  ]).isRequired,
  viewport: PropTypes.object.isRequired
}

export default PlacesLayout