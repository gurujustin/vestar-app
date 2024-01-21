export const crowdSale = {
	address: "0x10E8e70F3186f5a35db88180C225701b36057Ee0",
	abi: [
		{ inputs: [], stateMutability: "nonpayable", type: "constructor" },
		{
			inputs: [
				{
					internalType: "uint256",
					name: "_amount",
					type: "uint256",
				},
			],
			name: "buyToken",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
	],
} as const;
