

const botoesAdicionarAoCarrinho = document.querySelectorAll(".adicionar-ao-carrinho");

botoesAdicionarAoCarrinho.forEach(botao => {
	botao.addEventListener("click", evento => {
		const elementoProduto = evento.target.closest(".produto");
		const id = elementoProduto.dataset.id;
		const nome = elementoProduto.querySelector(".nome").textContent;
		const imagem = elementoProduto.querySelector("img").getAttribute("src");
		const preco = parseFloat(
			elementoProduto.querySelector(".preco").textContent
				.replace("R$ ", "")
				.replace(".", "")
				.replace(",", ".")
		);
		const carrinho = obterProdutosDoCarrinho();
		const produtoExistente = carrinho.find(item => item.id === id);
		if (produtoExistente) {
			produtoExistente.quantidade += 1;
		} else {
			carrinho.push({
				id,
				nome,
				imagem,
				preco,
				quantidade: 1,
			});
		}
		salvarProdutosNoCarrinho(carrinho);
		atualizarCarrinhoETabela();
	});
});

export function salvarProdutosNoCarrinho(listaCarrinho) {
	localStorage.setItem("carrinho", JSON.stringify(listaCarrinho));
}

export function obterProdutosDoCarrinho() {
	const carrinhoArmazenado = localStorage.getItem("carrinho");
	return carrinhoArmazenado ? JSON.parse(carrinhoArmazenado) : [];
}

function atualizarContadorCarrinho() {
	const carrinhoContador = obterProdutosDoCarrinho();
	const totalItens = carrinhoContador.reduce((total, item) => total + item.quantidade, 0);
	document.getElementById("contador-carrinho").textContent = totalItens;
}

function renderizarTabelaDoCarrinho() {
	const carrinhoTabela = obterProdutosDoCarrinho();
	const corpoTabela = document.querySelector("#modal-1-content table tbody");

	corpoTabela.innerHTML = carrinhoTabela.map(item => `
		<tr>
			<td class="td-produto">
				<img src="${item.imagem}" alt="${item.nome}" />
			</td>
			<td>${item.nome}</td>
			<td class="td-preco-unitario">R$ ${item.preco.toFixed(2).replace('.', ',')}</td>
			<td class="td-quantidade">
				<input type="number" class="input-quantidade" data-id="${item.id}" value="${item.quantidade}" min="1" />
			</td>
			<td class="td-preco-total">R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</td>
			<td><button class="btn-remover" data-id="${item.id}" id="deletar"></button></td>
		</tr>
	`).join("");
}

export function removerProdutoDoCarrinho(id) {
	const carrinhoRemovido = obterProdutosDoCarrinho().filter(item => item.id !== id);
	salvarProdutosNoCarrinho(carrinhoRemovido);
	atualizarCarrinhoETabela();
}

function atualizarValorTotalCarrinho() {
	const carrinhoValor = obterProdutosDoCarrinho();
	const total = carrinhoValor.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
	document.querySelector("#total-carrinho").textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
	document.querySelector("#subtotal-pedidos .valor").textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

export function atualizarCarrinhoETabela() {
	atualizarContadorCarrinho();
	renderizarTabelaDoCarrinho();
	atualizarValorTotalCarrinho();
}