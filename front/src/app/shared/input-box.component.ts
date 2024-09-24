import { Component, CUSTOM_ELEMENTS_SCHEMA, input, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PoModalAction, PoModalComponent, PoModule } from '@po-ui/ng-components';

@Component({
  selector: 'app-input-box',
  standalone: true,
  imports: [PoModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './input-box.component.html'
})
export class InputBoxComponent {

  @Input()
  rotulo: string = "Informe o nome:"

  @Input()
  valor: string;

  @ViewChild('modal')
  modal: PoModalComponent

  protected confirmou: PoModalAction = {
    label: 'OK',
    disabled: true,
    action: () => {
      console.log('input box ok');
      this.modal.close();
    }
  }

  protected cancelou: PoModalAction = {
    label: 'Cancelar',
    action: () => {
      console.log('input box cancelado');
      this.modal.close();
    }
  }

  showInputBox(): void {
    this.modal.open();
  }

  protected alterouNome(): void {
    this.confirmou.disabled = this.valor == undefined || this.valor == ''
  }
}
