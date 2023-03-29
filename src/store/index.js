import {createStore} from "vuex";

export default createStore({
    state: {
        carrinho: [],
        produtos: [],
        visualizacaoCarrinho: false,
    },
    mutations: {
        addAoCarrinho(state, data) {
            const itemExistente = state.carrinho.find(item => item.id === data.id);
            if (itemExistente) {
                itemExistente.quantidade++;
            } else {
                data.quantidade = 1;
                state.carrinho.push(data);
            }
        },
        removerItemDoCarrinho(state, data) {
            const index = state.carrinho.findIndex(item => item.id === data.id);
            if (index !== -1 && state.carrinho[index].quantidade > 1) {
                state.carrinho[index].quantidade--;
            } else {
                state.carrinho.splice(index, 1);
            }
        },
        LimparItemDoCarrinho(state, data) {
            const index = state.carrinho.findIndex(item => item.id === data.id);
            if (index !== -1) {
                state.carrinho.splice(index, 1);
            }
        },
        verCarrinho(state) {
            state.visualizacaoCarrinho = !state.visualizacaoCarrinho;
            return state.visualizacaoCarrinho
        },

        guardarProdutos(state,data){
            state.produtos = data.concat(data)
        }
    },
    getters: {
        calculaTotal(state) {
            const valorTotal = state.carrinho.reduce((total, item) => total + item.price * item.quantidade, 0);
            return valorTotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            });
        },
        listarCarrinho(state){
            return state.carrinho
        }
    },
    actions: {}
})