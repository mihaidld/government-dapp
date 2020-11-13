import React, { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { Web3Context } from "../hooks/useWeb3";
import { Government_address, Government_abi } from "../contracts/Government";
import { Text, Button } from "@chakra-ui/core";

import "../form.css";

function Form() {
  const [web3State, login] = useContext(Web3Context);
  const [government, setGovernment] = useState(null);
  const [inputAge, setInputAge] = useState(0);
  const [checkedWorking, setCheckedWorking] = useState(false);
  const [checkedSick, setCheckedSick] = useState(false);

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    await government.becomeCitizen(inputAge, checkedWorking, checkedSick);
  };

  useEffect(() => {
    if (web3State.signer !== null) {
      setGovernment(
        new ethers.Contract(
          Government_address,
          Government_abi,
          web3State.signer
        )
      );
    }
  }, [web3State.signer]);

  // web3State.is_web3 ??
  // web3State.is_logged ??
  // web3State.chain_id ??
  // web3Sate.account && provider et signer

  return (
    <>
      <Text>Web3: {web3State.is_web3 ? "injected" : "no-injected"}</Text>
      <Text>Network id: {web3State.chain_id}</Text>
      <Text>Network name: {web3State.network_name}</Text>
      <Text>MetaMask installed: {web3State.is_metamask ? "yes" : "no"}</Text>
      <Text>logged: {web3State.is_logged ? "yes" : "no"}</Text>
      <Text>{web3State.account}</Text>
      {!web3State.is_logged && (
        <>
          <Button onClick={login}>login</Button>
        </>
      )}
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
            <div className="mb-3">
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
            </div>
            <button type="submit" className="btn btn-outline-light mt-3">
              Submit
            </button>
          </form>
        </section>
      )}
    </>
  );
}

export default Form;
