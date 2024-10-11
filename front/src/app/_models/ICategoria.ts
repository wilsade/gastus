import { PoSelectOption } from '@po-ui/ng-components';

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

export class ComboCategoria implements PoSelectOption {
  label: string;
  value: string | number;
  Filhas: PoSelectOption[] = []; // Inicialize as Filhas como array vazio

  constructor(categoria: ICategoria) {
    this.label = categoria.Nome;
    this.value = categoria.Id;

    if (categoria.SubCategorias && categoria.SubCategorias.length > 0) {
      categoria.SubCategorias.forEach(s => {
        const filha: PoSelectOption = { value: s.Id, label: s.Nome };
        this.Filhas.push(filha);
      });
    }
  }
}