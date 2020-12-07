import React, { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { ContractsContext } from "../context/ContractsContext";
import { DappContext } from "../context/DappContext";
import { ModeContext } from "../context/ModeContext";
import "../form.css";
import { useToast } from "@chakra-ui/core";
import { ethers } from "ethers";

function PaySalary() {
  const { web3State } = useContext(Web3Context);
  const { token, government } = useContext(ContractsContext);
  const { dappState } = useContext(DappContext);
  const { mode } = useContext(ModeContext);
  const modeButtonClass =
    mode === "dark" ? "btn btn-outline-light" : "btn btn-outline-dark";
  const toast = useToast();

  const handleSubmitPaySalary = async (event) => {
    try {
      event.preventDefault();
      const address = event.target.elements.addressCitizen.value;
      const amount = event.target.elements.amount.value;
      const getCitizen = await government.getCitizen(address);
      const nbTokens = ethers.utils.parseEther(amount);
      if (
        dappState.isCompany &&
        getCitizen.employer.toLowerCase() === web3State.account &&
        token.balanceOf(web3State.account) >= nbTokens
      ) {
        await government.paySalary(address, nbTokens);
        const cb1 = (from, to, value) => {
          toast({
            position: "bottom",
            title: `Transfer tokens`,
            description: `${ethers.utils.formatEther(
              value
            )} were transfered from you to employee with address ${to}`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        };
        const filter1 = token.filters.Transfer(web3State.account, address);
        // listen once event Transfer
        token.once(filter1, cb1);
        const cb2 = (
          citizenAddress,
          amount,
          employer,
          currentTokens,
          healthTokens,
          unemploymentTokens,
          retirementTokens
        ) => {
          toast({
            position: "bottom",
            title: `Pay Salary`,
            description: `Employee at address ${citizenAddress} has successfully received a salary of ${ethers.utils.formatEther(
              amount
            )} from company ${employer}, has ${ethers.utils.formatEther(
              currentTokens
            )} tokens in current account, ${ethers.utils.formatEther(
              healthTokens
            )} tokens as health insurance, ${ethers.utils.formatEther(
              unemploymentTokens
            )} tokens as unemployment insurance and ${ethers.utils.formatEther(
              retirementTokens
            )} tokens as retirement insurance`,
            status: "success",
            duration: 15000,
            isClosable: true,
          });
        };
        const filter2 = government.filters.Paid(
          address,
          nbTokens,
          web3State.account
        );
        // listen once event Paid
        government.once(filter2, cb2);
      } else {
        toast({
          position: "bottom",
          title: `Pay Salary Health`,
          description: `Only a company can pay an employee citizen is it has enough tokens in balance`,
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
        <h3 className="h4 mb-2">Pay salary to an employee</h3>
        <form onSubmit={(e) => handleSubmitPaySalary(e)} className="mb-2">
          <div className="mb-2">
            <label htmlFor="addressCitizen" className="form-label">
              Address of the employee
            </label>
            <input
              type="text"
              id="addressCitizen"
              name="addressCitizen"
              placeholder="Enter the address"
              aria-label="input address to pay salary"
              aria-describedby="buttonPaySalary"
              required
              className="form-control"
            />
            <label htmlFor="amount" className="form-label">
              Salary amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Enter the salary amount"
              aria-label="input amount to pay salary"
              aria-describedby="buttonPaySalary"
              required
              className="form-control"
            />
          </div>
          <button
            id="buttonPaySalary"
            type="submit"
            className={modeButtonClass}
          >
            Pay Salary
          </button>
        </form>
      </section>
    </>
  );
}

export default PaySalary;
