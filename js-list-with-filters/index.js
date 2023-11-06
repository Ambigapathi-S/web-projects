let limit = 15;
let limits;
let offset = 0;
let totalItems = 0;
let list = [];
let newList = [];
function loadMoreData(limits) {


    let type = $("#sortType").val();
    let age = $("#age").val();
    let season = $("#season").val();
    let resorttype = $("#resortType").val();
    
    if (limits != '' && limits != null && typeof limits != 'undefined') {
        limit = limits;
    }
    else {
        limit = 15;
    }
    $.ajax({
        url: `hotel.json`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            if (data.length > 0) {
                const hotelList = $(".hotelList");
                $(".hotelList").empty();
                newList = data;
                totalItems = data.length;
                let output = "";

                list = [];
                for (var i = 0; i < newList.length; i++) {
                    if (i < limit) {
                        list.push(newList[i]);
                    }
                }

                if (type == "ascendingPrice") {
                    list.sort((a, b) => a.price - b.price);
                } else if (type == "descendingPrice") {
                    list.sort((a, b) => b.price - a.price);
                } else if (type == "ascendingName") {
                    list.sort((a, b) => a.name < b.name);
                } else if (type == "descendingName") {
                    list.sort((a, b) => a.name > b.name);
                } else {
                    list.sort((a, b) => a.price - b.price);
                }
                if (age == "All Ages") {
                    list.sort((a, b) => a.age);
                } else if (age == "55") {
                    list.sort((a, b) => a.age <= 55);
                } else {
                    list.sort((a, b) => a.age <= 300);
                }
                if (typeof season !== 'undefined') {
                    list = list.filter(item => item.season.indexOf(season) > -1);
                }
                else {
                    list = list;
                }
                if (typeof resorttype !== 'undefined') {
                    list = list.filter(item => item.resorttype.indexOf(resorttype) > -1);
                }
                else {
                    list = list;
                }

                $("#totalCount").text(list.length);

                for (var i = 0; i < list.length; i++) {
                    output += `
                        <div class="row boxItems">
                            <div class="col-sm-2 box-image">
                                <img src="${list[i].image ? list[i].image : "./assets/placeholderimage.jpg"}" />
                            </div>
                            <div class="col-sm-7 content">
                                <h2 class="hotelName">${list[i].name ? list[i].name : ""}</h2>
                                <p class="hotelAddress">
                                    ${list[i].address ? list[i].address.streetAddress ? list[i].address.streetAddress : "" : ""}, 
                                    ${list[i].address ? list[i].address.addressLocality ? list[i].address.addressLocality : "" : ""}, 
                                    ${list[i].address ? list[i].address.addressRegion ? list[i].address.addressRegion : "" : ""} - 
                                    ${list[i].address ? list[i].address.postalCode ? list[i].address.postalCode : "" : ""}.
                                </p>
                                <p class="phoneNo">${list[i].contactPoint ? list[i].contactPoint.telephone ? list[i].contactPoint.telephone : "" : ""}</p>
                                <p class="reviews"><span id="rating">Rate ${list[i].star ? list[i].star : "1"}</span> based on ${list[i].reviewscount ? list[i].reviewscount : "1"} Reviews</p>
                                <p class="age">${list[i].age} - ${list[i].season}</p>
                            </div>
                            <div class="col-sm-3 price">
                                <p class="priceui"><span>From</span> ${list[i].price} USD/Night</p>
                            </div>
                        </div>
                    `;
                }
                hotelList.append(output);
            }
        },
        error: function (error) {
            console.error("Error loading data: " + error);
        }
    });
}

function loadResortType() {

    $.ajax({
        url: `hotel.json`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            const uniqueResortTypes = [...new Set(data.map(item => item.resorttype))];

            const resortType = document.getElementById("resortType");
            uniqueResortTypes.forEach(type => {
                if (typeof type != 'undefined') {
                    const option = document.createElement("option");
                    option.value = type;
                    option.text = type;
                    resortType.appendChild(option);
                }
            });
        }
    })

}
loadResortType();
loadMoreData();

$(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
        if (totalItems > limit) {
            limits = limit + 15;
            loadMoreData(limits);
        }
    }
});

function printDiv() {
    window.print();
}

$(document).ready(function () {
    $(".selectpicker").selectpicker();
});

$(document).ready(function () {
    $('select.form-control').on("change", function () {
        loadMoreData(limits);
    });
});
