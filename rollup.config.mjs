import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/modules/filter/filter.js",
  output: {
    file: "src/modules/filter/frontFilter.js",
    format: "cjs",
  },
  plugins: [resolve(), commonjs()],
};
