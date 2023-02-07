$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: API_LIST_LINK_INFO_URL,
        processData: false,
        beforeSend: function(xhr, status){
            // $('#loader').show();
            // $('#loader').css("display", "block");
        },
        complete: function(){
            // $('#loader').hide();
            // $('#loader').css("display", "none");
        },
        success: function (response){
            console.log(response["data"]);
            document.getElementById("page-content").innerHTML = response["data"][7]["content"];
        },

        error: function(response){
            console.log("Error retreiving the list of link infos");
            console.error(response);
        }
    })

});


