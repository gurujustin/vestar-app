export const crowdSale = {
	address: '0x43146a4a32E44Bd1e166b1F8062b99C38aA19072',
	abi: [
		{ inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_amount",
          type: "uint256"
        }
      ],
      name: "buyToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
		},
	],
} as const
