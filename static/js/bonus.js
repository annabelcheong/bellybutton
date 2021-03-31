// FUNCTION 'addGauge' adds in the Gauge in the top right of the html page
function addGauge(idNo){

        // EXTRACT variable washFreq of the selected idNo (to be used on the gaugeData)
        d3.json("./data/samples.json").then((importedData) => {
            var data = importedData;
            var metadata = data.metadata;
            console.log(metadata);
            var filterIdData = metadata.filter(obj=>obj.id == idNo);
                console.log(filterIdData);
            var washFreq = parseFloat(filterIdData[0].wfreq);
            console.log(washFreq);

            //// PLOTLY GAUGE ////

            // DATA 
            var gaugeData = [
                {
                  domain: { x: [0, 1], y: [0, 1] },
                  value: washFreq,
                  title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week"},
                  type: "indicator",
                  mode: "gauge+number",
                  gauge: {
                    axis: { range: [null, 10] },
                    bar: { color: "black"},
                    steps: [
                      { range: [0, 2], color: "#c94c4c" },
                      { range: [2, 4], color: "#f2ae72" },
                      { range: [4, 6], color: "#ffef96" },
                      { range: [6, 8], color: "#b1cbbb" },
                      { range: [8, 10], color: "#A0DAA9" }
                    ],
                  }
                }
              ];

            // LAYOUT
            var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
            
            // Plot the gauge
            Plotly.newPlot('gauge', gaugeData, layout);
    
        });
    
    };