import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
} from '@po-ui/ng-components';
import { NomesRotas } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PoToolbarModule, PoMenuModule, PoPageModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  readonly menus: Array<PoMenuItem> = [
    { label: 'Categorias', shortLabel: 'Categorias', icon: 'ph ph-browsers', link: `./${NomesRotas.CATEGORIAS}` },
    { label: 'Tipos de transação', shortLabel: 'T. Transação', icon: 'ph ph-credit-card', link: `./${NomesRotas.TIPOS_TRANSACAO}` },
    { label: 'Lançamentos', shortLabel: 'Lançamentos', icon: 'ph ph-cash-register', link: `./${NomesRotas.LANCAMENTOS}` },
    { label: 'Aplicações', shortLabel: 'Aplicações', icon: 'ph ph-bank', link: `./${NomesRotas.APLICACOES}` },
    { label: 'Orçamento', shortLabel: 'Orçamento', icon: 'ph ph-book-open-text', link: `./${NomesRotas.ORCAMENTO}` },
  ];
}
