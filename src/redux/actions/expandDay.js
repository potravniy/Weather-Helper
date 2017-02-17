import {
  EXPAND_DAY,
  COLLAPSE_DAY
} from '_constants/actions'

export const expandDay = (data) => {
  const { id, dayIndex } = data
  return {
    type: EXPAND_DAY,
    id: id,
    dayIndex: dayIndex
  }
}

export const collapseDay = () => {
  return {
    type: COLLAPSE_DAY
  }
}
