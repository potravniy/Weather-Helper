import {
  EXPAND_PLACE,
  COLLAPSE_PLACE
} from '_constants/actions'

export const expandPlace = (id) => {
  return {
    type: EXPAND_PLACE,
    id: id
  }
}

export const collapsePlace = () => {
  return {
    type: COLLAPSE_PLACE
  }
}
