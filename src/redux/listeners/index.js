import getCoordsApiInit from '_listeners/getCoordsApiInit'
import getWeatherApiInit from '_listeners/getWeatherApiInit'
import windowOnresizeListenerInit from '_listeners/onresize'
import onLangChangeListener from '_listeners/onLangChange'
import setLocalStorage from '_listeners/setLocalStorage'

export default function (store) {
  getCoordsApiInit( store )
  getWeatherApiInit( store )
  windowOnresizeListenerInit( store )
  onLangChangeListener( store )
  setLocalStorage( store )
}
