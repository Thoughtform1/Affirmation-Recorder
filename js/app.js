let microm = new Microm();
let $modal; 
$(function(){
$modal = $('div.modal').omniWindow();



});

function modalDownload() {

    downloadMixdown($('#modalRepeat').val());
    $modal.trigger('hide');
}

