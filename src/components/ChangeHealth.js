import React, { useContext } from "react";
import { ContractsContext } from "../context/ContractsContext";
import { DappContext } from "../context/DappContext";
import { ModeContext } from "../context/ModeContext";
import "../form.css";
import { useToast } from "@chakra-ui/core";
import { ethers } from "ethers";

function ChangeHealth() {
  const { government } = useContext(ContractsContext);
  const { dappState } = useContext(DappContext);
  const { mode } = useContext(ModeContext);
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";
  const toast = useToast();

  const handleSubmitChangeHealth = async (event) => {
    try {
      event.preventDefault();
      const address = event.target.elements.addressCitizen.value;
      const option = event.target.elements.option.value;
      let numberOption;
      switch (option) {
        case "dead":
          numberOption = 0;
          break;
        case "healthy":
          numberOption = 1;
          break;
        case "sick":
          numberOption = 2;
          break;
        default:
          numberOption = "";
      }
      const getCitizen = await government.getCitizen(address);
      if (
        dappState.isHospital &&
        getCitizen.isAlive &&
        (numberOption === 0 || numberOption === 1 || numberOption === 2)
      ) {
        await government.changeHealthStatus(address, numberOption);
        const cb1 = (citizenAddress) => {
          toast({
            position: "bottom",
            title: `Declare dead`,
            description: `Citizen at address ${citizenAddress} was declared dead and is no longer a citizen`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        };
        const filter1 = government.filters.LostCitizenship(address);

        const cb2 = (citizenAddress, isSick, currentTokens, healthTokens) => {
          toast({
            position: "bottom",
            title: `Change Health`,
            description: `Citizen at address ${citizenAddress} was successfully declared ${
              isSick ? "sick" : "healthy"
            }, has ${ethers.utils.formatEther(
              currentTokens
            )} tokens in current account and ${ethers.utils.formatEther(
              healthTokens
            )} tokens as health insurance`,
            status: "success",
            duration: 10000,
            isClosable: true,
          });
        };
        const filter2 = government.filters.UpdatedHealth(address);
        // listen once event UpdatedHealth or LostCitizenship
        numberOption
          ? government.once(filter2, cb2)
          : government.once(filter1, cb1);
      } else {
        toast({
          position: "bottom",
          title: `Change Health`,
          description: `Only a hospital can change health status of a citizen to dead, healthy or sick`,
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
        <h3 className="h4 mb-2">Change health status of a citizen</h3>
        <form onSubmit={(e) => handleSubmitChangeHealth(e)} className="mb-2">
          <div className="mb-2">
            <label htmlFor="option" className="form-label">
              Health status option
            </label>
            <input
              type="text"
              id="addressCitizen"
              name="addressCitizen"
              placeholder="Enter the address"
              aria-label="input address to change health status"
              aria-describedby="buttonChangeHealth"
              required
              className="form-control mb-2"
            />
            <select
              className={`form-select ${modeButtonClass}`}
              id="option"
              aria-label="select health status options"
            >
              <option value="">Please choose a health status option</option>
              <option value="dead">Dead</option>
              <option value="healthy">Healthy</option>
              <option value="sick">Sick</option>
            </select>
          </div>
          <button
            id="buttonChangeHealth"
            type="submit"
            className={modeButtonClass}
          >
            Change Health
          </button>
        </form>
      </div>
    </article>
  );
}

export default ChangeHealth;
