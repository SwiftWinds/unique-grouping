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

const history = [
];

const grouping = UniqueGrouping(people, history, [], 4);
console.log(grouping);

// const grouping = [
// ];

console.log(grade(grouping, history, []));
