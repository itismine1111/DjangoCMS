$(document).ready(function () {

    $("#add_link_info_form").submit(function (event) {
        event.preventDefault();
        // Get form
        var form = document.getElementById("add_link_info_form");
        // Create an FormData object 
        var formData = new FormData(form);

        // var formData = new FormData();
        // formData.append("linkType", form.elements['linkType'].value);

        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }    
  
        $.ajax({
            type: "POST",
            url: API_BASE_URL_ADMIN + "linkinfo/",
            data: formData,
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

  