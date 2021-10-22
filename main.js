// wait for DOM to be ready
document.addEventListener("DOMContentLoaded", function(event) {
    // find the button
    var redirectButton = document.getElementById("find-breed-button");
    
    //redirect to new page if button exist
    if (redirectButton) {
        redirectButton.onclick = function() {
            window.location = "breed-finder.html"
        }
    }

    // find the upload button
    var uploadImageButton = document.getElementById("upload-image");

    // when image is uploaded
    uploadImageButton.onchange = function () {
        // take only the first image
        var uploadedImage = this.files[0];

        // find image placehodler
        var imagePlaceholder = document.getElementById("placeholder-image");
        var noChosenFile = document.getElementById("no-image-chosen");


        console.log("slika", uploadedImage.name);
        // replace placeholder with uploaded image
        imagePlaceholder.src = URL.createObjectURL(uploadedImage);
        noChosenFile.innerHTML = '';

        //create clear button
        var clearButton = document.createElement("p");
        clearButton.innerHTML = "Clear";
        clearButton.className = "clear-button"

        //add clear button to html
        var uploadButtonContainer = document.getElementById("upload-image-button");
        uploadButtonContainer.appendChild(clearButton);

        // clear all results and set back placeholder image
        clearButton.onclick = function() {
            imagePlaceholder.src = "placeholder-dog.png";
            dogBread1.innerHTML = '';
            probability1.innerHTML = '';
            dogBread2.innerHTML = '';
            probability2.innerHTML = '';
            dogBread3.innerHTML = '';
            probability3.innerHTML = '';
            clearButton.remove();
            document.getElementById("results").remove();
        }

        //loading tensorflow model
        mobilenet.load().then(model => {
            // Classify the image.
            model.classify(imagePlaceholder).then(predictions => {
              console.log('Predictions: ');
              console.log(predictions);

              var results = document.getElementById("results");
              results.className = "show-results";

              // round probability value results
              var probabilityValue1 = Math.round(100 * predictions[0].probability)
              var probabilityValue2 = Math.round(100 * predictions[1].probability)
              var probabilityValue3 = Math.round(100 * predictions[2].probability)


                //get first results
              var dogBread1 = document.getElementById ("dogBread1")
              var probability1 = document.getElementById ("probability1")
             
              //update first results
              dogBread1.innerHTML = predictions[0].className;
              probability1.innerHTML = probabilityValue1 + '%';

                //get second results
              var dogBread2 = document.getElementById ("dogBread2")
              var probability2 = document.getElementById ("probability2")
                //update second results
              dogBread2.innerHTML = predictions[1].className;
              probability2.innerHTML = probabilityValue2 + '%';

               //get third results
               var dogBread3 = document.getElementById ("dogBread3")
               var probability3 = document.getElementById ("probability3")
                 //update third results
               dogBread3.innerHTML = predictions[2].className;
               probability3.innerHTML = probabilityValue3 + '%';
            });
          });
    }

    // var uploadedImage = document.getElementById('img');

})