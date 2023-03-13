
$(document).ready(function () {
    var navbarUl = document.getElementById("header-navbar-ul");


    $.ajax({
        type: "GET",
        // dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
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
            let obj;

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

                    a.setAttribute("data-url", String(data["url"]));
                    a.setAttribute("data-useExternalUrl", String(data["useExternalUrl"]));
                    a.setAttribute("data-openInExternalWindow", String(data["openInExternalWindow"]));
                    a.setAttribute("data-externalUrl", String(data["externalUrl"]));

                    obj = {
                        "id": a.getAttribute("id"),
                        "url": data["url"],
                        "openInExternalWindow": data["openInExternalWindow"],
                        "useExternalUrl": data["useExternalUrl"],
                        "externalUrl": data["externalUrl"]
                    }

                    setUpLinksHref(obj=obj, link=a);
                }

                // If children are present -> Make a submenu
                else{
                    // console.log("Link: "+ data["name"] + ", ParentId: " + data["parentId"] + ", Children: True", ", ParentDiv: "+ parent_div_id);
                    li_item.setAttribute("class", "nav-item dropdown");
                    a.setAttribute("class", "nav-link dropdown-toggle");
                    a.setAttribute("data-bs-toggle", "dropdown");
                    a.setAttribute("data-url", "-");
                    obj = {
                        "id": a.getAttribute("id"),
                        "url": data["url"],
                        "openInExternalWindow": data["openInExternalWindow"],
                        "useExternalUrl": data["useExternalUrl"],
                        "externalUrl": data["externalUrl"]
                    }
                    setUpLinksHref(obj=obj, link=a);

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

                // If no children -> Make a simple link inside a submenu
                if(data["children"].length === 0){
                    // li_item.classList.add("dropdown-item");
                    a.setAttribute("class", "dropdown-item");

                    a.setAttribute("data-url", String(data["url"]));
                    a.setAttribute("data-useExternalUrl", String(data["useExternalUrl"]));
                    a.setAttribute("data-openInExternalWindow", String(data["openInExternalWindow"]));
                    a.setAttribute("data-externalUrl", String(data["externalUrl"]));

                    obj = {
                        "id": a.getAttribute("id"),
                        "url": data["url"],
                        "openInExternalWindow": data["openInExternalWindow"],
                        "useExternalUrl": data["useExternalUrl"],
                        "externalUrl": data["externalUrl"]
                    }
                    setUpLinksHref(obj=obj, link=a);
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
        let noParentsNoChildrenObjs = [];
        let notNullParentWithChildrenObjsList = [];
        for(let i=0; i< data_list.length; i++){
            if(data_list[i].parentId === null){
                if(data_list[i].children.length === 0){
                    noParentsNoChildrenObjs.push(data_list[i]);
                }
                else{
                    notNullParentWithChildrenObjsList.push(data_list[i]);
                }
            }
        }
        createFooterSection(noParentsNoChildrenObjs, "General");
        console.log("notNullParentWithChildrenObjsList");
        console.log(notNullParentWithChildrenObjsList.length);
        for(let i=0; i<notNullParentWithChildrenObjsList.length; i++ ){
            createFooterSection(notNullParentWithChildrenObjsList[i]['children'], notNullParentWithChildrenObjsList[i]["name"]);
        }

    } 


    function createFooterSection(list, parent_name){
        // console.log("list")
        // console.log(list)
        // console.log(list[0]["url"])
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
            a.setAttribute("id", "a-" + String(list[i]["id"]));
            a.innerHTML = list[i]["name"];
            let obj = {
                "id": a.getAttribute("id"),
                "url": list[i]["url"],
                "openInExternalWindow": list[i]["openInExternalWindow"],
                "useExternalUrl": list[i]["useExternalUrl"],
                "externalUrl": list[i]["externalUrl"]
            }
            console.log("ye vala");
            // console.log(obj);
            setUpLinksHref(obj=obj, link=a);
            

            p.appendChild(a);

            section_div.appendChild(p);

        }

        footer_row.appendChild(section_div);

    }



    function setUpLinksHref(obj, a){
        if(obj["openInExternalWindow"] === true){
            a.setAttribute("target", "_blank");
        }

        if(obj["useExternalUrl"] === true){
            a.setAttribute("href", obj["externalUrl"]);
        }

        else{
            let newurl;
            if(obj["url"] !== null){
                newurl = CMS_PAGE_BASE_URL +  obj["url"] + "/";
            }
            else{
                newurl = NOTFOUND404;
            }
            a.setAttribute("href", newurl);
        }
    }
    

});


