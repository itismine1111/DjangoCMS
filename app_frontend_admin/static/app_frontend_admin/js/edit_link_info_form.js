$(document).ready(function () {
    removeErrorParas();

    $("#add_link_type_form").submit(function (event) {
        event.preventDefault();
        removeErrorParas();
        var form = document.getElementById("add_link_type_form");
        var formData = new FormData(form);

        var object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });

        if(!editLinkTypeFormIsValid(object)){
            return;
        }

        var json = JSON.stringify(object)
        console.warn(json);
  
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
                console.error(response)
                if(response.responseJSON["success"] === false){
                    handleBackendErrors(response.responseJSON["data"]);
                }
                showToast("error", 'Error encountered while creating new Link Type');
            }
        })
    });

    function editLinkTypeFormIsValid(object){
        isValid = true;
        if(object["linkType"] === "" || object["linkType"] === null){
            showErrorMessage("linkType", ["This field may not be blank.",]);
            isValid = false;
        }
    
        return(isValid);
      }  

});

  