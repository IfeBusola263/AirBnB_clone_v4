/* A script that is used to make 1-hbnb.html
   page a dynamic one */

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
