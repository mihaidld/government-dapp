import React, { useContext } from "react";
import { ContractsContext } from "../context/ContractsContext";
import { ModeContext } from "../context/ModeContext";
import { useToast } from "@chakra-ui/core";

/* TODO: consider using useReducer and context for contracts */

function CheckHospital() {
  const { mode } = useContext(ModeContext);
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";
  const { government } = useContext(ContractsContext);
  const toast = useToast();

  const handleSubmitCheckHospital = async (event) => {
    try {
      event.preventDefault();
      const address = event.target.elements.addressHospital.value;
      const isRegistered = await government.checkHospital(address);
      isRegistered
        ? toast({
            position: "bottom",
            title: `Check Hospital Registration`,
            description: `The hospital at address ${address} is registered`,
            status: "success",
            duration: 5000,
            isClosable: true,
          })
        : toast({
            position: "bottom",
            title: `Check Hospital Registration`,
            description: `The hospital at address ${address} is not registered`,
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
        <h3 className="h4 mb-2">Check if registered hospital</h3>
        <form onSubmit={handleSubmitCheckHospital} className="mb-2">
          <div className="mb-2 ">
            <label className="form-label" htmlFor="addressHospital">
              Enter an address
            </label>
            <input
              id="addressHospital"
              name="addressHospital"
              placeholder="address"
              aria-label="input Address to check if registered hospital"
              aria-describedby="buttonCheckHospital"
              className="form-control"
            />
          </div>
          <button
            id="buttonCheckHospital"
            type="submit"
            className={modeButtonClass}
          >
            Check hospital registration
          </button>
        </form>
      </div>
    </article>
  );
}

export default CheckHospital;
