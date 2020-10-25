# dropdownlist-plugin

# invoking drop down list function 
------------------------------------------------
$(document).ready(function(){

    dropdownlist(
        "#droploader",                            // Your div ID or class that you want to apply on 
        "/Item/APIItem",                          // data list API url
        "/Item/APIItemSearch",                    // search API url 
        "StartId",                                // data list API start param name 
        "EndId",                                  // data list API end param name 
        "text",                                   // search API param name 
        ["Id", "BarCode", "Name"],                // your needed requests from the api modal 
        ["Name" , "BarCode" ],                    // your requests that must be veiwed for the user max 2 
        50                                        // number of data in each request WITH no limits 
    );


});

# HTML Code Recommendations 
------------------------------------------------------
      <label>اختر العنصر </label> <br/>
      <div id="droploader">اضغط هنا لاختيار العنصر </div> <br/>

# OnChange Event Triggering 
------------------------------------------------------
$(PARENT-CLASS-OR-ID).on("click",".balancer-item",function(){ <br/>
    // do your onchage code here what ever it was .  <br/>
    # Can We Access Requested Data ?  <br/>
       yes like the next step but with small changes  <br/>
      > $(this).data("Name");         // will return the name  <br/>
      > $(this).data("Id");           // will return the Id  <br/>
      > $(this).data("Barcode");      // will return the BarCode <br/>

});
# Accessing The Selected Element Data  
------------------------------------------------------
> you have to know that in your requested array param the requested  <br/>
  data will be the same as you typed in the first action  <br/>
  
  Example For Getting Name: <br/>
    > div id is as you decalred before in HTML ( droploader )  <br/>
    > our requested data was ["Id", "BarCode", "Name"]  <br/>
    > $("#droploader").data("Name");     // will return the name  <br/>
    > $("#droploader").data("Id");     // will return the Id  <br/>
    > $("#droploader").data("Barcode");     // will return the BarCode <br/>
    
 # Usage example 
 -------------------------------------------------------
 <link href="~/assets/css/loadbalance.css" rel="stylesheet" />
<script src="~/assets/js/dropdownlist.js"></script>


<div class="row">
    <div class="form-group col-md-6 col-sm-6 col-xs-6 ">
        <label>اختر العنصر </label>
        <div id="droploader">اضغط هنا لاختيار العنصر </div>
    </div>
</div>

<script>
    $(document).ready(function () {

        //$(document).click(function () {
        //    Resetdropdownlist("#droploader");
        //});
        $(document).on('click', function (event) {
            if (!$(event.target).closest('.balancer-inner-wrapper').length) {
            Resetdropdownlist("#droploader");
            }
        });

        dropdownlist(
            "#droploader",
            "/Item/APIItem",
            "/Item/APIItemSearch",
            "StartId",
            "EndId",
            "text",
            ["Id", "BarCode", "Name"],
            ["Name", "BarCode"],
            50
        );
    })


 
