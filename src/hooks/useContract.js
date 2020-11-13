/*
import { ethers } from 'ethers'
import React, { useEffect } from 'react'

const ethersCallReducer = (state, action) => {
  switch (action.type) {
    case 'SET_contract':
      return { ...state, contract: action.contract }
    case 'success':
      return {
        ...state,
        success: true,
        loading: false,
        error: false,
        response: action.response,
      }
    case 'loading':
      state = { ...initialState }
      return { ...state, success: false, loading: true, error: false }
    case 'error':
      return {
        ...state,
        success: false,
        loading: false,
        error: true,
        message: action.message,
      }
    default:
      throw new Error(`${action.type} not handled in contractReducer`)
  }
}

const callState = {
  read_contract: null,
  write_contract: null,
  success: false,
  loading: false,
  error: false,
  response: null,
}

const useContract = (address, abi, provider) => {
  useEffect(() => {
    const read_contract = new ethers.contract(address, abi, provider)
    const signer = provider.getSigner()
    const write_contract = new ethers.contract(address, abi, signer)
  }, [])
}
*/
