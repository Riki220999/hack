

import React, { Component } from "react";
import "./index.css";

export default class NotesApp extends Component {
  
  render() {
    return (
      <div className="layout-column align-items-center justify-content-start">
        <section className="layout-row align-items-center justify-content-center mt-30">
          <input data-testid="input-note-name" type="text" className="large mx-8"
                placeholder="Note Title"/>
          <input data-testid="input-note-status" type="text" className="large mx-8"
                placeholder="Note Status"/>
          <button className="" data-testid="submit-button">Add Note</button>
        </section>

        <div className="mt-50">
          <ul className="tabs">
            <li className="tab-item slide-up-fade-in" data-testid="allButton">All</li>
            <li className="tab-item slide-up-fade-in" data-testid="activeButton">Active</li>
            <li className="tab-item slide-up-fade-in" data-testid="completedButton">Completed</li>
          </ul>
        </div>
        <div className="card w-40 pt-30 pb-8">
          <table>
            <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
            </tr>
            </thead>
            <tbody data-testid="noteList">
              <tr>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
