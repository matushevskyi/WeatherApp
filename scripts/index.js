$(function(){
    $('#btnGetWeather').click(function () {
        getWeatherByCity('ua', functionOk, functionError, $('#inputCityName').val());
    });
    $('#inputCityName').keypress(function(e) {
        var ENTER_KEY_CODE = 13;
        if ( e.which === ENTER_KEY_CODE ) 
        {
            $('#btnGetWeather').trigger('click');
            return false;
        }
    });    
    
   
    function functionOk (data) {
        console.log(data);
        
        var offset = (new Date()).getTimezoneOffset()*60*1000; // Відхилення від UTC в секундах
        
        //Today weather
        var curr = data.list[0];
        $('#city').html(data.city.name);
        $('#country').html(data.city.country);
        $('#date').html(moment(new Date(curr.dt*1000 - offset)).calendar());
        $('#icon').html('<img src="images/'+ curr.weather[0].icon +'.svg">');
        $('#temp').html(Math.round(data.list[0].temp.morn) + '&deg;C');
        $('#max-temp').html('&nbsp;' + '&nbsp;' + Math.round(curr.temp.min) + '&deg;C');
        $('#min-temp').html('&nbsp;' + '&nbsp;' + Math.round(curr.temp.max) + '&deg;C');
        $('#humidity').html('&nbsp;' + '&nbsp;' + data.list[0].humidity + '%');
        $('#wind').html('&nbsp;' + '&nbsp;' + curr.speed + '&nbsp;' + 'm/s');
        
        //Weather forecast for 6 days
        var date = new Date();
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        var weatherForDay = '';
        var weatherContainer = $('#forecast');
        
        for (var i = 1; i <= 6; i++) {
            curr = data.list[i];
            $('#day' + i).html(getDayNameByNumber((new Date(curr.dt*1000 - offset)).getDay()));
            $('#date' + i).html(moment(new Date(curr.dt*1000 - offset)).format('MMM D'));
            $('#icon' + i).html('<img src="images/'+ curr.weather[0].icon +'.svg">');
            $('#temp-min' + i).html(Math.round(curr.temp.min) + '&deg;C');
            $('#temp-max' + i).html(Math.round(curr.temp.max) + '&deg;C');
        }
    };
    
    function getDayNameByNumber(dayNum) {
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayNum]; 
    }

    
    function functionError (msg) {
        $('#error').html('An error has occurred: ' + msg);
    };
    
    getWeatherByCity('eng', functionOk, functionError, 'Lviv');
    
});