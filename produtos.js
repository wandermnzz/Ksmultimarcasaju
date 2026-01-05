fetch('produtos.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('lista-produtos').innerHTML = html;
  });
