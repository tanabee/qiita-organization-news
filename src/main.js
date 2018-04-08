var config = getConfig();

function main() {
  var posts = fetchPosts();
  var message = makeMessage(posts);
  postSlack(message);
}

function fetchPosts() {
  var url  = 'https://qiita.com/organizations/' + config.organization + '/activities',
      html = UrlFetchApp.fetch(url).getContentText(),
      htmlFiltered = find(html, '<div class="tableList">', '<ul class="pagination">'),
      posts = htmlFiltered
        .split('</article>')
        .filter(function (article) {
          return find(article, '<div class="ItemLink__info"><a href="/', '">') !== '';
        })
        .map(function (article) {
          var elem = find(article, '<div class="ItemLink__title"><a class="u-link-no-underline" href="', '</a>');
          var elems = elem.split('">');
          return {
            user  : find(article, '<div class="ItemLink__info"><a href="/', '">'),
            url   : elems[0],
            title : elems[1]
          };
        });

  return posts;
}

function makeMessage(posts) {
  return posts.map(function (post) {
    return post.user + ' が `' + post.title+ '` を投稿しました！\nhttps://qiita.com' + post.url;
  }).join('\n');
}

// Slack に POST
function postSlack(message) {
  var body = { text: message };
  var payload = JSON.stringify(body);
  var res = UrlFetchApp.fetch(config.webHookUrl, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    payload: payload
  });
}
