import React from "react";
import ChangeHealth from "../components/ChangeHealth";

function Hospital() {
  return (
    <section className="mb-3">
      <hr />
      <h2 className="h2 text-primary mb-3 pt-3" id="hospital">
        <span className="badge bg-primary">Healthcare Management</span>
      </h2>
      <div className="py-3 mb-3">
        <ChangeHealth />
        <p className="text-decoration-underline">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#">Back to the top</a>
        </p>
      </div>
    </section>
  );
}

export default Hospital;
