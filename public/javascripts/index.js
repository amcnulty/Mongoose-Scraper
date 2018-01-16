/* gloabl bootbox */
window.onload = function() {
  const scrapeArticles = function() {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', './scrape', true);
    xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 500) {
        console.log(xhr.responseText);
      }
      else if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        console.log(JSON.parse(xhr.responseText).numOfRecords);
        let message;
        if (JSON.parse(xhr.responseText).numOfRecords > 0) {
          message = (xhr.responseText).numOfRecords + ' new articles scraped!';
        }
        else message = 'No new articles to scrape. Check back later.'
        bootbox.alert("<h3 class='text-center m-top-80'>" + message + "<h3>");
      }
    }
    xhr.send();
  }
  const saveArticle = function(articleId) {
    $.ajax({
      url: './save-article',
      method: 'PUT',
      data: {
        id: articleId
      }
    }).done(function(response) {
      console.log(`Article Saved!!
      
      ${response}`);
    });
  }
  const scrapeButton = document.getElementById('scrapeButton');
  scrapeButton.addEventListener('click', function(e) {
    scrapeArticles();
  }, false);
  $(document).on('click', '.save', function(e) {
    saveArticle($(e.target).attr('data-id'));
  });
}