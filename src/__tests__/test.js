"use strict";

import UniqueGrouping, { grade } from "../index.js";

const people = [
  // people to group
  "Alleson",
  "Brad",
  "Charlie",
  "Danielle",
  "Fredric",
  "George",
  "Harriet",
  "Ivan",
  "Jenny",
  "Karen",
  "Laura",
  "Mona",
  "Nathan",
  "Olive",
  "Penelope",
  "Rachel",
  "Stan",
  "Tom"
];

const history = [
  // previous groupings
  [
    ["Harriet", "Karen", "Charlie", "Brad"],
    ["Nathan", "Rachel", "Ivan"],
    ["George", "Penelope", "Olive", "Danielle"],
    ["Jenny", "Tom", "Alleson", "Laura"],
    ["Stan", "Fredric", "Mona"]
  ],
  [
    ["Alleson", "Mona", "Penelope", "Rachel"],
    ["Laura", "Ivan", "Charlie"],
    ["Tom", "Brad", "George"],
    ["Karen", "Nathan", "Fredric", "Olive"],
    ["Stan", "Jenny", "Danielle", "Harriet"]
  ]
];

// people to be seperated at all costs
const forbiddenPairs = [
  ["Alleson", "Brad"],
  ["Fredric", "Tom"]
];

// target size of each group
const groupSize = 4;

UniqueGrouping(people, history, forbiddenPairs, groupSize).then(grouping => {
  console.log(grouping);
  //=> [
  //     [ 'Brad', 'Rachel', 'Laura', 'Fredric' ],
  //     [ 'Charlie', 'Jenny', 'Olive', 'Mona' ],
  //     [ 'Penelope', 'Ivan', 'Harriet', 'Tom' ],
  //     [ 'Alleson', 'Nathan', 'Danielle' ],
  //     [ 'George', 'Karen', 'Stan' ]
  //   ]

  const { log, totalTimesSeen } = grade(grouping, history, forbiddenPairs);

  console.log(log);
  //=> Brad has seen Rachel 0 time(s)
  //   Brad has seen Laura 0 time(s)
  //   Rachel has seen Laura 0 time(s)
  //   Brad has seen Fredric 0 time(s)
  //   Rachel has seen Fredric 0 time(s)
  //   Laura has seen Fredric 0 time(s)
  //   Charlie has seen Jenny 0 time(s)
  //   Charlie has seen Olive 0 time(s)
  //   Jenny has seen Olive 0 time(s)
  //   Charlie has seen Mona 0 time(s)
  //   Jenny has seen Mona 0 time(s)
  //   Olive has seen Mona 0 time(s)
  //   Penelope has seen Ivan 0 time(s)
  //   Penelope has seen Harriet 0 time(s)
  //   Ivan has seen Harriet 0 time(s)
  //   Penelope has seen Tom 0 time(s)
  //   Ivan has seen Tom 0 time(s)
  //   Harriet has seen Tom 0 time(s)
  //   Alleson has seen Nathan 0 time(s)
  //   Alleson has seen Danielle 0 time(s)
  //   Nathan has seen Danielle 0 time(s)
  //   George has seen Karen 0 time(s)
  //   George has seen Stan 0 time(s)
  //   Karen has seen Stan 0 time(s)

  console.log(totalTimesSeen);
  //=> 0
});
