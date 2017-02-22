import React, { PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'

import { TIPS } from '_intl/defaultMessages.json'


const Footer = () => {

  return (
    <footer className="tips">
      <FormattedMessage { ...TIPS } />
    </footer>
  )

}

Footer.propTypes = {
}

export default Footer