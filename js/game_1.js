//Variables
const d = document,
  $game1_btns = d.querySelectorAll(".game-1-btn"),
  $game1_message = d.querySelector(".game-1-message"),
  $game1_restart = d.getElementById("game-1-restart"),
  $game1_solo = d.getElementById("game-1-solo"),
  $game1_multi = d.getElementById("game-1-multi");

let switch_player = false,
  two_players = null,
  winners = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ],
  player1_choices = [],
  player2_choices = [];

// Functions
const check_winners = (win_choices, player) => {
  let game_over = false;
  win_choices.forEach((nums) => {
    let check_line = 0;
    for (let i = 0; i < player.length; i++) {
      nums.forEach((win_choice) =>
        win_choice === player[i] ? check_line++ : null,
      );
    }
    check_line === 3 ? (game_over = true) : null;
  });
  return game_over;
};

const check_draw = () => {
  let x = 0;
  $game1_btns.forEach((btn) => (btn.dataset.selected === "true" ? x++ : null));
  return x === 9 ? true : false;
};

const end_message = (text) => {
  disable_events(true);
  $game1_message.textContent = text;
  $game1_message.classList.remove("d-none");
  $game1_restart.classList.remove("d-none");
};

const disable_events = (option) => {
  $game1_btns.forEach((btn) =>
    option
      ? btn.classList.add("game-available")
      : btn.classList.remove("game-available"),
  );
};

const game1_restart = () => {
  player1_choices = [];
  player2_choices = [];
  switch_player = false;
  two_players = null;
  $game1_btns.forEach((btn) => {
    btn.dataset.selected = false;
    btn.textContent = "";
    btn.classList.remove("player2");
  });
  $game1_solo.classList.remove("d-none");
  $game1_multi.classList.remove("d-none");
  $game1_message.classList.add("d-none");
  $game1_restart.classList.add("d-none");
};

const game1_start = (e, btns, player1, player2) => {
  let btns_arr = Array.from(btns),
    btn_index = btns_arr.indexOf(e.target);

  const insert_sign = (btn_pos, player, player_choices, boolean) => {
    btns[btn_pos].textContent = player;
    btns[btn_pos].dataset.selected = true;
    player_choices.push(btn_pos + 1);
    player_choices.sort();
    switch_player = boolean;
  };

  if (!switch_player) {
    two_players
      ? $game1_btns.forEach((btn) => btn.classList.toggle("player2"))
      : null;
    insert_sign(btn_index, player1, player1_choices, true);

    if (
      !two_players &&
      !check_draw() &&
      !check_winners(winners, player1_choices)
    ) {
      disable_events(true);
      let random_num = Math.floor(Math.random() * 9);
      while (btns[random_num].dataset.selected === "true") {
        random_num = Math.floor(Math.random() * 9);
      }
      setTimeout(() => {
        insert_sign(random_num, player2, player2_choices, false);
        disable_events(false);
        if (check_winners(winners, player2_choices)) {
          end_message("Player 2 won the game!");
        }
      }, 1000);
    }

    if (check_winners(winners, player1_choices)) {
      end_message("Player 1 won the game!");
    } else if (check_draw()) {
      end_message("Draw");
    }
  } else if (two_players) {
    $game1_btns.forEach((btn) => btn.classList.toggle("player2"));
    insert_sign(btn_index, player2, player2_choices, false);

    if (check_winners(winners, player2_choices)) {
      end_message("Player 2 won the game!");
    }
  }
};

export const game1_function = () => {
  d.addEventListener("click", (e) => {
    if (e.target.matches("#game-1-solo") || e.target.matches("#game-1-multi")) {
      disable_events(false);
      $game1_solo.classList.add("d-none");
      $game1_multi.classList.add("d-none");
    }

    e.target.matches(".game-1-btn")
      ? game1_start(e, $game1_btns, "x", "o")
      : null;
    e.target.matches("#game-1-solo") ? (two_players = false) : null;
    e.target.matches("#game-1-multi") ? (two_players = true) : null;
    e.target.matches("#game-1-restart") ? game1_restart() : null;
  });
};
