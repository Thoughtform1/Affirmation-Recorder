let saveArray = [];
let loadArray = [];
let loadedBlobArray = [];


function saveSession() {
       saveArray = [];
 for (i = 0; i < app.affirmations.length; i++) {
     if(app.affirmations[i].base64 == undefined) {
       
     } else {   saveArray.push(app.affirmations[i].base64);  }

    }
    let strArray = JSON.stringify(saveArray);
    localStorage.setItem('a', strArray);
}

function loadSession() {
    loadedBlobArray = [];
loadArray = JSON.parse(localStorage.getItem('a'));
 for (i = 0; i < loadArray.length; i++) {
loadedBlobArray.push(bDeserialize(loadArray[i]));
newAffirmation(bDeserialize(loadArray[i]));
 }
}

function bSerialize (blob, onFinish) {
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            onFinish(reader.result);
        };
    };

    function bDeserialize (str) {
        var indexOfComma = str.lastIndexOf(",");
        var contentType = str.substr(0, indexOfComma + 1) || "";
        var byteChars = atob(str.substr(indexOfComma + 1));
        var sliceSize = 512;
        var byteArrays = [];
        for (var offset = 0; offset < byteChars.length; offset += sliceSize) {
            var slice = byteChars.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            byteArrays.push(new Uint8Array(byteNumbers));
        }
        return new Blob(byteArrays, { type: 'audio/mp3' });
    };
