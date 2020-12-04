export const Government_address = "0x5c15550e4c0e33d0e0C2f4EaBE5DDa1dCE52E7A9";

export const Government_abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "priceFull",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "citizenAddress",
        type: "address",
      },
    ],
    name: "getCitizen",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "isAlive",
            type: "bool",
          },
          {
            internalType: "address",
            name: "employer",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isWorking",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isSick",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "retirementDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nbOfCurrentAccountTokens",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nbOfHealthInsuranceTokens",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nbOfUnemploymentTokens",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nbOfRetirementTokens",
            type: "uint256",
          },
        ],
        internalType: "struct Government.Citizen",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getToken",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "sovereign",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "price",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "hospitalAddress",
        type: "address",
      },
    ],
    name: "checkHospital",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "companyAddress",
        type: "address",
      },
    ],
    name: "checkCompany",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "setToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sentenced",
        type: "address",
      },
    ],
    name: "denaturalize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "concerned",
        type: "address",
      },
      {
        internalType: "enum Government.HealthStatus",
        name: "option",
        type: "uint8",
      },
    ],
    name: "changeHealthStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "concerned",
        type: "address",
      },
    ],
    name: "changeEmploymentStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "age",
        type: "uint256",
      },
    ],
    name: "becomeCitizen",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getRetired",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "hospitalAddress",
        type: "address",
      },
    ],
    name: "registerHospital",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "hospitalAddress",
        type: "address",
      },
    ],
    name: "unregisterHospital",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "companyAddress",
        type: "address",
      },
    ],
    name: "registerCompany",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "companyAddress",
        type: "address",
      },
    ],
    name: "unregisterCompany",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nbTokens",
        type: "uint256",
      },
    ],
    name: "buyTokens",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "employee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "paySalary",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
