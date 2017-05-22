---
layout: post
title: "Página de erro customizada com controller"
date: 2017-05-22 20:06:00 -0300
categories: laravel
---

O Laravel permite você de forma rápida criar páginas *estáticas* de erro, como por exemplo para erros 500 e 404, porém essa abordagem funciona bem quando você apenas precisa por um conteúdo **estático**. Como proceder em um caso que é necessário que um **controller** seja chamado em uma dessas páginas de erro?

Para esses casos, primeiramente é necessário criar uma rota que será o end-point para sua página de erro. Podemos criar uma simples rota como:

**Rota**
{% highlight php linenos %}
<?php
Route::get('/pagina-nao-encontrada', 'PagesController@error')->name('404');
{% endhighlight %}

E então um controller para a mesma:

**Controller (PagesController)**
{% highlight php linenos %}
<?php
...
public function error(Request $request)
{
	return 'Minha página de erro com controller'; 
}
{% endhighlight %}

Pronto. Com isso temos uma rota para nossa página de erro e um controller para ela. Até esse ponto é apenas uma rota comum. Agora faremos a mágica acontecer. Iremos dizer ao Laravel que sempre que ocorrer um erro o usuário deverá ser redirecionado para essa rota.

No arquivo `app/exceptions/handler.php` vamos procurar o método `render` e muda-lo para algo como:

{% highlight php linenos %}
<?php
...
public function render($request, Exception $e)
{
    if (!config('app.debug')) {
        return redirect()->route('404');
    }
    return parent::render($request, $e);
}
{% endhighlight %}

E a partir daí **todos** os erros que ocorrerem no Laravel fará o usuário ser redirecionado para nossa rota de erro. Lembrando que no código acima isso **só ocorrerá se o *debug* estiver como FALSE**

> Vale lembrar que a abordagem acima vai redirecionar o usuário **independente do erro que ocorra**.

---

Também é possível condicionar esse comportamento a uma lista de erros específicos, como por exemplo o 500 e o 404. Por exemplo:

{% highlight php linenos %}
<?php
...
public function render($request, Exception $e)
{
    if (!config('app.debug') && in_array($e->getCode(), [404, 500])) {
        return redirect()->route('404');
    }
    return parent::render($request, $e);
}
{% endhighlight %}

---

Essa é a dica de hoje! Até a próxima ;)