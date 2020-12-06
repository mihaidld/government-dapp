import React, { useContext } from "react";
import { ContractsContext } from "../context/ContractsContext";
import { DappContext } from "../context/DappContext";
import { ModeContext } from "../context/ModeContext";
import "../form.css";
import { useToast } from "@chakra-ui/core";
import { ethers } from "ethers";

/* TODO: toggle employed */

function ChangeEmployment() {
  const { government } = useContext(ContractsContext);
  const { dappState } = useContext(DappContext);
  const { mode } = useContext(ModeContext);
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";
  const toast = useToast();

  const handleSubmitChangeEmployment = async (event) => {
    try {
      event.preventDefault();
      const address = event.target.elements.addressCitizen.value;
      const getCitizen = await government.getCitizen(address);
      if (dappState.isCompany && getCitizen.isAlive) {
        await government.changeEmployment(address);
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
            duration: 5000,
            isClosable: true,
          });
        };
        const filter = government.filters.UpdatedEmployment(address);
        // listen once event UpdatedEmployment
        government.once(filter, cb);
        event.target.reset();
      } else {
        toast({
          position: "bottom",
          title: `Change Health`,
          description: `Only a company can change employment status of a citizen`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch {
      console.log(event.message);
    }
  };

  return (
    <>
      <section>
        <h3 className="h2">Change employment status of a citizen</h3>
        <form
          onSubmit={(e) => handleSubmitChangeEmployment(e)}
          className="my-5"
        >
          <div className="mb-3">
            <label htmlFor="option" className="form-label">
              Employment status option
            </label>
            <input
              type="text"
              id="addressCitizen"
              name="addressCitizen"
              placeholder="Enter the address"
              aria-label="input address to change employment status"
              aria-describedby="buttonChangeEmployment"
              required
              className="form-control"
            />
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
              </div>*/}
          </div>
          <button
            id="buttonChangeEmployment"
            type="submit"
            className={modeButtonClass}
          >
            Change Employment
          </button>
        </form>
      </section>
    </>
  );
}

export default ChangeEmployment;
