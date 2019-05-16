pragma solidity ^0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "@aragon/os/contracts/lib/math/SafeMath.sol";

contract Widgets is AragonApp {
    using SafeMath for uint256;

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
    bytes32 constant public MODIFIER_ROLE = keccak256("MODIFIER_ROLE");

    function initialize() external onlyInit {
        initialized();
    }

    /**
     * @notice Add a widget's IPFS hash to the registry
     * @param _addr IPFS hash of the widget's data
     */
    function addWidget(string _addr) external auth(MODIFIER_ROLE) {
        widgets.push(Widget(_addr, false));
        emit WidgetAdded();
    }

    /**
     * @notice Update a widget's IPFS hash
     * @param _priority Index of the widget
     * @param _addr IPFS hash of the widget's data
     */
    function updateWidget(uint _priority, string _addr) external auth(MODIFIER_ROLE) {
        Widget storage widget = widgets[_priority];
        widget.addr = _addr;
        emit WidgetUpdated();
    }

    /**
     * @notice Remove a widget from the registry
     * @param _priority Index of the widget
     */
    function removeWidget(uint _priority) external auth(MODIFIER_ROLE) {
        Widget storage widget = widgets[_priority];
        widget.addr = "";
        widget.deleted = true;
        emit WidgetRemoved();
    }

    /**
     * @notice Swap Two widgets
     * @param _priority1 index of the first widget to be swapped
     * @param _priority2 index of the second widget to be swapped
     */
    function reorderWidgets(uint _priority1, uint _priority2) external auth(MODIFIER_ROLE) {
        Widget memory temp = widgets[_priority1];
        widgets[_priority1] = widgets[_priority2];
        widgets[_priority2] = temp;
        emit WidgetsReordered();
    }

    /**
     * @notice Get the Length of the widgets array
     * @return  length of widgets array
     */
    function getWidgetsLength() external view returns(uint) {
        return widgets.length;
    }

    /**
     * @notice Get a widget's information
     * @param  _priority index of the widget
     */
    function getWidget(uint _priority) external view returns(string addr, bool deleted) {
        Widget storage widget = widgets[_priority];
        addr = widget.addr;
        deleted = widget.deleted;
    }

}
