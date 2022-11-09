import React from "react";
import "./Modal.css";

export default function DetailsModal(props) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              props.setOpenModal(false);
            }}
          >
            x
          </button>
        </div>
        <div className="title">
          <h2>{props.event.event_name}</h2>
        </div>
        <div className="body">
  
            <table>
              <tbody>
                    <tr>
                    <td>Category: {props.event.category}</td>
                    <td></td>
                    <td>Created by:{props.event.creator}</td>
                    </tr>
                    <tr>
                    <td>Start time: {props.event.start_time} </td>
                    </tr>
                    <tr>
                        <td>End time: {props.event.end_time}</td>
                        <td></td>
                        <td>Location: {props.event.location}</td>
                    </tr>
                    <tr></tr>
                    <tr></tr>    
                    <tr>
                        <td>Description:</td>
                    </tr>
                    <tr><td>{props.event.description}</td></tr>
             </tbody>
                </table>

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

