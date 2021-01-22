
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

$(document).ready(function () {
  $('#contact-email').on('input', function () {
    var email = $('#contact-email');
    const validated = isEmail(email.val());
    if (validated === true) {
      $('#contact-email').addClass('valid');
      $('#contact-email').removeClass('error');
      $('.email-error').css('display', 'none');
    } else if (validated === false) {
      $('#contact-email').addClass('error');
      $('#contact-email').removeClass('valid');
      $('.email-error').css('display', 'inline-block');
    }
  })

  var name = $('#contact-name');
  var subject = $('#contact-subject');
  var msg = $('#contact-msg');
  var subjectParams = new URLSearchParams(window.location.search);
  subject.val(subjectParams.get('sub'));

  subject.on('input', function () {
    if(subject.val()){
      $('#contact-subject').addClass('valid');
      $('#contact-subject').removeClass('error');
      $('.subject-error').css('display', 'none');
    }else if(!subject.val()){
      $('#contact-subject').addClass('error');
      $('#contact-subject').removeClass('valid');
      $('.subject-error').css('display', 'inline-block');
      $('#contact-subject').focus();
    }
  })

  msg.on('input', function () {
    if(msg.val()){
      $('#contact-msg').addClass('valid');
      $('#contact-msg').removeClass('error');
      $('.msg-error').css('display', 'none');
    }else if(!msg.val()){
      $('#contact-msg').addClass('error');
      $('#contact-msg').removeClass('valid');
      $('.msg-error').css('display', 'inline-block');
      $('#contact-msg').focus();
    }
  })

  name.on('input', function () {
    if(name.val()){
      $('#contact-name').addClass('valid');
      $('#contact-name').removeClass('error');
      $('.name-error').css('display', 'none');
    }else if(!name.val()){
      $('#contact-name').addClass('error');
      $('#contact-name').removeClass('valid');
      $('.name-error').css('display', 'inline-block');
      $('#contact-name').focus();
    }
  })

  $("#submit-btn").click(function () {
    var email = $('#contact-email');
    const validated = isEmail(email.val());
    
    if (validated === false) {
      $('#contact-email').addClass('error');
      $('#contact-email').removeClass('valid');
      $('.email-error').css('display', 'inline-block');
      $('#contact-email').focus();
    }

    if(!name.val()){
      $('#contact-name').addClass('error');
      $('#contact-name').removeClass('valid');
      $('.name-error').css('display', 'inline-block');
      $('#contact-name').focus();
    }

    if(subject.val()){
      $('#contact-subject').addClass('valid');
      $('#contact-subject').removeClass('error');
      $('.subject-error').css('display', 'none');
    }
    if(!subject.val()){
      $('#contact-subject').addClass('error');
      $('#contact-subject').removeClass('valid');
      $('.subject-error').css('display', 'inline-block');
      $('#contact-subject').focus();
    }

    if(!msg.val()){
      $('#contact-msg').addClass('error');
      $('#contact-msg').removeClass('valid');
      $('.msg-error').css('display', 'inline-block');
      $('#contact-msg').focus();
    }

    if (email.hasClass('valid') && name.hasClass('valid') && subject.hasClass('valid') && msg.hasClass('valid')) {
      console.log(name.val(), email.val(), subject.val(), msg.val());
      $("#submit-btn").addClass("submit-request");
      $("#submit-btn").css({"cursor" : "not-allowed"});
      $("#loading").addClass("loading-active");
      fetch("https://api.spaceuptech.com/v1/site/contact-us", {
        method: 'POST',
        body: JSON.stringify({ name: name.val(), email: email.val(), subject: subject.val(), msg: msg.val(), source: 'website' }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then(res => {
          if (res.ack){
          setTimeout(()=>{
          $("#loading").removeClass("loading-active");
          $('#contact-name').val('');
          $('#contact-email').val('');
          $('#contact-subject').val('');
          $('#contact-msg').val('');
          M.toast({ html: 'Message send sucessfully!' });
          $("#loading").addClass("loading-sucess");
        },1500)
        setTimeout(()=>{
          $("#loading").removeClass("loading-sucess");
          $("#submit-btn").css({"cursor" : ""});
        },3000)
        }else {
          setTimeout(()=>{
            $("#loading").removeClass("loading-active");
            M.toast({ html: 'Error in sending message' });
            $("#loading").addClass("loading-error");
          },1500)
          setTimeout(()=>{
            $("#loading").removeClass("loading-error");
            $("#submit-btn").css({"cursor" : ""});
          },2000) 
          }
        })
        .catch(e => {
          setTimeout(()=>{
            $("#loading").removeClass("loading-active");
            M.toast({ html: 'Error in sending message' });
            $("#loading").addClass(" loading-error");
          },1500)
          setTimeout(()=>{
            $("#loading").removeClass("loading-error");
            $("#submit-btn").css({"cursor" : ""});
          },2000) 
        });
    }
  })
});