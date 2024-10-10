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
  parent: string | number;
  label: string;
  value: string | number;
  Filhas: ComboCategoria[] = []; // Inicialize as Filhas como array vazio

  constructor(private _categoria: ICategoria, pai: string | number) {
    this.label = _categoria.Nome;
    this.value = _categoria.Id;
    this.parent = pai;

    if (_categoria.SubCategorias && _categoria.SubCategorias.length > 0) {
      _categoria.SubCategorias.forEach(s => {

        const fake: ICategoria = { Id: s.Id, Nome: s.Nome, SubCategorias: [] };

        this.Filhas.push(new ComboCategoria(fake, _categoria.Id));
      });
    }
  }
}