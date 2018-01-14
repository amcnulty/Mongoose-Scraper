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
      }
    }
    xhr.send();
  }
  const scrapeButton = document.getElementById('scrapeButton');
  scrapeButton.addEventListener('click', function(e) {
    scrapeArticles();
  }, false);
}