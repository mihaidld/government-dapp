import React, { useContext } from "react";
import { ContractsContext } from "../context/ContractsContext";
import { ModeContext } from "../context/ModeContext";
import { useToast } from "@chakra-ui/core";

/* TODO: consider using useReducer and context for contracts */

function CheckCompany() {
  const { mode } = useContext(ModeContext);
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";
  const { government } = useContext(ContractsContext);
  const toast = useToast();

  const handleSubmitCheckCompany = async (event) => {
    try {
      event.preventDefault();
      const address = event.target.elements.addressCompany.value;
      const isRegistered = await government.checkCompany(address);
      isRegistered
        ? toast({
            position: "bottom",
            title: `Check Company Registration`,
            description: `The company at address ${address} is registered`,
            status: "success",
            duration: 5000,
            isClosable: true,
          })
        : toast({
            position: "bottom",
            title: `Check Company Registration`,
            description: `The company at address ${address} is not registered`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
      event.target.reset();
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <article className="mb-3">
      <div className="shadow p-3">
        <h3 className="h4 mb-2">Check if registered company</h3>
        <form onSubmit={handleSubmitCheckCompany} className="mb-2">
          <div className="mb-2 ">
            <label className="form-label" htmlFor="addressCompany">
              Enter an address
            </label>
            <input
              id="addressCompany"
              name="addressCompany"
              placeholder="address"
              aria-label="input Address to check if registered company"
              aria-describedby="buttonCheckCompany"
              className="form-control"
            />
          </div>
          <button
            id="buttonCheckCompany"
            type="submit"
            className={modeButtonClass}
          >
            Check company registration
          </button>
        </form>
      </div>
    </article>
  );
}

export default CheckCompany;
