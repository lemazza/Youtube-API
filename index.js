const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

function renderResult(item) {
  return `
    <div class="search-result-thumbnail">
      <h2 class="vid-title">${item.snippet.title}</h2>
      <a href="https://www.youtube.com/watch?v=${item.id.videoId}"><img alt="Play video: ${item.snippet.title}" src="${item.snippet.thumbnails.medium.url}"></a>
      <a href="https://www.youtube.com/channel/${item.snippet.channelId}">More from ${item.snippet.channelTitle}</a>
    </div>
  `;
}

function displayTotalResults(num) {
  return `
  <h2 class="resultsTotal" aria-live="assertive"> ${num} Total Results</h2>`
}

function displaySearchResults(data) {
  console.log(JSON.stringify(data));
  const results = data.items.map(renderResult);
  const numResults = data.pageInfo.totalResults;
  $('.js-search-results').prop('hidden',false).html(displayTotalResults(numResults)).append(results);
}



function getDataFromAPI(searchTerm, callback) {
  const query = {
    q: searchTerm,
    part: 'snippet',
    key: "AIzaSyClprMiWtvCfmK4KKs5muX1SiaHEGDiKH8"
  };
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}


//onsubmit function to take in search query
function watchSubmit() {
  $('.js-search-form').submit(event => {
  event.preventDefault();
  const queryTarget = $(event.currentTarget).find('#js-query');
  const query = queryTarget.val();
  queryTarget.val("");
  getDataFromAPI(query,displaySearchResults);
});
}

$(watchSubmit);