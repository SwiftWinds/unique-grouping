"use strict";

import SimulatedAnnealing from "simulated-annealing";

import chunk from "chunk";

import Combinatorics from "js-combinatorics";

import sum from "math-sum";

import d3 from "d3-array";
import uniqueRandomArray from "unique-random-array";
import random from "random";
import randomItem from "random-item";
import randomArrayIndex from "random-array-index";

const TEMP_MAX = 15;
const TEMP_MIN = 0.001;
const COOLING_RATE = 0.001;
const ALPHA = (BETA = 1);

const UniqueGrouping = (people, groupSize, sessions = 0) => {
  // const array_chunks = (array, chunk_size) =>
  //   Array(Math.ceil(array.length / chunk_size))
  //     .fill()
  //     .map((_, index) => index * chunk_size)
  //     .map(begin => array.slice(begin, begin + chunk_size));

  // creates random groups of size groupSize
  const createRandomGroups = (people, groupSize) =>
    chunk(d3.shuffle(people), groupSize);

  // console.log(groups);

  const getEnergy = v =>
    sum(
      v.map(group => {
        const costFunction = group => {
          const cmb = Combinatorics.combination(group, 2);
          return sum(
            ...cmb.map(pair => {
              const decayFunction = (person1, person2) => {
                const { timeSinceLastSeen, timesSeen } = person1.blacklist.find(
                  person => person.id === person2.id
                );

                return (
                  Math.exp(timeSinceLastSeen / (sessions + 1)) * (timesSeen + 1)
                );
              };

              const [person1, person2] = pair;
              return ALPHA * decayFunction(person1, person2);
            }),
            BETA * group.length
          );
        };

        return costFunction(group);
      })
    );

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
