var _formMode = true;
var _thanksText = 'Thanks for your interest';
var _invalidEmailText = 'Please enter a valid email';
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function submitWithoutRedirect() {
    var $messageBox = $('#message-box');
    var $email = $('#email');
    var $signUpBtn = $('#signUpBtn');
    var email = $email.val();
    $messageBox.removeClass('msg-error').removeClass('msg-info');
    if (validateEmail(email)) {
        $messageBox.hide();
        var $iframeFrm = $('#form-iframe');
        var $form = $iframeFrm.contents().find('form');
        $form.find('#i-email').val(email);
        $email.add($signUpBtn).slideUp();
        $iframeFrm.load(function () {
            if (!_formMode) {
                $('#message-box').addClass('msg-info').text(_thanksText).slideDown('slow').delay(2000).slideUp('slow').queue(function(next) {
                    $email.slideDown().val('');
                    $signUpBtn.slideDown();
                    next();
                });
                _formMode = true;
                $iframeFrm.attr('src', 'ss-form.html');//ready to go again
            }
        });
        _formMode = false;
        $form.submit();
    } else {
        $messageBox.addClass('msg-error').text(_invalidEmailText).slideDown();
    }
}
$(document).ready(function () {
    $('#sign-up').submit(function () {
        submitWithoutRedirect();
        return false;
    });
    $('#message-box').hide();
});