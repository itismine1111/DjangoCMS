$(document).ready(function () {
    var headerImgStringBase64 = null;
    var linkInfoObj;
    var changedLinkInfoObj = {};
    var linkInfoObjId;

    var curUrl = window.location.href;
    curUrl = curUrl.substring(0,curUrl.length-1);

    linkInfoObjId = parseInt(curUrl.substring(curUrl.lastIndexOf('/')+1, curUrl.length));


    if (linkInfoObjId === NaN){
        window.location.replace(NOT_FOUND_404_PAGE_URL_ADMIN);
    }

    


    
    removeErrorParas();

    function fillLinkTypeSelectBox(){
        $.ajax({
            type: "GET",
            url: API_BASE_URL_ADMIN + "linktype/list/",
            processData: false,
            beforeSend: function(xhr, status){
                $('#loader').css("display", "block");
            },
            complete: function(){
                // $('#loader').css("display", "none");
            },
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
                fillParentIdSelectBox();
            },
    
            error: function(response){
                console.log("ERROR gGetting list type list");
                console.error(response)
            }
        })
    }

    function fillParentIdSelectBox(){
        $.ajax({
            type: "GET",
            url: API_BASE_URL_ADMIN + "linkinfo/list/",
            processData: false,
            beforeSend: function(xhr, status){
                $('#loader').css("display", "block");
            },
            complete: function(){
                // $('#loader').css("display", "none");
            },
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

                getLinkInfoData();
            },
    
            error: function(response){
                console.log("ERROR Getting list type list");
                console.error(response);
            }
        })
    }

    fillLinkTypeSelectBox();

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

                getLinkInfoData();
            },
    
            error: function(response){
                console.log("ERROR Getting list type list");
                console.error(response);
            }
        })
    }
    
    // fillSelectBoxes();




    function getLinkInfoData(){
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
                document.getElementById("isEnabledCheckbox").checked = linkInfoObj["isEnabled"];
    
                if(linkInfoObj["linkTypeId"] !== null){
                    document.getElementById("linkTypeIdSelect").value = linkInfoObj["linkTypeId"];
                }
                else{
                    document.getElementById("linkTypeIdSelect").value = 0;
                }
                
                if(linkInfoObj["parentId"] !== null){
                    // var selectBoxParentId = document.getElementById("parentIdSelect");
                    // selectBoxParentId.value = linkInfoObj["parentId"];
                    
                    document.getElementById("parentIdSelect").value = linkInfoObj["parentId"];
                }
                else{
                    document.getElementById("parentIdSelect").selectedIndex  = 0;
                }
    
                document.getElementById("titleInputField").value = linkInfoObj["title"];
                document.getElementById("useExternalUrlCheckbox").checked = linkInfoObj["useExternalUrl"];
                document.getElementById("externalUrlInputField").value = linkInfoObj["externalUrl"];
                document.getElementById("openInExternalWindowCheckbox").checked = linkInfoObj["openInExternalWindow"];
                document.getElementById("sortOrderIdInputField").value = linkInfoObj["sortOrderId"];
                // Header image needs to be set for now headerImgPreview
                document.getElementById("headerImgPreview").setAttribute("src",  linkInfoObj["headerImage"]);
                // document.getElementById("contentTextarea").value = linkInfoObj["content"];
                CKEDITOR.instances['contentTextarea'].setData(linkInfoObj["content"]);
    
    
                document.getElementById("externalUrlInputField").disabled = !document.getElementById("useExternalUrlCheckbox").checked;
                document.getElementById("openInExternalWindowCheckbox").disabled = !document.getElementById("useExternalUrlCheckbox").checked;
    
                console.log(response)
            },
    
            error: function(response){
                console.error(response.responseJSON);
                window.location.replace(NOT_FOUND_404_PAGE_URL_ADMIN);
            }
        })
    }

    // $.ajax({
    //     type: "GET",
    //     url: API_BASE_URL_ADMIN + "linkinfo/",
    //     data: object,
    //     headers: {
    //         'Content-Type':'application/json'
    //     },
    //     beforeSend: function(xhr, status){
    //         $('#loader').css("display", "block");
    //     },
    //     complete: function(){
    //         $('#loader').css("display", "none");
    //     },
    //     processData: true,
    //     success: function (response){
    //         linkInfoObj = response["data"];

    //         document.getElementById("nameInputField").value = linkInfoObj["name"];
    //         document.getElementById("urlInputField").value = linkInfoObj["url"];
    //         document.getElementById("isEnabledCheckbox").checked = linkInfoObj["isEnabled"];

    //         if(linkInfoObj["linkTypeId"] !== null){
    //             document.getElementById("linkTypeIdSelect").value = linkInfoObj["linkTypeId"];
    //         }
    //         else{
    //             document.getElementById("linkTypeIdSelect").value = 0;
    //         }
            
    //         if(linkInfoObj["parentId"]){
    //             // var selectBoxParentId = document.getElementById("parentIdSelect");
    //             // selectBoxParentId.value = linkInfoObj["parentId"];
                
    //             document.getElementById("parentIdSelect").value = linkInfoObj["parentId"];
    //         }
    //         else{
    //             document.getElementById("parentIdSelect").selectedIndex  = "0";
    //         }

    //         document.getElementById("titleInputField").value = linkInfoObj["title"];
    //         document.getElementById("useExternalUrlCheckbox").checked = linkInfoObj["useExternalUrl"];
    //         document.getElementById("externalUrlInputField").value = linkInfoObj["externalUrl"];
    //         document.getElementById("openInExternalWindowCheckbox").checked = linkInfoObj["openInExternalWindow"];
    //         document.getElementById("sortOrderIdInputField").value = linkInfoObj["sortOrderId"];
    //         // Header image needs to be set for now headerImgPreview
    //         document.getElementById("headerImgPreview").setAttribute("src",  linkInfoObj["headerImage"]);
    //         // document.getElementById("contentTextarea").value = linkInfoObj["content"];
    //         CKEDITOR.instances['contentTextarea'].setData(linkInfoObj["content"]);


    //         document.getElementById("externalUrlInputField").disabled = !document.getElementById("useExternalUrlCheckbox").checked;
    //         document.getElementById("openInExternalWindowCheckbox").disabled = !document.getElementById("useExternalUrlCheckbox").checked;

    //         console.log(response)
    //     },

    //     error: function(response){
    //         console.error(response.responseJSON);
    //         window.location.replace(NOT_FOUND_404_PAGE_URL_ADMIN);
    //     }
    // })

    $("#edit_link_info_form").submit(function (event) {
        event.preventDefault();
        removeErrorParas();
        var json = JSON.stringify(changedLinkInfoObj)
        // console.warn(json);
        if(!editLinkInfoFormIsValid(object)){
            return;
        }
  
        $.ajax({
            type: "PATCH",
            url: API_LINK_INFO_URL + linkInfoObjId + "/",
            data: json,
            headers: {
                'Content-Type':'application/json'
            },
            processData: false,
            success: function (response){
                // console.log(response)
                // window.location.replace(LIST_LINK_INFO_URL_ADMIN);
                showToast("success", 'Updated Link Info successfully');
                document.getElementById("update-btn").disabled = true;
            },

            error: function(response){
                console.error(response)
                if(response.responseJSON["success"] === false){
                    handleBackendErrors(response.responseJSON["data"]);
                }
                showToast("error", 'Error encountered while updating Link Info');
            }
        })
    });


    // Change event listener on CKEDITOR Content Field
    CKEDITOR.instances['contentTextarea'].on('change', function() { 
        var data = CKEDITOR.instances['contentTextarea'].getData();
        changedLinkInfoObj["content"] = data;
        // console.log(changedLinkInfoObj);
    });

    // Change event listener on form fields
    var formFields = document.querySelectorAll(".edit-link-info-form-field");
    formFields.forEach(el => el.addEventListener('change', event => {

        if(event.target.getAttribute("id") === "headerImageFile"){
            var file = document.getElementById("headerImageFile")['files'][0];
            if (file) {
              document.getElementById("headerImgPreview").src = URL.createObjectURL(file);
                var reader = new FileReader();                
                reader.onload = function () {
                    console.log("Reaching inside Onload");
                    headerImgStringBase64 = reader.result.replace("data:", "")
                        .replace(/^.+,/, "");
            
                    imageBase64Stringsep = headerImgStringBase64;
                    changedLinkInfoObj["headerImage"] = imageBase64Stringsep;
                }
                reader.readAsDataURL(file);
            }
            // console.warn(headerImgStringBase64);
            // changedLinkInfoObj["headerImage"] = headerImgStringBase64;
        }

        else if(event.target.getAttribute("id") === "parentIdSelect"){
            if(document.getElementById("parentIdSelect").value === "0"){
                changedLinkInfoObj["parentId"] = null;
            }
            else{
                changedLinkInfoObj["parentId"] = document.getElementById("parentIdSelect").value;
            }
        }

        else if(event.target.getAttribute("id") === "linkTypeIdSelect"){
            if(document.getElementById("linkTypeIdSelect").value === "0"){
                changedLinkInfoObj["linkTypeId"] = null;
            }
            else{
                changedLinkInfoObj["linkTypeId"] = document.getElementById("linkTypeIdSelect").value;
            }
        }

        else if(event.target.getAttribute("id") === "sortOrderIdInputField"){
            if(document.getElementById("sortOrderIdInputField").value === "0"){
                changedLinkInfoObj["sortOrderId"] = null;
            }
            else{
                changedLinkInfoObj["sortOrderId"] = document.getElementById("sortOrderIdInputField").value;
            }
        }

        else if(event.target.getAttribute("id") === "useExternalUrlCheckbox"){
                changedLinkInfoObj["useExternalUrl"] = event.target.checked;
                document.getElementById("externalUrlInputField").disabled = !event.target.checked;
                document.getElementById("openInExternalWindowCheckbox").disabled = !event.target.checked;
        }

        else if(event.target.getAttribute("id") === "isEnabledCheckbox"){
            changedLinkInfoObj["isEnabled"] = event.target.checked;
        }

        else if(event.target.getAttribute("id") === "openInExternalWindowCheckbox"){
            changedLinkInfoObj["openInExternalWindow"] = event.target.checked;
        }

        else{
            changedLinkInfoObj[event.target.getAttribute("name")] = event.target.value;
        }

        console.log(changedLinkInfoObj);
        document.getElementById("update-btn").disabled = false;
          
      }));


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
