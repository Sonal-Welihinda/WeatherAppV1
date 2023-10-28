var bgColors = {
    "few clouds":"#388ee7",
    "clear sky":"#40b681",
    "light rain":"#de944e",
    "scattered clouds":"#7c783b",
    "broken clouds":"#6249cc",
    "shower rain":"#0041d6",
    "rain":"#001b71",
    "thunderstorm":"#000c32",
    "snow":"#91c7ff",
    "mist":"#9c3a3a"
}


function timeConverter(UNIX_timestamp,param){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour ? hour:12;
    var min = a.getMinutes();
    var sec = a.getSeconds();

    if(param=="DATE"){
        var time = hour + '.' + min + ' ' + ampm + ', ' + month + ' ' + date;
        return time;
    }else if(param=="TIME"){
        // if(){

        // }
        var time = hour + '.' + min + ' ' + ampm;
        return time;
    }

    
    return "null";
  }

function renderWeatherCard(cityCode,cityName,country,date,description,temp,temp_min,temp_max,pressure,humidity,sunrise,sunset,windDeg,windSpeed,visibility,icon){
    document.getElementById("weatherListContainer").innerHTML +=
        "<div class=\"weather-card\" id=\""+cityCode+"\" onclick=\"onClickWeatherCardOpen("+cityCode+");\">  "+ 
        // <!-- card top -->
            "<div class=\"wc-top\" style =\"background-color:"+(bgColors[description]??"#388ee7")+"\">"+

                "<div class=\"wc-topTop\">"+
                    "<div class=\"wc-backbtn\">"+
                        "<img src=\"Images/backArrow.png\" alt=\"go back\" onclick=\"onClickWeatherCardClose("+cityCode+");\">"+
                    "</div>"+


                    "<div>"+

                        "<div class=\"wc-location\">"+
                            cityName+ ", "+country+
                        "</div>"+


                        "<div class=\"wc-Time\">"+
                        timeConverter(date,"DATE")+
                        "</div>"+

                    "</div>"+

                    "<div class=\"wc-close\">"+
                        "<img src=\"Images/close.png\" alt=\"go back\" onclick=\"removeWeatherCard("+cityCode+")\" >"+
                    "</div>"+

                "</div>"+
                // <!-- card top left side -->
                "<div class=\"wc-topMid\">"+

                    "<div class=\"wc-topL\">"+
                        "<div class=\"wc-location\">"+
                            cityName+ ", "+country+
                        "</div>"+


                        "<div class=\"wc-Time\">"+
                        timeConverter(date,"DATE")+
                        "</div>"+

                        "<div class=\"wc-status\">"+
                            "<img src=\"https://openweathermap.org/img/wn/"+icon+"@2x.png\" alt=\"description"+"Icon"+"\">"+
                            "<span>"+description+"</span>"+
                            
                        "</div>"+

                    "</div>"+

                    // <!-- card top right side -->
                    "<div class=\"wc-topR\">"+

                        // <!-- avg temprature  -->
                        "<div class=\"wc-tempAvg\">"+
                            temp+"&deg;"+"c"+
                        "</div>"+

                        // <!-- min temprature  -->
                        "<div >"+
                            "Temp Min: "+
                            "<div class=\"wc-tempMin\">"+
                                temp_min+"&deg;"+"c"+
                            "</div>"+
                        "</div>"+

                        // <!-- Max temprature  -->
                        "<div >"+
                            "Temp Max: "+
                            "<div class=\"wc-tempMax\">"+
                                temp_max+"&deg;"+"c"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                "</div>"+

            "</div>"+

            // <!-- card bottom -->
            "<div class=\"wc-bottom\">"+

                // <!-- card bottom left -->
                "<div class=\"wc-bottom-left\">"+
                    "<div><b>Pressure:</b> <div class=\"wc-Pressure\">"+pressure+"hPa</div></div>"+
                    "<div><b>Humidity:</b> <div class=\"wc-Humidity\">"+humidity+"%</div></div>"+
                    "<div><b>visibility :</b> <div class=\"wc-visibility\">"+(visibility/1000).toFixed(1)+" KM</div> </div>"+
                "</div>"+

                // <!-- card bottom mid -->
                "<div class=\"wc-bottom-mid\">"+
                    "<img src=\"Images/direction.png\" alt=\"direction\">"+
                    "<div>"+
                        windSpeed+"m/s "+windDeg+" degrees"+
                    "</div>"+
                "</div>"+

                // <!-- card right -->
                "<div class=\"wc-bottom-right\">"+
                    "<div>"+
                        "<b>Sunrise:</b> "+
                        "<div class=\"wc-Sunrise\">"+
                        timeConverter(sunrise,"TIME")+"</div>"+
                    "</div>"+

                    
                    "<div>"+
                        "<b>Sunset:</b> "+
                        "<div class=\"wc-Sunset\">"+timeConverter(sunset,"TIME")+"</div>"+
                    "</div>"+

                "</div>"+

            "</div>"+
            

        "</div>";
}