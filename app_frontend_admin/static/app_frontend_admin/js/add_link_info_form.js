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

    $("#add_link_info_form").submit(function (event) {
        event.preventDefault();
        removeErrorParas();
        var form = document.getElementById("add_link_info_form");
        var formData = new FormData(form);

        var object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        object["headerImage"] = headerImgStringBase64;

        if(object["parentId"] === "0"){
            // console.warn("parent id is 0")
            object["parentId"] = null;
        }
        if(object["linkTypeId"] === "0"){
            // console.warn("link type id is 0")
            object["linkTypeId"] = null;
        }
        if(object["sortOrderId"] === ""){
            // console.warn("sortOrderId is blank")
            object["sortOrderId"] = null;
        }

        if(!addLinkInfoFormIsValid(object)){
            return;
        }

        var json = JSON.stringify(object)
        console.warn(json);


        $.ajax({
            type: "POST",
            url: API_BASE_URL_ADMIN + "linkinfo/",
            data: json,
            headers: {
                'Content-Type':'application/json'
            },
            processData: false,
            success: function (response){
                console.log(response);
                // showToast("success", 'Submited data successfully');
                window.location.replace(LIST_LINK_INFO_URL_ADMIN);
            },

            error: function(response){
                console.log("ERROR saving new list info");
                console.error(response.responseJSON);
                if(response.responseJSON["success"] === false){
                    handleBackendErrors(response.responseJSON["data"]);
                }
                showToast("error", 'Error encountered while creating new Link Info');
            }
        })
    });

    // event listener on "useExternalUrlCheckbox"
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


  function addLinkInfoFormIsValid(object){
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

  