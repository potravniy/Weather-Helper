import moment from 'moment'
import { get } from 'lodash'

export default (place) => {
  const timezone = get(place, 'weather.data.timezone')
  const gmtOffset = timezone
    ? ' GMT' + formatMinutesToHhMm(-moment.tz.zone(timezone).offset(Date.now()))
    : ''
  return {gmtOffset, timezone}
}

function formatMinutesToHhMm (minutes) {
  const h = parseInt(Math.abs(minutes) / 60),
        m = Math.abs(minutes) % 60
  const HH = h < 10 ? '0'+ h : h.toString()
  const MM = m < 10 ? '0'+ m : m.toString()
  const res = minutes > 0 ? '+' + HH +':'+ MM
            : minutes < 0 ? '-' + HH +':'+ MM
                          : ' 00:00'
  return res
}