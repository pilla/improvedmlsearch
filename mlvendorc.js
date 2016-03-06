var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

// Três parâmetros, CustId,  regexp e arquivo de saída

if (process.argv.length<5){
  console.log('Uso: node ' + process.argv[1] + ' CustId regexp saida');
  process.exit(0);
}

var custid = process.argv[2];
var regexp = process.argv[3];
var arquivo = process.argv[4];


var stream = fs.createWriteStream(arquivo);

stream.on('error', function(error){
  console.error(error);
});

stream.once('open', function(fd) {
  var html = '<html><header>Resultados da busca por ' + custid + ' ' + regexp +
              '</header> \n <body>\n';
  stream.cork();
  while(!stream.write(html));
  // Começa com a raiz daquele vendedor, chama recursivamente para as próximas páginas
  getPages('http://lista.mercadolivre.com.br/_CustId_'+custid, stream);

  stream.write('</body>');
  // .end aqui criava problema de escrita após o fim
});

function getPages(url, stream){
  request({
      method: 'GET',
      url: url
  }, function(err, response, body) {
      if (err) return console.error(err);

      $ = cheerio.load(body);

      // pega os produtos desta página e busca pela expressão
      $('.list-view-item-title').each(function(i, item){
        var all = $(item);
        var texto = all.text();
        var match = texto.match(regexp);

        if (match){
          $('a',$(this)).each(function(){
            var href = $(this).attr('href');
            if (href.length>2){
              stream.write(all.html());
              stream.write('\n');
              console.log(href);
            }
          });
        }
      });
      // Vê quais são as próximas páginas e busca, se ainda não foram buscadas
      $('a.prefetch').each(function(){
        var href = $(this).attr('href');
        //
        // console.log("++ "+ href);

        getPages(href, stream);

      });



  });
}
