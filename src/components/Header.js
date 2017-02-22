import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'

import { BTN_PLACES, TITLE } from '_intl/defaultMessages.json'
import { MINIMAL_WIDTH, VERY_NARROW_MAX_WIDTH } from '_constants/viewportWidths'

const Header = (props) => {
  const {
    changeLang,
    blur,
    lang,
    showMap,
    viewport
  } = props
  const langHandler = changeLang.bind(null, lang)
  const className = blur ? 'header blur-me' : 'header'

  return (
      <header className={className} style={{fontSize: calcHeaderFontSize(viewport)}}>

        <a href="https://darksky.net/poweredby/" target="_blank" className='header__link'>
          <img src={window.location.href + "/img/poweredby.png"} className='header__img' />
        </a>
      
        <button onClick={langHandler} className='header__button header__button--lang'>
          {lang.toUpperCase()}
        </button>
      
        <button onClick={showMap} className='header__button'>
          <FormattedMessage { ...BTN_PLACES } />
        </button>
      
        <span className='header__title'>
          <FormattedMessage { ...TITLE } className={'header__title'} />
        </span>

      </header>
  )
}

Header.propTypes = {
  changeLang: PropTypes.func.isRequired,
  blur: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired,
  showMap: PropTypes.func.isRequired,
  viewport: PropTypes.object.isRequired
}

function calcHeaderFontSize (viewport) {
  if ( viewport.isVeryNarrow && viewport.width >= MINIMAL_WIDTH ) {
    return 1.4 * viewport.width / VERY_NARROW_MAX_WIDTH + 'em'
  } else if ( viewport.isVeryNarrow && viewport.width < MINIMAL_WIDTH) {
    return 1.4 * MINIMAL_WIDTH / VERY_NARROW_MAX_WIDTH + 'em'
  } else {
    return '1.4em'
  }
}

export default Header