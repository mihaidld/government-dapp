import React, { useContext } from "react";
import { ContractsContext } from "../context/ContractsContext";
import { DappContext } from "../context/DappContext";
import { ModeContext } from "../context/ModeContext";
import "../form.css";
import { useToast } from "@chakra-ui/core";

function HospitalRegistration() {
  const { government } = useContext(ContractsContext);
  const { dappState } = useContext(DappContext);
  const { mode } = useContext(ModeContext);
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";
  const toast = useToast();

  const handleSubmitRegisterHospital = async (event) => {
    try {
      event.preventDefault();
      const address = event.target.elements.hospitalAddress.value;
      const isAHospital = await government.checkHospital(address);
      if (dappState.isOwner && !isAHospital) {
        await government.registerHospital(address);
        const cb = (hospital, isHospital) => {
          toast({
            position: "bottom",
            title: `Register Hospital`,
            description: `Hospital at address ${hospital} was successfully registered`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        };
        const filter = government.filters.SetHospital(address);
        // listen once event SetHospital
        government.once(filter, cb);
        event.target.reset();
      } else {
        toast({
          position: "bottom",
          title: `Register Hospital`,
          description: `Only the sovereign can register a Hospital if it's not already registered`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch {
      console.log(event.message);
    }
  };

  const handleSubmitUnregisterHospital = async (event) => {
    try {
      event.preventDefault();
      const address = event.target.elements.hospitalAddress2.value;
      const isAHospital = await government.checkHospital(address);
      if (dappState.isOwner && isAHospital) {
        await government.unregisterHospital(address);
        const cb = (hospital, isHospital) => {
          toast({
            position: "bottom",
            title: `Register Hospital`,
            description: `Hospital at address ${hospital} was successfully unregistered`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        };
        const filter = government.filters.SetHospital(address);
        // listen once event SetHospital
        government.once(filter, cb);
        event.target.reset();
      } else {
        toast({
          position: "bottom",
          title: `Unregister Hospital`,
          description: `Only the sovereign can unregister a registered Hospital`,
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
        <h3 className="h2">Register a Hospital</h3>
        <form onSubmit={(e) => handleSubmitRegisterHospital(e)} className="my-5">
          <div className="mb-3">
            <label htmlFor="hospitalAddress" className="form-label">
              Address of the hospital
            </label>
            <input
              type="text"
              id="hospitalAddress"
              name="hospitalAddress"
              placeholder="Enter hospital address"
              aria-label="input address for registering hospital"
              aria-describedby="buttonRegisterHospital"
              required
              className="form-control"
            />
          </div>
          <button
            id="buttonRegisterHospital"
            type="submit"
            className={modeButtonClass}
          >
            Register
          </button>
        </form>
        <h3 className="h2">Unregister a Hospital</h3>
        <form
          onSubmit={(e) => handleSubmitUnregisterHospital(e)}
          className="my-5"
        >
          <div className="mb-3">
            <label htmlFor="hospitalAddress2" className="form-label">
              Address of the hospital
            </label>
            <input
              type="text"
              id="hospitalAddress2"
              name="hospitalAddress2"
              placeholder="Enter hospital address"
              aria-label="input address for unregistering hospital"
              aria-describedby="buttonUnregisterHospital"
              required
              className="form-control"
            />
          </div>
          <button
            id="buttonUnregisterHospital"
            type="submit"
            className={modeButtonClass}
          >
            Unregister
          </button>
        </form>
      </section>
    </>
  );
}

export default HospitalRegistration;
