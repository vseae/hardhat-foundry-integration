// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import {Test, console2} from "forge-std/Test.sol";
import {OwnerUpOnly, Unauthorized} from "../src/OwnerUpOnly.sol";

contract OwnerUpOnlyTest is Test {
    OwnerUpOnly upOnly;

    function setUp() public {
        upOnly = new OwnerUpOnly();
    }

    function testIncrementAsOwner() public {
        assertEq(upOnly.count(), 0);
        upOnly.increment();
        assertEq(upOnly.count(), 1);
    }

    function testIncrementAsNotOwner() public {
        vm.expectRevert(Unauthorized.selector);
        vm.prank(address(0));
        upOnly.increment();
    }
}
