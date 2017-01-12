import React, { PropTypes } from 'react'
import { dateToDDMM, dateToWeekDay } from '_utils/dateConvertor'
import IconWeather from '_components/IconWeather'
import WindArrow from '_components/WindArrow'
import DropIcon from '_components/DropIcon'
import PrecipProbabilityIcon from '_components/PrecipProbabilityIcon'

export default function Day (props) {
  const day = props.day
  const date = dateToDDMM(day.time)

  return(
    <div className="day_wrapper">
      <p className="day_summary"> {day.summary} </p>
      <div className="day clearfix">
        <div>
          <p className='date'>{dateToWeekDay(day.time)}<br/>{date}</p>
        </div>
        <IconWeather iconName={day.icon} />
        <div>
          <p className='temperature'>
            <span>{Math.round(day.temperatureMax) + ' C°'}</span><br/>
            <span>{Math.round(day.temperatureMin) + ' C°'}</span><br/>
          </p>
        </div>
        <div>
          <p className='wind_and_precip'>
            <WindArrow angle={ Math.round(day.windBearing) } />
            <span> {Math.round(day.windSpeed) + 'm/s'}</span>
            <br/>
            <DropIcon />
            <span> {Math.round(day.precipIntensity) + 'mm'}</span>
            <br/>
            <PrecipProbabilityIcon />
            <span> {Math.round(day.precipProbability * 100) + '%'}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

Day.propTypes = {
  day: PropTypes.object.isRequired
}