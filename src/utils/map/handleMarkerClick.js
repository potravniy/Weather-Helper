import {
  BTN_REMOVE,
  CURRENT_POSITION
} from '_intl/defaultMessages.json'

export default function(targetMarker){
  this.infoWindow({
    placeName: targetMarker.placeName === 'Current position'
      ? this.props.intl.formatMessage( CURRENT_POSITION )
      : targetMarker.placeName,
    id: targetMarker.id,
    position: targetMarker.position,
    btnRemoveTxt: this.props.intl.formatMessage( BTN_REMOVE ),
    removePlace: this.props.removePlace.bind(this, targetMarker.id),
    hideRemoveBtn: targetMarker.placeName === 'Current position'
  })
  .open(this.map)
}