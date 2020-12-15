import React, { useContext, useState, useEffect } from "react";
import { ContractsContext } from "../context/ContractsContext";
import { ModeContext } from "../context/ModeContext";
import { ethers } from "ethers";
import { useToast } from "@chakra-ui/core";

function GetCitizen() {
  // consume context
  const { government } = useContext(ContractsContext);
  const { mode } = useContext(ModeContext);

  // define classes to handle mode
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";

  //define state variables to set retrieved citizen properties or display status
  const [getCitizen, setGetCitizen] = useState({
    isAlive: false,
    employer: ethers.constants.AddressZero,
    isWorking: false,
    isSick: false,
    retirementDate: 0,
    currentTokens: 0,
    healthTokens: 0,
    unemploymentTokens: 0,
    retirementTokens: 0,
  });
  const [isDisplayed, setIsDisplayed] = useState(false);

  const toast = useToast();

  /* define event handler for submitting form to set state and give feeback to
  users if there is no registered citizen at that address */
  const handleSubmitGetCitizen = async (event) => {
    try {
      event.preventDefault();
      const address = event.target.elements.addressCitizen.value;
      const res = await government.getCitizen(address);
      setGetCitizen({
        isAlive: res.isAlive ? "alive" : "not alive",
        employer:
          res.employer !== ethers.constants.AddressZero
            ? res.employer.toString()
            : "no employer registered",
        isWorking: res.isWorking ? "is working" : "unemployed",
        isSick: res.isSick ? "is sick" : "healthy",
        retirementDate: new Date(res.retirementDate * 1000).toUTCString(),
        currentTokens: ethers.utils.formatEther(res.currentTokens),
        healthTokens: ethers.utils.formatEther(res.healthTokens),
        unemploymentTokens: ethers.utils.formatEther(res.unemploymentTokens),
        retirementTokens: ethers.utils.formatEther(res.retirementTokens),
      });
      setIsDisplayed(isDisplayed ? false : true);
      if (!res.isAlive) {
        toast({
          position: "bottom",
          title: `Get Citizen`,
          description: `There is no citizen at address ${address}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      // event.target.reset();
    } catch (e) {
      console.log(e.message);
    }
  };

  // listen for address change event to reset retrieved citizen properties
  useEffect(() => {
    const onAccountsChanged = async (accounts) => {
      try {
        setGetCitizen({
          isAlive: false,
          employer: ethers.constants.AddressZero,
          isWorking: false,
          isSick: false,
          retirementDate: 0,
          currentTokens: 0,
          healthTokens: 0,
          unemploymentTokens: 0,
          retirementTokens: 0,
        });
      } catch (e) {
        throw e;
      }
    };
    onAccountsChanged();
    window.ethereum.on("accountsChanged", onAccountsChanged);
    return () => window.ethereum.off("accountsChanged", onAccountsChanged);
  }, []);

  return (
    <article className="mb-3">
      <div className="shadow p-3">
        <h3 className="h4 mb-2">Get the details of a citizen</h3>
        <form onSubmit={handleSubmitGetCitizen} className="mb-2">
          <div className="mb-2 ">
            <label className="form-label" htmlFor="addressCitizen">
              Enter an address
            </label>
            <input
              id="addressCitizen"
              name="addressCitizen"
              placeholder="address"
              aria-label="input Address to check citizen details"
              aria-describedby="buttonCitizen"
              className="form-control"
            />
          </div>
          <button id="buttonCitizen" type="submit" className={modeButtonClass}>
            Get citizen details
          </button>
        </form>
        {getCitizen.isAlive === "alive" && isDisplayed && (
          <>
            <p>Below are the details of this citizen</p>
            <dl className="row">
              <dt className="col-sm-6">Life Status : </dt>
              <dd className="col-sm-6">{getCitizen.isAlive}</dd>
              <dt className="col-sm-6">Employer : </dt>
              <dd className="col-sm-6">{getCitizen.employer}</dd>
              <dt className="col-sm-6">Working Status : </dt>
              <dd className="col-sm-6">{getCitizen.isWorking}</dd>
              <dt className="col-sm-6">Health Status : </dt>
              <dd className="col-sm-6">{getCitizen.isSick}</dd>
              <dt className="col-sm-6">Date of Retirement : </dt>
              <dd className="col-sm-6">{getCitizen.retirementDate}</dd>
              <dt className="col-sm-6">Current Account Tokens : </dt>
              <dd className="col-sm-6">{getCitizen.currentTokens}</dd>
              <dt className="col-sm-6">Health Insurance Tokens : </dt>
              <dd className="col-sm-6">{getCitizen.healthTokens}</dd>
              <dt className="col-sm-6">Unemployment Tokens : </dt>
              <dd className="col-sm-6">{getCitizen.unemploymentTokens}</dd>
              <dt className="col-sm-6">Retirement Tokens : </dt>
              <dd className="col-sm-6">{getCitizen.retirementTokens}</dd>
            </dl>
          </>
        )}
      </div>
    </article>
  );
}

export default GetCitizen;
