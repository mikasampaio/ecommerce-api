Produtos
    - Nome - name
    - Preco - price
    - Categoria - category
    - Descrição - description
    - Opções de tamanho - size
    - Foto do produto - path
    - Cores - color
    - Estoque (quantity)
    - Oferta - discount

Pedidos
    - products [{
        product: id,
        quantity: number,
        size: string,
        color: string
    }, {
        product: id,
        quantity: number,
        size: string,
        color: string
    }]
    - Endereço


Features
    [ ] - Criar função de 'NÃO AUTORIZADO' em rotas que devem ser utilizadas somente pelo ADMIN