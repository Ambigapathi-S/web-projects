function getCarList(type, id) {
    var list = [];
    $.ajax({
        url: `data.json`,
        method: "GET",
        dataType: "json",
        success: function (data) {
            if (data.length > 0) {
                if (type == 'dummylist') {
                    list = "";
                }
                list = data;
                let output = "";
                const porscheCarSliders = $(".porscheCarSliders");
                const listingCarSliders = $(".car-list-slider");

                for (var i = 0; i < list.length; i++) {
                    output += `
                    <div class="item">
                        <h1 class="car_name">${list[i].car_name}</h1>
                        <h4 class="car_type">${list[i].car_type}</h4>
                        <div class="car_image"><img src="./assets/${list[i].image}" ></div>
                        <p class="car_speed_time">
                            <span class="time"><i class="fa fa-clock-o"></i>${list[i].time}</span>
                            <span class="speed"><i class="fa fa-line-chart"></i>${list[i].speed}</span>
                        </p>
                        <span class="type"><i class="fa fa-bolt"></i>${list[i].type}</span>
                        <p class="car_price">${list[i].price}</p>
                        <img class="shop" src="./assets/Shop.png">
                    </div>
                    `;
                }

                if (type != 'dummylist') {
                    porscheCarSliders.append(output);
                    listingCarSliders.append(output);
                }
                else {
                    listingCarSliders.append(output);
                }
                $(".listing-tab").find('ul li').removeClass("active");
                $(".listing-tab").find("#" + id).addClass("active");
                slider();
            }
        },
        error: function (error) {
            console.error("Error loading data: " + error);
        }
    });
}

function slider() {
    $(document).ready(function () {
        $('.car-list-slider').slick({
            dots: false,
            arrows: false,
            rows: 2,
            slidesToShow: 3,
            slidesToScroll: 3,
            autoplay: false,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                    slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                    slidesToShow: 1,
                    }
                }
            ]
        });
    });
}

$(document).on("click", ".navbar-toggle", function () {
    $('.nav').toggleClass("open");
})
getCarList();