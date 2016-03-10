var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');

// Um parâmetro, nome do usuário

if (process.argv.length<3){
  console.log('Uso: node ' + process.argv[1] + ' usuario');
  process.exit(0);
}

var usuario = process.argv[2];

getCustId(usuario);

function getCustId(user){
  request({
      method: 'GET',
      url: 'http://perfil.mercadolivre.com.br/'+user.toUpperCase()
  }, function(err, response, body) {
      if (err) return console.error(err);

      $ = cheerio.load(body);

      $('a').each(function(i, item){
        // console.log($(this).attr('href'));
        var href = $(this).attr('href');

        var match = href.match('_CustId_');
        if (match){
          var custId = href.replace('*_*_','');
          console.log(custId);
        }

      });
      // $('div.ch-carousel-box').find($('a')).each(function(i, item){
      //   var all = $(item);
      //   console.log(all.html());
      //
      // });
  });
}
