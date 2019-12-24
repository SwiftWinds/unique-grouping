import UniqueGrouping, { grade } from "./index.mjs";

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

const history = [
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
  ],
  [
    ["Brad", "Jenny", "Olive", "Rachel"],
    ["Mona", "Danielle", "Laura", "Karen"],
    ["Ivan", "Penelope", "Stan"],
    ["Charlie", "Nathan", "Tom"],
    ["Fredric", "Harriet", "Alleson", "George"]
  ],
  [
    ["Ivan", "Karen", "George"],
    ["Penelope", "Charlie", "Jenny", "Fredric"],
    ["Nathan", "Alleson", "Danielle", "Brad"],
    ["Tom", "Harriet", "Olive", "Mona"],
    ["Rachel", "Laura", "Stan"]
  ],
  [
    ["Laura", "Brad", "Penelope"],
    ["Nathan", "George", "Mona", "Jenny"],
    ["Karen", "Rachel", "Harriet"],
    ["Stan", "Olive", "Alleson", "Charlie"],
    ["Tom", "Fredric", "Ivan", "Danielle"]
  ]
];

// const grouping = [
//   ["Brad", "Mona", "Fredric"],
//   ["Harriet", "Laura", "Nathan", "Olive"],
//   ["George", "Danielle", "Rachel", "Charlie"],
//   ["Ivan", "Jenny", "Alleson"],
//   ["Karen", "Tom", "Penelope", "Stan"]
// ];
UniqueGrouping(people, history, [["Alleson", "Brad"]], 4).then(grouping => {
  console.log(grouping);
  console.log(grade(grouping, history, []));
});
