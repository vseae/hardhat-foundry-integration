// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {AccessControlUpgradeable} from "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

contract ManagerUpgradeable is AccessControlUpgradeable, OwnableUpgradeable, PausableUpgradeable {
    bool public live;
    bytes32 public constant OPERATOR = keccak256("OPERATOR");

    modifier onlyLive() {
        require(live, "ManagerUpgradeable: not live");
        _;
    }
    modifier isAuthorized() {
        require(hasRole(OPERATOR, msg.sender) || owner() == msg.sender, "ManagerUpgradeable: caller is not authorized");
        _;
    }

    function setLive(bool _live) external virtual isAuthorized {
        live = _live;
    }

    function grantRole(bytes32 role, address account) external virtual onlyOwner {
        _grantRole(role, account);
    }

    function revokeRole(bytes32 role, address account) external virtual onlyOwner {
        _revokeRole(role, account);
    }
}
