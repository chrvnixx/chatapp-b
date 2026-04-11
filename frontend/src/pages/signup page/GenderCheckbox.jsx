import React from "react";

export default function GenderCheckbox({ onCheckboxChange, selectedGender }) {
  return (
    <div className="flex mt-2 gap-4">
      <div className="form-control">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "male"}
            onChange={()=>onCheckboxChange("male")}
            
          />
        </label>
      </div>

      <div className="form-control">
        <label className="label gap-2 curor-pointer">
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
           checked={selectedGender === "female"}
            onChange={()=>onCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  );
}
