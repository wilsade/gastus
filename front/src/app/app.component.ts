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
    { label: 'Categorias', shortLabel: 'Cat.', icon: 'ph ph-browsers', link: `./${NomesRotas.CATEGORIAS}` },
    { label: 'Tipos de transação', shortLabel: 'Trans.', icon: 'ph ph-credit-card', link: `./${NomesRotas.TIPOS_TRANSACAO}` },
    { label: 'Lançamentos', shortLabel: 'Lanc.', icon: 'ph ph-cash-register', link: `./${NomesRotas.LANCAMENTOS}` },
  ];
}
