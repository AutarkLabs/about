/* global artifacts */
var About = artifacts.require('About.sol')

module.exports = function(deployer) {
  deployer.deploy(About)
}
