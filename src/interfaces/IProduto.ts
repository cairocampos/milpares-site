/* eslint-disable camelcase */
export interface IProdutoPrecificacao {
  clube_desconto_ativo: number;
  bonus_revenda: number;
  preco_custo:number;
  percentual_loja: number;
  percentual_franqueado: number;
  percentual_revendedor: number;
  percentual_promocional: number;
  percentual_clube_desconto: number;
}

export interface IProdutoImagem {
  id:number;
  path:string;
  principal:boolean;
}

export interface IProdutoGrade {
  cor_id:number;
  tamanho: string;
  quantidade:number;
}

export interface IProdutoDados {
  id?:number;
  nome:string;
  descricao:string;
  categoria_id:number;
  subcategoria_id:number;
  fornecedor_id:number;
  imagens?: IProdutoImagem[],
  grades?: IProdutoGrade[]
  imagem_principal?: {
    path:string;
  }
}

export interface IProdutoCatalogo extends IProdutoPrecificacao{
  id?:number;
  nome:string;
  descricao:string;
  categoria_id:number;
  subcategoria_id:number;
  fornecedor_id:number;
  imagens?: IProdutoImagem[],
  grades?: IProdutoGrade[]
  imagem_principal?: {
    path:string;
  },
  cores: {nome:string;hexadecimal:string;id?:number}[];
  codigo?:string;
  preco_loja:string;
  preco_promocional:string;
}

export interface IProduto extends IProdutoPrecificacao, IProdutoDados {
  codigo?:string;
}
