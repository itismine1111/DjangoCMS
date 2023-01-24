$(document).ready(function () {
    $("#add_link_type_form").submit(function (event) {
        event.preventDefault();
        // Get form
        var form = document.getElementById("add_link_type_form");
        // Create an FormData object 
        // var formData = new FormData(form);

        var formData = new FormData();
        formData.append("linkType", form.elements['linkType'].value);
        console.log(form.elements['linkType'].value);
        console.log(formData);
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
    
  
        $.ajax({
            type: "POST",
            url: API_BASE_URL_ADMIN + "linktype/",
            data: formData,
            processData: false,
            success: function (response){
                console.log(response)
                window.location.replace(LIST_LINK_TYPE_URL_ADMIN);
            },

            error: function(response){
                console.log("ERROR saving new list type");
                console.error(response)
            }
        })
    });

});

  