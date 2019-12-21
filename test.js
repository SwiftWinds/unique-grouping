var G = require("js-combinatorics");

cmb = G.combination(["a", "b", "c", "d"], 2);

cmb.forEach(test => console.log(test));
