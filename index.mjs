"use strict";

import SimulatedAnnealing from "simulated-annealing";

import chunk from "chunk";

import Combinatorics from "js-combinatorics"

import d3 from "d3-array";
import uniqueRandomArray from "unique-random-array";
import random from "random";
import randomItem from "random-item";
import randomArrayIndex from "random-array-index";

const TEMP_MAX = 15;
const TEMP_MIN = 0.001;
const COOLING_RATE = 0.001;

const UniqueGrouping = (people, groupSize) => {
  // const array_chunks = (array, chunk_size) =>
  //   Array(Math.ceil(array.length / chunk_size))
  //     .fill()
  //     .map((_, index) => index * chunk_size)
  //     .map(begin => array.slice(begin, begin + chunk_size));

  // creates random groups of size groupSize
  const createRandomGroups = (people, groupSize) =>
    chunk(d3.shuffle(people), groupSize);

  // console.log(groups);

  const getEnergy = v => {
    v.forEach(group => {
      const cmb = Combinatorics.combination(group, 2);
      cmb.map(pair => {
        
      })
    })
  };

  const newState = x => {
    const swapStudents = (from, to) => {
      const student1 = randomArrayIndex(from);
      const student2 = randomArrayIndex(to);

      [from[student1], to[student2]] = [to[student2], from[student1]];
    };

    const moveStudent = (from, to) => {
      const student = randomItem(from);

      to.push(student);
    };

    const randomGroup = uniqueRandomArray(x);

    // randomly either swaps two random students from two different groups 
    // or moves one random student to another group
    if (random.boolean()) {
      swapStudents(randomGroup(), randomGroup());
    } else {
      moveStudent(randomGroup(), randomGroup());
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
