// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {Counter} from "../src/Counter.sol";

contract CounterTest is Test {
    Counter public counter;

    // 测试用例运行之前的可选函数
    function setUp() public {
        counter = new Counter();
        counter.setNumber(0);
    }

    // test开头作为测试用例
    function testIncrement() public {
        counter.increment();
        console2.log("counter.number() = ", counter.number());
        assertEq(counter.number(), 1);
    }

    function testSetNumber(uint256 x) public {
        counter.setNumber(x);
        assertEq(counter.number(), x);
    }

    // testFail开头，失败的测试用例
    function testFailSetNumber(uint256 x) public {
        counter.setNumber(x);
        assertEq(counter.number(), x + 1);
    }
}
