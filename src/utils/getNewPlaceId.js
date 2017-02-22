import { max } from 'lodash'

export default (places) => {
  const listId = places.map(place => {
    return parseInt(place.id.split('_')[1])
  })
  return 'place_'+ (max(listId) + 1)
}
