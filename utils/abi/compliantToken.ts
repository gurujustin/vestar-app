export const compliantToken = {
	address: "0xEdad2dcAAB2b073106C698Ca7650fa7fbE56771c",
	abi: [
		{ inputs: [], stateMutability: "nonpayable", type: "constructor" },
		{
			inputs: [
				{
					internalType: "address",
					name: "_addresses",
					type: "address",
				},
			],
			name: "addToWhitelist",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
	],
} as const;
