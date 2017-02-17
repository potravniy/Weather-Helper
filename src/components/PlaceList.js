import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'

import PlaceContainer from '_containers/PlaceContainer'

import { TIPS } from '_intl/defaultMessages.json'

const PlaceList = (props) => {
  let expandedPlace = null
  const places = props.places.map(p => {
    if (p.isExpanded) {
      expandedPlace = <PlaceContainer key={p.id} place={p} />
      //  For big screen show expanded place twice - expanded AND collapsed
      if (props.viewport.isWide || props.viewport.isUltrawide) {
        const data = {
          ...p,
          isExpanded: false,
          hasExpandedView: true
        }
        return <PlaceContainer key={p.id} place={data} />
      } else {
        return null
      }

    } else {
      return <PlaceContainer key={p.id} place={p} />
    }

  })

  return (
    <main className='main clearfix'>
      {
        expandedPlace &&
        <section className="expanded-place">
          {expandedPlace}
        </section>
      }
      {
        places.length > 0 &&
        <section className="collapsed-places clearfix">
          {places}
          {
            places.length === 1 &&
            <div className="tips">
              <FormattedMessage { ...TIPS } />
            </div>
          }
        </section>
      }
    </main>
  )
}

PlaceList.propTypes = {
  places: PropTypes.array.isRequired,
  viewport: PropTypes.object.isRequired
}

export default PlaceList