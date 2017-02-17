let infowindow = null

const info = (props) => {

  infowindow = infowindow || new window.google.maps.InfoWindow({
    pixelOffset: {
      width: 0,
      height: -35
    }
  });

  if( props.close ) {
    infowindow.close()
    return infowindow
  }

  const {
    placeName,
    id,
    position,
    btnRemoveTxt,
    removePlace,
    hideRemoveBtn
  } = props

  const button = hideRemoveBtn ? '' :
      '<button class="infowindow__btn" onclick="window.removePlace()">'+
        btnRemoveTxt+
      '</button>'
  const contentString =
    '<div class="infowindow__content">'+
      '<h3 class="infowindow__header">'+
        placeName+
      '</h3>'+
      button+
    '</div>';
  window.removePlace = id===0 ? null : removePlace
  infowindow.setContent( contentString )
  infowindow.setPosition( position )

  return infowindow
  
}

export default info