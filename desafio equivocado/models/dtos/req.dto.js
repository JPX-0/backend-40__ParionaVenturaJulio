// class ReqDTO {
//   static #keyParams;
//   static #keyQuery;
//   static #valuesParams = {};
//   static #valuesQuery;
//   static #pushValues(params, query) {
//     const keys1 = Object.keys(params);
//     const values1 = Object.values(params);
//     const keys2 = Object.keys(query);
//     const values2 = Object.values(query);
//     for (const key of keys1) {
//       ReqDTO.#valuesParams = ReqDTO.#valuesParams[key.toLowerCase().replace(/\prod/g, "")]
//     }
//     for (const key of query) {
//       ReqDTO.#valuesQuery[key]
//     }
//   }
//   static #Mix() {

//   }
//   constructor(params, query) {
//     Object.assign(ReqDTO.#valuesParams, );
//     ReqDTO.#keyParams = Object.keys(params);
//     ReqDTO.#keyQuery = Object.keys(query);
//     ReqDTO.#pushValues(params, query)
//   }
// };

// module.exports = ReqDTO;