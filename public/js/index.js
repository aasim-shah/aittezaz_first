$( document ).ready(function() {
    $('#search_btn').on('click' , ()=> {
        $('#searchPopUp').addClass('active')
        $('#overlay').css({display : 'block'})
    })
    $('#hidesearchPopup').on('click' , ()=> {
        $('#searchPopUp').removeClass('active')
        $('#overlay').css({display : 'none'})
    })
    $("#btn_toggle").on("click" , ()=>{
        
        $("#ss").toggle()
        $("#ee").toggle()
        $("#toggle_nav").toggle()

    })
    setTimeout(() => {
        $('.whatsapp').css({display: "block"})
    }, 5000);
});