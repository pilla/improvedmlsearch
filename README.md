# improvedmlsearch
Programas para realizar buscas avançadas no Mercado Livre (por exemplo, procurar produtos de apenas um vendedor)

## Requerimentos:

O programa foi escrito em Node.js. Além disto, necessita das bibliotecas:

* <a href="https://github.com/cheeriojs/cheerio">cheerio</a>
* <a href="https://github.com/request/request">request</a>

Ambas podem ser instaladas usando npm.

## Uso:

nodejs mlvendor.js custid regexp arquivo,

Onde:

* custid é o identificador do vendedor (um número que pode ser obtido na url da página de produtos vendidos, após _CustId_)
* regexp é a expressão pela qual se está buscando nos anúncios
* arquivo é o nome do arquivo de saída



