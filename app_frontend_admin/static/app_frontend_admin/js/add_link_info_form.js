$(document).ready(function () {

    $("#add_link_info_form").submit(function (event) {
        event.preventDefault();
        var form = document.getElementById("add_link_info_form");
        var formData = new FormData(form);

        var object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object)
        console.warn(json);


        $.ajax({
            type: "POST",
            url: API_BASE_URL_ADMIN + "linkinfo/",
            data: formData,
            headers: {
                'Content-Type':'application/json'
            },
            processData: false,
            success: function (response){
                console.log(response)
                window.location.replace(LIST_LINK_INFO_URL_ADMIN);
            },

            error: function(response){
                console.log("ERROR saving new list info");
                console.error(response)
                showToast("error", 'Error encountered while creating new Link Info');
            }
        })
    });

});

  