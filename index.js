class Zec {
	constructor(rpc) {
		this.rpc = rpc;
	}

	balance() {
		return this.rpc.z_gettotalbalance();
	}

	tAddresses() {
		return this.rpc.getaddressesbyaccount("");
	}

	zAddresses() {
		return this.rpc.z_listaddresses();
	}

	addresses() {
		return Promise.all([this.tAddresses(), this.zAddresses()])
		.then(res => {
			return [].concat(...res);
		});
	}

	send(address, amount) {
		return Promise.resolve().then(() => {
			if(!address || !amount) {
				throw new Error("Please provide an address and amount!");
			}

			const { rpc } = this;

			return Promise.all([ /* this.zAddresses(), */ this.tAddresses() ])
			.then(res => {
				const addresses = [].concat(...res);

				return Promise.all(addresses.map(a => rpc.z_getbalance(a)))
				.then(balances => {
					for(let i = 0; i < addresses.length; i++) {
						if(balances[i] > amount) {
							return rpc.z_sendmany(addresses[i], {amount, address});
						}
					}

					throw new Error("Not enough funds!");
				});
			});
		});
	}
}

module.exports = Zec;
