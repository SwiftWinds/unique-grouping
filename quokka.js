var chunk = require("chunk");
var simulatedAnnealing = require("simulated-annealing");
const { performance } = require("perf_hooks");
const { boolean } = require("random");

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

console.log(test.find(obj => obj === test2))
console.log(test.find(obj => obj === test1))

console.log(Object.is(test1, test2))


console.log(JSON.stringify(test1) === JSON.stringify(test2))