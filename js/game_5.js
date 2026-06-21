const d = document,
  $game5_canvas = d.getElementById("game-5-canvas"),
  $game5_score = d.querySelector(".game-5-score"),
  context = $game5_canvas.getContext("2d");

const game_speed = 200,
  snake_size = 20,
  game_width = 300,
  game_height = 300,
  game_center_x = (game_width / 2) - (snake_size / 2),
  game_center_y = (game_height / 2) - (snake_size / 2)

let check_vertical_dir = false,
  cur_direction = "ArrowRight",
  score = 0,
  controlls_on = false,
  point_x = Math.ceil(Math.random() * 10) * snake_size,
  point_y = Math.ceil(Math.random() * 10) * snake_size,
  snake_color = "#f00",
  point_color = "#fff";


let snake_interval, snake_parts = [
  [game_center_x - snake_size, game_center_y],
  [game_center_x, game_center_y],
  [game_center_x + snake_size, game_center_y]];


const draw_snake = () => {
  snake_parts.forEach(parts => {
    context.beginPath()
    context.fillStyle = snake_color
    context.fillRect(parts[0], parts[1], snake_size - 1, snake_size - 1);
    context.fill();
  });
}

const draw_point = () => {
  context.fillStyle = point_color
  snake_parts.forEach(part => {
    while (part[0] === point_x && part[1] === point_y) {
      point_x = Math.ceil(Math.random() * ((game_width - snake_size) / snake_size)) * snake_size;
      point_y = Math.ceil(Math.random() * ((game_height - snake_size) / snake_size)) * snake_size;
    }
  })
  context.fillRect(point_x, point_y, snake_size - 1, snake_size - 1);
  context.fill();
}

const change_direction = () => {
  if (cur_direction === "ArrowRight") {
    snake_parts[snake_parts.length - 1][0] += snake_size
  } else if (cur_direction === "ArrowLeft") {
    snake_parts[snake_parts.length - 1][0] -= snake_size
  } else if (cur_direction === "ArrowUp") {
    snake_parts[snake_parts.length - 1][1] -= snake_size
  } else if (cur_direction === "ArrowDown") {
    snake_parts[snake_parts.length - 1][1] += snake_size
  }
}

const walls_collision = () => {
  if ((snake_parts[snake_parts.length - 1][0] >= game_width) && cur_direction === "ArrowRight") {
    snake_parts[snake_parts.length - 1][0] = 0
  } else if ((snake_parts[snake_parts.length - 1][0] < 0) && cur_direction === "ArrowLeft") {
    snake_parts[snake_parts.length - 1][0] = game_width - snake_size
  } else if ((snake_parts[snake_parts.length - 1][1] >= game_width) && cur_direction === "ArrowDown") {
    snake_parts[snake_parts.length - 1][1] = 0
  } else if ((snake_parts[snake_parts.length - 1][1] < 0) && cur_direction === "ArrowUp") {
    snake_parts[snake_parts.length - 1][1] = game_width - snake_size
  }
}

const point_collision = () => {
  if (JSON.stringify(snake_parts[snake_parts.length - 1]) === JSON.stringify([point_x, point_y])) {
    point_x = Math.ceil(Math.random() * 10) * snake_size
    point_y = Math.ceil(Math.random() * 10) * snake_size

    if (snake_parts[0][0] - snake_parts[1][0] === snake_size) {
      snake_parts.unshift([snake_parts[0][0] + snake_size, snake_parts[0][1]])
    } else if (snake_parts[0][0] - snake_parts[1][0] === -snake_size) {
      snake_parts.unshift([snake_parts[0][0] - snake_size, snake_parts[0][1]])
    } else if (snake_parts[0][1] - snake_parts[1][1] === snake_size) {
      snake_parts.unshift([snake_parts[0][0], snake_parts[0][1] + snake_size])
    } else if (snake_parts[0][1] - snake_parts[1][1] === -snake_size) {
      snake_parts.unshift([snake_parts[0][0], snake_parts[0][1] - snake_size])
    }
    score++
  }
}

const game_over = () => {
  clearInterval(snake_interval)
  context.clearRect(0, 0, game_width, game_width);
  context.font = "30px Arial";
  context.textAlign = "center"
  context.fillText("GAME OVER", game_width / 2, game_height / 2);
  d.querySelector(".game-5-start-btn").classList.toggle("d-none");
  d.removeEventListener("keydown", press_key);
  check_vertical_dir = false;
  cur_direction = "ArrowRight";

  score = 0;
  snake_parts = [
    [game_center_x - snake_size, game_center_y],
    [game_center_x, game_center_y],
    [game_center_x + snake_size, game_center_y]];
}

const check_game_over = () => {
  let game_over_count = 0;
  snake_parts.forEach(part => {
    if (JSON.stringify(snake_parts[snake_parts.length - 1]) === JSON.stringify(part)) {
      game_over_count++;
      if (game_over_count >= 2) {
        game_over();
      }
    }
  })
}


const start_game = () => {
  $game5_score.classList.remove("d-none")
  snake_interval = setInterval(() => {
    let snake_pos = JSON.parse(JSON.stringify(snake_parts))
    context.clearRect(0, 0, game_width, game_width);
    $game5_score.textContent = `Score: ${score}`
    change_direction();
    for (let i = snake_parts.length - 1; i > 0; i--) {
      snake_parts[i - 1][1] = snake_pos[i][1]
      snake_parts[i - 1][0] = snake_pos[i][0]
    }
    walls_collision();
    point_collision();
    draw_point();
    draw_snake();
    check_game_over();
    controlls_on = true;
  }, game_speed);
}


// Event Listener Function
const press_key = (e) => {
  e.preventDefault()

  if ((e.code === "ArrowUp" || e.code === "ArrowDown") && check_vertical_dir === false && controlls_on) {
    check_vertical_dir = true
    cur_direction = e.code
    controlls_on = false;
  }

  if ((e.code === "ArrowRight" || e.code === "ArrowLeft") && check_vertical_dir === true && controlls_on) {
    check_vertical_dir = false
    cur_direction = e.code
    controlls_on = false;
  }

  if (e.code === "Space") {
    $game5_canvas.classList.toggle("game-5-pause-game");
    if ($game5_canvas.classList.contains("game-5-pause-game")) {
      clearInterval(snake_interval)
      context.clearRect(0, 0, game_width, game_height);
      context.font = "30px Arial";
      context.textAlign = "center"
      context.fillText("PAUSE", game_width / 2, game_height / 2);
    } else {
      start_game();
    }
  }
}

export const game5_function = () => {
  draw_snake()
  $game5_canvas.width = game_width
  $game5_canvas.height = game_height

  d.addEventListener("click", (e) => {
    if (e.target.matches(".game-5-start-btn")) {
      e.target.classList.toggle("d-none");
      start_game();
      $game5_score.textContent = `Score: ${score}`;
      d.addEventListener("keydown", press_key);
    }
  })
}