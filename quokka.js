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
