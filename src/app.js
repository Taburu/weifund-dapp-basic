// view handling
const views = require('./views');
const closeAllViews = views.closeAllViews;
const openView = views.openView;
const openSubView = views.openSubView;

// environment
const environment = require('./environment');
const setDefaultAccount = environment.setDefaultAccount;

// web3 instance and setup method
const web3 = require('./web3').web3;
const setupWeb3Provider = require('./web3').setupWeb3Provider;

// ipfs instance and setup
const setupIPFSProvider = require('./ipfs').setupIPFSProvider;

// require contracts
// setup campaign and data registries
// Campaign/token contracts
const contracts = require('./contracts');
const campaignRegistry = contracts.campaignRegistryContract;
const staffPicks = contracts.staffPicksContract;
const campaignDataRegistry = contracts.campaignDataRegistryContract;

// loadCampaign method
// load campaigns
const loadTransaction = require('./lib/loadTransaction');

// router instance
const router = require('./router');
const setupRouter = router.setupRouter;
const getRouter = router.getRouter;

// require i18n
const t = require('./i18n').t;

// handlers draw
const handlers = require('./handlers');
const drawNavBar = handlers.drawNavBar;
const drawFooter = handlers.drawFooter;
const drawStartCampaignView = handlers.drawStartCampaignView;

const drawCampaigns = handlers.drawCampaigns;
const loadAndDrawCampaign = handlers.loadAndDrawCampaign;

const handleNewCampaign = handlers.handleNewCampaign;
const handleRegisterCampaign = handlers.handleRegisterCampaign;
const handleCampaignContribution = handlers.handleCampaignContribution;
const handleCampaignRefund = handlers.handleCampaignRefund;
const handleCampaignPayout = handlers.handleCampaignPayout;
const handleRegisterCampaignData = handlers.handleCampaignPayout;
const loadAndDrawCampaignsList = handlers.loadAndDrawCampaignsList;
const loadAndDrawCampaignContribute = handlers.loadAndDrawCampaignContribute;
const loadAndDrawCampaignPayout = handlers.loadAndDrawCampaignPayout;

// draw navbar
drawNavBar();

// draw startcampaign page
drawStartCampaignView();

// confirm on page exit
const confirmOnPageExit = function (e) {
  // If we haven't been passed the event get the window.event
  e = e || window.event;

  const message = `
    WARNING:


    Leaving this page while a transaction is in progress may result in a loss of funds or data.

    Please ensure your transactions have completed or are not in progress before exiting or reloading this page.
  `;

  // For IE6-8 and Firefox prior to version 4
  if (e) {
    e.returnValue = message;
  }

  // For Chrome, Safari, IE8+ and Opera 12+
  return message;
};

// load application
const loadApp = function() {
  // window warnign message
  window.onunload = window.onbeforeunload = confirmOnPageExit;

  // setup the web3 provider
  setupWeb3Provider();
  setupIPFSProvider();

  // setup the router
  setupRouter({
    openView: openView,
    openSubView: openSubView,
    loadAndDrawCampaignPayout: loadAndDrawCampaignPayout,
    loadAndDrawCampaignContribute: loadAndDrawCampaignContribute,
    loadAndDrawCampaignsList: loadAndDrawCampaignsList,
    loadAndDrawCampaign: loadAndDrawCampaign,
  });

  // set initial route from params
  getRouter()(window.location.pathname);

  // select default account
  web3.eth.getAccounts(function(accountsError, accounts){
    if (!accountsError && accounts.length) {
      setDefaultAccount(accounts[0]);
      //drawSelectedAccount();

      /* const txObject = require('./environment').txObject;
      const classes = require('./contracts').classes;
      const standardRefundCampaignFactory = require('./contracts').standardRefundCampaignFactory;

      standardRefundCampaignFactory.new(Object.assign({data: classes.StandardRefundCampaignFactory.bytecode},  txObject()), function(err, result){
        console.log('refund camp factory', err, result);
      }); */
    }
  });

  // draw footer later
  drawFooter();

  // new campaign
  //document.querySelector('#startCampaign_button').addEventListener('click', handleStartCampaign);

  // add payout event listener
  //document.querySelector('#payout').addEventListener('click', handleCampaignPayout);

  // add contribute event listener
  //document.querySelector('#contribute').addEventListener('click', handleCampaignContribution);

  // register campaign button
  document.querySelector('#registerCampaign').addEventListener('click', handleRegisterCampaign);

  // ipfs register
  document.querySelector('#registerCampaignData').addEventListener('click', handleRegisterCampaignData);
};

// setup provider
// attempt conenction and run system
window.addEventListener('load', loadApp);
