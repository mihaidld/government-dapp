import React, { useContext } from "react";
import { ContractsContext } from "../context/ContractsContext";
import { DappContext } from "../context/DappContext";
import { useToast } from "@chakra-ui/core";

function Denaturalize() {
  // consume context
  const { government } = useContext(ContractsContext);
  const { dappState } = useContext(DappContext);

  const toast = useToast();

  // define event handler for submitting form with security check to prevent reaching revert from the blockchain
  const handleSubmitDenaturalize = async (event) => {
    try {
      event.preventDefault();
      const address = event.target.elements.addressCitizenDe.value;
      const getCitizen = await government.getCitizen(address);
      const sovereign = await government.sovereign();
      if (getCitizen.isAlive && dappState.isOwner && address !== sovereign) {
        await government.denaturalize(address);

        /* callback function with same arguments as those of LostCitizenship
        event emitted by contract Government, sets state and gives feeback to
        users after an action has taken place */
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
        // create event filter only with indexed Event parameters
        const filter = government.filters.LostCitizenship(address);
        // listen once event LostCitizenship searching for entries which match the filter
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
    <article className="mb-3">
      <div className="shadow p-3">
        <h3 className="h4 mb-2">Denaturalize a Citizen</h3>
        <form onSubmit={(e) => handleSubmitDenaturalize(e)} className="mb-2">
          <div className="mb-2">
            <label htmlFor="addressCitizenDe" className="form-label">
              Address of the citizen
            </label>
            <input
              type="text"
              id="addressCitizenDe"
              name="addressCitizenDe"
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
            className="btn btn-outline-danger"
          >
            Denaturalize
          </button>
        </form>
      </div>
    </article>
  );
}

export default Denaturalize;
