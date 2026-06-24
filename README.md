# JavaScript Little Apps
**[Website](https://adamaliweb.github.io/javascript-little-apps/)**

This project showcases my abilities with plain JavaScript, built around 2021–2022. Here is a breakdown of each exercise:

## Exercise 1 - Tic Tac Toe

The classic Tic Tac Toe game. You can either play against a randomized computer opponent or play locally with another person on the same interface.

## Exercise 2 - Calculator

A standard calculator that replicates the core functions of a basic one.

## Exercise 3 - Memory Game

Flip the cards and try to remember the location of each pair, matching them all with as few mistakes as possible.

> **Note:** An interesting issue I encountered was with `e.path` in my code, which is deprecated and caused the entire game to break. Since it was only supported by Chromium-based browsers, it introduced cross-browser compatibility problems.

## Exercise 4 - Rock, Paper, Scissors

The classic Rock, Paper, Scissors game. The opponent's choice is randomized, so it's purely luck-based.

## Exercise 5 - Snake

The classic Snake game, built using the `canvas` API. It works pretty well.

## Exercise 6 - Songs CRUD

A simple CRUD app to keep track of songs to be added later. It requires `json-server` to run the local database:

1. Make sure it's installed: `npm install json-server`
2. Start the server: `npx json-server db/songs.json`
