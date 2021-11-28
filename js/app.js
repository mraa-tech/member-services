const webAppUrl = "https://script.google.com/macros/s/AKfycbyfXrwlwW5MvfA44NHm9RJNNk-xjcnh0bO5CCV7K3VPeQ9UqLzP6jCIL1xP6rCvfrms/exec";
const showId = getShowId();
const items = [
    "title",
    "showlimit"
]

function retrieveTitle() {
    fetch(`${webAppUrl}?s=${showId}&get=title`)
        .then(d => d.json())
        .then(d => {
            updateTitle(d[1].title);
        });
}

function retrieveShowLimit() {
    fetch(`${webAppUrl}?s=${showId}&get=limit`)
        .then(d => d.json())
        .then(d => {
            updateShowLimit(d[1].limit);
        });
}

function updateTitle(t) {
	let t1=t==undefined?"Not Found - Check Show Id":t;
	document.getElementById("exhibitionTitle").innerHTML = t1;
}

function updateShowLimit(l) {
	let l1=l==undefined?"unknown":l;
	document.getElementById("maxPerShow").innerHTML = l1;
}

function getShowId() {
	return location.search.substring(1).toUpperCase();
}

function bar_progress(progress_line_object, direction) {
	var number_of_steps = progress_line_object.data('number-of-steps');
	var now_value = progress_line_object.data('now-value');
	var new_value = 0;
	if (direction == 'right') {
		new_value = now_value + (100 / number_of_steps);
	} else if (direction == 'left') {
		new_value = now_value - (100 / number_of_steps);
	}
	progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
}

jQuery(document).ready(function () {
	const titleElem = document.getElementById("exhibitionTitle");
    retrieveTitle();
	retrieveShowLimit();
    console.log(exhibitionTitle);
	/*
	    Form
	*/
	$('.f1 fieldset:first').show();
	//$('.f1 fieldset:first').next().show(); // while testing second panel
	$('.f1 input[type="text"], .f1 input[type="password"], .f1 textarea').on('focus', function() {
		$(this).removeClass('input-error');
	});

	// next step
	$('.f1 .btn-next').on('click', function () {
		var parent_fieldset = $(this).parents('fieldset');
		// navigation steps / progress steps
		var current_active_step = $(this).parents('.f1').find('.f1-step.active');
		var progress_line = $(this).parents('.f1').find('.f1-progress-line');
		var next_step = true;

		// fields validation
		/* parent_fieldset.find('input[type="text"], input[type="password"], textarea').each(function() {
			if( $(this).val() == "" ) {
				$(this).addClass('input-error');
				next_step = false;
			}
			else {
				$(this).removeClass('input-error');
			}
		}); */
		// fields validation

		if (next_step) {
			parent_fieldset.hide();
			current_active_step.removeClass('active').addClass('activated').next().addClass('active');
			parent_fieldset.next().show();
			bar_progress(progress_line, 'right');
		}

	});

	// previous step
	$('.f1 .btn-previous').on('click', function () {
		var parent_fieldset = $(this).parents('fieldset');
		// navigation steps / progress steps
		var current_active_step = $(this).parents('.f1').find('.f1-step.active');
		var progress_line = $(this).parents('.f1').find('.f1-progress-line');

		parent_fieldset.hide();
		current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
		bar_progress(progress_line, 'left');
		parent_fieldset.prev().show();
	});

	// submit
	$('.f1').on('submit', function (e) {

		// fields validation
		$(this).find('input[type="text"], input[type="password"], textarea').each(function () {
			if ($(this).val() == "") {
				e.preventDefault();
				$(this).addClass('input-error');
			} else {
				$(this).removeClass('input-error');
			}
		});
		// fields validation

	});


});