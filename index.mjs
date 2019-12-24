"use strict";

import SimulatedAnnealing from "simulated-annealing";

import chunk from "chunk";

import Combinatorics from "js-combinatorics";

import empty from "is-empty";

import last from "array-last";

import isPositiveInteger from "validate.io-positive-integer";

import findLastIndex from "lodash.findlastindex";

import d3 from "d3-array";

import clone from "clone";

import uniqueRandomArray from "unique-random-array";
import random from "random";
import randomArrayIndex from "random-array-index";

const TEMP_MAX = 50;
const TEMP_MIN = 0.001;
const COOLING_RATE = 0.0002;
const ALPHA = 1;
const BETA = 1;

const UniqueGrouping = (
  people = [],
  history = [],
  forbiddenPairs = [],
  groupSize
) => {
  // creates random groups of size groupSize
  const createRandomGroups = (people, groupSize) =>
    chunk(d3.shuffle(people), groupSize);

  const getEnergy = v => {
    console.log("getEnergy():", v);
    const energy = v.reduce((acc, group) => {
      // functions
      const cost = (groupSize, decays) =>
        BETA * groupSize ** 2 +
        decays.reduce((acc, decay) => acc + decay * ALPHA, 0);

      const decay = (n, t, k) => n / (1 + (t / k) ** 2);

      // start of actual code
      const groupSize = group.length;
      if (groupSize === 0) {
        return acc;
      } else if (groupSize === 1) {
        return acc + cost(groupSize, []);
      }
      const cmb = Combinatorics.combination(group, 2);
      const decays = cmb.map(pair => {
        // functions
        const historyOf = (person1, person2) => {
          // start of actual code
          const collisions = history.map(grouping =>
            grouping.filter(
              // TODO: check if safer to do `.some(person => person.id === person1.id) && .some(person => person.id === person2.id)`?
              group => group.includes(person1) && group.includes(person2)
            )
          );

          const largestIndex = collisions.length - 1;
          const lastSeen = empty(collisions)
            ? -100
            : largestIndex -
              findLastIndex(collisions, grouping => !empty(grouping));

          const timesSeen = collisions.filter(grouping => !empty(grouping))
            .length;

          return { lastSeen, timesSeen };
        };

        // start of actual code
        if (forbiddenPairs.includes(pair)) {
          return Infinity;
        }

        const [person1, person2] = pair;

        const { lastSeen, timesSeen } = historyOf(person1, person2);

        // 1 is added to not multiply or divide by 0
        return decay(timesSeen + 1, lastSeen, history.length + 1);
      });

      return acc + cost(groupSize, decays);
    }, 0);
    console.log("finished getEnergy():", v);
    console.log("energy:", energy);
    return energy;
  };

  const newState = x => {
    console.log("newState():", x);
    const newState = clone(x);
    const swapPeople = (from, to) => {
      const person1 = randomArrayIndex(from);
      const person2 = randomArrayIndex(to);

      [from[person1], to[person2]] = [to[person2], from[person1]];
    };

    const movePerson = (from, to) => {
      const person = randomArrayIndex(from);

      to.push(...from.splice(person, 1));
    };

    const randomGroup = uniqueRandomArray(
      newState.filter(group => !empty(group))
    );

    const from = randomGroup();
    const to = randomGroup();

    if (from.length > to.length && random.boolean()) {
      movePerson(from, to);
    } else {
      swapPeople(from, to);
    }

    console.log("finished newState():", x);
    console.log("actual newState():", newState);
    return newState;
  };

  // linear decreasing temperature
  const getTemp = prevTemp => prevTemp - COOLING_RATE;

  if (!isPositiveInteger(groupSize)) {
    throw new Error("groupSize must be an integer greater than 0");
  }

  if (empty(people)) {
    if (empty(history)) {
      throw new Error("Either history or people must be a non-empty array");
    } else {
      people = last(history).flat();
    }
  }

  return SimulatedAnnealing({
    initialState: createRandomGroups(people, groupSize),
    tempMax: TEMP_MAX,
    tempMin: TEMP_MIN,
    newState,
    getTemp,
    getEnergy
  });
};

export default UniqueGrouping;
