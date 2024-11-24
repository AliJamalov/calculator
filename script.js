const input = document.querySelector("input");
const values = document.querySelectorAll(".value");
const operations = document.querySelectorAll(".calc");
const reset = document.querySelector("#reset");
const result = document.querySelector(".result");

let currentNumber = "";
let previousNumber = "";
let operation = "";

// Функция для обновления дисплея
function updateDisplay(value) {
  input.value = value;
}

// Обработка нажатий на цифры
values.forEach((button) => {
  button.addEventListener("click", () => {
    currentNumber += button.textContent; // Добавляем цифру к текущему числу
    updateDisplay(currentNumber); // Обновляем дисплей
  });
});

// Обработка нажатий на операции
operations.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentNumber === "") return; // Если ничего не введено, игнорируем
    if (previousNumber !== "") {
      // Если есть предыдущее число, сразу вычисляем результат
      calculate();
    }
    operation = button.textContent; // Сохраняем операцию
    previousNumber = currentNumber; // Переносим текущее число в предыдущее
    currentNumber = ""; // Очищаем текущее число
  });
});

// Обработка нажатия на "=" (вычисление результата)
result.addEventListener("click", () => {
  if (currentNumber === "" || previousNumber === "") return; // Если не хватает данных, игнорируем
  calculate();
  operation = "";
});

// Обработка нажатия на "reset"
reset.addEventListener("click", () => {
  currentNumber = "";
  previousNumber = "";
  operation = "";
  updateDisplay("");
});

// Функция для вычисления результата
function calculate() {
  let calcResult;
  const prev = parseFloat(previousNumber);
  const curr = parseFloat(currentNumber);

  if (isNaN(prev) || isNaN(curr)) return; // Проверяем, что числа корректные

  switch (operation) {
    case "+":
      calcResult = prev + curr;
      break;
    case "-":
      calcResult = prev - curr;
      break;
    case "*":
      calcResult = prev * curr;
      break;
    case "/":
      calcResult = curr !== 0 ? prev / curr : "Error"; // Проверка деления на 0
      break;
    default:
      return;
  }

  currentNumber = calcResult.toString(); // Сохраняем результат как текущее число
  previousNumber = ""; // Очищаем предыдущее число
  updateDisplay(currentNumber); // Показываем результат
}
