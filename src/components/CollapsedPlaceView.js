import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import { get } from 'lodash'

import Day from '_components/Day'
import Hourly from '_components/Hourly'

import { CURRENT_POSITION } from '_intl/defaultMessages.json'

import CollapseIcon from '_icons/CollapseIcon'
import ExpandIcon from '_icons/ExpandIcon'

import getPlaceNameTranslated from '_utils/getPlaceNameTranslated'
import getGmtOffset from '_utils/getGmtOffset'
import getArticleWidth from '_utils/getArticleWidth'

const CollapsedPlaceView = (props) => {
  const {
    collapsePlace,
    expandPlace,
    expandedPlaceID,
    place,
    viewport
  } = props

  const { gmtOffset, timezone } = getGmtOffset(place)
  const placeName = getPlaceNameTranslated(place)
  const hasExpandedView = place.id === expandedPlaceID
  const className = hasExpandedView
    ? 'place collapsed_place hasExpandedView'
    : 'place collapsed_place'
  const onClick = hasExpandedView
    ? collapsePlace.bind(null, {id: place.id})
    : place.weather.data
      ? expandPlace.bind(null, place.id)
      : null
  const width = getArticleWidth(viewport).forCollapsedPlace
  const weatherNow = get(place, 'weather.data.currently')

  return (
    <article className={className} style={{width: width}} >
      
      <div className='place__title' onClick={onClick}>
        {placeName}
        <span className='gmt-offset' >{gmtOffset}</span>
        <div className='place__expand-icon place__expand-icon--place'>
          {hasExpandedView ? <CollapseIcon/> : <ExpandIcon/>}
        </div>
      </div>
      
      {weatherNow &&
        <div className='place__dayslist clearfix'>
          <Day
            day={weatherNow}
            key={weatherNow.time}
            onClick={onClick}
            timezone={timezone}
            viewport={viewport}
          />
        </div>
      }

    </article>
  )
}

CollapsedPlaceView.propTypes = {
  collapsePlace: PropTypes.func.isRequired,
  expandPlace: PropTypes.func.isRequired,
  expandedPlaceID: PropTypes.string,
  place: PropTypes.object.isRequired,
  viewport: PropTypes.object.isRequired
}

export default CollapsedPlaceView