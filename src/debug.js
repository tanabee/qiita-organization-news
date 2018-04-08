function updateUnread() {
  var key = 'LATEST_POST_PATH';
  var properties = PropertiesService.getScriptProperties();
  properties.setProperty(key, '/tanabee/items/2c51681396fe12b6a0e4');
}

function resetUnread() {
  var key = 'LATEST_POST_PATH';
  var properties = PropertiesService.getScriptProperties();
  properties.deleteProperty(key);
}
