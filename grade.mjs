import Combinatorics from "js-combinatorics";

const grade = (grouping, history, forbiddenPairs) =>
  grouping.reduce((acc, group) => {
    const groupSize = group.length;
    if (groupSize < 2) {
      return acc;
    }
    const cmb = Combinatorics.combination(group, 2).toArray();
    const totalTimesSeen = cmb.reduce((acc, pair) => {
      // functions
      const historyOf = (person1, person2) =>
        history.filter(
          grouping => grouping.includes(person1) && grouping.includes(person2)
        ).length;

      // start of actual code
      if (forbiddenPairs.includes(pair)) {
        console.log(
          `FORBIDDEN PAIR DETECTED: ${person1} is paired with ${person2}`
        );
        return Infinity;
      }

      const [person1, person2] = pair;

      const timesSeen = historyOf(person1, person2);

      console.log(`${person1} has seen ${person2} ${timesSeen} time(s)`);

      return acc + timesSeen;
    }, 0);

    return acc + totalTimesSeen;
  }, 0);

export default grade;
