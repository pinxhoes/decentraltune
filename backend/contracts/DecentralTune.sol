// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IAccount.sol";

contract DecentralTune {
    mapping(address => bool) public registeredUsers;
    mapping(address => mapping(address => bool)) public userMatches;

    event UserRegistered(address user);
    event UsersMatched(address user1, address user2);

    function register() external {
        require(!registeredUsers[msg.sender], "User already registered");
        
        registeredUsers[msg.sender] = true;
        emit UserRegistered(msg.sender);
    }

    function matchUsers(address _otherUser) external {
        require(registeredUsers[msg.sender], "Sender not registered");
        require(registeredUsers[_otherUser], "Other user not registered");
        require(msg.sender != _otherUser, "Cannot match with self");

        userMatches[msg.sender][_otherUser] = true;
        userMatches[_otherUser][msg.sender] = true;
        emit UsersMatched(msg.sender, _otherUser);
    }

    function isMatched(address _user1, address _user2) external view returns (bool) {
        return userMatches[_user1][_user2];
    }
}