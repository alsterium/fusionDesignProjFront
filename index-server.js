/**
 * 自己署名証明書 (オレオレ証明書) サーバを作成する
 */

const https = require('https');
const fs    = require('fs');
const statics = require('node-static');
const st = new(statics.Server)('./')

// 証明書のファイルを指定する
// const options = { 
//   key: fs.readFileSync('orekey.pem'),
//   cert: fs.readFileSync('orecert.pem')
// };

// サーバーのホストアドレスを決める
const host = '127.0.0.1';
// サーバのポートを好きに決める
const port = 3000;
 
// サーバを立てる
https.createServer({pfx:fs.readFileSync('mysslserver.pfx')}, (req, res) => {
//   console.log('リクエストを受信しました');
//   // レスポンスの HTTP コード
//   res.writeHead(200);
//   // レスポンスデータを指定する。この場合ブラウザに「Hello World!」が表示される
//   res.end('Hello World!');
st.serve(req,res);

}).listen(port);
 
console.log(`Self-Signed Certificate Server is running : https://localhost:${port}/`);