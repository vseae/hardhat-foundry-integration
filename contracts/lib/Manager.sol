// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";

contract Manager is AccessControl, Ownable, Pausable {
    bool public live;
    bytes32 public constant OPERATOR = keccak256("OPERATOR");

    modifier onlyLive() {
        require(live, "Manager: not live");
        _;
    }
    modifier isAuthorized() {
        require(hasRole(OPERATOR, msg.sender) || owner() == msg.sender, "Manager: caller is not authorized");
        _;
    }

    function setLive(bool _live) external virtual isAuthorized {
        live = _live;
    }

    function grantRole(bytes32 role, address account) public virtual override onlyOwner {
        _grantRole(role, account);
    }

    function revokeRole(bytes32 role, address account) public virtual override onlyOwner {
        _revokeRole(role, account);
    }

    function grantOperatorRole(address account) external virtual onlyOwner {
        _grantRole(OPERATOR, account);
    }

    function revokeOperatorRole(address account) external virtual onlyOwner {
        _revokeRole(OPERATOR, account);
    }

}
