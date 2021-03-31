"use strict";

require("dotenv").config();

const network_ws = process.env.NETWORK_WS_API_KEY;
const mnemonic = process.env.MNEMONIC;

module.exports = {
  network_ws,
  mnemonic,
};
