import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { PoModalAction, PoModalComponent, PoModule } from '@po-ui/ng-components';
import { FormsModule } from '@angular/forms';
import { IInputDialogOptions } from './input-dialog.service';

@Component({
  selector: 'input-dialog',
  standalone: true,
  imports: [PoModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './input-dialog.component.html'
})
export class InputDialogComponent {
  protected valor: string;
  protected label = "Digite o valor desejado";
  private _options: IInputDialogOptions;

  @ViewChild('modal')
  protected modal: PoModalComponent;

  protected readonly actionClose: PoModalAction = {
    action: () => {
      this.modal.close();
      if (this._options.onCancel)
        this._options.onCancel();
    },
    label: 'Cancelar'
  };

  protected readonly actionConfirmar: PoModalAction = {
    action: () => {
      this.modal.close();
      this._options.onConfirm(this.valor);
    },
    label: 'OK',
    danger: true,
    disabled: this.isOkdisabled()
  };

  protected isOkdisabled(): boolean {
    return this.valor == undefined || this.valor == '';
  }

  protected alterouValor(): void {
    this.actionConfirmar.disabled = this.isOkdisabled();
  }

  open(options: IInputDialogOptions): void {
    this._options = options;
    if (options.title)
      this.modal.title = options.title;
    if (options.label)
      this.label = options.label;

    this.modal.open();
  }
}
