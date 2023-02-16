
$(document).ready(function () {
    var navbarUl = document.getElementById("header-navbar-ul");
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:8000/api/cms/linkinfo/treeview/",
        processData: false,
        beforeSend: function(xhr, status){
            $('#loader').show();
        },
        complete: function(){
            $('#loader').hide();
        },
        success: function (response){
            console.log(response["data"]);
            // for(let i=0; i<response["data"].length; i++){
            //     console.log("Creating Links for link: " + response["data"][i]["name"]);
            //     createAndAppendLinks(response["data"][i], parent_div_id="header-navbar-ul");
            // }
            createAndAppendLinks(response["data"], parent_div_id="header-navbar-ul");
            // createAndAppendLinks(data_list = [], parent_div_id="header-navbar-ul");
        },

        error: function(response){
            console.log("Error retreiving the list of link infos");
            console.error(response);
        }
    })


    function createAndAppendLinks(data_list, parent_div_id){
        // console.log("ParentId : " + data["parentId"] );

        if(!data_list || data_list.length === 0){
            console.log("NO DATA RETURNING");
            return;
        }

        for(let i=0; i<data_list.length; i++){
            data = data_list[i];

            // If Parent is null
            if(data["parentId"] === null){
                // console.log("ParentId : " + data["parentId"] );
                var li_item = document.createElement("li");
                li_item.setAttribute("id", data["id"]);
                var a = document.createElement("a");
                a.setAttribute("id", "a-"+ String(data["id"]));
                a.innerHTML = data["name"];

                li_item.appendChild(a);
                document.getElementById(parent_div_id).appendChild(li_item);

                // If no children are present -> Make it a link
                if(data["children"].length === 0){
                    console.log("Link: "+ data["name"] + ", ParentId: " + data["parentId"] + ", Children: False", ", ParentDiv: "+ parent_div_id);
                    li_item.classList.add("nav-item");
                    a.classList.add("nav-link");
                    a.setAttribute("data-url", data["url"]);
                    a.setAttribute("data-useExternalUrl", data["useExternalUrl"]);
                    a.setAttribute("data-openInExternalWindow", data["openInExternalWindow"]);
                    navLinkAddEventListener(id=a.getAttribute("id"));
                }

                // If children are present -> Make a submenu
                else{
                    console.log("Link: "+ data["name"] + ", ParentId: " + data["parentId"] + ", Children: True", ", ParentDiv: "+ parent_div_id);
                    li_item.setAttribute("class", "nav-item dropdown");
                    a.setAttribute("class", "nav-link dropdown-toggle");
                    a.setAttribute("data-bs-toggle", "dropdown");
                    a.setAttribute("data-url", "#");
                    navLinkAddEventListener(id=a.getAttribute("id"));

                    ul_submenu = document.createElement("ul");
                    ul_submenu.setAttribute("id", li_item.getAttribute("id") + "_ul_submenu");
                    ul_submenu.setAttribute("class", "dropdown-menu");
                    li_item.appendChild(ul_submenu);
                    // console.log(data["children"]);
                    createAndAppendLinks(data["children"], parent_div_id=ul_submenu.getAttribute("id"));
                }

            }
            else{
                return;
            }

            // If parent is not null 
            // else{
            //     var li_item = document.createElement("li");
            //     li_item.setAttribute("id", data["id"]);
            //     var a = document.createElement("a");
            //     a.setAttribute("id", "a-"+ String(data["id"]));
            //     a.innerHTML = data["name"];

            //     li_item.appendChild(a);
            //     document.getElementById(parent_div_id).appendChild(li_item);

            //     console.log("REACHED HERE");
            //     console.log(data["children"]);
            //     // return

            //     // If no children -> Make a simple link inside a submenu
            //     if(data["children"].length === 0){
            //         // li_item.classList.add("dropdown-item");
            //         a.setAttribute("class", "dropdown-item");
            //         a.setAttribute("data-url", data["url"]);
            //         a.setAttribute("data-useExternalUrl", data["useExternalUrl"]);
            //         a.setAttribute("data-openInExternalWindow", data["openInExternalWindow"]);
            //         navLinkAddEventListener(id=a.getAttribute("id"));
            //     }

            //     // If no children -> Make a ul submenu and create links inside that submenu
            //     else{
            //         a.innerHTML = a.innerHTML + " &raquo; ";

            //         ul_submenu = document.createElement("ul");
            //         ul_submenu.setAttribute("id", li_item.getAttribute("id") + "_ul_submenu");
            //         ul_submenu.setAttribute("class", "submenu dropdown-menu");
            //         li_item.appendChild(ul_submenu);
            //         console.log(data["children"]);
            //         createAndAppendLinks(data["children"], parent_div_id=ul_submenu.getAttribute("id"));
            //     }
            // }
        }

        

        

    }


    // function createAndAppendLinks(data, parent_div_id){
    //     console.log("ParentId : " + data["parentId"] );

    //     if(!data || data.length === 0){
    //         return
    //     }

    //     // If Parent is null
    //     if(data["parentId"] === null){
    //         var li_item = document.createElement("li");
    //         li_item.setAttribute("id", data["id"]);
    //         var a = document.createElement("a");
    //         a.setAttribute("id", "a-"+ String(data["id"]));
    //         a.innerHTML = data["name"];

    //         li_item.appendChild(a);
    //         document.getElementById(parent_div_id).appendChild(li_item);

    //         // If no children are present -> Make it a link
    //         if(data["children"].length === 0){
    //             li_item.classList.add("nav-item");
    //             a.classList.add("nav-link");
    //             a.setAttribute("data-url", data["url"]);
    //             a.setAttribute("data-useExternalUrl", data["useExternalUrl"]);
    //             a.setAttribute("data-openInExternalWindow", data["openInExternalWindow"]);
    //             navLinkAddEventListener(id=a.getAttribute("id"));
    //         }

    //         // If children are present -> Make a submenu
    //         else{
    //             li_item.setAttribute("class", "nav-item dropdown");
    //             a.setAttribute("class", "nav-link dropdown-toggle");
    //             a.setAttribute("data-bs-toggle", "dropdown");
    //             a.setAttribute("data-url", "#");
    //             navLinkAddEventListener(id=a.getAttribute("id"));

    //             ul_submenu = document.createElement("ul");
    //             ul_submenu.setAttribute("id", li_item.getAttribute("id") + "_ul_submenu");
    //             ul_submenu.setAttribute("class", "dropdown-menu");
    //             li_item.appendChild(ul_submenu);
    //             console.log(data["children"]);
    //             for(let i=0; i< data["children"].length; i++){
    //                 createAndAppendLinks(data["children"][i], parent_div_id=ul_submenu.getAttribute("id"));
    //             }
    //         }

    //     }

    //     // If parent is not null 
    //     else{
    //         var li_item = document.createElement("li");
    //         li_item.setAttribute("id", data["id"]);
    //         var a = document.createElement("a");
    //         a.setAttribute("id", "a-"+ String(data["id"]));
    //         a.innerHTML = data["name"];

    //         li_item.appendChild(a);
    //         document.getElementById(parent_div_id).appendChild(li_item);

    //         console.log("REACHED HERE");
    //         console.log(data["children"]);
    //         // return

    //         // If no children -> Make a simple link inside a submenu
    //         if(data["children"].length === 0){
    //             // li_item.classList.add("dropdown-item");
    //             a.setAttribute("class", "dropdown-item");
    //             a.setAttribute("data-url", data["url"]);
    //             a.setAttribute("data-useExternalUrl", data["useExternalUrl"]);
    //             a.setAttribute("data-openInExternalWindow", data["openInExternalWindow"]);
    //             navLinkAddEventListener(id=a.getAttribute("id"));
    //         }

    //         // If no children -> Make a ul submenu and create links inside that submenu
    //         else{
    //             a.innerHTML = a.innerHTML + " &raquo; ";

    //             ul_submenu = document.createElement("ul");
    //             ul_submenu.setAttribute("id", li_item.getAttribute("id") + "_ul_submenu");
    //             ul_submenu.setAttribute("class", "submenu dropdown-menu");
    //             li_item.appendChild(ul_submenu);
    //             console.log(data["children"]);
    //             for(let i=0; i< data["children"].length; i++){
    //                 createAndAppendLinks(data["children"][i], parent_div_id=ul_submenu.getAttribute("id"));
    //             }
    //         }
    //     }

    // }


    function navLinkAddEventListener(id){
        // console.log("adding event listenter to: " + id);
    }


});


