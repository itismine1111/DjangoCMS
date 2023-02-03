$(document).ready(function () {

    removeErrorParas();

    var linkInfoObj;
    var linkInfoObjId;

    var curUrl = window.location.href;
    curUrl = curUrl.substring(0,curUrl.length-1);

    linkInfoObjId = parseInt(curUrl.substring(curUrl.lastIndexOf('/')+1, curUrl.length));


    if (linkInfoObjId === NaN){
        window.location.replace(NOT_FOUND_404_PAGE_URL_ADMIN);
    }

    var object = {}
    object["id"] = linkInfoObjId;

    $.ajax({
        type: "GET",
        url: API_BASE_URL_ADMIN + "linkinfo/",
        data: object,
        headers: {
            'Content-Type':'application/json'
        },
        beforeSend: function(xhr, status){
            $('#loader').css("display", "block");
        },
        complete: function(){
            $('#loader').css("display", "none");
        },
        processData: true,
        success: function (response){
            linkInfoObj = response["data"];

            document.getElementById("nameInputField").value = linkTypeObj["name"];

            console.log(response)
        },

        error: function(response){
            console.error(response.responseJSON);
            window.location.replace(NOT_FOUND_404_PAGE_URL_ADMIN);
        }
    })

    $("#edit_link_type_form").submit(function (event) {
        event.preventDefault();
        removeErrorParas();
        var form = document.getElementById("edit_link_type_form");
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
            type: "PATCH",
            url: API_BASE_URL_ADMIN + "linktype/" + linkTypeObjId + "/",
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

  