
var placeholder = "", t = 2, newEnd = 0 , startId = 1,
    container , 
    searchContainer ,
    dataFloater,
    balancerInnerWrapper,
    searchInput;
// pend controllers function that is responsible for all dom controller implementations 
function pendControllers(selectorId) {
    placeholder = $(selectorId).html();
    $(selectorId).addClass("balancer-main-input form-control input-sm").parent("div").addClass("balancer-outer-wrapper");
    $(selectorId).parent("div").append('<i class="fa fa-caret-down caretIcon balancer-icon" style="left: 14 % "></i>\
        <div class= "balancer-inner-wrapper">\
        <header>\
            <input type="text" class="form-control cairo input-sm balancer-searcher" placeholder="البحث في العناصر " />\
            <i class="fa fa-times closeSearch" title="الغاء البحث " style="display:none;"></i>\
        </header>\
        <div class="balancer-data-wrapper data-floater"></div>\
        <div class="balancer-results-wrapper data-floater" style="display:none;"></div></div>');
    return placeholder;
}
// reset drop down list value by using this function and global variable placeholder that always keep the original value
function Resetdropdownlist(selectorId) {
    $(selectorId).html(placeholder);
}
// the main brain for the drop down list controllers 
function dropdownlist(selectorId, dataApi, searchApi, startParam, endParam, searchParam, hiddenRequests, visiableRequests, endId = 250 ) {
    pendControllers(selectorId);
    container = $(selectorId).siblings(".balancer-inner-wrapper").children(".balancer-data-wrapper");
    searchContainer = $(selectorId).siblings(".balancer-inner-wrapper").children(".balancer-results-wrapper");
    dataFloater = $(selectorId).siblings(".balancer-inner-wrapper").children(".data-floater");
    balancerInnerWrapper = $(selectorId).siblings(".balancer-inner-wrapper");
    searchInput = $(selectorId).siblings(".balancer-inner-wrapper").children("header").children(".balancer-searcher");
    //  open dropdownlist content container 
    $(selectorId).click(function () {
        let iconToggler = $(this).siblings(".balancer-icon");
        if (iconToggler.hasClass("fa-caret-down")) {
            $(this).siblings(".balancer-inner-wrapper").slideDown();
            $(this).siblings(".balancer-inner-wrapper").children("header").children(".balancer-searcher").focus();
            iconToggler.removeClass("fa-caret-down").addClass("fa-caret-up");
        } else {
            $(this).siblings(".balancer-inner-wrapper").slideUp();
            iconToggler.addClass("fa-caret-down").removeClass("fa-caret-up");
        }
    });
    //  activate choosed data from balancer requested data  [ please review data tokens here ]
    $(dataFloater).on("click", ".balancer-item", function () {
        $(this).addClass("active-item").siblings(".balancer-item").removeClass("active-item");
        if (visiableRequests.length > 1) {
            $(this).parent("div").parent(".balancer-inner-wrapper").siblings(".balancer-main-input").html($(this).data(visiableRequests[0]) + " - " + $(this).data(visiableRequests[1]));
        } else {
            $(this).parent("div").parent(".balancer-inner-wrapper").siblings(".balancer-main-input").html($(this).data(visiableRequests[0]));
        }
        $(this).parent("div").parent(".balancer-inner-wrapper").siblings(".balancer-main-input").data($(this).data());
        $(this).parent("div").parent(".balancer-inner-wrapper").slideUp();
        $(this).parent("div").parent(".balancer-inner-wrapper").siblings(".balancer-icon").removeClass("fa-caret-up").addClass("fa-caret-down");
        $(this).parent(".balancer-results-wrapper").parent(".balancer-inner-wrapper").slideUp();
    });
    $(balancerInnerWrapper).on("click", ".closeSearch", function () {
        $(this).parent("header").siblings(".balancer-data-wrapper").show();
        $(this).parent("header").siblings(".balancer-results-wrapper").hide();
        $(this).hide();
    });
    // initial call for the first listed data  [ Api Tokens Reveiwed Here ]
    $.ajax({
        url: dataApi + "?" + startParam + "=" + startId + "&" + endParam +"=" + endId,
        type: 'Get',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (visiableRequests.length > 0 && visiableRequests.length <= 2 ) {
                if (visiableRequests.length == 1) {
                    $.each(data, function (i) {
                        container.append("<span class='balancer-item'>" + data[i][visiableRequests[0]]  + "</span>");
                        for (var y = 0; y < hiddenRequests.length; y++) {
                            container.children("span.balancer-item").last().data(hiddenRequests[y], data[i][hiddenRequests[y]]);
                        }
                        if (i === endId) {
                            return false;
                        }
                    });
                } else if (visiableRequests.length == 2 ) {
                    $.each(data, function (i) {
                        for (var j = 0; j < visiableRequests.length - 1; j++) {
                            container.append("<span class='balancer-item'>" + data[i][visiableRequests[j]] + "-" + data[i][visiableRequests[j + 1]] + "</span>");
                        }
                        for (var y = 0; y < hiddenRequests.length; y++) {
                            container.children("span.balancer-item").last().data(hiddenRequests[y], data[i][hiddenRequests[y]]);
                        }
                        if (i === endId) {
                            return false;
                        }
                    });
                }
            } else {
                console.error("Drop Down List : Visible Requests Array Cant be over 2 elements \n Review please Your 7th Argument in the plugin invoke");
            }
        }
    });
    // scrolling mechansim and fetching data code  [ Api Tokens Reveiwed Here ]
    container.scroll(function () {
        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            newEnd = endId * t;
            startId = newEnd - endId + 1;
            t++;
            $.ajax({
                url: dataApi + "?" + startParam + "=" + startId + "&" + endParam + "=" + newEnd,
                type: 'Get',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    if (visiableRequests.length > 0 && visiableRequests.length <= 2) {
                        if (visiableRequests.length == 1) {
                            $.each(data, function (i) {
                                container.append("<span class='balancer-item'>" + data[i][visiableRequests[0]] + "</span>");
                                for (var y = 0; y < hiddenRequests.length; y++) {
                                    container.children("span.balancer-item").last().data(hiddenRequests[y], data[i][hiddenRequests[y]]);
                                }
                                if (i === endId) {
                                    return false;
                                }
                            });
                        } else if (visiableRequests.length == 2) {
                            $.each(data, function (i) {
                                for (var j = 0; j < visiableRequests.length - 1; j++) {
                                    container.append("<span class='balancer-item'>" + data[i][visiableRequests[j]] + "-" + data[i][visiableRequests[j + 1]] + "</span>");
                                }
                                for (var y = 0; y < hiddenRequests.length; y++) {
                                    container.children("span.balancer-item").last().data(hiddenRequests[y], data[i][hiddenRequests[y]]);
                                }
                                if (i === endId) {
                                    return false;
                                }
                            });
                        }
                    } else {
                        console.error("Drop Down List : Visible Requests Array Cant be over 2 elements \n Review please Your 7th Argument in the plugin invoke");
                    }
                }
            });
        }
    });
    // auto focusing the search input while openning the ddl 
    searchInput.focus(function () {
        $(this).parent("header").siblings(".balancer-data-wrapper").hide();
        $(this).parent("header").siblings(".balancer-results-wrapper").show();
        $(this).siblings(".closeSearch").show();
    });
    // fetching the search results when triggering the enter click [ Api Tokens Reveiwed Here ]
    searchInput.keypress(function (e) {
        if (e.which == 13) {
            if ($(this).val() == "") {
                $(this).parent("header").siblings(".balancer-data-wrapper").show();
                $(this).parent("header").siblings(".balancer-results-wrapper").hide();
                $(this).siblings(".closeSearch").show();
            } else {
                $.ajax({
                    url: searchApi + "?" + searchParam +"=" + $(this).val(),
                    type: 'Get',
                    contentType: 'application/json; charset=utf-8',
                    success: function (data) {
                        searchContainer.html("<span></span>");
                        if (visiableRequests.length > 0 && visiableRequests.length <= 2) {
                            if (visiableRequests.length == 1) {
                                $.each(data, function (i) {
                                    searchContainer.append("<span class='balancer-item'>" + data[i][visiableRequests[0]] + "</span>");
                                    for (var y = 0; y < hiddenRequests.length; y++) {
                                        searchContainer.children("span.balancer-item").last().data(hiddenRequests[y], data[i][hiddenRequests[y]]);
                                    }
                                    if (i === endId) {
                                        return false;
                                    }
                                });
                            } else if (visiableRequests.length == 2) {
                                $.each(data, function (i) {
                                    for (var j = 0; j < visiableRequests.length - 1; j++) {
                                        searchContainer.append("<span class='balancer-item'>" + data[i][visiableRequests[j]] + "-" + data[i][visiableRequests[j + 1]] + "</span>");
                                    }
                                    for (var y = 0; y < hiddenRequests.length; y++) {
                                        searchContainer.children("span.balancer-item").last().data(hiddenRequests[y], data[i][hiddenRequests[y]]);
                                    }
                                    if (i === endId) {
                                        return false;
                                    }
                                });
                            }
                        } else {
                            console.error("Drop Down List : Visible Requests Array Cant be over 2 elements \n Review please Your 7th Argument in the plugin invoke");
                        }
                    }
                });
            }
        }
    });


}
