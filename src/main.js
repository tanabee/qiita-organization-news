function main() {
  var posts = fetchPosts();

  console.log(posts);
}

function fetchPosts() {
  var url  = 'https://qiita.com/organizations/globis/activities',
      html = UrlFetchApp.fetch(url).getContentText(),
      htmlFiltered = find(html, '<div class="tableList">', '<ul class="pagination">'),
      posts = htmlFiltered
        .split('</article>')
        .filter(function (article) {
          return find(article, '<div class="ItemLink__info"><a href="/', '">') !== '';
        })
        .map(function (article) {
          return {
            user : find(article, '<div class="ItemLink__info"><a href="/', '">'),
            url  : find(article, '<article class="media ItemLink" data-item-url="', '"')
          };
        });

  return posts;
}
