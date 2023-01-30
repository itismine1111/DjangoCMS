$(document).ready(function () {


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
                console.log("ERROR gGetting list type list");
                console.error(response)
            }
        })
    }
    
    fillSelectBoxes();

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

  