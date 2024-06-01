// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC20.sol";

contract Club {
    IERC20 public token;
    address public factory;

    constructor(IERC20 _token) {
        token = _token;
        factory = msg.sender;
        token.approve(factory, type(uint256).max);
    }
}
