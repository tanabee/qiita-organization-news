/** 
 * 特定の文字列の間に挟まれた文字列を抽出する
 * @param { string } text 検索対象となる文字列
 * @param { string } from 前方の文字列
 * @param { string } to   後方の文字列
 * @return { string } 検索結果
 */
function find(text, from, to) {
  var fromIndex = text.indexOf(from);

  if (fromIndex === -1) return '';

  text = text.substring(fromIndex + from.length);
  var toIndex = text.indexOf(to);

  if (toIndex === -1) return '';

  return text.substring(0, toIndex);
}
