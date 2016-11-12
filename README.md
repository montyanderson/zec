# zec
Zcash RPC wallet wrapper.

## Usage

``` javascript
const Zcash = require("zcash");
const Zec = require("zec");

const rpc = Zcash.auto();
const wallet = new Zec(rpc);

wallet.balance().then(balance => {
	console.log(balance);
});
```
