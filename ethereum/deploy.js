const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const mnemonic_key = 'capable lonely artefact slab rose bright salute approve dirt hunt success rhythm'
const deployment_endpoint = 'https://rinkeby.infura.io/3yncctZq92cWDIs4ctIZ'

const provider = new HDWalletProvider(
    mnemonic_key,
    deployment_endpoint
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('attempting to deploy from account ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: '0x' + compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' })

    console.log('Contract deployed to ',result.options.address);
};
deploy()