// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("./data/samples.json").then((importedData) => {
    // console.log(importedData);
    var data = importedData;
    // console.log(data);
    metadata = data.metadata;
    console.log(metadata);
    idNo = metadata.map(obj=>obj.id);
    // console.log(idNo);
    // for (var i=0; i<idNo.length; i++){
    //     console.log(idNo[i])
    // }
    // ethnic = metadata.map(obj=>obj.ethnicity);
    // // console.log(ethnic);
    // gender = metadata.map(obj=>obj.gender);
    // // console.log(gender);
    // age = metadata.map(obj=>obj.age);
    // // console.log(age);
    // loc = metadata.map(obj=>obj.location);
    // // console.log(loc); 
    // bbtype = metadata.map(obj=>obj.bbtype);
    // // console.log(bbtype);
    // wfreq = metadata.map(obj=>obj.wfreq);
    // console.log(wfreq);
   
    
});

// FUNCTION 'init': Initializes the page with a default plot
function init() {

    // Select id sample-metadata in index.html
    info_table = d3.select("#sample-metadata");

    // Ensure a 'clean' slate to begin with
    info_table.html("");
      
    //Append data into the table 
    row = info_table.append("p")
    row.text("In the above dropdown, select an ID.");


    d3.json("./data/samples.json").then((importedData) => {
        var data = importedData;
        metadata = data.metadata;
    idNo = metadata.map(obj=>obj.id);
    for (var i=0; i<idNo.length;i++){
        // $("#sample-metadata").append("<option>"+ idNo[i].Text+ "</option>")        
         $("#selDataset").append("<option value='>" + 
         idNo[i] + "<'/option")
    }
    });





    // row = info_table.append("p")
    // row.text("id: ");
    // row = info_table.append("p")
    // row.text("ethnicity: ");
    // row = info_table.append("p")
    // row.text("gender: ");
    // row = info_table.append("p")
    // row.text("age: ");
    // row = info_table.append("p")
    // row.text("location: ");
    // row = info_table.append("p")
    // row.text("bbtype: ");
    // row = info_table.append("p")
    // row.text("wfreq: ");

}

// When user selects an ID, run function 'updateIDTable'
    id_selection = d3.select("#selDataset").on("change", optionChanged);

// FUNCTION 'updateIdTable' ON CHANGE: This function is called when a dropdown menu item is selected
function optionChanged(){

    for (var i=0; i<idNo.length;i++){
        $("#sample-metadata").append("<option>"+ idNo[i].Text+ "</option>")
    }




    // var dataset = dropdownMenu.property("value");
    
    // for (var i=0; i<idNo.length; i++){
    //     console.log(idNo[i])







    //     if (dataset === idNo[i]){
    //     console.log("hello, this is id 940.")

    //     }



    // }
    // Assign the value of the dropdown menu option to a variable
    //   var dataset = dropdownMenu."hello";
    
    //     if (dataset == '940') {
    //         data = "hello";
    //     }
    





//     //remove everything in the sample-metadata
    info_table.html("");
//     //Append data into the table 
    row = info_table.append("p")
    row.text("id: ");
    row = info_table.append("p")
    row.text("ethnicity: ");
    row = info_table.append("p")
    row.text("gender: ");
    row = info_table.append("p")
    row.text("age: ");
    row = info_table.append("p")
    row.text("location: ");
    row = info_table.append("p")
    row.text("bbtype: ");
    row = info_table.append("p")
    row.text("wfreq: ");

}



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




// run function init()
init();