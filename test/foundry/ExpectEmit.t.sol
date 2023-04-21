// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import {Test} from "forge-std/Test.sol";
import {ExpectEmit} from "../../contracts/ExpectEmit.sol";

contract ExpectEmitTest is Test {
    event Transfer(address indexed from, address indexed to, uint256 value);

    function testExpectEmit() public {
        ExpectEmit emitter = new ExpectEmit();
        // Check that topic 1, topic 2, and data are the same as the following emitted event.
        // Checking topic 3 here doesn't matter, because `Transfer` only has 2 indexed topics.
        vm.expectEmit(true, true, false, true);
        // The event we expect
        emit Transfer(address(this), address(1), 1);
        // The event we get
        emitter.emitTransfer();
    }

    function testExpectEmitDoNotCheckData() public {
        ExpectEmit emitter = new ExpectEmit();
        vm.expectEmit(true, true, false, false);
        // The event we expect
        emit Transfer(address(this), address(1), 2);
        // The event we get
        emitter.emitTransfer();
    }
}
