angular.module('observer').
    controller('RootController', [function () {
        $('#loginbutton').click(function() {
			var b =  $(this);
			b.prop('disabled', true);
			setTimeout(function() {
			    b.prop('disabled', false);
			}, 1000);
			$('.loginform').toggle();
		});
    }]);