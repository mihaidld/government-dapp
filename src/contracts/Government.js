// Address of deployed Government contract
export const Government_address = "0x31125f714333CDbA54FB5B09ba220bB6FbD36540";

// Application binary interface of deployed Government contract
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
        name: "citizenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isAlive",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "address",
        name: "employer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isWorking",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isSick",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "retirementDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "currentTokens",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "healthTokens",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unemploymentTokens",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "retirementTokens",
        type: "uint256",
      },
    ],
    name: "CreatedCitizen",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "citizenAddress",
        type: "address",
      },
    ],
    name: "LostCitizenship",
    type: "event",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "citizenAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "employer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "currentTokens",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "healthTokens",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unemploymentTokens",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "retirementTokens",
        type: "uint256",
      },
    ],
    name: "Paid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "citizenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "employer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isWorking",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "currentTokens",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unemploymentTokens",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "retirementTokens",
        type: "uint256",
      },
    ],
    name: "Retired",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "company",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isCompany",
        type: "bool",
      },
    ],
    name: "SetCompany",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "hospital",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isHospital",
        type: "bool",
      },
    ],
    name: "SetHospital",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "citizenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "employer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isWorking",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "currentTokens",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "unemploymentTokens",
        type: "uint256",
      },
    ],
    name: "UpdatedEmployment",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "citizenAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isSick",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "currentTokens",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "healthTokens",
        type: "uint256",
      },
    ],
    name: "UpdatedHealth",
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
            name: "currentTokens",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "healthTokens",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "unemploymentTokens",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "retirementTokens",
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
