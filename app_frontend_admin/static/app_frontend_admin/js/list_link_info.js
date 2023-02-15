$(document).ready(function () {
    var selectedParentId = $('#filter-selectbox-parentid option:selected').val();
    var selectedParentName = $('#filter-selectbox-parentid option:selected').text();

    createBreadcrumbLink();
    // console.log(selectdPatentId);
    // console.log(selectdPatentName);

    createTable();
    // createTable(url=API_BASE_URL_ADMIN + "linkinfo/list/?ordering=sortOrderId");

    fillFilterByTypeList();

    $( "#table-body" ).sortable({
        handle: '.handle',
        cursor: 'move',
        // stop: sortEventHandler
    });

    var $sortableList = $("#table-body");
    var sortEventHandler = function(event, ui){
        // console.log("New sort order!");/
        var listElements = document.querySelectorAll("#table-body tr");
        // console.log(listElements);
        var listElementIds = [];
        for(let i=0; i<listElements.length; i++){
            listElementIds.push(listElements[i].getAttribute("data-id"))
        }
        console.log(listElementIds);

        $.ajax({
            type: "POST",
            url: API_BASE_URL + "linkinfo/sort-order-ids/",
            processData: false,
            contentType: "application/json",
            data: JSON.stringify({"linkInfoIdList": listElementIds}),
            success: function(response){
                console.log(response);
                showToast("success", "Order changed successfully");
            }, 
            error: function(response){
                $sortableList.sortable('cancel');
                showToast("error", "Error occured. Can't change the order");
                // console.log(response);
            }

        });

    };
    $sortableList.on("sortstop", sortEventHandler);
    // $sortableList.on("sortchange", sortEventHandler);

    


     function createTable(){
        obj = getQueryStringObject();
        obj["ordering"] = "sortOrderId";
    
        $.ajax({
            type: "GET",
            url: API_BASE_URL_ADMIN + "linkinfo/list/",
            // data: JSON.stringify(obj),
            data: obj,
            processData: true,
            contentType: 'application/json',
            beforeSend: function(xhr, status){
                // $('#loader').show();
                $('#loader').css("display", "block");
            },
            complete: function(){
                // $('#loader').hide();
                $('#loader').css("display", "none");
            },
            success: function (response){
                // console.log(response["data"])
                // console.log(response["data"].length)
                document.getElementById("table-body").innerHTML = "";
                for(let i=0; i<response["data"].length; i++){
                    var tr = document.createElement("tr");
                    tr.setAttribute("data-id", response["data"][i]["id"]);

                    var td_handle = document.createElement("td")
                    td_handle.innerHTML = '<i class="bi bi-grip-vertical handle" style="font-size:24px;"></i>';
                    td_handle.style.width = "5%";
                    td_handle.style.paddingBottom = "5px";
    
                    var th_sno = document.createElement("th");
                    th_sno.setAttribute("scope", "row");
                    th_sno.innerHTML = i+1;
    
                    var td_name = document.createElement("td");
                    td_name.innerHTML = response["data"][i]["name"];
    
                    var td_linkType = document.createElement("td");
                    if(response["data"][i]["linkType"] !== null){
                        td_linkType.innerHTML = response["data"][i]["linkType"]["linkType"];
                    }
                    else{
                        td_linkType.innerHTML = " - ";
                    }
    
                    var td_parent = document.createElement("td");
                    if(response["data"][i]["parentId"] !== null){
                        td_parent.innerHTML = response["data"][i]["parent"]["name"];
                    }
                    else{
                        td_parent.innerHTML = " - ";
                    }
    
                    var td_isEnabled = document.createElement("td");
                    if(response["data"][i]["isEnabled"] !== null && response["data"][i]["isEnabled"]===true){
                    
                        td_isEnabled.innerHTML = "&#10004;";
                    }
                    else{
                        td_isEnabled.innerHTML = '&#10006;';
                    }
                    
                    var td_sort_order_id = document.createElement("td");
                    if(response["data"][i]["sort_order_id"] !== null){
                        td_sort_order_id.innerHTML = response["data"][i]["sortOrderId"];
                    }
                    else{
                        td_sort_order_id.innerHTML = " - ";
                    }
                    
                    var td_actions = document.createElement("td");
                    
                    var del_btn = document.createElement("button");
                    del_btn.setAttribute("type", "button");
                    del_btn.setAttribute("class", "btn btn-outline-secondary");
                    del_btn.innerHTML = "<i class='bi bi-trash'></i>";
                    addDelBtnEventListener(del_btn, response["data"][i]["id"]);
    
                    var edit_btn = document.createElement("button");
                    edit_btn.setAttribute("type", "button");
                    edit_btn.setAttribute("class", "btn btn-outline-secondary");
                    edit_btn.innerHTML = '<i class="bi bi-pen"></i>';
                    addEditBtnEventListener(edit_btn, response["data"][i]["id"]);
    
                    td_actions.appendChild(del_btn);
                    td_actions.appendChild(edit_btn);
                    
                    tr.appendChild(td_handle);
                    tr.appendChild(th_sno);
                    tr.appendChild(td_name);
                    tr.appendChild(td_linkType);
                    tr.appendChild(td_parent);
                    tr.appendChild(td_isEnabled);
                    tr.appendChild(td_sort_order_id);
                    tr.appendChild(td_actions);
    
                    document.getElementById("table-body").appendChild(tr);   
                }
                fillFilterByParentIdSelectBox(response["data"]);
    
            },
    
            error: function(response){
                console.log("Error retreiving the list of link infos");
                console.error(response);
            }
        })
    }


    function addDelBtnEventListener(del_btn, record_id){

        var object = {};
        object["id"] = record_id;
        var json = JSON.stringify(object);
        // console.log("json");
        // console.log(json);

        // var formData = new FormData();
        // formData.append("id", record_id);

        del_btn.addEventListener("click", (event)=>{
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    $.ajax({
                        type: "DELETE",
                        url: API_BASE_URL_ADMIN + "linkinfo/",
                        data: json,
                        headers: {
                            'Content-Type':'application/json'
                        },
                        processData: false,
                        success: function(response){
                            console.log(response);
                            event.target.closest("tr").remove();
                            showToast("success", 'Deleted Link Info Successfully');
                        },
                        error: function(response){
                            showToast("error", 'Error encountered while deleting Link Info');
                        },
                        
                    })
                }

            });
        })
    }


    function addEditBtnEventListener(edit_btn, record_id){
        edit_btn.addEventListener("click", (event)=>{
            // showToast("success", 'Clicked edit button');
            window.location.href = EDIT_LINK_INFO_URL_ADMIN + record_id + "/";
        })
    }

    function fillFilterByTypeList(){  
        $.ajax({
            type: "GET",
            url: API_LIST_LINK_TYPE_URL,
            processData: false,
            success: function (response){
                console.log(response["data"])
                var filterSelectbox = document.getElementById("filter-selectbox");
                filterSelectbox.innerHTML = "";

                var option = document.createElement("option");
                option.setAttribute("value", "0");
                option.setAttribute("selected", 'selected');
                option.innerHTML = "<strong>Filter by type..</strong>";

                filterSelectbox.appendChild(option);

                for(let i=0; i<response["data"].length; i++){
                    var option = document.createElement("option");
                    option.setAttribute("value", response["data"][i]["id"]);
                    option.innerHTML = response["data"][i]["linkType"]
                    filterSelectbox.appendChild(option); 
                }
            },
    
            error: function(response){
                console.log("ERROR saving new list type");
                console.error(response)
            }
        })
    }


    // onChange() Filter By list type selectbox
    var filterSelectbox = document.getElementById("filter-selectbox");
    filterSelectbox.addEventListener("change", (event)=>{
        
        createTable();
    })


    function fillFilterByParentIdSelectBox(data){
        console.log(data);
        var filterSelectbox = document.getElementById("filter-selectbox-parentid");
        filterSelectbox.innerHTML = "";

        var option = document.createElement("option");
        option.setAttribute("value", selectedParentId);
        option.setAttribute("selected", 'selected');
        option.innerHTML = selectedParentName;

        filterSelectbox.appendChild(option);

        for(let i=0; i<data.length; i++){
            var option = document.createElement("option");
            option.setAttribute("value", data[i]["id"]);
            option.innerHTML = data[i]["name"]
            filterSelectbox.appendChild(option); 
        }
        // $.ajax({
        //     type: "GET",
        //     url: url,
        //     processData: false,
        //     success: function (response){
        //         console.log(response["data"])
        //         var filterSelectbox = document.getElementById("filter-selectbox-parentid");
        //         filterSelectbox.innerHTML = "";

        //         var option = document.createElement("option");
        //         option.setAttribute("value", "0");
        //         option.setAttribute("selected", 'selected');
        //         option.innerHTML = "<strong>Filter by type..</strong>";

        //         filterSelectbox.appendChild(option);

        //         for(let i=0; i<response["data"].length; i++){
        //             var option = document.createElement("option");
        //             option.setAttribute("value", response["data"][i]["id"]);
        //             option.innerHTML = response["data"][i]["name"]
        //             filterSelectbox.appendChild(option); 
        //         }
        //     },
    
        //     error: function(response){
        //         console.log("Error getting the list info ");
        //         console.error(response)
        //     }
        // })
    }

    // onChange() Filter By list type selectbox
    var filterParentIdSelectbox = document.getElementById("filter-selectbox-parentid");
    filterParentIdSelectbox.addEventListener("change", (event)=>{
        selectedParentId = $('#filter-selectbox-parentid option:selected').val();
        selectedParentName = $('#filter-selectbox-parentid option:selected').text();
        createTable();
        createBreadcrumbLink();
    })


    function getQueryStringObject(){
        // let linkTypeValue = $("#filter-selectbox option:selected").val();
        // let parentIdValue = $("#filter-selectbox-parentid option:selected").val();
        let linkTypeSelectBox = document.querySelector("#filter-selectbox");
        let linkTypeValue = linkTypeSelectBox.options[linkTypeSelectBox.selectedIndex].value
        // let parentIdValue = $("#filter-selectbox-parentid option:selected").val();
        let parentIdValue = selectedParentId;

        obj = {}

        if (linkTypeValue !== "0"){
            obj["linkTypeId"] = linkTypeValue;
        }

        if (parentIdValue !== "0"){
            obj["parentId"] = parentIdValue;
        }
        else{
            obj["parentId"] = "";
        }

        console.warn(obj);
        return(obj);
    }


    function createBreadcrumbLink(){
        var bc_header = document.getElementById("breadcrumb-header");
        var link_li = document.createElement("li");
        link_li.setAttribute("class", "breadcrumb-item active");

        var link_a = document.createElement("a");
        link_a.setAttribute("href", "#");

        if(selectedParentId === "0"){
            link_a.setAttribute("data-parentid", selectedParentId);
            link_a.setAttribute("data-parentName", selectedParentName);
            link_a.innerHTML = "All";
        }
        else{
            link_a.setAttribute("data-parentid", selectedParentId);
            link_a.setAttribute("data-parentName", selectedParentName);
            link_a.innerHTML = selectedParentName;
        }

        link_a.addEventListener("click", function(event){
            event.preventDefault();
            selectedParentId = event.target.getAttribute("data-parentId");
            selectedParentName = event.target.getAttribute("data-parentName");
            console.warn("Id and name changed");
            event.target.closest('li').classList.add("active");

            var elemsAfterActive = document.querySelectorAll("#breadcrumb-header li.active ~ li")
            if(elemsAfterActive.length !== 0){
                for (let elem of elemsAfterActive){
                    elem.remove();
                }
            }
            createTable();
        })

        link_li.appendChild(link_a);

        var activeElem = document.querySelector("#breadcrumb-header .active");
        if(activeElem !== null){
            activeElem.classList.remove("active");
        }

        bc_header.appendChild(link_li);
        
    }
});

  