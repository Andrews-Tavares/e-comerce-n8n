
import { obterProdutosDoCarrinho, salvarProdutosNoCarrinho, atualizarCarrinhoETabela, removerProdutoDoCarrinho } from "./services/carrinhoService.js";
import { calcularFrete } from "./services/freteService.js";

const tabelaCarrinho = document.querySelector("#modal-1-content table tbody");

tabelaCarrinho.addEventListener("click", (evento) => {
	const botaoRemover = evento.target;
	if (botaoRemover.classList.contains("btn-remover")) {
		const produtoId = botaoRemover.dataset.id;
		removerProdutoDoCarrinho(produtoId);
	}
});

tabelaCarrinho.addEventListener("input", (evento) => {
	const campoQuantidade = evento.target;
	if (campoQuantidade.classList.contains("input-quantidade")) {
		const produtoId = campoQuantidade.dataset.id;
		let quantidadeAtualizada = parseInt(campoQuantidade.value, 10);
		if (isNaN(quantidadeAtualizada) || quantidadeAtualizada < 1) {
			quantidadeAtualizada = 1;
			campoQuantidade.value = 1;
		}
		const carrinho = obterProdutosDoCarrinho();
		const produto = carrinho.find(item => item.id === produtoId);
		if (produto && produto.quantidade !== quantidadeAtualizada) {
			produto.quantidade = quantidadeAtualizada;
			salvarProdutosNoCarrinho(carrinho);
			atualizarCarrinhoETabela();
		}
	}
});

const botaoCalcularFrete = document.getElementById("btn-calcular-frete");
const campoCep = document.getElementById("input-cep");

campoCep.addEventListener("keydown", (evento) => {
	if (evento.key === "Enter") {
		botaoCalcularFrete.click();
	}
});

botaoCalcularFrete.addEventListener("click", async () => {
	const cep = campoCep.value.trim();
	const mensagemErro = document.querySelector(".erro");
	if (!validarCep(cep)) {
		mensagemErro.textContent = "CEP inválido.";
		mensagemErro.style.display = "block";
		return;
	} else {
		mensagemErro.style.display = "none";
	}

	const frete = await calcularFrete(cep, botaoCalcularFrete);
	const freteFormatado = frete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
	document.querySelector("#valor-frete .valor").textContent = freteFormatado;
	document.querySelector("#valor-frete").style.display = "flex";

	const elementoTotalCarrinho = document.querySelector("#total-carrinho");
	const valorTotalCarrinho = parseFloat(
		elementoTotalCarrinho.textContent
			.replace("Total: R$ ", "")
			.replace('.', ',')
			.replace(',', '.')
	);

	const totalComFrete = valorTotalCarrinho + frete;
	const totalComFreteFormatado = totalComFrete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
	elementoTotalCarrinho.textContent = `Total: R$ ${totalComFreteFormatado}`;
});

function validarCep(cep) {
	const padraoCep = /^[0-9]{5}-?[0-9]{3}$/;
	return padraoCep.test(cep);
}