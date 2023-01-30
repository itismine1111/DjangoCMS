$(document).ready(function () {

    $("#add_link_type_form").submit(function (event) {
        event.preventDefault();
        var form = document.getElementById("add_link_type_form");
        var formData = new FormData(form);

        var object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object)
        console.warn(json);

        // var formData = new FormData();
        // formData.append("linkType", form.elements['linkType'].value);
        // console.log(form.elements['linkType'].value);
        // console.log(formData);
        // for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }

        // var object = {};
        // formData.forEach(function(value, key){
        //     object[key] = value;
        // });
        // var json = JSON.stringify(object);
        // console.warn("reaching here")
        // console.warn(json)
  
        $.ajax({
            type: "POST",
            url: API_BASE_URL_ADMIN + "linktype/",
            data: json,
            headers: {
                'Content-Type':'application/json'
            },
            processData: false,
            success: function (response){
                console.log(response)
                window.location.replace(LIST_LINK_TYPE_URL_ADMIN);
            },

            error: function(response){
                console.log("ERROR saving new list type");
                console.error(response)
                showToast("error", 'Error encountered while creating new Link Type');
            }
        })
    });

});

  