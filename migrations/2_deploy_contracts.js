/* global artifacts */
var HomePage = artifacts.require('HomePage.sol')

module.exports = function(deployer) {
  deployer.deploy(HomePage)
}
