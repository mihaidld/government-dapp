import React from "react";
import GetRetired from "../components/GetRetired";

// Layout displayed only to registered citizens
function Citizen() {
  return (
    <section className="mb-3">
      <hr />
      <h2 className="h2 text-primary mb-3 pt-3" id="citizenship">
        <span className="badge bg-primary">Citizenship</span>
      </h2>
      <div className="py-3 mb-3">
        <GetRetired />
      </div>
    </section>
  );
}

export default Citizen;
