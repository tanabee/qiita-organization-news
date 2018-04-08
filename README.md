## What's this?

Qiita の特定の Organization の投稿を監視し、新着の投稿があった時に Slack に投稿する Google Apps Script 用のスクリプトです。

## Usage

### 1. Clone

```
$ git clone https://github.com/tanabee/qiita-organization-news.git
```

### 2. 設定ファイル用意

1. 以下のコードを src/config.js に貼り付け
2. organization に https://qiita.com/organizations/[here]/ をセット
3. webHookUrl に Slack の incoming webhook URL をセット

```JavaScript:src/config.js
function getConfig() {
  return {
    organization: '',
    webHookUrl: ''
  };
}
```

### 3. Google Apps Script にアップロード

clasp などを利用して Google Apps Script にアップロード

### 4. トリガー設定

適当なタイミングで呼び出すように Google Apps Script のトリガーをセット
