## Vulnerability

Signing messages off-chain and then use the signature to execute a smart contract.

Same signature can be used multiple times:
1. multisig wallet
2. same smart contract but different address
3. different smart contract but same address (create2 and selfdestruct)


## Preventative Techniques

1. Sign messages with nonce
2. Sign messages with nonce and smart contract address
3. no solution


