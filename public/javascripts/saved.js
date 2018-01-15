window.onload = function() {
  const removeFromSaves = function(articleId) {
    $.ajax({
      method: "PUT",
      url: "./remove-from-saves",
      data: {
        id: articleId
      }
    }).done(function(data, response, xhr) {
      // reload the page if response status is 200
      if (xhr.status === 200) {
        window.location.reload();
      }
    });
  }

  $(document).on('click', '.delete', function(e) {
    removeFromSaves($(e.target).attr('data-id'));
  });
}