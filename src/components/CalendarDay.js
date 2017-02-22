import React, { PropTypes } from 'react'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import { NOW } from '_intl/defaultMessages.json'

export default function CalendarDay(props) {
  const {
    forNow,
    time,
    timezone
  } = props

  const localTime = moment.tz(time * 1000, timezone)
  const dayOfWeek = forNow
    ? <FormattedMessage { ...NOW } />
    : localTime.isSame(moment(), 'day')
      ? localTime.calendar().split(' ')[0]
      : localTime.format("ddd")
  const date = forNow ? '' : localTime.format("DD.MM")

  return (
    <p className='day-tile__item__content day-tile__item-date__content'>
      {dayOfWeek}
      <br />
      {date}
    </p>
  )

}

CalendarDay.propTypes = {
  time: PropTypes.number.isRequired,
  timezone: PropTypes.string.isRequired,
  forNow: PropTypes.bool.isRequired
}