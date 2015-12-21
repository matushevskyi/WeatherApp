$(function(){
    $('#btnGetWeather').click(function () {
        getWeatherByCity('ua', dataReceived, showError, $('#inputCityName').val());
    });
    $('#inputCityName').keypress(function(e) {
        var ENTER_KEY_CODE = 13;
        if ( e.which === ENTER_KEY_CODE ) 
        {
            $('#btnGetWeather').trigger('click');
            return false;
        }
    });    
    
    getWeatherData('ua', dataReceived, showError);
    

    function dataReceived(data) {
        var offset = (new Date()).getTimezoneOffset()*60*1000; // Відхилення від UTC в секундах
        var city = data.city.name;
        var country = data.city.country;
        $("#weatherTable tr:not(:first)").remove();

        $.each(data.list, function(){
            // "this" тримає об'єкт прогнозу звідси: http://openweathermap.org/forecast16
            var localTime = new Date(this.dt*1000 - offset); // конвертуємо час з UTC у локальний
            addWeather(
                this.weather[0].icon,
                moment(localTime).calendar(),	// Використовуємо moment.js для представлення дати
                this.weather[0].description,
                Math.round(this.temp.day) + '&deg;C'
            );
        });

var functionOk = function (data) {
        console.log(data);
        
        //Today weather
        var icon = data.list[0].weather[0].icon ;
        $('#city').html('data.city.name');
        $('#country').html('data.city.country');
        $('#date').html('date');
        $('#icon-current-time').html('<img src="images/'+ icon +'.svg">');
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
    
            weatherForDay += '<div>' +
                '<p class="day">' + getDayNameByNumber(date.getDay()) + '</p>' +
                '<p class="date">' + monthNames[date.getMonth()] + '&nbsp;' + date.getDate() + '</p>' +
                '<div class="icon">' + ('<img src="images/' + data.list[i].weather[0].icon + '.svg" alt="' + data.list[1].weather[0].description + '" >') +'</div>' +
                '<p class="temp-day">'  + Math.round(data.list[i].temp.max) + '&deg;C</div>' +
                '<p class="temp-night">' + Math.round(data.list[i].temp.min) + '&deg;C &nbsp;'
            '</div>';
        }
        weatherContainer.html(weatherForDay);
    };

    var functionError = function (msg) {
        $('#error').html('An error has occurred: ' + msg);
    };
    
    getWeatherByCity('eng', functionOk, functionError, 'Lviv');
    
});