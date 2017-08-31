// - Create Export/Download Mix MODULE

class Affirmation {
    constructor() {
        this.uid = getUID();
        this.player = document.createElement('audio');
        this.player.controls = true;
        this.isRecording = false;
        // this.blob = null;
        // this.audioBuffer = null;
    }

    loadMicrom() {
        this.player = app.microm.player.audio;
        this.player.controls = true;
    }

    loadBlob(blob) {
        let me = this;
        me.blob = blob;
        bSerialize(me.blob, function (res) {
            me.base64 = res;
        });
        blobToAudioBuffer(me.blob).then(function (ab) {
            me.audioBuffer = ab;
        });
        me.player = document.createElement('audio');
        me.player.src = URL.createObjectURL(me.blob);
        me.player.controls = true;
        me.player.load();
    }

    toggleRecord() {

        if (this.isRecording) { //is Recording
            this.recordStop();
        } else { //is not Recording
            if (!app.microm.isRecording) { //Microm is NOT already being used for recording
                this.recordStart();
            }
        }
    }


    recordStart() {
        let me = this;
        if (!app.microm.isRecording) {
            app.microm.record().then(function () {
                me.isRecording = true;
            });
        }
    }

    recordStop() {
        let me = this;
        if (me.isRecording) {
            app.microm.stop().then(function (a) {
                me.isRecording = false;
                me.player = app.microm.player.audio;
                me.player.controls = true;
                me.blob = app.microm.getBlob();
                bSerialize(me.blob, function (res) {
                    me.base64 = res;
                });
                blobToAudioBuffer(me.blob).then(function (ab) {
                    me.audioBuffer = ab;
                });
            });
        }

    }

    setPlayer(player) {
        this.player = player;
    }

    // - - - return base64 from Blob
    blobToB64() {
        let me = this;
        return new Promise(function (resolve, reject) {
            let reader = new window.FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                me.base64 = reader.result;
                resolve(reader.result);

            }
        });

    }

    toArrayBuffer() {
        let me = this;
        return new Promise(function (resolve, reject) {
            let reader = new FileReader();
            reader.onloadend = function (e) {
                let result = e.target.result || new ArrayBuffer(0);
                me.arrayBuffer = result;
                resolve(result);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(me.blob);
        });
    };


}

// - - - - - - - - - - - - - - - - - - -
// - - - END OF AFFIRMATION CLASS - - -
// - - - - - - - - - - - - - - - - - -


function newAffirmation(b = null) {
    let aff = new Affirmation();
    Vue.nextTick(function () {

        app.affirmations.unshift(aff);
    });
    if (b == null) {} else {
        aff.loadBlob(b);
    }
    return aff;
}

function newAffirmationFromPath(path) {
    fetchBlob(path).then(function (b) {
        newAffirmation(b);
    });
}

function blobToArrayBuffer(blob) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onloadend = function (e) {
            var result = e.target.result || new ArrayBuffer(0);
            resolve(result);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
    });
};

function getUID() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}


// - - - Sample Loader - - -

function loadSamples() {
    newAffirmationFromPath('audio/snare.mp3');
    newAffirmationFromPath('audio/piano.mp3');
    newAffirmationFromPath('audio/guitar.mp3');
    newAffirmationFromPath('audio/wobble.mp3');
}