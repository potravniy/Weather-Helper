import { CHANGE_LANG } from '_constants/actions'
import languages from '_constants/languages'
import initialState from '_redux/initialState'

export default function (lang = initialState.lang, action) {
  let index
  switch (action.type) {

    case CHANGE_LANG:
      index = languages.indexOf(lang)
      index = ++index % languages.length
      return languages[index]
    
    default:
      return lang
  }
}
