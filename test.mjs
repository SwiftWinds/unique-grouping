import UniqueGrouping from "./index.mjs";
import grade from "./grade.mjs";

const people = `Alleson
Brad
Charlie
Danielle
Fredric
George
Harriet
Ivan
Jenny
Karen
Laura
Mona
Nathan
Olive
Penelope
Rachel
Stan
Tom`.split("\n");

// console.log(people);
const history = [
  [
    ["Penelope", "Jenny", "Stan", "Fredric"],
    ["Karen", "Ivan", "George", "Nathan"],
    ["Brad", "Alleson", "Tom", "Charlie"],
    ["Rachel", "Danielle", "Mona", "Laura"],
    ["Harriet", "Olive"]
  ],
  [
    ["Penelope", "Brad", "Ivan"],
    ["Tom", "Laura", "Fredric"],
    ["Olive", "Karen", "Rachel", "Stan"],
    ["George", "Danielle", "Charlie", "Jenny"],
    ["Mona", "Harriet", "Alleson", "Nathan"]
  ],
  [
    ["Brad", "Stan", "George"],
    ["Mona", "Karen", "Penelope", "Charlie"],
    ["Alleson", "Fredric", "Rachel"],
    ["Jenny", "Harriet", "Laura", "Ivan"],
    ["Nathan", "Tom", "Danielle", "Olive"]
  ]
];

const grouping = UniqueGrouping(people, history, [], 4);
console.log(grouping);

console.log(grade(grouping, history, []));
