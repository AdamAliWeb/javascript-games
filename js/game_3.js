const d = document,
  $template = d.getElementById("game-3-template-card").content,
  $fragment = d.createDocumentFragment();

const cards_amount = 30;
let arr_check = [],
  arr_index = [],
  error_count = 0,
  win_count = 0;

const insert_cards = () => {
  const cards_pos_set = new Set([]);
  while (cards_pos_set.size < cards_amount) {
    cards_pos_set.add(Math.ceil(Math.random() * cards_amount));
  }
  let cards_pos = Array.from(cards_pos_set);

  for (let i = 0; i < cards_amount; i++) {
    let card_number =
      cards_pos[i] <= cards_amount / 2
        ? cards_pos[i]
        : cards_pos[i] - cards_amount / 2;

    $template
      .querySelector(".flip-back img")
      .setAttribute("src", `img/game_3/game_3_img (${card_number}).svg`);

    $template.querySelector(".game-3-card").dataset.value = card_number;

    let $clone = d.importNode($template, true);
    $fragment.appendChild($clone);
  }

  d.querySelector(".game-3-container").appendChild($fragment);
};

const check_couple = (card_value, card_index, cards) => {
  arr_check.push(card_value);
  arr_index.push(card_index);
  if (arr_check[0] !== arr_check[1] && arr_check.length > 1) {
    cards.forEach((el) => {
      el.classList.add("game-available");
    });
    setTimeout(() => {
      cards[arr_index[0]].classList.remove("flip-card");
      cards[arr_index[1]].classList.remove("flip-card");
      arr_check = [];
      arr_index = [];
      error_count++;
      cards.forEach((el) => {
        el.classList.remove("game-available");
      });
    }, 500);
  } else if (arr_check[0] === arr_check[1]) {
    arr_check = [];
    arr_index = [];
    win_count++;
  }
};

const game_over = () => {
  if (win_count === cards_amount / 2) {
    d.querySelector(".game-3-message").classList.remove("d-none");
    d.querySelector(".game-3-btn").classList.remove("d-none");
    d.querySelector(".game-3-message").textContent =
      `Juego terminado, tuviste ${error_count} fallos`;
  }
};

export const game3_function = () => {
  insert_cards();
  let $game_3_cards = d.querySelectorAll(".game-3-card");

  d.addEventListener("click", (e) => {
    if (e.target.matches(".game-3-card img")) {
      // !DEPRECATED
      // e.path[2].classList.add("flip-card");
      e.composedPath()[2].classList.add("flip-card");

      check_couple(
        // !DEPRECATED
        // e.path[2].dataset.value,
        e.composedPath()[2].dataset.value,
        Array.from($game_3_cards).indexOf(e.composedPath()[2]),
        $game_3_cards,
      );
      game_over();
    }

    if (e.target.matches(".game-3-btn")) {
      d.querySelector(".game-3-container").innerHTML = "";
      error_count = 0;
      win_count = 0;
      insert_cards();
      $game_3_cards = d.querySelectorAll(".game-3-card");
      d.querySelector(".game-3-btn").classList.add("d-none");
      d.querySelector(".game-3-message").classList.add("d-none");
    }
  });
};
