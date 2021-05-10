function Login_Logout(flag){
    if (flag == 'Logined'){
        // document.getElementById("hiddenLogout").style.display='block'
        $('#hiddenLogout').attr('style', 'display: block !important');
        // document.getElementById("hiddenLogin").style.display='none'
        $('#hiddenLogin').attr('style', 'display: none !important');
        // document.getElementById("hiddenProject").style.display='block'
        $('#hiddenProject').attr('style', 'display: block !important');
        // document.getElementById("hiddenSystem").style.display='block'
        $('#hiddenSystem').attr('style', 'display: block !important');
        console.log('dead')
    }

    else{
        // document.getElementById("hiddenLogout").style.display='none'
        $('#hiddenLogout').attr('style', 'display: none !important');
        // document.getElementById("hiddenLogin").style.display='block'
        $('#hiddenLogin').attr('style', 'display: block !important');
        // document.getElementById("hiddenProject").style.display='none'
        $('#hiddenProject').attr('style', 'display: none !important');
        // document.getElementById("hiddenSystem").style.display='none'
        $('#hiddenSystem').attr('style', 'display: none !important');
    }
}


$.ajax({
    url: "/",
    type: "POST",
    data: {
        method:'checkSession'
    },
    success: function (result) {
        console.log(result)
        Login_Logout(result)
        $(document).ready(function(){

            // Cloning main navigation for mobile menu
            $(".mobile-navigation").append($(".main-navigation .menu").clone());
    
            // Mobile menu toggle 
            $(".menu-toggle").click(function(){
                $(".mobile-navigation").slideToggle();
            });
    
            $(".hero").flexslider({
                directionNav: false,
                controlNav: true,
            });
    
            var map = $(".map");
            var latitude = map.data("latitude");
            var longitude = map.data("longitude");
            if( map.length ){
                
                map.gmap3({
                    map:{
                        options:{
                            center: [latitude,longitude],
                            zoom: 15,
                            scrollwheel: false
                        }
                    },
                    marker:{
                        latLng: [latitude,longitude],
                    }
                });
                
            }
        });
    
    }
})


