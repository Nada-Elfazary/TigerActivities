import React from "react";
import "./Modal.css";

function Modal(props) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              {props.setOpenModal(false);}
            }}
          >
            x
          </button>
        </div>
        <div className="title">
          <h2>Want to sign up for {props.event.event_name}</h2>
        </div>
        <div className="body">
          <p>
            {props.event.description}
            <table>
                    <tr>
                    <td ><label>Name:</label></td>
                    <td><input type="text" name="name"/> </td>
                    </tr>
                    <tr>
                    <td ><label>Phone Number:</label></td>
                    <td><input type="text" name="Number"/> </td>
                    </tr>
                </table>
                </p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              props.setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;