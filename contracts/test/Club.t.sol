// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Counter} from "../src/Counter.sol";
import {Club} from "../src/Club.sol";
import {ClubFactory} from "../src/ClubFactory.sol";
import {IERC20} from "../src/IERC20.sol";

contract CounterTest is Test {
    Counter public counter;
    Club public club;
    ClubFactory public clubFactory;
    address dai = 0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1;
    event log(uint256);

    function setUp() public {
        vm.createSelectFork("https://optimism.llamarpc.com");
        clubFactory = new ClubFactory(dai);
    }

    function test_Flow() public {
        club = Club(clubFactory.createClub(1));
        vm.prank(0x06F522A84E0101545516B149cCc4E5561608Da1D);
        IERC20(dai).transferFrom(
            0x06F522A84E0101545516B149cCc4E5561608Da1D,
            address(club),
            20 * (10 ** 18)
        );
        vm.warp(block.timestamp + 31 days);
        clubFactory.collectPayment(address(club));
    }
}
