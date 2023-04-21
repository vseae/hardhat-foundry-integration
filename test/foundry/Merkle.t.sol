// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "forge-std/Test.sol";
import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import {Merkle} from "murky/Merkle.sol";
import {console2} from "forge-std/console2.sol";

contract MerkleTest is Test {
    Merkle m;

    function setUp() public {
        m = new Merkle();
    }

    function testCompatabilityOpenZeppelinProver(
        bytes32[] memory _data,
        uint256 node
    ) public {
        vm.assume(_data.length > 1);
        vm.assume(node < _data.length);
        bytes32 root = m.getRoot(_data);
        bytes32[] memory proof = m.getProof(_data, node);
        bytes32 valueToProve = _data[node];
        bool murkyVerified = m.verifyProof(root, proof, valueToProve);
        bool ozVerified = MerkleProof.verify(proof, root, valueToProve);
        assertTrue(murkyVerified == ozVerified);
    }
}
