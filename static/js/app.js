// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("./data/samples.json").then((importedData) => {
    // console.log(importedData);
    var data = importedData;
// console.log(data);
// console.log(data.metadata);
metadata = data.metadata;
idNo = metadata.map(obj=>obj.id);
//console.log(idNo);
ethnic = metadata.map(obj=>obj.ethnicity);
//console.log(ethnic);
gender = metadata.map(obj=>obj.gender);
// console.log(gender);
age = metadata.map(obj=>obj.age);
// console.log(age);
loc = metadata.map(obj=>obj.location);
// console.log(loc); 
bbtype = metadata.map(obj=>obj.bbtype);
// console.log(bbtype);
wfreq = metadata.map(obj=>obj.wfreq);
// console.log(wfreq);

 });


// // Initializes the page with a default plot
// function init() {
//     data = [{
//       x: [1, 2, 3, 4, 5],
//       y: [1, 2, 4, 8, 16] }];
  
//     Plotly.newPlot("plot", data);
//   }

// // Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", updatePlotly);

// // This function is called when a dropdown menu item is selected
// function updatePlotly() {
//   // Use D3 to select the dropdown menu
//   var dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   var dataset = dropdownMenu.property("value");

//     if (dataset == '940') {
//         data = idNo
//     }