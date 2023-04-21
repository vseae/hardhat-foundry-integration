// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import {Test, console2} from "forge-std/Test.sol";

contract FFITest is Test {
    function testFFI() public {
        string[] memory cmds = new string[](2);
        cmds[0] = "cat";
        cmds[1] = "./test/address.txt";
        bytes memory result = vm.ffi(cmds);
        address loadedAddress = abi.decode(result, (address));
        console2.logAddress(loadedAddress);
    }
}
