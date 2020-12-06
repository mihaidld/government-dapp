import React, { useContext } from "react";
import { ContractsContext } from "../context/ContractsContext";
import { DappContext } from "../context/DappContext";
import { ModeContext } from "../context/ModeContext";
import "../form.css";
import { useToast } from "@chakra-ui/core";

function CompanyRegistration() {
  const { government } = useContext(ContractsContext);
  const { dappState } = useContext(DappContext);
  const { mode } = useContext(ModeContext);
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";
  const toast = useToast();

  const handleSubmitRegisterCompany = async (event) => {
    try {
      event.preventDefault();
      const address = event.target.elements.companyAddress.value;
      const isACompany = await government.checkCompany(address);
      if (dappState.isOwner && !isACompany) {
        await government.registerCompany(address);
        const cb = (company, isCompany) => {
          toast({
            position: "bottom",
            title: `Register Company`,
            description: `Company at address ${company} was successfully registered`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        };
        const filter = government.filters.SetCompany(address);
        // listen once event SetCompany
        government.once(filter, cb);
        event.target.reset();
      } else {
        toast({
          position: "bottom",
          title: `Register Company`,
          description: `Only the sovereign can register a Company if it's not already registered`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch {
      console.log(event.message);
    }
  };

  const handleSubmitUnregisterCompany = async (event) => {
    try {
      event.preventDefault();
      const address = event.target.elements.companyAddress2.value;
      const isACompany = await government.checkCompany(address);
      if (dappState.isOwner && isACompany) {
        await government.unregisterCompany(address);
        const cb = (company, isCompany) => {
          toast({
            position: "bottom",
            title: `Register Company`,
            description: `Company at address ${company} was successfully unregistered`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        };
        const filter = government.filters.SetCompany(address);
        // listen once event SetCompany
        government.once(filter, cb);
        event.target.reset();
      } else {
        toast({
          position: "bottom",
          title: `Unregister Company`,
          description: `Only the sovereign can unregister a registered Company`,
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
        <h3 className="h2">Register a Company</h3>
        <form onSubmit={(e) => handleSubmitRegisterCompany(e)} className="my-5">
          <div className="mb-3">
            <label htmlFor="companyAddress" className="form-label">
              Address of the company
            </label>
            <input
              type="text"
              id="companyAddress"
              name="companyAddress"
              placeholder="Enter company address"
              aria-label="input address for registering company"
              aria-describedby="buttonRegisterCompany"
              required
              className="form-control"
            />
          </div>
          <button
            id="buttonRegisterCompany"
            type="submit"
            className={modeButtonClass}
          >
            Register
          </button>
        </form>
        <h3 className="h2">Unregister a Company</h3>
        <form
          onSubmit={(e) => handleSubmitUnregisterCompany(e)}
          className="my-5"
        >
          <div className="mb-3">
            <label htmlFor="companyAddress2" className="form-label">
              Address of the company
            </label>
            <input
              type="text"
              id="companyAddress2"
              name="companyAddress2"
              placeholder="Enter company address"
              aria-label="input address for unregistering company"
              aria-describedby="buttonUnregisterCompany"
              required
              className="form-control"
            />
          </div>
          <button
            id="buttonUnregisterCompany"
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

export default CompanyRegistration;
