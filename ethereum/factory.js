import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x0Bb9da0542355c1360BF3f6538836BF50a39AF17'
);

//0xc2e3D5d845Ef6db31302566f69e790f805A3f876
//
export default instance;