// https://school.programmers.co.kr/learn/courses/30/lessons/67257
// 2020 카카오 인턴십
// Lv. 2

function getPermutations(items, count) {
  if (count === 1) {
    return items.map((item) => [item]);
  }

  const permutations = [];

  items.forEach((fixedItem, index) => {
    const slicedItems = [...items.slice(0, index), ...items.slice(index + 1)];
    const subPermutations = getPermutations(slicedItems, count - 1);
    subPermutations.forEach((subPermutation) => {
      permutations.push([fixedItem, ...subPermutation]);
    });
  });

  return permutations;
}

function stringToExpressionArray(expressionString) {
  const expressionArray = [];
  let expressionElement = '';

  Array.from(expressionString).forEach((character) => {
    if (!isNaN(character)) {
      expressionElement += character;
      return;
    }

    const number = Number(expressionElement);
    const operator = character;
    expressionArray.push(number);
    expressionArray.push(operator);
    expressionElement = '';
  });

  const lastNumber = Number(expressionElement);
  expressionArray.push(lastNumber);

  return expressionArray;
}

function calculate(a, b, operator) {
  if (operator === '+') {
    return a + b;
  }
  if (operator === '-') {
    return a - b;
  }
  if (operator === '*') {
    return a * b;
  }
}

function calculateWithOperatorPriority(expressionArray, operatorPriority) {
  if (operatorPriority.length === 0) {
    return expressionArray[0];
  }

  const expression = [...expressionArray];
  const targetOperator = operatorPriority.shift();
  let i = 1;

  while (i < expression.length) {
    if (expression[i] !== targetOperator) {
      i += 2;
      continue;
    }

    const number = calculate(
      expression[i - 1],
      expression[i + 1],
      targetOperator
    );
    expression.splice(i - 1, 3, number);
  }

  return calculateWithOperatorPriority(expression, operatorPriority);
}

function solution(expression) {
  const operatorPermutations = getPermutations(['+', '-', '*'], 3);
  const expressionArray = stringToExpressionArray(expression);
  let answer = 0;

  operatorPermutations.forEach((operatorPriority) => {
    const result = calculateWithOperatorPriority(
      expressionArray,
      operatorPriority
    );
    answer = Math.max(answer, Math.abs(result));
  });

  return answer;
}
