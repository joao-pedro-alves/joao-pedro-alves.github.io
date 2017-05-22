---
 layout: post
 title: "Sessões não funcionando: pode ser mais simples do que você pensa!"
 date: 2017-05-21 21:34:00 -0300
 categories: laravel
---

Navegando pela web um dos erros mais comuns que você encontra relacionado a Laravel é o famoso: `sessions doesnt work` ou para o bom português `a porra da session está bugada!` 

Eu mesmo já fui vítima desse problema. Nesse pequeno artigo estarei listando as duas **principais** causas desse problema.

## Necessário usar o middleware *web* (apenas laravel 5.2+)
Na versão 5.2+ do laravel é necessário utilizar o middleware **web** em suas rotas para utilizar sessions.

{% highlight php linenos %}
<?php
Route::post('/', 'UsersController@dashboard')->middleware('web');
Route::post('/login', 'UsersController@login')->middleware('web');
{% endhighlight %}

Ou

{% highlight php linenos %}
<?php
Route::group(['middleware' => ['web']], function() {	
	Route::get('/', 'UsersController@dashboard');
	Route::post('/login', 'UsersController@login');
}
{% endhighlight %}


## Existe um erro na criação da session
Esse problema pode passar despercebido. Se acontecer um erro ao utilizar um método da session (como o **put**) a mensagem de erro pode não aparecer na página e apenas ficar disponível no **log (app/storage/logs)**.

Um exemplo: se você tentar armazenar um objeto não permitido pela função [serialize (que é utilizada intermente pelo laravel)](http://php.net/manual/en/function.serialize.php) ocorrerá um erro que **só será mostrado no log**. O erro será algo como:

> local.ERROR: Exception: Serialization of 'Symfony\Component\HttpFoundation\File\UploadedFile' is not allowed in ... 

Nesse caso eu estarei tentando armazenar todos os dados de um request dentro de uma session levando em conta que um dos campos é do tipo *file*, ou seja, um carregamento de arquivo.

{% highlight php linenos %}
<?php
$request->session()->put('foo', $request->all());
{% endhighlight %}

Sendo um pouco mais técnico, o Laravel converte para objeto do tipo *UploadedFile* todo o campo *file* enviado por requisição para melhor manuseio internamento. Pois bem, você não pode salvar esse objeto 

A solução varia da sua necessidade. A solução mais rápida é simplesmente remover do array de armazenamento o índice que contem o objeto que não é permitido.

---

O segredo é: **`na dúvida sempre olhe os logs!`**

---

Essa é a dica de hoje! Até a próxima!