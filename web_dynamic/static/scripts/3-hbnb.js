/*A script that is used to make 1-hbnb.html
   page a dynamic one*/
$(function(){
    $.post("http://0.0.0.0:5001/api/v1/places_search",
	   {},
	   function(data, statusInfo) {
	       // Loop through the places and create an artcle tag for
	       $.each(data, function(index, place) {
		   $("section.places").append(`<article>${place}</article>`);
	       });
	   });
});

$(function () {
  $.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:5001/api/v1/status',
    success: function (data) {
      if (data.status === "OK") {
        $("div#api_status").addClass('available');
      }
    },
    error: function () {
      $('div#api_status').removeClass('available');
    }
  });
});

$(function () {
  const amenDict = {};

  $("input[type='checkbox']").on('change', function () {
    const amenID = $(this).parent().data('id');
    const amenName = $(this).parent().data('name');

    if ($(this).is(':checked')) {
      amenDict[amenID] = amenName;
    } else {
      delete amenDict[amenID];
    }

    const amenitiesList = Object.values(amenDict).join(', ');
    $("div h4").text(amenitiesList);
  });
});
