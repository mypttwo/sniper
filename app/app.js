"use strict";

const ethers = require("ethers");
const { network_ws, mnemonic } = require("./config");

const uniswap_ = require("./uniswap");

const init = async () => {
  const provider = new ethers.providers.WebSocketProvider(network_ws);
  console.log(await provider.getNetwork());

  const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  console.log(await wallet.getAddress());

  const account = wallet.connect(provider);
  console.log(await account.getAddress());

  const uniswap = await uniswap_.init(account);

  console.log(uniswap.router);
};

init();
