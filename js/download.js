//concatAudioBuffers THEN mergeAudioBuffers(backgroundAudio, affirmationMix)
let crunker = new Crunker();
let finalAudioBuffer;
let exportedBlob;
let exported;

function mixdown() {
    blobListlet  = [];
    for (i = 0; i < app.affirmations.length; i++) {
        if (app.affirmations[i].blob == undefined) {} else {
            blobList.push(app.affirmations[i].blob);
        }

    }
    toAudioBuffer(appendBlobs(blobList)).then(function (a) {
        finalAudioBuffer = a;
        exported = crunker.export(finalAudioBuffer, 'audio/mp3');
        exportedBlob = exported.blob;
    });
}

function downloadMixdown(repeat) {
            console.log(repeat);
    mixdownPromiseRepeat(repeat).then(function (a) {

        crunker.download(exportedBlob, 'AffirmationMix');
    });

}

function toggleMixPlay() {
    app.mixPlay = !app.mixPlay;
    if (app.mixPlay) { //start playing
        mixdownPromise().then(function (a) {
            exported.element.loop = true;
            exported.element.play();
        });
    } else { //stop playing
        exported.element.pause();
        exported.element.loop = false;
        exported.element.currentTime = 0;

    }
}



function mixdownPromise() {
    return new Promise(function (resolve, reject) {

        let blobList = [];
        for (i = 0; i < app.affirmations.length; i++) {
            if (app.affirmations[i].blob == undefined) {} else {
                blobList.push(app.affirmations[i].blob);
            }
        }
        toAudioBuffer(appendBlobs(blobList)).then(function (a) {
            finalAudioBuffer = a;
            exported = crunker.export(finalAudioBuffer, 'audio/mp3');
            exportedBlob = exported.blob;
            resolve(exported);
        });

    });

}


function mixdownPromiseRepeat(repeat) {
    return new Promise(function (resolve, reject) {

        let blobList = [];
          for (a = 0; a < repeat; a++) {
        for (i = 0; i < app.affirmations.length; i++) {
            if (app.affirmations[i].blob == undefined) {} else {
                blobList.push(app.affirmations[i].blob);
            }
        }
          }
        toAudioBuffer(appendBlobs(blobList)).then(function (a) {
            finalAudioBuffer = a;
            exported = crunker.export(finalAudioBuffer, 'audio/mp3');
            exportedBlob = exported.blob;
            resolve(exported);
        });

    });

}

