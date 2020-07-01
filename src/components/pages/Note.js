import React from "react";

export default function Note() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-4 list-container">
          <div className="card">
            <ul className="list-group">
              <li class="list-group-item">Here goes the saved notes</li>
            </ul>
            <i className="fas fa-trash-alt float-right text-danger delete-note"></i>
          </div>
        </div>
        <div class="col-8">
          <input
            className="note-title"
            placeholder="Note Title"
            maxlength="28"
            type="text"
          />
          <textarea
            className="note-textarea"
            placeholder="Note Text"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
