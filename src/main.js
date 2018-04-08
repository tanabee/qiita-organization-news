var config = getConfig();

// 実行関数
function main() {
  var posts = fetchPosts();
  var filteredPosts = filterNewPosts(posts);
  if (filteredPosts.length === 0) return;
  var message = makeMessage(filteredPosts);
  postSlack(message);
}

// Qiita Organization ページから組織の最新の投稿 20 件を取得
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

// 前回のスクリプト実行以降の投稿のみフィルタ
function filterNewPosts(posts) {
  var key = 'LATEST_POST_PATH';
  var properties = PropertiesService.getScriptProperties();

  var value = properties.getProperty(key);
  properties.setProperty(key, posts[0].url);
  if (!value) return posts;

  var index = posts.map(function (post) { return post.url; }).indexOf(value);
  if (index === 0) return [];

  var sliceNumber = index === -1 ? posts.length-1 : index;
  return posts.slice(0, sliceNumber);
}

// Slack に投稿するメッセージ生成
function makeMessage(posts) {
  return '皆で応援しましょう :tada: \n' + posts.map(function (post) {
    return post.user + ' さんが 「' + post.title+ '」 を投稿しました！\nhttps://qiita.com' + post.url;
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
