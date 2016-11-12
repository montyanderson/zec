const Zcash = require("zcash");
const Zec = require("./");

const rpc = Zcash.auto();
const wallet = new Zec(rpc);

wallet.send("sd", 0.01).then(a => console.log(a));
