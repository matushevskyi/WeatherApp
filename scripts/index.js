var functionOk = function (data) {
        console.log(data);
        
        //Today weather
        var icon = data.list[0].weather[0].icon ;
        $('#city').html('')
        $('#icon-current-time').html('<img src="images/'+ icon +'.svg" alt="' + data.list[0].weather[0].description + '" >');
        $('#temp').html(Math.round(data.list[0].temp.morn) + '&deg;C');
        $('#max-temp').html('&nbsp;' + '&nbsp;' + Math.round(data.list[0].temp.min) + '&deg;C');
        $('#min-temp').html('&nbsp;' + '&nbsp;' + Math.round(data.list[0].temp.max) + '&deg;C');
        $('#humidity').html('&nbsp;' + '&nbsp;' + data.list[0].humidity + '%');
        $('#wind').html('&nbsp;' + '&nbsp;' + data.list[0].speed + '&nbsp;' + 'm/s');

        var date = new Date();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        var weatherForDay = '';
        var weatherContainer = $('#forecast');
        
        for(var i = 1; i < data.list.length; i++) {
            
            date.setDate(date.getDate() + 1);
    
            weatherForDay += '<article>' +
                '<p class="day">' + getDayNameByNumber(date.getDay()) + '</p>' +
                '<p class="date">' + monthNames[date.getMonth()] + '&nbsp;' + date.getDate() + '</p>' +
                '<div class="icon">' + ('<img src="images/' + data.list[i].weather[0].icon + '.svg" alt="' + data.list[1].weather[0].description + '" >') +'</div>' +
                '<p class="temp-day">'  + Math.round(data.list[i].temp.max) + '&deg;C</div>' +
                '<p class="temp-night">' + Math.round(data.list[i].temp.min) + '&deg;C &nbsp;'
            '</article>';
        }
        weatherContainer.html(weatherForDay);
    };

    var functionError = function (msg) {
        $('#error').html('An error has occurred: ' + msg);
    };
    
    getWeatherByCity('eng', functionOk, functionError, 'Lviv');
    
});