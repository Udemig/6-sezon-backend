// API : Gelen istekkeri izler ve isteklere cevap gönderirir.

// gerekli modülleri çağırdık
const http = require("http");

/*
* createServer (), verdiğimiz dinleyiciyi fonksiyona her geldiğinde tetikler.
* Bu fonksiyon 2 parametre alır.
* 1) request > istek ile alakalı verileri içeren nesne.
* 2) response > cevap göndermemmizi sağlayacak nesne.


* Bu foksiyon içeriisnde gelen isteğe göre cevap gönderilir.


*/

//http.createServer fonk. bir HTTP sunucusu oluşturur.

const server = http.createServer((request, response) => {
  console.log("😀 API'YE İSTEK GELDİ .");

  //gelen isteğin detaylarını konsola yazdır.
  console.log(request.method + " isteği geldi"); //GET isteği geldi

  response.end("😄 SERVER TARAFINDAN SELAMLAR.");
});

// Bir dinleyici oluşturup hangi porta gelen isteklerin dinleneceğini söylemeliyiz.

server.listen(1616, "127.0.0.1", () => {
  console.log("IP adresinin 1616 portuna gelen istekler dinlenmeye alındı.");
});
