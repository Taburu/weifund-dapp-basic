// requires
const QRious = require('qrious');

// utils
const utils = require('../utils/');
const log = utils.log;
const etherScanAddressUrl = utils.etherScanAddressUrl;
const etherScanTxHashUrl = utils.etherScanTxHashUrl;
const parseSolidityMethodName = utils.parseSolidityMethodName;
const oneDay = utils.oneDay;

// require components
const components = require('../components');

// environment
const environment = require('../environment');
const getNetwork = environment.getNetwork;
const getLocale = environment.getLocale;
const getContractEnvironment = environment.getContractEnvironment;
const txObject = environment.txObject;
const getDefaultAccount = environment.getDefaultAccount;
const setDefaultAccount = environment.setDefaultAccount;

// campaign environment methods
const getCampaign = environment.getCampaign;
const setCampaign = environment.setCampaign;
const getCampaigns = environment.getCampaigns;

// web3
const web3 = require('../web3').web3;

// loadCampaign method
const lib = require('../lib');
const getCampaignData = lib.getCampaign;
const getCampaignsData = lib.getCampaigns;

// router instance
var router = require('../router');
const refreshPageButtons = router.refreshPageButtons;

// require i18n
const t = require('../i18n').t;

const handleCampaignContribution = require('./handleCampaignContribution');

// draw account page
const loadAndDrawAccount = function(campaignID, callback) {
  // draw loader
  document.querySelector('#view-account').innerHTML = components.viewLoader({t: t});

  setTimeout(function(){
    document.querySelector('#view-account').innerHTML = components.accountView({web3: web3, t: t});
  }, 3000);
};

// export module
module.exports = loadAndDrawAccount;
