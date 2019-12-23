const chunk = require("chunk");
const mathSum = require("math-sum");
const simulatedAnnealing = require("simulated-annealing");
const { performance } = require("perf_hooks");
const { boolean } = require("random");
const findLastIndex = require("lodash.findlastindex");
const empty = require("is-empty");

console.log(boolean.random);

function getEnergy(v) {
  return Math.abs(v * v - 16);
}

function newState(x) {
  return x + (Math.random() - 0.5);
}

// linear temperature decreasing
function getTemp(prevTemperature) {
  return prevTemperature - 0.001;
}

var t0 = performance.now();

var result = simulatedAnnealing({
  initialState: Math.random() * 16,
  tempMax: 15,
  tempMin: 0.001,
  newState: newState,
  getTemp: getTemp,
  getEnergy: getEnergy
});

var t1 = performance.now();

console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");

console.log(`result: ${result}`);
result;
const ALPHA = (BETA = 1);

ALPHA;
BETA;
console.log(chunk([1, 2, 3, 4, 5], 2));

const test1 = {
  prop1: "oof",
  prop2: 6
};

const test2 = {
  prop1: "oof",
  prop2: 6
};

const test = [
  {
    prop1: "fake",
    prop2: 10
  },
  {
    prop1: "fake",
    prop2: 10
  },
  test1
];

console.log(test.find(obj => obj === test2));
console.log(test.find(obj => obj === test1));

console.log(Object.is(test1, test2));

console.log(JSON.stringify(test1) === JSON.stringify(test2));

console.log(mathSum(3, 5, 6, 1, 3));

let people = [];

const history1 = [
  [
    [3, 1, 2],
    [1, 5, 2]
  ],
  [
    [4, 2, 5],
    [3, 1, 8],
    [4, 9, 8]
  ],
  [
    [1, 5, 9],
    [1, 6, 3],
    [7, 6, 9]
  ]
];

const filtered = history1.map(grouping =>
  grouping.filter(group => group.includes(5) && group.includes(1))
);

console.log(filtered);

filtered.push([]);

// const lastSeen =
//   filtered.length - 1 - findLastIndex(filtered, grouping => !empty(grouping));
// console.log(lastSeen);

// const timesSeen = filtered.filter(grouping => !empty(grouping)).length;
// console.log(timesSeen);

person1 = 3;
person2 = 5;

const history = [];
const collisions = history.map(grouping =>
  grouping.filter(
    // TODO: check if safer to do `.some(person => person.id === person1.id) && .some(person => person.id === person2.id)`?
    group => group.includes(person1) && group.includes(person2)
  )
);

console.log(collisions);

const lastSeen = empty(collisions)
  ? -100
  : collisions.length -
    1 -
    findLastIndex(collisions, grouping => !empty(grouping));

const timesSeen = collisions.filter(grouping => !empty(grouping)).length;

console.log(Infinity * 3 - 229399293 ** 23);
