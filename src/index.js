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

import equal from "fast-deep-equal";

import StringBuilder from "yassb";

import uniqueRandomArray from "unique-random-array";
import random from "random";
import randomArrayIndex from "random-array-index";

const UniqueGrouping = (
  people = [],
  history = [],
  forbiddenPairs = [],
  groupSize,
  options = {
    tempMax: 65,
    tempMin: 0.0007,
    coolingRate: 0.0002,
    alpha: 1,
    beta: 1
  }
) => {
  // functions
  const createRandomGroups = (people, groupSize) =>
    chunk(d3.shuffle(people), groupSize);

  const getEnergy = v =>
    v.reduce((acc, group) => {
      // functions
      const cost = (groupSize, decays) =>
        beta * groupSize ** 2 +
        decays.reduce((acc, decay) => acc + decay * alpha, 0);

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
              group =>
                group.some(person => equal(person, person1)) &&
                group.some(person => equal(person, person2))
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
        if (
          forbiddenPairs.some(
            forbiddenPair =>
              equal(forbiddenPair, pair) || equal(forbiddenPair, pair.reverse())
          )
        ) {
          return Infinity;
        }

        const [person1, person2] = pair;

        const { lastSeen, timesSeen } = historyOf(person1, person2);

        // 1 is added to not multiply or divide by 0
        return decay(timesSeen + 1, lastSeen, history.length + 1);
      });

      return acc + cost(groupSize, decays);
    }, 0);

  const newState = x => {
    // functions
    const swapPeople = (from, to) => {
      const person1 = randomArrayIndex(from);
      const person2 = randomArrayIndex(to);

      [from[person1], to[person2]] = [to[person2], from[person1]];
    };

    const movePerson = (from, to) => {
      const person = randomArrayIndex(from);

      to.push(...from.splice(person, 1));
    };

    // start of actual code
    const newState = clone(x);

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

    return newState;
  };

  const getTemp = prevTemp => prevTemp - coolingRate; // linear decreasing temperature

  // start of actual code
  const { tempMax, tempMin, coolingRate, alpha, beta } = options;

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

  return new Promise((resolve, _) =>
    resolve(
      SimulatedAnnealing({
        initialState: createRandomGroups(people, groupSize),
        tempMax,
        tempMin,
        newState,
        getTemp,
        getEnergy
      })
    )
  );
};

const grade = (grouping, history, forbiddenPairs) => {
  const sb = new StringBuilder();
  const totalTimesSeen = grouping.reduce((acc, group) => {
    const groupSize = group.length;
    if (groupSize < 2) {
      return acc;
    }
    const cmb = Combinatorics.combination(group, 2);
    const timesSeenOfGroup = cmb.reduce((acc, pair) => {
      // functions
      const historyOf = (person1, person2) =>
        history
          .flat()
          .filter(
            group =>
              group.some(person => equal(person, person1)) &&
              group.some(person => equal(person, person2))
          ).length;

      // start of actual code
      if (
        forbiddenPairs.some(
          forbiddenPair =>
            equal(forbiddenPair, pair) || equal(forbiddenPair, pair.reverse())
        )
      ) {
        sb.addLine(
          `FORBIDDEN PAIR DETECTED: ${person1} is with ${person2}`
        );
        return Infinity;
      }

      const [person1, person2] = pair;

      const timesSeen = historyOf(person1, person2);

      sb.addLine(`${person1} has seen ${person2} ${timesSeen} time(s)`);

      return acc + timesSeen;
    }, 0);

    return acc + timesSeenOfGroup;
  }, 0);
  const log = sb.toString();
  return { log, totalTimesSeen };
};

export { UniqueGrouping as default, grade };
