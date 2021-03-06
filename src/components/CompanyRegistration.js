import React, { useContext } from "react";
import { ContractsContext } from "../context/ContractsContext";
import { DappContext } from "../context/DappContext";
import { ModeContext } from "../context/ModeContext";
import { useToast } from "@chakra-ui/core";

function CompanyRegistration() {
  // consume context
  const { government } = useContext(ContractsContext);
  const { dappState } = useContext(DappContext);
  const { mode } = useContext(ModeContext);

  // define classes to handle mode
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";

  const toast = useToast();

  /* define event handler for submitting form to register a company with
  security check to prevent reaching revert from the blockchain */
  const handleSubmitRegisterCompany = async (event) => {
    try {
      event.preventDefault();
      const address = event.target.elements.companyAddress.value;
      const isACompany = await government.checkCompany(address);
      if (dappState.isOwner && !isACompany) {
        await government.registerCompany(address);

        /* callback function with same arguments as those of SetCompany event
        emitted by contract Government, gives feeback to users after an action
        has taken place */
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
        // create event filter only with indexed Event parameters
        const filter = government.filters.SetCompany(address);
        // listen once event SetCompany searching for entries which match the filter
        government.once(filter, cb);
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
      event.target.reset();
    } catch (e) {
      console.log(e.message);
    }
  };

  /* define event handler for submitting form to unregister a company with
  security check to prevent reaching revert from the blockchain */
  const handleSubmitUnregisterCompany = async (event) => {
    try {
      event.preventDefault();
      const address = event.target.elements.companyAddress2.value;
      const isACompany = await government.checkCompany(address);
      if (dappState.isOwner && isACompany) {
        await government.unregisterCompany(address);

        /* callback function with same arguments as those of SetCompany event
        emitted by contract Government, gives feeback to users after an action
        has taken place */
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
        // create event filter only with indexed Event parameters
        const filter = government.filters.SetCompany(address);
        // listen once event SetCompany searching for entries which match the filter
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
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <article className="mb-3">
        <div className="shadow p-3">
          <h3 className="h4 mb-2">Register a Company</h3>
          <form
            onSubmit={(e) => handleSubmitRegisterCompany(e)}
            className="mb-2"
          >
            <div className="mb-2">
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
        </div>
      </article>
      <article className="mb-3">
        <div className="shadow p-3">
          <h3 className="h4 mb-2">Unregister a Company</h3>
          <form
            onSubmit={(e) => handleSubmitUnregisterCompany(e)}
            className="mb-2"
          >
            <div className="mb-2">
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
              className="btn btn-outline-danger"
            >
              Unregister
            </button>
          </form>
        </div>
      </article>
    </>
  );
}

export default CompanyRegistration;
