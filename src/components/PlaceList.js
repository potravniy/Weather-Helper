import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'

import PlaceContainer from '_containers/PlaceContainer'

import { TIPS } from '_intl/defaultMessages.json'

const PlaceList = (props) => {
  const {
    expandedPlace,
    collapsedPlaces,
    showTips,
  } = props

  return (
    <main className='main clearfix'>
      {
        expandedPlace &&
        <section className="expanded-place">
          <PlaceContainer key={expandedPlace.id} place={expandedPlace} isExpanded />
        </section>
      }
      {
        <section className="collapsed-places clearfix">
          {collapsedPlaces.map(p => {
            return <PlaceContainer key={p.id} place={p} />
          })}
        </section>
      }
      {
        showTips &&
        <div className="tips">
          <FormattedMessage { ...TIPS } />
        </div>
      }

    </main>
  )
}

PlaceList.propTypes = {
  expandedPlace: PropTypes.object.isRequired,
  collapsedPlaces: PropTypes.array.isRequired,
  showTips: PropTypes.bool.isRequired
}

export default PlaceList