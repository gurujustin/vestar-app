export const compliantToken = {
	address: '0x8AA894614874a22c74dCa03c6421655bc590a072',
	abi: [
		{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
		{
			inputs: [
				{
					internalType: "address",
					name: "_addresses",
					type: "address"
				}
			],
			name: "addToWhitelist",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function"
		},
	],
} as const
