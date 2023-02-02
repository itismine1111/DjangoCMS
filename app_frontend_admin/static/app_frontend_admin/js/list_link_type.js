$(document).ready(function () {
    createTable();
    $( "#table-body" ).sortable({
        handle: '.handle',
        cursor: 'move'
    });

    function createTable(){
        $.ajax({
            type: "GET",
            url: API_BASE_URL_ADMIN + "linktype/list/",
            processData: false,
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
                    
                    var td_handle = document.createElement("td")
                    td_handle.innerHTML = '<i class="bi bi-list handle" style="font-size:24px;"></i>';
                    td_handle.style.width = "5%";
                    td_handle.style.paddingBottom = "5px";

                    var th_sno = document.createElement("th")
                    th_sno.setAttribute("scope", "row");
                    th_sno.innerHTML = (i+1);
    
                    var td_name = document.createElement("td")
                    td_name.innerHTML = response["data"][i]["linkType"];
    
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
        var object = {};
        object["id"] = record_id;
        var json = JSON.stringify(object);
        console.log("json");
        console.log(json);

        // var formData = new FormData();
        // formData.append("id", record_id);
        // for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }

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
                        url: API_BASE_URL_ADMIN + "linktype/",
                        data: json,
                        processData: false,
                        headers: {
                            'Content-Type':'application/json'
                        },
                        success: function(response){
                            console.log(response);
                            event.target.closest("tr").remove();
                            showToast("success", 'Link Type Deleted Successfully!');
                        },
                        error: function(response){
                            console.log(response);
                            showToast("error", 'Error encountered while deleting Link Type');
                        },
                    })
                }
            });
        })
    }


    function addEditBtnEventListener(edit_btn, record_id){
        edit_btn.addEventListener("click", (event)=>{
            // showToast("success", 'Edit button clicked!');
            // window.location.replace(EDIT_LINK_TYPE_URL_ADMIN + record_id + "/");
            window.location.href = EDIT_LINK_TYPE_URL_ADMIN + record_id + "/";

        })
    }

});

  