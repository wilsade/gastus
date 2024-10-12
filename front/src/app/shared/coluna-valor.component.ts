import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { StrUtils } from './str-utils';

@Component({
  selector: 'app-coluna-valor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coluna-valor.component.html'
})
export class ColunaValorComponent {

  @Input()
  valor: number;

  protected formatValue(item: number): string {
    return StrUtils.formatValue(item);
  }
}
