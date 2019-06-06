pragma solidity ^0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";


contract HomePage is AragonApp {

    /// Events
    event WidgetAdded();
    event WidgetRemoved();
    event WidgetsReordered();
    event WidgetUpdated();

    /// Struct
    struct Widget {
        string addr;
        bool deleted;
    }

    /// State
    Widget[] public widgets;

    /// ACL
    /* Hardcoded constants to save gas
    bytes32 constant public ADD_ROLE = keccak256("ADD_ROLE");
    bytes32 constant public REMOVE_ROLE = keccak256("REMOVE_ROLE");
    bytes32 constant public REORDER_ROLE = keccak256("REORDER_ROLE");
    bytes32 constant public UPDATE_ROLE = keccak256("UPDATE_ROLE");
    */
    bytes32 constant public ADD_ROLE = 0x9fdb66370b2703c58b55fbb88662023f986df503f838f6ca75ff9f9bdabd694a;
    bytes32 constant public REMOVE_ROLE = 0x0a55cd9c498e2688378e5cd183217e75c0fa1cdbaa909387f565177cd47670f5;
    bytes32 constant public REORDER_ROLE = 0x0210352125167815ae2d54bb8e405f542b6cd4763cd039d14f046edad97dc03d;
    bytes32 constant public UPDATE_ROLE = 0x3ee192ac25847473237ced4bba57f848e1fd794930ff85b42823290580967205;

    /**
     * @notice Custom constructor to initialize aragon app
     */
    function initialize() external onlyInit {
        initialized();
    }

    /**
     * @notice Add a widget to the registry https://ipfs.infura.io/ipfs/`_addr`
     * @param _addr IPFS hash of the widget's data
     */
    function addWidget(string _addr) external auth(ADD_ROLE) {
        widgets.push(Widget(_addr, false));
        emit WidgetAdded();
    }

    /**
     * @notice Update widget `_priority` to https://ipfs.infura.io/ipfs/`_addr`
     * @param _priority Index of the widget
     * @param _addr IPFS hash of the widget's data
     */
    function updateWidget(uint _priority, string _addr) external auth(UPDATE_ROLE) {
        Widget memory widget = widgets[_priority];
        widget.addr = _addr;
        emit WidgetUpdated();
    }

    /**
     * @notice Remove a widget from the registry
     * @param _priority Index of the widget
     */
    function removeWidget(uint _priority) external auth(REMOVE_ROLE) {
        Widget memory widget = widgets[_priority];
        widget.addr = "";
        widget.deleted = true;
        emit WidgetRemoved();
    }

    /**
     * @notice Swap Two widgets
     * @param _priority1 index of the first widget to be swapped
     * @param _priority2 index of the second widget to be swapped
     */
    function reorderWidgets(uint _priority1, uint _priority2) external auth(REORDER_ROLE) {
        Widget memory temp = widgets[_priority1];
        widgets[_priority1] = widgets[_priority2];
        widgets[_priority2] = temp;
        emit WidgetsReordered();
    }

    /**
     * @notice Get the Length of the widgets array
     * @return  length of widgets array
     */
    function getWCount() external view returns(uint) {
        return widgets.length;
    }

    /**
     * @notice Get a widget's information
     * @param  _priority index of the widget
     */
    function getWidget(uint _priority) external view returns(string addr, bool deleted) {
        Widget memory widget = widgets[_priority];
        addr = widget.addr;
        deleted = widget.deleted;
    }
}
