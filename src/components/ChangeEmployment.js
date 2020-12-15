import React, { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { ContractsContext } from "../context/ContractsContext";
import { DappContext } from "../context/DappContext";
import { ModeContext } from "../context/ModeContext";
import { useToast } from "@chakra-ui/core";
import { ethers } from "ethers";

function ChangeEmployment() {
  // consume context
  const { web3State } = useContext(Web3Context);
  const { government } = useContext(ContractsContext);
  const { dappState } = useContext(DappContext);
  const { mode } = useContext(ModeContext);

  // define classes to handle mode
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";

  const toast = useToast();

  // define event handler for submitting form with security check to prevent reaching revert from the blockchain
  const handleSubmitChangeEmployment = async (event) => {
    try {
      event.preventDefault();
      const address = event.target.elements.addressCitizenEmp.value;
      const getCitizen = await government.getCitizen(address);
      if (
        dappState.isCompany &&
        getCitizen.isAlive &&
        (!getCitizen.isWorking ||
          (getCitizen.isWorking &&
            web3State.account === getCitizen.employer.toLowerCase()))
      ) {
        await government.changeEmploymentStatus(address);

        /* callback function with same arguments as those of UpdatedEmployment
        event emitted by contract Government, gives feeback to
        users after an action has taken place */
        const cb = (
          citizenAddress,
          employer,
          isWorking,
          currentTokens,
          unemploymentTokens
        ) => {
          toast({
            position: "bottom",
            title: `Change Employment`,
            description: `Citizen at address ${citizenAddress} was successfully declared ${
              isWorking ? "employed" : "unemployed"
            }, is working at company ${employer}, has ${ethers.utils.formatEther(
              currentTokens
            )} tokens in current account and ${ethers.utils.formatEther(
              unemploymentTokens
            )} tokens as unemployment insurance`,
            status: "success",
            duration: 10000,
            isClosable: true,
          });
        };
        // create event filter only with indexed Event parameters
        const filter = government.filters.UpdatedEmployment(address);
        // listen once event UpdatedEmployment searching for entries which match the filter
        government.once(filter, cb);
      } else {
        toast({
          position: "bottom",
          title: `Change Employment`,
          description: `Only a company can change employment status of a citizen : to working (if not working), to unemployed (if its employee)`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      event.target.reset();
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <article className="mb-3">
      <div className="shadow p-3">
        <h3 className="h4 mb-2">Change employment status of a citizen</h3>
        <form
          onSubmit={(e) => handleSubmitChangeEmployment(e)}
          className="mb-2"
        >
          <div className="mb-2">
            <label htmlFor="addressCitizenEmp" className="form-label">
              Address of citizen
            </label>
            <input
              type="text"
              id="addressCitizenEmp"
              name="addressCitizenEmp"
              placeholder="Enter the address"
              aria-label="input address to change employment status"
              aria-describedby="buttonChangeEmployment"
              required
              className="form-control"
            />
          </div>
          <button
            id="buttonChangeEmployment"
            type="submit"
            className={modeButtonClass}
          >
            Change Employment
          </button>
        </form>
      </div>
    </article>
  );
}

export default ChangeEmployment;
