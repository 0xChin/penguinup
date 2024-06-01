// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Club.sol";
import "./IERC20.sol";

contract ClubFactory {
    uint256 constant PRICE_PER_CAMERA_PER_MONTH = 10;
    IERC20 public token;
    address immutable owner;
    mapping(address => uint256) clubToCamerasAmount;
    mapping(address => uint256) lastPayment;

    constructor(address _token) {
        token = IERC20(_token);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "OnlyOwner: Unauthorized");
        _;
    }

    function createClub(uint256 _cameras) public returns (address) {
        address clubAddress = address(new Club(token));
        clubToCamerasAmount[clubAddress] = _cameras;
        lastPayment[clubAddress] = block.timestamp;
        return clubAddress;
    }

    function collectPayment(address clubAddress) public onlyOwner {
        require(
            lastPayment[clubAddress] + 30 days < block.timestamp,
            "A month has to pass"
        );
        require(
            token.transferFrom(
                clubAddress,
                address(this),
                PRICE_PER_CAMERA_PER_MONTH *
                    clubToCamerasAmount[clubAddress] *
                    (10 ** token.decimals())
            ),
            "Transfer failed"
        );
        lastPayment[clubAddress] = block.timestamp;
    }
}
