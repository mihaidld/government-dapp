import React, { useContext } from "react";
import { ContractsContext } from "../context/ContractsContext";
import { DappContext } from "../context/DappContext";
import { ModeContext } from "../context/ModeContext";
import "../form.css";
import { useToast } from "@chakra-ui/core";

function Denaturalize() {
  const { government } = useContext(ContractsContext);
  const { dappState } = useContext(DappContext);
  const { mode } = useContext(ModeContext);
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";
  const toast = useToast();

  const handleSubmitDenaturalize = async (event) => {
    try {
      event.preventDefault();
      const address = event.target.elements.addressCitizen.value;
      const getCitizen = await government.getCitizen(address);
      const sovereign = await government.sovereign();
      if (getCitizen.isAlive && dappState.isOwner && address !== sovereign) {
        await government.denaturalize(address);
        const cb = (citizenAddress) => {
          toast({
            position: "bottom",
            title: `Denaturalize Citizen`,
            description: `Citizen at address ${citizenAddress} is no longer a citizen`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        };
        const filter = government.filters.LostCitizenship(address);
        // listen once event CreatedCitizen
        government.once(filter, cb);
      } else {
        toast({
          position: "bottom",
          title: `Denaturalize Citizen`,
          description: `Only the sovereign can denaturalize a citizen, but the sovereign can not be denaturalized`,
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
    <>
      <section className="mb-3">
        <h3 className="h4 mb-2 text-danger">Denaturalize a Citizen</h3>
        <form onSubmit={(e) => handleSubmitDenaturalize(e)} className="mb-2">
          <div className="mb-2">
            <label htmlFor="addressCitizen" className="form-label">
              Address of the citizen
            </label>
            <input
              type="text"
              id="addressCitizen"
              name="addressCitizen"
              placeholder="Enter the address"
              aria-label="input address to denaturalize citizen"
              aria-describedby="buttonDenaturalize"
              required
              className="form-control"
            />
          </div>
          <button
            id="buttonDenaturalize"
            type="submit"
            className={modeButtonClass}
          >
            Denaturalize
          </button>
        </form>
      </section>
    </>
  );
}

export default Denaturalize;
