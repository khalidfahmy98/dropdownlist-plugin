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
      <label>اختر العنصر </label>
      <div id="droploader">اضغط هنا لاختيار العنصر </div>

# OnChange Event Triggering 
------------------------------------------------------
$(PARENT-CLASS-OR-ID).on("click",".balancer-item",function(){
    // do your onchage code here what ever it was . 
    # Can We Access Requested Data ? 
       yes like the next step but with small changes 
      > $(this).data("Name");         // will return the name 
      > $(this).data("Id");           // will return the Id 
      > $(this).data("Barcode");      // will return the BarCode

});
# Accessing The Selected Element Data  
------------------------------------------------------
> you have to know that in your requested array param the requested 
  data will be the same as you typed in the first action 
  
  Example For Getting Name: 
    > div id is as you decalred before in HTML ( droploader ) 
    > our requested data was ["Id", "BarCode", "Name"] 
    > $("#droploader").data("Name");     // will return the name 
    > $("#droploader").data("Id");     // will return the Id 
    > $("#droploader").data("Barcode");     // will return the BarCode
    
 
