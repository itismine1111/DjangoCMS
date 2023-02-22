
$(document).ready(function () {
    var navbarUl = document.getElementById("header-navbar-ul");


    $.ajax({
        type: "GET",
        url: API_LIST_LINK_INFO_TREE_VIEW_URL,
        processData: false,
        beforeSend: function(xhr, status){
            $('#loader').show();
        },
        complete: function(){
            $('#loader').hide();
        },
        success: function (response){
            console.log(response["data"]);
            createHeaderLinks(response["data"]["Header"], parent_div_id="header-navbar-ul");

            createFooterLinks(response["data"]["Footer"]);
        },

        error: function(response){
            console.log("Error retreiving the list of link infos");
            console.error(response);
        }
    })



    function createHeaderLinks(data_list, parent_div_id){
        // console.log("ParentId : " + data["parentId"] );

        if(!data_list || data_list.length === 0){
            // console.log("NO DATA RETURNING");
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
                    // console.log("Link: "+ data["name"] + ", ParentId: " + data["parentId"] + ", Children: False", ", ParentDiv: "+ parent_div_id);
                    li_item.classList.add("nav-item");
                    a.classList.add("nav-link");
                    a.setAttribute("data-url", data["url"]);
                    a.setAttribute("data-useExternalUrl", data["useExternalUrl"]);
                    a.setAttribute("data-openInExternalWindow", data["openInExternalWindow"]);
                    navLinkAddEventListener(id=a.getAttribute("id"));
                }

                // If children are present -> Make a submenu
                else{
                    // console.log("Link: "+ data["name"] + ", ParentId: " + data["parentId"] + ", Children: True", ", ParentDiv: "+ parent_div_id);
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
                    createHeaderLinks(data["children"], ul_submenu.getAttribute("id"));
                }

            }

            // If parent is not null 
            else{
                var li_item = document.createElement("li");
                li_item.setAttribute("id", data["id"]);
                var a = document.createElement("a");
                a.setAttribute("id", "a-"+ String(data["id"]));
                a.innerHTML = data["name"];

                li_item.appendChild(a);
                document.getElementById(parent_div_id).appendChild(li_item);

                // console.log("REACHED HERE");
                // console.log(data["children"]);
                // return

                // If no children -> Make a simple link inside a submenu
                if(data["children"].length === 0){
                    // li_item.classList.add("dropdown-item");
                    a.setAttribute("class", "dropdown-item");
                    a.setAttribute("data-url", data["url"]);
                    a.setAttribute("data-useExternalUrl", data["useExternalUrl"]);
                    a.setAttribute("data-openInExternalWindow", data["openInExternalWindow"]);
                    navLinkAddEventListener(id=a.getAttribute("id"));
                }

                // If no children -> Make a ul submenu and create links inside that submenu
                else{
                    a.innerHTML = a.innerHTML + " &raquo; ";
                    a.setAttribute("class", "dropdown-item");
                    ul_submenu = document.createElement("ul");
                    ul_submenu.setAttribute("id", li_item.getAttribute("id") + "_ul_submenu");
                    ul_submenu.setAttribute("class", "submenu dropdown-menu");
                    li_item.appendChild(ul_submenu);
                    // console.log(data["children"]);
                    createHeaderLinks(data["children"], ul_submenu.getAttribute("id"));
                }
            }
        }

    }

    function createFooterLinks(data_list){
        for(let i=0; i< data_list.length; i++){
            let noParentsNoChildrenObjs = [];
            let notNullParentObjs = [];
            if(data_list[i].parentId === null && data_list[i].children.length === 0){
                noParentsNoChildrenObjs.push(data_list[i]);
            }
            else{
                notNullParentObjs.push(data_list[i]);
            }

        }
    }



   

    function createFooterSection(list, parent_name){
        // console.log("list")
        // console.log(list)
        let footer_row = document.getElementById("footer-div-row");
        let section_div = document.createElement("div");
        section_div.setAttribute("class", "col-md-2 col-lg-2 col-xl-2 mx-auto mt-3;")

        let section_heading = document.createElement("h6");
        section_heading.setAttribute("class", "text-uppercase mb-4 font-weight-bold");
        section_heading.innerHTML = parent_name;

        section_div.appendChild(section_heading);

        for( let i=0; i< list.length; i++){
            let p = document.createElement("p");
            let a = document.createElement("a");
            a.setAttribute("class", "text-white");
            a.setAttribute("href", "https://www.google.com");
            a.innerHTML = list[i]["name"];

            p.appendChild(a);

            section_div.appendChild(p);
        }

        footer_row.appendChild(section_div);

    }


    function navLinkAddEventListener(id){
        var a = document.getElementById(id);
        a.addEventListener("click", function(event){
            event.preventDefault()
            // window.href = a.getAttribute("data-url");
            let linkinfoid = a.closest("li").getAttribute("id");
            let linkinfourl = a.getAttribute("data-url");
            console.log("THE ID OF <li> is : " + linkinfoid)
            
            let newurl = BASE_URL + String(linkinfoid) + "/" + linkinfourl;
            window.location.href = newurl;


        })
        // console.log("adding event listenter to: " + id);
    }
    

    // var list = [{"name": "link1"}, {"name": "link2"}, {"name": "link3"}];
    // createFooterSection(list, "Naman Section");


});


