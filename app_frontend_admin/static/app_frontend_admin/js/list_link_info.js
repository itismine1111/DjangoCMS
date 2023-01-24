$(document).ready(function () {

    createTable();
   
    function createTable(){
        $.ajax({
            type: "GET",
            url: API_BASE_URL_ADMIN + "linkinfo/list/",
            processData: false,
            success: function (response){
                // console.log(response["data"])
                // console.log(response["data"].length)
                document.getElementById("table-body").innerHTML = "";
                for(let i=0; i<response["data"].length; i++){
                    var tr = document.createElement("tr");
    
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
    
                    tr.appendChild(th_sno);
                    tr.appendChild(td_name);
                    tr.appendChild(td_linkType);
                    tr.appendChild(td_parent);
                    tr.appendChild(td_isEnabled);
                    tr.appendChild(td_sort_order_id);
                    tr.appendChild(td_actions);
    
                    document.getElementById("table-body").appendChild(tr);
                    
                }
    
    
            },
    
            error: function(response){
                console.log("ERROR saving new list type");
                console.error(response)
            }
        })
    }


    function addDelBtnEventListener(del_btn, record_id){
        var formData = new FormData();
        formData.append("id", record_id);

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
                        data: formData,
                        processData: false,
                        success: function(response){
                            console.log(response);
                            iziToast.success({
                                timeout: 2000, 
                                icon: 'bi bi-trash2-fill', 
                                title: 'OK', 
                                message: 'Link Info successfully deleted.'
                            });
                        }
                    })
                }
            });
        })
    }


    function addEditBtnEventListener(edit_btn, record_id){
        edit_btn.addEventListener("click", (event)=>{
            iziToast.show({
                title: 'Hey',
                message: 'What would you like to add?',
                posotion: 'topRight',
                theme: 'light', // dark
                color: 'green', // blue, red, green, yellow

            });
        })
        
    }

});

  