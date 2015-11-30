$('a[href*=#]:not([href=#])').click(function() {
  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
      || location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
         if (target.length) {
           $('html,body').animate({
               scrollTop: target.offset().top - 50
          }, 1000);
          return false;
      }
  }
});

/* =============== hide email form on scroll =============== */

$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var height = ($(this).height()) - 500;
    $('#container1').css({
      'opacity': ((height - scrollTop) / height)
    });
});

/* =============== width on scroll =============== */


// if ($(window).width() <= 549) {
//     if($(window).scrollTop() > 600) {
//         // the animation that's executed
//         firstAnimation();
//     }
// } else if ($(window).width() > 549 && $(window).width() <= 991) {
//     if($(window).scrollTop() > 480){
//         // the animation that's executed
//         firstAnimation();
//     }
// } else {
//     if ($(window).scrollTop() > 450) {
//         // the animation that should be executed
//         firstAnimation();
//     }
// }
// var firstAnimation = function(){
//     $('#skl1').each(
//        function(){
//          $(this).delay(500).animate(
//            {width:'250'},2000);}
//       );
//   };

$('#myForm').submit(function(e) {
  //prevent default form submitting so it can run the ajax code first


  $(this).on('valid', function() {    //if the form is valid then grab the values of these IDs (name, email, message)
    var name = $("input#name").val();
    var email = $("input#email").val();
    var message = $("textarea#message").val();

    //Data for reponse (store the values here)
    var dataString = 'name=' + name +
      '&email=' + email +
      '&message=' + message;

    //Begin Ajax call
    $.ajax({
      type: "POST",
      url:"mail.php", //runs the php code
      data: dataString, //stores the data to be passed
      success: function(data){ // if success then generate the div and append the the following
        $('.contactform').html("<div id='thanks'></div>");

          $('#thanks').html("<br /><h4>Thanks!</h4>")
          .append('<p><span style="font-size:1.5em;">Hey</span> <span class="fancy">'+ name +'</span>,<br />I&acute;ll get back to you as soon as I can ;)</p>')
          .hide()
          .fadeIn(1500);
      },
      error: function(jqXHR, status, error){ //this is to check if there is any error
          alert("status: " + status + " message: " + error);
      }
    }); //End Ajax call
    //return false;
  });
});

