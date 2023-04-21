// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract ExpectEmit {
    event Transfer(address indexed from, address indexed to, uint256 value);

    function emitTransfer() public {
        emit Transfer(msg.sender, address(1), 1);
    }
}
