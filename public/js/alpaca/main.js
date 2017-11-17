
// We can attach the `fileselect` event to all file inputs on the page

$(document).delegate(':file', "change", function () {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');

    var inputParentText = $(this).parents('.input-group').find(':text'),
        log = numFiles > 1 ? numFiles + ' files selected' : label;

    if (inputParentText.length) {
        inputParentText.val(log);
    } else {
        if (log) alert(log);
    }

});

$(':file').on('fileselect', function (event, numFiles, label) {



});