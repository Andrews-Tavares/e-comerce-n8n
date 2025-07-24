# Projeto E-commerce

Este é um projeto de e-commerce simples, desenvolvido com HTML, CSS e JavaScript puro, seguindo princípios de código limpo e boas práticas. O objetivo é simular uma loja virtual com funcionalidades essenciais de exibição de produtos e carrinho de compras.

## Funcionalidades
- Listagem de produtos dinâmicos
- Adição, remoção e alteração de quantidade de produtos no carrinho
- Cálculo de frete por CEP (simulado via API)
- Modal do carrinho de compras
- Menu responsivo
- Layout responsivo para diferentes dispositivos

## Estrutura do Projeto
```
index.html
assets/
  images/                # Imagens dos produtos e ícones
css/
  base.css               # Estilos base
  cabecalho.css          # Estilos do cabeçalho
  modal-carrinho.css     # Estilos do modal do carrinho
  produtos.css           # Estilos dos produtos
  reset.css              # Reset de estilos
  rodape.css             # Estilos do rodapé
js/
  carrinho.js            # Lógica do carrinho de compras e integração com UI
  services/
    carrinhoService.js   # Funções de manipulação do carrinho (adicionar, remover, salvar, etc)
    freteService.js      # Função para cálculo de frete
  medidas-produtos.json  # Dados de medidas dos produtos
  menu.js                # Lógica do menu responsivo
  modal.js               # Lógica do modal do carrinho
```

## Principais Funções JS
- `obterProdutosDoCarrinho`, `salvarProdutosNoCarrinho`, `removerProdutoDoCarrinho`, `atualizarCarrinhoETabela`: gerenciamento do carrinho
- `calcularFrete`: cálculo de frete simulando integração com API


## Contribuição
Sugestões, melhorias e correções são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Imagens e Créditos
As imagens utilizadas são meramente ilustrativas.

---

Desenvolvido por Andrews Tavares.
