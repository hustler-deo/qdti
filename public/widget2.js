var retrievedObject = localStorage.getItem("W2ChartData");
var retrievedObject2 = localStorage.getItem("W2Operations");

console.log("retrievedObject: ", JSON.parse(retrievedObject));
console.log("retrievedObject2: ", JSON.parse(retrievedObject2));

var widgetData = JSON.parse(retrievedObject);
console.log("widgetData>", widgetData);
var chartDataBox = JSON.parse(retrievedObject2).data;
var chartOperations = JSON.parse(retrievedObject2).operations;

console.log(
  "retrievedObject??: ",
  JSON.parse(chartDataBox).columns,
  JSON.parse(chartOperations).xColumn
);
var columns = JSON.parse(chartDataBox).columns;
var colX = JSON.parse(chartOperations).xColumn;
var colY = JSON.parse(chartOperations).yColumn;
var colZ = JSON.parse(chartOperations).zColumn;

var xArray = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
var yArray = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];

// Define Data
var data = widgetData;

// Define Layout
var layout = {
  xaxis: { title: columns[colX] },
  yaxis: { title: columns[colY] },
  //   title: 'House Prices vs. Size'
};
var config = {
  displaylogo: false,
  displayModeBar: true,
};
// Display using Plotly
Plotly.newPlot("myPlot2", data, layout, config);

const copyToClipboard = async (url) => {
  try {
    await navigator.clipboard.writeText(url);
    alert("Image URL copied to clipboard!");
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    alert("Failed to copy the image URL to clipboard.");
  }
};
function getGraphImage() {
  // console.log("I am called");
  const graphDiv = document.getElementById("myPlot2");

  Plotly.toImage(graphDiv, { format: "png", width: 800, height: 600 })
    .then((url) => {
      console.log("PNG Image URL:", url);
      copyToClipboard(url);
      // uploadImageToImgBB(url)
      //   .then((shortUrl) => {
      //     console.log("Short PNG Image URL:", shortUrl);
      //     // You can use the short PNG URL as needed.
      //   })
      //   .catch((error) => {
      //     console.error("Error uploading image to Imgur:", error);
      //   });
    })
    .catch((error) => {
      console.error("Error generating image:", error);
    });
}

// Call the function to get the PNG image URL after the plot has been created
getGraphImage();
