import { onWindowResize } from '_actions/onWindowResize'
import getViewPort from '_utils/getViewPort'


export default function (store) {

  const listener = () => {
    store.dispatch( onWindowResize() )
  }

  window.addEventListener('resize', listener)

  return () => {
    window.removeEventListener('resize', listener)
  }

}