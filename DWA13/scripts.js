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
names.forEach((name) => console.log(name));

// Use forEach to console log each name with a matching province.
names.forEach((name, index) => console.log(`${name} (${provinces[index]})`));

// Using map, loop over all province names and turn the string to all uppercase.
const uppercaseProvinces = provinces.map((province) => province.toUpperCase());
console.log(uppercaseProvinces);

// Create a new array with map that has the amount of characters in each name.
const nameLengths = names.map((name) => name.length);
console.log(nameLengths);

// Using sort to sort all provinces alphabetically.
const sortedProvinces = provinces.sort();
console.log(sortedProvinces);

// Use filter to remove all provinces that have the word "Cape" in them.
const filteredProvinces = provinces.filter(
  (province) => !province.includes("Cape")
);
console.log(filteredProvinces.length);

// Create a boolean array using map and some to determine whether a name contains an "S" character.
const hasSCharacter = names.map((name) =>
  name.split("").some((char) => char.toLowerCase() === "s")
);
console.log(hasSCharacter);

// Using only reduce, turn the above into an object that indicates the province of an individual.
const nameProvinceMap = names.reduce((result, name, index) => {
  result[name] = provinces[index];
  return result;
}, {});
console.log(nameProvinceMap);

const products = [
  { product: "banana", price: "2" },
  { product: "mango", price: 6 },
  { product: "potato", price: " " },
  { product: "avocado", price: "8" },
  { product: "coffee", price: 10 },
  { product: "tea", price: "" },
];

// Use forEach to console log each product name to the console.
console.log(products.forEach((product) => console.log(product.product)));

// Use filter to filter out products that have a name longer than 5 characters.
console.log(products.filter((product) => product.product.length <= 5));

// Using both filter and map, convert prices that are strings to numbers, and remove products without prices.
console.log(
  products
    .filter((product) => !isNaN(product.price))
    .map((product) => ({ ...product, price: parseFloat(product.price) }))
    .reduce((total, product) => total + product.price, 0)
);

// Use reduce to concatenate all product names.
console.log(
  products.reduce((concatenatedNames, product, index, arr) => {
    concatenatedNames += product.product;
    if (index < arr.length - 1) {
      concatenatedNames += ", ";
    }
    return concatenatedNames;
  }, "")
);

// Use reduce to calculate both the highest and lowest-priced items.
console.log(
  products.reduce(
    (result, product) => {
      if (!result.highest || product.price > result.highest.price) {
        result.highest = product;
      }
      if (!result.lowest || product.price < result.lowest.price) {
        result.lowest = product;
      }
      return result;
    },
    { highest: null, lowest: null }
  )
);

// Using only Object.entries and reduce, recreate the object with changed keys.
console.log(
  Object.entries(products).reduce((newProducts, [key, value]) => {
    const renamedKey =
      key === "product" ? "name" : key === "price" ? "cost" : key;
    newProducts[renamedKey] = value;
    return newProducts;
  }, {})
);
