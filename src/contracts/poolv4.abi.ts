export default [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      }
    ],
    name: 'depositNft1155',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_nft1155TokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_nft1155Amount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_tokenAmount',
        type: 'uint256'
      }
    ],
    name: 'depositNft1155AndToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256'
      }
    ],
    name: 'depositNft721',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_nft721TokenId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_tokenAmount',
        type: 'uint256'
      }
    ],
    name: 'depositNft721AndToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      }
    ],
    name: 'depositToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getPoolInfo',
    outputs: [
      {
        internalType: 'address',
        name: '_stakingTokenAddress',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_stakingTokenUnit',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_stakingNft721Address',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_stakingNft1155Address',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_stakingNft1155Id',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_rewardsTokenAddress',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_rewardsTokenUnit',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_poolShareAmount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_poolTokenAmount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_poolNft721Amount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_poolNft1155Amount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_poolRewardsAmount',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getPoolTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '_startTs',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_endTs',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_withdrawEnableTs',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address'
      }
    ],
    name: 'getPosition',
    outputs: [
      {
        internalType: 'uint256',
        name: '_stakedTokenAmount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_stakingTokenUnit',
        type: 'uint256'
      },
      {
        internalType: 'uint256[]',
        name: '_stakedNft721Ids',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256[]',
        name: '_stakedNft1155Ids',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256',
        name: '_pendingRewards',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_rewardsTokenUnit',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'poolNft1155Amount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'poolNft721Amount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'poolRewardsAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'poolShareAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'poolTokenAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'rewardsTokenUnit',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'sharePerNft',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'stakingTokenUnit',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'withdrawAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const
