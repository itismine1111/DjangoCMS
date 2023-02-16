$(document).ready(function () {
    var changedLinkTypeObj = {};
    removeErrorParas();

    var linkTypeObj;
    var linkTypeObjId;

    var curUrl = window.location.href;
    curUrl = curUrl.substring(0,curUrl.length-1);

    linkTypeObjId = parseInt(curUrl.substring(curUrl.lastIndexOf('/')+1, curUrl.length));


    if (linkTypeObjId === NaN){
        window.location.replace(NOT_FOUND_404_PAGE_URL_ADMIN);
    }

    var object = {}
    object["id"] = linkTypeObjId;

    $.ajax({
        type: "GET",
        url: API_BASE_URL_ADMIN + "linktype/",
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
            linkTypeObj = response["data"];
            document.getElementById("linkTypeInputField").value = linkTypeObj["linkType"];
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

        // var json = JSON.stringify(object)
        var json = JSON.stringify(changedLinkTypeObj)
        console.warn(json);
  
        $.ajax({
            type: "PATCH",
            url: API_LINK_TYPE_URL + linkTypeObjId + "/",
            data: json,
            headers: {
                'Content-Type':'application/json'
            },
            processData: false,
            success: function (response){
                // console.log(response)
                // window.location.replace(LIST_LINK_TYPE_URL_ADMIN);
                showToast("success", 'Updated Link Type successfully');
                document.getElementById("update-btn").disabled = true;
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


    var formFields = document.querySelectorAll(".linktype-form-field");
    formFields.forEach(el => el.addEventListener("change", event=>{
        alert("changed");
        changedLinkTypeObj[event.target.getAttribute("name")] = event.target.value;
        document.getElementById("update-btn").disabled = false;
    }))


    // Change event listener on form fields
    var formFields = document.querySelectorAll(".edit-link-type-form-field");
    formFields.forEach(el => el.addEventListener('change', event => {
        changedLinkTypeObj[event.target.getAttribute("name")] = event.target.value;
        document.getElementById("update-btn").disabled = false;
          
      }));

});

  

// Steps
// Add an event listener to every field 
// Maintain a variable to check if any field's value is changed or not
// If it changes add the field's new value to a new variable which contains only the changed data
// Enable the update button if value is changed
// Check for field Validations
// Post the form
