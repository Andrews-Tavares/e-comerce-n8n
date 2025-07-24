
import { obterProdutosDoCarrinho } from "./carrinhoService.js";

export async function calcularFrete(cep, botaoFrete) {
    botaoFrete.disabled = true;
    const textoOriginalBotao = botaoFrete.textContent;
    botaoFrete.textContent = "Calculando frete...";

    const urlFrete = "https://andrewsmelo.app.n8n.cloud/webhook/cc5522be-ee2a-4fa7-985a-5f461cc8e5d0";
    try {
        const respostaMedidas = await fetch('./js/medidas-produtos.json');
        const listaMedidas = await respostaMedidas.json();
        const itensCarrinho = obterProdutosDoCarrinho();
        const produtosParaFrete = itensCarrinho.map(item => {
            const medida = listaMedidas.find(m => m.id === item.id);
            return {
                quantity: item.quantidade,
                height: medida?.height ?? 4,
                length: medida?.length ?? 30,
                width: medida?.width ?? 25,
                weight: medida?.weight ?? 0.25
            };
        });

        const resposta = await fetch(urlFrete, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ cep, products: produtosParaFrete }),
        });
        if (!resposta.ok) throw new Error("Erro ao calcular frete");
        const resultado = await resposta.json();
        return resultado.price;
    } catch (erro) {
        console.error("Erro ao calcular frete:", erro);
        return null;
    } finally {
        botaoFrete.disabled = false;
        botaoFrete.textContent = textoOriginalBotao;
    }
}
