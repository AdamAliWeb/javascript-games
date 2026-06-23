const d = document,
  $game4_message = d.querySelector(".game-4-message"),
  $game4_player1 = d.querySelector("#game-4-player1 img"),
  $game4_player2 = d.querySelector("#game-4-player2 img");

let check_ops = {
  rock_ops: [
    ["rock", "scissors"],
    ["rock", "paper"],
  ],
  paper_ops: [
    ["paper", "rock"],
    ["paper", "scissors"],
  ],
  scissor_ops: [
    ["scissors", "paper"],
    ["scissors", "rock"],
  ],
};

let player2_ops = ["rock", "paper", "scissors"];

const game_start = (player_ops, player_src) => {
  let i = 1,
    random_num = Math.floor(Math.random() * 3);
  $game4_message.textContent = i;
  let timer = setInterval(() => {
    i++;
    $game4_message.textContent = i;
  }, 1000);
  setTimeout(() => {
    $game4_player1.setAttribute("src", player_src);
    $game4_player2.setAttribute(
      "src",
      `img/game_4/${player2_ops[random_num]}_output.svg`,
    );
    check_winner(player_ops, player2_ops[random_num]);
    d.querySelectorAll(".game-4-btn").forEach((el) => {
      el.classList.remove("game-available");
    });
    clearInterval(timer);
  }, 3000);
};

const check_winner = (player1, player2) => {
  for (const ops in check_ops) {
    if (player1 === check_ops[ops][0][0] && player2 === check_ops[ops][0][1]) {
      $game4_message.textContent = "Player 1 won the game!";
    } else if (
      player1 === check_ops[ops][1][0] &&
      player2 === check_ops[ops][1][1]
    ) {
      $game4_message.textContent = "Player 2 won the game!";
    } else if (player1 === player2) {
      $game4_message.textContent = "Draw";
    }
  }
};

export const game4_function = () => {
  d.addEventListener("click", (e) => {
    if (e.target.matches(".game-4-btn img")) {
      $game4_player1.setAttribute("src", "");
      $game4_player2.setAttribute("src", "");
      d.querySelectorAll(".game-4-btn").forEach((el) => {
        el.classList.add("game-available");
      });
      game_start(
        e.composedPath()[1].id,
        `img/game_4/${e.composedPath()[1].id}_output.svg`,
      );
    }
  });
};
