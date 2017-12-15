---
layout: post
title: "O que é Server-side e Client-Side rendering"
date: 2017-12-15 15:12:00 -0200
categories: web
---
A primeira vez que ouvi o termo "aplicação *server-side rendering*" me fez imaginar uma aplicação que de algum jeito renderizava o conteúdo no servidor, fazendo o trabalho do browser, e enviava de alguma forma o conteúdo renderizado para o browser (foda-se a lógica). Como você pode imagina, não é bem por ai...

## O conceito
Na verdade a palavra **rendering**, nesse caso, não remete a renderização propriamente dita, como por exemplo, uma *div* sendo estilizada. O *rendering* diz respeito a **`obter informações dos elementos da página`**.

Em outras palavras, no **server-side rendering** o servidor é responsável por enviar essas informações direto para o navegador enquanto o **client-side rendering** o próprio client (navegador) monta essa estrutura (normalmente através de *Javascript*). Lets dive into it.

## Server-side rendering
Lembra aquele primeiro site que você fez em *PHP*, que você colocava seu *HTML* dentro da syntax do **PHP** e achava incrível utilizar *ifs* para mostrar o *HTML* que queria? Então, esse é um exemplo clássico de **server-side rendering**

Acompanhe o fluxo de requisição HTTP abaixo:

![HTTP Request Flow](http://betterexplained.com/wp-content/uploads/compression/HTTP_request.png)

Simplificando ainda mais, o seu **navegador** requisita para o **servidor** as **informações da página**. Uma vez processado pelo servidor, ele devolve a resposta para o navegador. Essa resposta geralmente costuma ser nosso **HTML**.

Nesse caso as informações da página (seu conteúdo/elementos) foram disponibilizadas pelo **servidor**, ou seja, ocorreu um **server-side rendering**.

Nessa situação seu navegador ficará em modo de *espera* aguardando uma resposta do servidor, ou seja, você não poderá interagir com a página enquanto o servidor não enviar essa resposta para o navegador.

**PRÓS:**

* Os mecanismos de buscam podem facilmente obter as informações do seu site, sendo melhor para SEO.

* A página inicial tem o carregamento mais rápido.

* Excelente para sites estáticos.

**CONTRAS:**

* Requisições frequentes para o servidor.
* Uma média de renderizações lentas.
* Páginas inteiras recarregadas.
* Uma interação não tão rica com o site.

## Client-Side rendering
Client-side rendering é sobre carregar o conteúdo do site dentro do próprio navegador utilizando **Javascript** então invés de carregar a página inteira cada vez que você mudar de página, com essa abordagem você pode carregar **algumas partes** em específicos.

Em outras palavras, você estará renderizando de forma dinâmica o HTML através do Javascript.

Ainda sim será necessário fazer uma requisição para o servidor para o navegador carregar sua estrutur HTML inicial e seus arquivos Javascript.

Segue um exemplo onde estou utilizando um código em AngularJS (framework Javascript) que é responsável por renderizar o conteúdo do meu site direto no navegador, ou seja, **client-side rendering**:

{% highlight html linenos %}
<!DOCTYPE html>
<html>
<head>
  <title>Clietn-Side rendering</title>
</head>
<body ng-app="app">
  <div root></div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.6/angular.js"></script>
  <script>
    angular.module('app', [])
    .directive('root', function() {
      return {
        restrict: 'A',
        template: '<h1>client-side rendering</h1>'
      } 
    })
  </script>
</body>
</html>
{% endhighlight %}

Será gerado um texto simples como:

![](https://i.imgur.com/yfHc5cB.png)

Como essa renderização está sendo feita no navegador, o site não fica *"travado"* esperando uma resposta do servidor. Enquanto um conteúdo específico carrega, o usuário pode interagir com o mesmo sem problemas.

**Um ponto importante:** uma vez que você estará gerando HTML através do Javascript, os BOTs dos mecanismos de busca não conseguirão identificar seu conteúdo pois ele estará praticamente todo contido em seu arquivo Javascript então é preciso tomar cuidado no que diz respeito a **SEO** nessa abordagem.

**PROS:**

* Uma interação muito mais rica com o site.
* Rápida renderização do site após o carregamento inicial.
* Excelente para aplicações web.
* Uma robusta seleção de bibliotecas em Javascript dão suporte.

**CONTRA:**

* Problemas com SEO caso não seja implementado corretamente.
* O carregamento inicial pode demorar um pouco mais.
* Na grande maioria dos casos será necessário uma biblioteca externa.

Como em quase tudo relacionado a tecnologia não existe **"o melhor"**. Você como desenvolvedor deve usar o bom senso e conhecimento para entender os prós e contras das abordagens e escolher o melhor para sua aplicação.

Até a pŕoxima! **`:P`**