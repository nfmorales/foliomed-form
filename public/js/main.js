$(function(){

	jQuery.fn.putCursorAtEnd = function() {

	  return this.each(function() {
	    var $el = $(this),
	        el = this;
	    if (!$el.is(":focus")) {
	     $el.focus();
	    }
	    if (el.setSelectionRange) {
	      var len = $el.val().length * 2;
	      setTimeout(function() {
	        el.setSelectionRange(len, len);
	      }, 1);
	    
	    } else {
	      $el.val($el.val());
	      
	    }
	    this.scrollTop = 999999;

	  });

	};

	$('.card-item').on('click', function(e){
		e.preventDefault();
		if( !$(this).hasClass('add-new-card') ){
			$('.card-item').removeClass('selected');
			$(this).addClass('selected');
			$(this).parents('#payments-secure-login').find('.add-new-card-form').hide();
			$(this).parents('#payments-secure-login').find('.btn').removeClass('disabled');
		}
	});

	$('.add-new-card a').on('click', function(e){
		e.preventDefault();
		$(this).parents('.card-item').addClass('selected');
		$(this).parents('#payments-secure-login').find('.add-new-card-form').show();
		$(this).parents('#payments-secure-login').find('.btn').addClass('disabled');
	});

	$('#checkout-code-trigger').on('click', function(e){
		e.preventDefault();
		var input = $('#checkout-code input');
		var value = input.val();

		$('#checkout-code').show();
		$('#checkout-code').find('input').focus();
		$(this).addClass('active');

		if( value != '' || value.length > 0){
			$('.process-btn').addClass('f-icon-e_arrowwithtail_right_m').removeClass('f-icon-s_close_xs');
		}
		else {
			$('.process-btn').removeClass('f-icon-e_arrowwithtail_right_m').addClass('f-icon-s_close_xs');
		}
	});

	$('#checkout-code input').on('keyup', function(){
		var value = $(this).val();
		if( value != '' || value.length > 0 ){
			$('.process-btn').addClass('f-icon-e_arrowwithtail_right_m').removeClass('f-icon-s_close_xs');
		}
		else{
			$('.process-btn').removeClass('f-icon-e_arrowwithtail_right_m').addClass('f-icon-s_close_xs');
		}
	});

/*	$('#checkout-code label').on('click', function(e){
		var input = $('#checkout-code input');
		var value = input.val();
		$(this).hide();
		input.putCursorAtEnd();
		if( value != '' || value.length > 0){
			$('.process-btn').addClass('f-icon-e_arrowwithtail_right_m').removeClass('f-icon-s_close_xs');
		}
		else {
			$('.process-btn').removeClass('f-icon-e_arrowwithtail_right_m').addClass('f-icon-s_close_xs');
		}
	});*/

	$(document).on('click', '#checkout-code .cancel', function(e){
		e.preventDefault();
		var input = $('#checkout-code input');
		var value = input.val();

		$('#checkout-code label').hide();

		// input.putCursorAtEnd();
		$('#checkout-code input').select();

		$('.discounted-price').html('').hide();
		$('#checkout-code .process-btn').show();
	});

	$('#checkout-code .process-btn').on('click', function(e){
		e.preventDefault();

		var input = $('#checkout-code input');
		var parent = $(this).parents('#checkout-code');
		var label = parent.find('label');
		var value = input.val();
		var successIcon = '<span class="f-icon-e_check_circle_solid_xs cancel"><span></span></span>';
		var output = '';
		var samplePrice = '-$750';

		if( $(this).hasClass('f-icon-e_arrowwithtail_right_m') ){
			if( value != '' || value.length > 0){
				output = value + successIcon;
			}
			label.html(output).show();
			$(this).hide();
			$('.discounted-price').html(samplePrice).show();
		}
		else if( $(this).hasClass('f-icon-s_close_xs') ){
			$('#checkout-code').hide();
			$('#checkout-code-trigger').removeClass('active');		
		}
		else{}
	});

});