const http = require("http");
const getRequest = require("./methods/get");
const postRequest = require("./methods/post");
const deleteRequest = require("./methods/delete");

//1) server oluştur
const server = http.createServer((req, res) => {
  console.log("🥵 istek geldi", req.method);

  //gelen isteğin. method türüne göre clienta farklı cevaplar gönderelim
  //kod kalabalığı olmaması için isteklere cevap gönderen fonksiyonları ayrı dosyalarda tanımladık.
  switch (req.method) {
    case "GET":
      return getRequest(req, res);

    case "POST":
      return postRequest(req, res);

    case "DELETE":
      return deleteRequest(req, res);

    default:
      //cevabın durum kodunu belirle
      res.statusCode = 404;

      //cevaba gönderilecek içeriğin tipini header olarak ekle
      res.setHeader("content-type", "application/json");

      //cevabın içeriğini belirle
      res.write(JSON.stringify({ message: "İstek adresi tanımsız" }));

      //cevabı clienta gönder
      return res.end();
  }
});

// belirl, bir porta gelen istekleri dinle

const port = 4090;

server.listen(port, () => {
  console.log(`🥵 server ${port}' gelen istekleri dinlemeye başladı.`);
});
