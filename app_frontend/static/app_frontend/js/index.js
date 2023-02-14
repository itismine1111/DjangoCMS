$(document).ready(function () {

    var list = [
        {
            id: 1,
            name: "Home",
            parentId: null,
            children: []
        },
        {
            id: 2,
            name: "Services",
            parentId: null,
            children: [
                {
                    id: 4,
                    name: "Web Development",
                    parentId: 2,
                    children: [
                        {
                            id: 7,
                            name: "Python",
                            parentId: 4,
                            children: [
                                {
                                    id: 10,
                                    name: "Django",
                                    parentId: 7,
                                    children: [
                                        {
                                            id: 12,
                                            name: "Django Rest Framework",
                                            parentId: 10,
                                            children: []
                                        },
                                        {
                                            id: 13,
                                            name: "Django Allauth",
                                            parentId: 10,
                                            children: []
                                        }
                                    ]
                                },
                                {
                                    id: 11,
                                    name: "Flask",
                                    parentId: 7,
                                    children: []
                                }
                            ]
                        },
                        {
                            id: 8,
                            name: "Java",
                            parentId: 4,
                            children: []
                        },
                        {
                            id: 9,
                            name: "Php",
                            parentId: 4,
                            children: []
                        }
                    ]
                },
                {
                    id: 5,
                    name: "Mobile Development",
                    parentId: 2,
                    children: []
                },
                { 
                    id: 6,
                    name: "Hybrid Development",
                    parentId: 2,
                    children: []
                }
            ]
        },
        {
            id: 3,
            name: "About us",
            parentId: null,
            children: []
        }
        

    ]

    console.warn(list);

    function fillHeaderList(list){
        var headerNavbarUl = document.getElementById("header-navbar-ul");
        headerNavbarUl.innerHTML = ""; 
        for(item of list){
            console.log(item["name"]);
            console.log(item["id"]);
            console.log(item["parentId"]);
            if(item["children"] !== null && item["children"].length !== 0 ){
                
            }
            else{
                // var li = createNewLi(li_name=item["name"], li_class="nav-item", a_class="nav-link", a_href="#");
                // console.warn(li);
                // headerNavbarUl.appendChild(li);

                var liNew = document.createElement("li");
                liNew.classList.add("nav-item");

                var aNew = document.createElement("a");
                aNew.classList.add("nav-link");
                aNew.setAttribute("href", "#");
                aNew.innerHtml = item["name"];
                
                liNew.appendChild(aNew);

                headerNavbarUl.appendChild(liNew);
                console.warn(liNew);
                

            }
        }
    }

    function getSubmenuList(list){

    }

    function addEventListenerToLink(link){

    }

    function createNewLi(li_name="", li_class="", a_class="", a_href="#"){
        var li = document.createElement("li");
        li.classList.add(li_class);

        var a = document.createElement("a");
        a.classList.add(a_class);
        a.setAttribute("href", a_href);
        a.innerHtml = li_name;
        addEventListenerToLink(a);

        li.appendChild(a);

        return(li);
    }

    fillHeaderList(list);

    // ul
    //     navbar-nav
    //     dropdown-menu
    //     submenu dropdown-menu

    // li
    //     nav-item
    //     -
    //     nav-item dropdown
    
    // a
    //     nav-link
    //     dropdown-item


    // $.ajax({
    //     type: "GET",
    //     url: API_LIST_LINK_INFO_URL,
    //     processData: false,
    //     beforeSend: function(xhr, status){
    //         // $('#loader').show();
    //         // $('#loader').css("display", "block");
    //     },
    //     complete: function(){
    //         // $('#loader').hide();
    //         // $('#loader').css("display", "none");
    //     },
    //     success: function (response){
    //         console.log(response["data"]);
    //         document.getElementById("page-content").innerHTML = response["data"][7]["content"];
    //     },

    //     error: function(response){
    //         console.log("Error retreiving the list of link infos");
    //         console.error(response);
    //     }
    // })

});


