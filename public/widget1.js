console.log("Widget1 Called");
var retrievedObject = localStorage.getItem("W1ChartData");
var retrievedObject2 = localStorage.getItem("W1Operations");

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
Plotly.newPlot("myPlot1", data, layout, config);

// const copyToClipboard = async (url) => {
//   try {
//     await navigator.clipboard.writeText(url);
//     alert("Image URL copied to clipboard!");
//   } catch (error) {
//     console.error("Failed to copy to clipboard:", error);
//     alert("Failed to copy the image URL to clipboard.");
//   }
// };

const copyToClipboard = async (url) => {
  if (document.hasFocus()) {
    try {
      await navigator.clipboard.writeText(url);
      alert("Image URL copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      alert("Failed to copy the image URL to clipboard.");
    }
  } else {
    alert("Failed..... to copy the image URL to clipboard.");

    // Handle the case where the document is not focused (e.g., show an error message).
  }
};

function getGraphImage() {
  // console.log("I am called");
  const graphDiv = document.getElementById("myPlot1");

  Plotly.toImage(graphDiv, { format: "png", width: 800, height: 600 })
    .then((url) => {
      console.log("PNG Image URL:");
      // copyToClipboard(url);
      localStorage.setItem("WIDGET_URL", url);
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

// function uploadImageToImgBB(base64Image) {
//   // Your API key from ImgBB
//   const apiKey = "YOUR_API_KEY_HERE";

//   // Create a FormData object to prepare the image data for upload
//   const formData = new FormData();
//   formData.append("image", base64Image);

//   // Make a POST request to ImgBB's API
//   fetch("https://api.imgbb.com/1/upload?key=" + apiKey, {
//     method: "POST",
//     body: formData,
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.data) {
//         const imageUrl = data.data.url;
//         console.log("Image uploaded to ImgBB:", imageUrl);
//         // You can use the imageUrl as needed (e.g., displaying it in your app).
//       } else {
//         console.error("Error uploading image to ImgBB:", data.error.message);
//       }
//     })
//     .catch((error) => {
//       console.error("Error uploading image to ImgBB:", error);
//     });
// }

// // Example usage:
// const base64Image = "YOUR_BASE64_IMAGE_HERE";
// uploadImageToImgBB(base64Image);
