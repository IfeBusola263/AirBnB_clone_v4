/*A script that is used to make 3-hbnb.html
   page a dynamic one*/

$(function () {
  const amenDict = {};

  function updateAmenitiesList() {
    const amenitiesList = Object.values(amenDict).join(', ');
    $('div h4').text(amenitiesList);
  }

  $.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:5001/api/v1/status',
    success: function (data) {
      console.log(data);
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      }
    },
    error: function () {
      $('#api_status').removeClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    data: JSON.stringify({}),
    contentType: 'application/json',
    success: function (places) {
      const section = $('.places');

      places.forEach(function (place) {
        const article = document.createElement('article');

        const titleBox = document.createElement('div');
	titleBox.className = 'title_box';

	const title = document.createElement('h2');
        title.textContent = place.name;
	
        const price = document.createElement('div');
        price.textContent = place.price_by_night;
        price.className = 'price_by_night';

	titleBox.appendChild(title);
	titleBox.appendChild(price);

        const information = document.createElement('div');
        information.className = 'information';
        const maxGuest = document.createElement('div');
        maxGuest.textContent = place.max_guest;
        maxGuest.className = 'max_guest';
        information.appendChild(maxGuest);

        const numberRooms = document.createElement('div');
        numberRooms.textContent = place.number_rooms;
        numberRooms.className = 'number_rooms';
        information.appendChild(numberRooms);

        const numberBathrooms = document.createElement('div');
        numberBathrooms.textContent = place.number_bathrooms;
        numberBathrooms.className = 'number_bathrooms';
        information.appendChild(numberBathrooms);

        const description = document.createElement('div');
        description.textContent = place.description;
        description.className = 'description';

        article.appendChild(titleBox)
        article.appendChild(information);
        article.appendChild(description);

        section.append(article);
      });
    }
  });

  $('input[type="checkbox"]').on('change', function () {
    const amenID = $(this).parent().data('id');
    const amenName = $(this).parent().data('name');

    if ($(this).is(':checked')) {
      amenDict[amenID] = amenName;
    } else {
      delete amenDict[amenID];
    }

    updateAmenitiesList();
  });

  $('button').on('click', function () {
    const amenitiesList = Object.keys(amenDict);

    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: amenitiesList }),
      contentType: 'application/json',
      success: function (data) {
        console.log('Success:', data);
      },
      error: function () {
        console.error('Error making the POST request');
      }
    });
  });
});
