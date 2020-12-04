import React, { useContext, useState } from "react";
import { Web3Context } from "../context/Web3Context";
import { ContractsContext } from "../context/ContractsContext";
import "../form.css";

// TODO : add toast when state changes inside callback listener triggered by event emitted

function BecomeCitizen() {
  const { web3State } = useContext(Web3Context);
  const { government } = useContext(ContractsContext);
  const [inputAge, setInputAge] = useState(0);

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    await government.becomeCitizen(inputAge);
    e.target.reset();
  };

  // web3State.is_web3 ??
  // web3State.is_logged ??
  // web3State.chain_id ??
  // web3Sate.account && provider et signer

  return (
    <>
      {government !== null && web3State.chain_id === 4 && (
        <section>
          <h2 className="h2">Become a Citizen</h2>
          <form onSubmit={(e) => handleSubmitClick(e)} className="form my-5">
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                placeholder="Enter your age"
                required
                className="form-control"
                onChange={(e) => {
                  setInputAge(e.target.value);
                }}
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="working" className="form-check-label  mr-3">
                Check if employed
              </label>
              <input
                type="checkbox"
                id="working"
                name="working"
                className="form-check-input"
                onChange={(event) => {
                  setCheckedWorking(event.target.checked);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="sick" className="form-check-label  mr-3">
                Check if sick
              </label>
              <input
                type="checkbox"
                id="sick"
                name="sick"
                className="form-check-input"
                onChange={(event) => {
                  setCheckedSick(event.target.checked);
                }}
              />
            </div> */}
            <button type="submit" className="btn btn-outline-dark mt-3">
              Submit
            </button>
          </form>
        </section>
      )}
    </>
  );
}

export default BecomeCitizen;
