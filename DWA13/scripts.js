const provinces = [
  "Western Cape",
  "Gauteng",
  "Northern Cape",
  "Eastern Cape",
  "KwaZulu-Natal",
  "Free State",
];
const names = [
  "Ashwin",
  "Sibongile",
  "Jan-Hendrik",
  "Sifso",
  "Shailen",
  "Frikkie",
];

// Use forEach to console log each name to the console.
names.forEach((name) => {
  console.log(name);
});

// Use forEach to console log each name with a matching province.
names.forEach((name, index) => {
  console.log(`${name} (${provinces[index]})`);
});

// Using map, loop over all province names and turn them to uppercase. Log the new array to the console.
const uppercaseProvinces = provinces.map((province) => province.toUpperCase());
console.log(uppercaseProvinces);

// Create a new array with map that has the amount of characters in each name.
const nameLengths = names.map((name) => name.length);
console.log(nameLengths);

// Using sort, sort all provinces alphabetically.
const sortedProvinces = provinces.sort();
console.log(sortedProvinces);

// Use filter to remove all provinces that have the word 'Cape' in them.
const filteredProvinces = provinces.filter(
  (province) => !province.includes("Cape")
);
console.log(filteredProvinces);

// Create a boolean array by using map and some to determine whether a name contains an 'S' character.
const containsSArray = names.map((name) =>
  name.split("").some((char) => char === "S")
);
console.log(containsSArray);

// Using reduce, turn the above into an object that indicates the province of an individual.
const nameToProvince = names.reduce((result, name, index) => {
  result[name] = provinces[index];
  return result;
}, {});
console.log(nameToProvince);
