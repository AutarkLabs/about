pragma solidity ^0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";


contract About is AragonApp {

    /// Events
    event ContentUpdated(string cid);

    /// State
    string public content;

    /// ACL
    /* Hard-coded constant to save gas
    string constant public UPDATE_CONTENT = keccak256("UPDATE_CONTENT");
    */
    bytes32 constant public UPDATE_CONTENT = 0x8691816984471a5bab51dbc26f2ae34202509c759f4f5a38cfc5eaceda98eeb7;

    /**
     * @notice Custom constructor to initialize aragon app
     */
    function initialize() external onlyInit {
        initialized();
    }

    /**
     * @notice Update content to `cid`
     * @param cid IPFS hash of the app's data
     */
    function updateContent(string cid) external auth(UPDATE_CONTENT) {
        content = cid;
        emit ContentUpdated(cid);
    }
}
