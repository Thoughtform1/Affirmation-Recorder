//TODO: Create saveStorage/loadStorage
//TODO: Create Playlist Repeater

let baseList = [];
let string64List = [];
let blobList = [];



function saveStorage() {
  baseList = [];
  for (let i = 0; i < app.affirmations.length; i++) {
    if (app.affirmations[i].base64 == undefined) {

    } else {
      baseList.push(app.affirmations[i].base64);
    }

  }
  localStorage.setItem("affirmations1", JSON.stringify(baseList));
  return baseList;
}

function loadStorage() {
  app.affirmations = [];
  string64List = JSON.parse(localStorage.getItem('affirmations1'));
  return string64List;


}

function loadBlobList() {
  blobList = [];
  for (let i = 0; i < string64List.length; i++) {
    blobList.push(convertToBlob(string64List[i]));
  }
  loadBlobs();
}

function loadBlobs() {
  for (let i = 0; i < blobList.length; i++) {
    let affirm = new Affirmation();
    affirm.base64 = string64List[i];
    affirm.blob = blobList[i];
    affirm.loadBlob(blobList[i]);
  }
}







function baseToBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {
    type: contentType
  });
  return blob;
}

var BASE64_MARKER = ';base64,';

function convertToBinary(dataURI) {
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for (i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}


function blobToUrl(bl) {
  return URL.createObjectURL(bl);
}

function convertToBlob(base) {
  return new Blob([convertToBinary(base)], {
    type: 'audio/mp3'
  });
}


// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
// Blob/Base64/Buffer/File/Etc... Util ~ ~ ~ ~ ~ ~ ~ ~ 
// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

// ~ ~ ~ CONVERT BASE64 TO BLOB - (base64, 'audio/mp3')
function base64ToBlob(base64, type) {
    return Promise.resolve().then(function () {
        var parts = [binaryStringToArrayBuffer(atob(base64))];
        return type ? createBlob(parts, {
            type: type
        }) : createBlob(parts);
    });
}


// ~ ~ ~ CONVERT BLOB TO BASE64 - (blob)
function blobToBase64(blob) {
    return blobToBinaryString(blob).then(function (binary) {
        return btoa(binary);
    });
}

function blobToBinaryString(blob) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        var hasBinaryString = typeof reader.readAsBinaryString === 'function';
        reader.onloadend = function (e) {
            var result = e.target.result || '';
            if (hasBinaryString) {
                return resolve(result);
            }
            resolve(arrayBufferToBinaryString(result));
        };
        reader.onerror = reject;
        if (hasBinaryString) {
            reader.readAsBinaryString(blob);
        } else {
            reader.readAsArrayBuffer(blob);
        }
    });
}

function binaryStringToArrayBuffer(binary) {
    var length = binary.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    var i = -1;
    while (++i < length) {
        arr[i] = binary.charCodeAt(i);
    }
    return buf;
}

function createBlob(parts, options) {
    options = options || {};
    if (typeof options === 'string') {
        options = {
            type: options
        }; // do you a solid here
    }
    return new Blob(parts, options);
}


function setBase64(aff) {
    let areader = new FileReader();
	areader.onload = () => {
					aff.base64 = areader.result;
                }
                areader.readAsDataURL(aff.blob);
}
