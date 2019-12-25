import UniqueGrouping from "./index.mjs";

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
});
