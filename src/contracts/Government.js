export const Government_address = "0x93188988493Baf351F891a95DFAE1e4D7BA519Ef";

export const Government_abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_priceSet",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "healthStatusOptions",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "howToPunish",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "howToVote",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
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
        name: "_citizenAddress",
        type: "address",
      },
    ],
    name: "citizen",
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
            name: "nbVotes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "termAdmin",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "retirementDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "termBanned",
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
    inputs: [
      {
        internalType: "uint8",
        name: "_id",
        type: "uint8",
      },
    ],
    name: "proposal",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "question",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "counterForVotes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "counterAgainstVotes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "counterBlankVotes",
            type: "uint256",
          },
        ],
        internalType: "struct Government.Proposal",
        name: "",
        type: "tuple",
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
        name: "_companyAddress",
        type: "address",
      },
    ],
    name: "company",
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
    name: "tokenAddress",
    outputs: [
      {
        internalType: "contract CitizenERC20",
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
        name: "_electorAddress",
        type: "address",
      },
    ],
    name: "dateVote",
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
    inputs: [],
    name: "currentMandateTerm",
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
    inputs: [],
    name: "dateNow",
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
        name: "_candidateAddress",
        type: "address",
      },
    ],
    name: "elect",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "updateMandate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_adminAddress",
        type: "address",
      },
    ],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_policy",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
    ],
    name: "proposePolicy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "_id",
        type: "uint8",
      },
      {
        internalType: "enum Government.Option",
        name: "_voteOption",
        type: "uint8",
      },
    ],
    name: "votePolicy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sentenced",
        type: "address",
      },
      {
        internalType: "enum Government.Punishment",
        name: "_option",
        type: "uint8",
      },
    ],
    name: "punish",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_beneficiary",
        type: "address",
      },
    ],
    name: "pardon",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_concerned",
        type: "address",
      },
      {
        internalType: "enum Government.HealthStatus",
        name: "_option",
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
        name: "_concerned",
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
        internalType: "address",
        name: "_companyAddress",
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
        internalType: "uint8",
        name: "_age",
        type: "uint8",
      },
      {
        internalType: "bool",
        name: "_isWorking",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "_isSick",
        type: "bool",
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
        name: "_employee",
        type: "address",
      },
    ],
    name: "recruit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_employee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "paySalary",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
