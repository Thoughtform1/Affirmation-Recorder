let ctx = new window.AudioContext();
// - - 3 2 1 Countdown - - - - - - - - - - - - - - - - - - - -

function Countdown(options) {
    var timer,
    instance = this,
    seconds = options.seconds || 10,
    updateStatus = options.onUpdateStatus || function () {},
    counterEnd = options.onCounterEnd || function () {};
  
    function decrementCounter() {
      updateStatus(seconds);
      if (seconds === 0) {
        counterEnd();
        instance.stop();
      }
      seconds--;
    }
  
    this.start = function () {
      clearInterval(timer);
      timer = 0;
      seconds = options.seconds;
      timer = setInterval(decrementCounter, 1000);
    };
  
    this.stop = function () {
      clearInterval(timer);
    };
  }

  function recordPromise() {
    return new Promise(function (resolve, reject) {
        let recCounter = new Countdown({
            seconds:3,  // number of seconds to count down
            //onUpdateStatus: function(sec){ app.status = 'Recording in: \n' + sec;  },
            onUpdateStatus: function(sec){ app.status = 'start in ' + sec;  },
            onCounterEnd: function(){  resolve(this); }
        });
        recCounter.start();
    });
}


// - - blobToAudioBuffer(blob) - - - - - - - - - - - - - - - -

function blobToAudioBuffer(blob) {
  return new Promise(function (resolve, reject) {
      toAudioBuffer(blob, (err, audioBuffer) => {}).then(function (a) {
          resolve(a);
      });
  });
}

function toAudioBuffer(buffer, opts, cb) {
  if (opts instanceof Function) {
      cb = opts;
      opts = {};
  }
  if (!opts) opts = {};
  if (buffer instanceof Blob) buffer = new File([buffer], 'toAudioBuffer')
  if (buffer instanceof File) {
      return new Promise((resolve, reject) => {
          try {
              let reader = new FileReader()
              reader.readAsArrayBuffer(buffer)
              reader.onload = () => {
                  return resolve(toAudioBuffer(reader.result, opts, cb))
              }
          } catch (e) {
              reject(e)
          }
      })
  }
  if (!(buffer instanceof ArrayBuffer)) {
      buffer = toAB(buffer)
  }
  return ctx.decodeAudioData(buffer, (buf) => {
      cb && cb(null, buf);
  }, (err) => {
      cb && cb(err);
  });
}

//return new mp3 Blob from array of Blobs
function appendBlobs(blobArray) {
  return new Blob(blobArray, {
      type: "audio/mp3"
  })
}

//return a mp3 Blob from path - Promise
function fileToBlob(path) {
let xhr = new XMLHttpRequest();
xhr.open('GET', path, true);
xhr.responseType = 'blob';
xhr.onload = function(e) {
  if (this.status == 200) {
console.log(e);
console.log(this.response);
this.response;
  }
};

xhr.send();
}



function fetchBlob(path) {
return new Promise(function(resolve, reject) { 
var oReq = new XMLHttpRequest();
oReq.open("GET", path, true);
oReq.responseType = "arraybuffer";
oReq.onload = function(oEvent) {
  resolve(new Blob([oReq.response], {type: "audio/mp3"}));
};
oReq.send();
});


}