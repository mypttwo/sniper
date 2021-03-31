"use strict";

const ethers = require("ethers");

const addresses = {
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  factory: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
  router: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
};

const init = async (account) => {
  const factory = new ethers.Contract(
    addresses.factory,
    [
      "event PairCreated(address indexed token0, address indexed token1, address pair, uint)",
    ],
    account
  );

  factory.on("PairCreated", async (token0, token1, pairAddress) => {
    console.log(`
      New pair detected
      =================
      token0: ${token0}
      token1: ${token1}
      pairAddress: ${pairAddress}
    `);

    //The quote currency needs to be WETH (we will pay with WETH)
    let tokenIn, tokenOut;
    if (token0 === addresses.WETH) {
      tokenIn = token0;
      tokenOut = token1;
    }

    if (token1 == addresses.WETH) {
      tokenIn = token1;
      tokenOut = token0;
    }

    //The quote currency is not WETH
    if (typeof tokenIn === "undefined") {
      return;
    }
  });

  const router = new ethers.Contract(
    addresses.router,
    [
      "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)",
      "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)",
    ],
    account
  );

  return {
    factory,
    router,
  };
};

module.exports = {
  addresses,
  init,
};
