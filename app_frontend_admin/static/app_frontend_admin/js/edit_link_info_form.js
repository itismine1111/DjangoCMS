$(document).ready(function () {
    let headerImgStringBase64 = null;
    removeErrorParas();

    function fillSelectBoxes(){
        $.ajax({
            type: "GET",
            url: API_BASE_URL_ADMIN + "linktype/list/",
            processData: false,
            success: function (response){
                console.log(response["data"])
                var linkTypeSelectbox = document.getElementById("linkTypeIdSelect");
                linkTypeSelectbox.innerHTML = "";
    
                var option = document.createElement("option");
                option.setAttribute("value", 0);
                option.setAttribute("selected", 'selected');
                option.innerHTML = "<strong>Select..</strong>";
    
                linkTypeSelectbox.appendChild(option);
    
                for(let i=0; i<response["data"].length; i++){
                    var option = document.createElement("option");
                    option.setAttribute("value", response["data"][i]["id"]);
                    option.innerHTML = response["data"][i]["linkType"]
                    linkTypeSelectbox.appendChild(option); 
                }
            },
    
            error: function(response){
                console.log("ERROR gGetting list type list");
                console.error(response)
            }
        })
    
        $.ajax({
            type: "GET",
            url: API_BASE_URL_ADMIN + "linkinfo/list/",
            processData: false,
            success: function (response){
                console.log(response["data"])
                var linkInfoSelectbox = document.getElementById("parentIdSelect");
                linkInfoSelectbox.innerHTML = "";
    
                var option = document.createElement("option");
                option.setAttribute("value", 0);
                option.setAttribute("selected", 'selected');
                option.innerHTML = "<strong>Select..</strong>";
    
                linkInfoSelectbox.appendChild(option);
    
                for(let i=0; i<response["data"].length; i++){
                    var option = document.createElement("option");
                    option.setAttribute("value", response["data"][i]["id"]);
                    option.innerHTML = response["data"][i]["name"]
                    linkInfoSelectbox.appendChild(option); 
                }
            },
    
            error: function(response){
                console.log("ERROR Getting list type list");
                console.error(response);
            }
        })
    }
    
    fillSelectBoxes();

    var linkInfoObj;
    var changedLinkInfoObj = {};
    var linkInfoObjId;
    // var originalFieldValue;

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

            document.getElementById("nameInputField").value = linkInfoObj["name"];
            document.getElementById("urlInputField").value = linkInfoObj["url"];

            if(linkInfoObj["linkTypeId"] !== null){
                document.getElementById("linkTypeIdSelect").value = linkInfoObj["linkTypeId"];
            }
            else{
                document.getElementById("linkTypeIdSelect").value = 0;
            }
            
            if(linkInfoObj["parentId"] !== null){
                document.getElementById("parentIdSelect").value = linkInfoObj["parentId"];
            }
            else{
                document.getElementById("parentIdSelect").value = 0;
            }

            document.getElementById("titleInputField").value = linkInfoObj["title"];
            document.getElementById("useExternalUrlCheckbox").checked = linkInfoObj["useExternalUrl"];
            document.getElementById("externalUrlInputField").value = linkInfoObj["externalUrl"];
            document.getElementById("openInExternalWindowCheckbox").checked = linkInfoObj["openInExternalWindow"];
            document.getElementById("sortOrderIdInputField").value = linkInfoObj["sortOrderId"];
            // Header image needs to be set for now headerImgPreview
            document.getElementById("headerImgPreview").setAttribute("src", linkInfoObj["headerImage"]);
            document.getElementById("contentTextarea").value = linkInfoObj["content"];
            


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

        if(!editLinkInfoFormIsValid(object)){
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



    // Change event listener on form fields
    var formFields = document.querySelectorAll(".edit-link-info-form-field");
    formFields.forEach(el => el.addEventListener('change', event => {

        console.error(event.target.getAttribute("id"));
        if(event.target.getAttribute("id") === "headerImageFile"){
            const [file] = document.getElementById("headerImageFile").files
            if (file) {
              document.getElementById("headerImgPreview").src = URL.createObjectURL(file);
              alert("New image is being uploaded");
            }
        }
          
      }));


    //event listener on "useExternalUrlCheckbox"
    var useExtUrl = document.getElementById("useExternalUrlCheckbox");
    useExtUrl.addEventListener("change", (event)=>{
        console.log(event.target.checked);
        if(event.target.checked){
            document.getElementById("externalUrlInputField").disabled = false;
            document.getElementById("openInExternalWindowCheckbox").disabled = false;
        }
        else{
            document.getElementById("externalUrlInputField").disabled = true;
            document.getElementById("openInExternalWindowCheckbox").disabled = true;
        }
    })

    var headerImg = document.getElementById("headerImageFile");
    headerImg.addEventListener("change", ()=>{

        // alert("On changed");
        var file = document.querySelector(
            'input[type=file]')['files'][0];
    
        var reader = new FileReader();
        console.log("next");
        
        reader.onload = function () {
            headerImgStringBase64 = reader.result.replace("data:", "")
                .replace(/^.+,/, "");
    
            imageBase64Stringsep = headerImgStringBase64;
        
            // alert(imageBase64Stringsep);
            // console.log(headerImgStringBase64);
        }
        reader.readAsDataURL(file);
  });


  function editLinkInfoFormIsValid(object){
    isValid = true;
    if(object["name"] === "" || object["name"] === null){
        showErrorMessage("name", ["This field may not be blank.",]);
        isValid = false;
    }

    if(object["linkTypeId"] === null){
        showErrorMessage("linkTypeId", ["Link Type must be selected.",]);
        isValid = false;
    }

    return(isValid);
  }  
      


});

  

// Steps
// Add an event listener to every field 
// Maintain a variable to check if any field's value is changed or not
// If it changes add the field's new value to a new variable which contains only the changed data
// Enable the update button if value is changed
// Check for field Validations
// Post the form
