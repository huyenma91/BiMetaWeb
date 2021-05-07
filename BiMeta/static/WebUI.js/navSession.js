function Login_Logout(flag){
    if (flag == 'Logined'){
        document.getElementById("hiddenLogout").style.display='block'
        document.getElementById("hiddenLogin").style.display='none'
        document.getElementById("hiddenProject").style.display='block'
        document.getElementById("hiddenSystem").style.display='block'
    }

    else{
        document.getElementById("hiddenLogout").style.display='none'
        document.getElementById("hiddenLogin").style.display='block'
        document.getElementById("hiddenProject").style.display='none'
        document.getElementById("hiddenSystem").style.display='none'
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
    }
})
