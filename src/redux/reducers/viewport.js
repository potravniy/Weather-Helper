import { ON_RESIZE } from '_constants/actions'
import getViewPort from '_utils/getViewPort'

export default (viewport = getViewPort(), action) => {

  switch (action.type) {

    case ON_RESIZE:
      return getViewPort()

    default:
      return viewport
  }
}
