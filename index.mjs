"use strict";

import SimulatedAnnealing from "simulated-annealing";

import chunk from "chunk";

import Combinatorics from "js-combinatorics";

import empty from "is-empty";

import last from "array-last";

import isPositiveInteger from "validate.io-positive-integer";

import findLastIndex from "lodash.findlastindex";

import d3 from "d3-array";

import uniqueRandomArray from "unique-random-array";
import random from "random";
import randomItem from "random-item";
import randomArrayIndex from "random-array-index";

const TEMP_MAX = 15;
const TEMP_MIN = 0.001;
const COOLING_RATE = 0.001;
const ALPHA = (BETA = 1);

const UniqueGrouping = (
  people = [],
  history = [],
  forbiddenPairs = [],
  groupSize
) => {
  // creates random groups of size groupSize
  const createRandomGroups = (people, groupSize) =>
    chunk(d3.shuffle(people), groupSize);

  const getEnergy = v =>
    v.reduce((acc, group) => {
      const cost = (groupSize, decays) =>
        BETA * groupSize ** 2 +
        decays.reduce((acc, cur) => acc + cur * ALPHA, 0);

      const decay = (n, t, k) => n / (1 + (t / k) ** 2);

      const groupSize = group.length;
      const cmb = Combinatorics.combination(group, 2);
      const decays = cmb.map(pair => {
        const compare = (person1, person2) => {
          const collisions = history.map(grouping =>
            grouping.filter(
              // TODO: check if safer to do `.some(person => person.id === person1.id) && .some(person => person.id === person2.id)`?
              group => group.includes(person1) && group.includes(person2)
            )
          );

          const lastSeen = empty(collisions)
            ? -100
            : collisions.length -
              1 -
              findLastIndex(collisions, grouping => !empty(grouping));

          const timesSeen = collisions.filter(grouping => !empty(grouping))
            .length;

          return { lastSeen, timesSeen };
        };

        if (forbiddenPairs.includes(pair)) {
          return Infinity;
        }

        const [person1, person2] = pair;

        const { lastSeen, timesSeen } = compare(person1, person2);

        // 1 is added to not multiply or divide by 0
        return decay(timesSeen + 1, lastSeen, history.length + 1);
      });

      return acc + cost(groupSize, decays);
    }, 0);

  const newState = x => {
    const swapPeople = (from, to) => {
      const person1 = randomArrayIndex(from);
      const person2 = randomArrayIndex(to);

      [from[person1], to[person2]] = [to[person2], from[person1]];
    };

    const movePerson = (from, to) => {
      const person = randomItem(from);

      to.push(person);
    };

    const randomGroup = uniqueRandomArray(x);

    // randomly either swaps two random people from two different groups
    // or moves one random person to another group
    if (random.boolean()) {
      swapPeople(randomGroup(), randomGroup());
    } else {
      movePerson(randomGroup(), randomGroup());
    }
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
