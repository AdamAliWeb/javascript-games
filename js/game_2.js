const d = document,
  $game2_output = d.querySelector(".game-2-output");

let numbers = ["0"], operations = [],
  current_num = 0, current_op = true, result = 0,
  validate_result = false, validate_sign = false, validate_dot = false;


// Functions
const overwrite_output = () => {
  let num_it = 0, op_it = 0, output_text = "";
  output_text += numbers[num_it];
  num_it++
  while (true) {
    if (operations[op_it]) {
      output_text += ` ${operations[op_it]} `;
      op_it++
    }
    if (numbers[num_it]) {
      output_text += numbers[num_it];
      num_it++;
    } else {
      break
    }
  }
  $game2_output.textContent = output_text;
}

const calculate = () => {
  let i = -1;
  result = numbers.reduce((num1, num2) => {
    i++
    return eval(`${Number(num1)} ${operations[i]} ${Number(num2)}`)
  });
  operations = [];
  numbers = [];
  current_num = 0;
  current_op = true;
  $game2_output.textContent = result;
  validate_result = true
  result === parseInt(result) ? validate_dot = false : validate_dot = true
  result > 0 ? validate_sign = false : validate_sign = true;
}

const check_result = (check) => {
  if (check) {
    numbers = [`${result}`];
  } else {
    numbers = [];
    $game2_output.textContent = "";
    validate_sign = false;
    validate_dot = false;
  }
  validate_result = false
}

const insert_numbers = (e, value, key) => {
  if (check_numbers(e)) {
    if (key) {
      validate_result ? check_result(false) : null
      if (numbers[current_num]) {
        numbers[current_num] += value;
      } else {
        numbers[current_num] = value;
      }
      current_op = true;
    } else if (current_op) {
      validate_result ? check_result(true) : null
      validate_sign = false;
      validate_dot = false;
      operations.push(value);
      current_op = false;
      current_num++;
    }
  }
}

const check_numbers = (e) => {
  if (numbers[current_num] === "0" && (e.target.textContent !== "0" && Number(e.target.textContent))) {
    numbers[current_num] = "";
  }
  if (numbers[current_num] === "0" && e.target.textContent === "0") {
    return false
  }
  return true
}

const insert_sign = () => {
  if (check_sign()) {
    if (!validate_sign) {
      numbers[current_num] = "-".concat(numbers[current_num]);
      validate_sign = true
    } else {
      numbers[current_num] = numbers[current_num].substr(1);
      validate_sign = false
    }
  }
}

const check_sign = () => {
  if (validate_result) {
    check_result(true);
  }
  if (!numbers[current_num]) {
    return false
  }
  if (numbers[current_num] === "0") {
    return false
  }
  return true
}

const insert_dot = () => {
  if (check_dot()) {
    if (!validate_dot) {
      numbers[current_num] += ".";
      validate_dot = true
    }
  }
}

const check_dot = () => {
  if (validate_result) {
    check_result(true);
  }
  if (!numbers[current_num]) {
    return false
  }
  return true
}

const option_ce = () => {
  if (validate_result) {
    check_result(true)
  }
  numbers[current_num] = "0"
  validate_sign = false;
  validate_dot = false;
}

const option_c = () => {
  operations = [];
  numbers = ["0"];
  current_num = 0;
  current_op = true;
  validate_sign = false;
  validate_dot = false;
  validate_result = false
  result = 0;
}

const option_bs = () => {
  if (validate_result) {
    check_result(true)
  }
  if (numbers[current_num]) {
    numbers[current_num] = numbers[current_num].slice(0, numbers[current_num].length - 1);
  } else if (current_num > 0) {
    numbers.length > operations.length ? numbers.pop() : null
    current_num--;
    operations.pop();
    current_op = true;
  }
  if ((!numbers[current_num]) && current_num === 0) {
    numbers[current_num] = "0";
  }
  if (numbers[current_num]) {
    if (numbers[current_num].charAt(numbers[current_num].length - 1) === ".") {
      validate_dot = false;
    }
    if (numbers[current_num].charAt(numbers[current_num].length - 1) === "-") {
      validate_sign = false;
      numbers[current_num] = numbers[current_num].slice(0, numbers[current_num].length - 1)
    }
  }
}


export const game2_function = () => {
  d.addEventListener("click", (e) => {
    const event_cases = {
      'option-c': option_c,
      'option-ce': option_ce,
      'option-bs': option_bs,
      'dot': insert_dot,
      'sign': insert_sign,
      'number': [insert_numbers, true],
      'operation': [insert_numbers, false],
    }
    let btn_name = e.target.classList[1];

    if (event_cases[btn_name]) {
      if (btn_name === "number" || btn_name === "operation") {
        event_cases[btn_name][0](e, e.target.dataset.value, event_cases[btn_name][1])
      } else {
        event_cases[btn_name]()
      }
      overwrite_output();
    }

    e.target.matches(".result") ? calculate() : null
  })
}