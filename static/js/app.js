// var idNo = names;
// console.log(idNo);


// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("./data/samples.json").then((importedData) => {
    // console.log(importedData);
    var data = importedData;
console.log(data);
});