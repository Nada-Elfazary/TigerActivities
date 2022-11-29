import React from 'react';
import {ModalDialog} from 'react-bootstrap';
import Draggable from 'react-draggable'


export default class CreateEventModalDraggable extends React.Component{
  render() {
    return (
      <Draggable handle='.modal-header'><ModalDialog {...this.props} /></Draggable>
    )
  }
}
