/*A script that is used to make 3-hbnb.html
   page a dynamic one*/

$(function () {
  const amenDict = {};

  function updateAmenitiesList() {
    const amenitiesList = Object.values(amenDict).join(', ');
    $('.amenities h4').text(amenitiesList);
  }

  function toggleReviewSection(span, ul) {
    span.on('click', function () {
      if (ul.css('display') === 'none') {
        ul.css('display', 'block');
        span.text('hide');
      } else {
        ul.css('display', 'none');
        span.text('show');
      }
    });
  }
  
  const reviews = [
    { date: '2023-01-01', text: 'A great place to stay.' },
    { date: '2023-02-15', text: 'I enjoyed my visit.' },
  ];	
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

        const review = document.createElement('div');
        review.className = 'reviews';
        const h2Review = document.createElement('h2');
        const span = document.createElement('span');
        span.classList.add('review-span');
        span.textContent = 'show';

        const ul = document.createElement('ul');
        ul.style.display = 'none';

        reviews.forEach(function (reviewItem) {
          const liReview = document.createElement('li');
          const h3Review = document.createElement('h3');
          h3Review.textContent = reviewItem.date;
          const pReview = document.createElement('p');
          pReview.textContent = reviewItem.text;

          liReview.appendChild(h3Review);
          liReview.appendChild(pReview);
          ul.appendChild(liReview);
        });

        h2Review.appendChild(span);
        review.appendChild(h2Review);
        review.appendChild(ul);

        article.appendChild(titleBox);
        article.appendChild(information);
        article.appendChild(description);
        article.appendChild(review);

        section.append(article);

        const spanElement = $(article).find('.review-span');
        const ulElement = $(article).find('ul');
        toggleReviewSection(spanElement, ulElement);
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

  const storageDict = {};

  function onClickInput() {
    $(".location .popover li input[type='checkbox']").on('click', function () {
      const elementID = $(this).parent().data('id');
      const elementName = $(this).parent().data('name');
      storageDict[elementID] = elementName;
      updateHeader();
    });
  }

  function updateHeader() {
    const locationHeaderList = Object.values(storageDict).join(', ');
    $("div .container .locations > h3 + h4").text(locationHeaderList);
  }

  onClickInput();
});

/*$(function () {
  const amenDict = {};

  function updateAmenitiesList() {
    const amenitiesList = Object.values(amenDict).join(', ');
    $('.amenities h4').text(amenitiesList);
  }

  function toggleReviewSpan() {
    $('#span_id').on('click', function () {
      const ulElement = $('#ul_id');
      if (ulElement.css('display') === 'none') {
        ulElement.css('display', 'block');
        $('#span_id').text('hide');
      } else {
        ulElement.css('display', 'none');
        $('#span_id').text('show');
      }
    });
  }

  // Create the review section
  const review = document.createElement('div');
  const h2Review = document.createElement('h2');
  const span = document.createElement('span');
  span.classList.add('span_id');
  span.textContent = 'show';

  const ul = document.createElement('ul');
  ul.id = 'ul_id';
  ul.style.display = 'none';

  const liReview = document.createElement('li');
  const h3Review = document.createElement('h3');
  h3Review.textContent = 'Review Header';
  const pReview = document.createElement('p');
  pReview.textContent = 'Review content';

  liReview.appendChild(h3Review);
  liReview.appendChild(pReview);
  ul.appendChild(liReview);

  h2Review.appendChild(span);
  review.appendChild(h2Review);
  review.appendChild(ul);

  // Append the review section to the article
  const article = document.createElement('article');
  article.appendChild(review);
  const section = $('.places');

  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    data: JSON.stringify({}),
    contentType: 'application/json',
    success: function (places) {
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

        article.appendChild(titleBox);
        article.appendChild(information);
        article.appendChild(description);

        section.append(article);
      });
    }
  });

  toggleReviewSpan(); // Enable toggling the review section

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

  const storageDict = {};

  function onClickInput() {
    $(".location .popover li input[type='checkbox']").on('click', function () {
      const elementID = $(this).parent().data('id');
      const elementName = $(this).parent().data('name');
      storageDict[elementID] = elementName;
      updateHeader();
    });
  }

  function updateHeader() {
    const locationHeaderList = Object.values(storageDict).join(', ');
    $("div .container .locations > h3 + h4").text(locationHeaderList);
  }

  onClickInput();
});*/

/*$(function () {
  const amenDict = {};

  function updateAmenitiesList() {
    const amenitiesList = Object.values(amenDict).join(', ');
    $('.amenities h4').text(amenitiesList);
  }

  function toggleReviewSpan() {
    $('#span_id').on('click', function() {
      if ($('ul_id').css('display', 'block')) {
        $('ul_id').css('display', 'none');
      } else {
	$('ul_id').css('display', 'block');
      }
    })
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
	
        article.appendChild(titleBox);
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

  const storageDict = {};

  function onClickInput() {
    $(".location .popover li input[type='checkbox']").on('click', function () {
      const elementID = $(this).parent().data('id');
      const elementName = $(this).parent().data('name');
      storageDict[elementID] = elementName;
      updateHeader();
    });
  }

  function updateHeader() {
    const locationHeaderList = Object.values(storageDict).join(', ');
    $("div .container .locations > h3 + h4").text(locationHeaderList);
  }

  onClickInput();
});*/
