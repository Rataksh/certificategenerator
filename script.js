const nameInput = document.getElementById('name')
const topicInput = document.getElementById('topic')
const startInput = document.getElementById('startDate')
const endInput = document.getElementById('endDate')

var result           = '';
var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var charactersLength = characters.length;
for ( var i = 0; i < 3; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
}



nameInput.addEventListener('input', function(){
  drawimage()
})
topicInput.addEventListener('input', function(){
  drawimage()
})
startInput.addEventListener('input', function(){
drawimage()
})
endInput.addEventListener('input', function(){
drawimage()
})

function drawimage(){
  document.getElementById('internName').innerHTML = nameInput.value
  document.getElementById('internTopic').innerHTML = topicInput.value
  document.getElementById('duration').innerHTML = "Duration: "+ startInput.value + " to " + endInput.value
  document.getElementById('unid').innerHTML = "Unique id: " + result
}



$("#downloadPDF").click(function () {
  // $("#content2").addClass('ml-215'); // JS solution for smaller screen but better to add media queries to tackle the issue
  getScreenshotOfElement(
    $("div#content2").get(0),
    0,
    0,
    $("#content2").width() + 45,  // added 45 because the container's (content2) width is smaller than the image, if it's not added then the content from right side will get cut off
    $("#content2").height() + 100, // same issue as above. if the container width / height is changed (currently they are fixed) then these values might need to be changed as well.
    function (data) {
      var pdf = new jsPDF("l", "pt", [
        $("#content2").width(),
        $("#content2").height(),
      ]);

      pdf.addImage(
        "data:image/png;base64," + data,
        "PNG",
        0,
        0,
        $("#content2").width(),
        $("#content2").height()
      );
      pdf.save(nameInput + "azimuth-certificte.pdf");
    }
  );
});

function getScreenshotOfElement(element, posX, posY, width, height, callback) {
  html2canvas(element, {
    onrendered: function (canvas) {
      // $("#content2").removeClass('ml-215');  // uncomment this if resorting to ml-125 to resolve the issue
      var context = canvas.getContext("2d");
      var imageData = context.getImageData(posX, posY, width, height).data;
      var outputCanvas = document.createElement("canvas");
      var outputContext = outputCanvas.getContext("2d");
      outputCanvas.width = width;
      outputCanvas.height = height;

      var idata = outputContext.createImageData(width, height);
      idata.data.set(imageData);
      outputContext.putImageData(idata, 0, 0);
      callback(outputCanvas.toDataURL().replace("data:image/png;base64,", ""));
    },
    width: width,
    height: height,
    useCORS: true,
    taintTest: false,
    allowTaint: false,
  });
}
