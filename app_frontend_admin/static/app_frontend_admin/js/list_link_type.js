$(document).ready(function () {
    
    $.ajax({
        type: "GET",
        url: API_BASE_URL_ADMIN + "linktype/list/",
        processData: false,
        success: function (response){
            // console.log(response["data"])
            // console.log(response["data"].length)
            document.getElementById("table-body").innerHTML = "";
            for(let i=0; i<response["data"].length; i++){
                var tr = document.createElement("tr");

                var th_sno = document.createElement("th")
                th_sno.setAttribute("scope", "row");
                th_sno.innerHTML = i+1;

                var td_name = document.createElement("td")
                td_name.innerHTML = response["data"][i]["linkType"];

                var td_actions = document.createElement("td");
                
                var del_btn = document.createElement("button");
                del_btn.setAttribute("type", "button");
                del_btn.setAttribute("class", "btn btn-outline-secondary");
                del_btn.innerHTML = "<i class='bi bi-trash'></i>";

                var edit_btn = document.createElement("button");
                edit_btn.setAttribute("type", "button");
                edit_btn.setAttribute("class", "btn btn-outline-secondary");
                edit_btn.innerHTML = '<i class="bi bi-pen"></i>';

                td_actions.appendChild(del_btn);
                td_actions.appendChild(edit_btn);

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

});

  