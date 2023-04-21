// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

contract Safe {
    receive() external payable {}

    function withdraw() external {
        payable(msg.sender).transfer(address(this).balance);
    }
}

contract FuzzSafeTest is Test {
    Safe public safe;

    receive() external payable {}

    function setUp() public {
        safe = new Safe();
    }

    function testWithdraw(uint96 amount) public {
        vm.assume(amount > 0.1 ether);
        payable(address(safe)).transfer(amount);
        uint256 preBalance = address(this).balance;
        safe.withdraw();
        uint256 postBalance = address(this).balance;
        assertEq(preBalance + amount, postBalance);
    }
}
