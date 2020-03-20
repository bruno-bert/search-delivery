import React from "react";
const MultiStepForm = () => {
  return (
    <form className="container">
      <div className="row">
        <div className="input-field col s12">
          <input
            placeholder="Project Name"
            id="project_name"
            type="text"
            className="validate"
          />
          <label htmlFor="project_name">Project Name</label>
        </div>
      </div>

      <div className="row file-field input-field">
        <div className="btn">
          <span>Select Input File</span>
          <input type="file" />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>

      <div className="row">
        <div class="input-field col s12">
          <select>
            <option value="1" selected>
              1
            </option>

            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <label>First Row Containing Data</label>
        </div>
      </div>
    </form>
  );
};

export default MultiStepForm;
