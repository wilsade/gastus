export class ICategoria {
  Id: number;
  Nome: string;
  SubCategorias: ISubCategoria[] = [];
}

export class ISubCategoria {
  IdCategoria: number;
  Id: number;
  Nome: string;
}