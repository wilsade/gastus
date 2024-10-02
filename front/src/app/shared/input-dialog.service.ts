import { ComponentRef, Injectable } from "@angular/core";
import { PoComponentInjectorService, PoDialogService } from "@po-ui/ng-components";
import { InputDialogComponent } from "./input-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class InputDialogService extends PoDialogService {

  constructor(private readonly _componentInjector: PoComponentInjectorService) {
    super(_componentInjector);
  }

  showInput(options: IInputDialogOptions): void {
    const componentRef: ComponentRef<any> = this._componentInjector.createComponentInApplication(InputDialogComponent);
    componentRef.changeDetectorRef.detectChanges();
    componentRef.instance.open(options);
  }
}

export interface IInputDialogOptions {
  onConfirm: (input: string) => void;
  title?: string;
  label?: string;
  valor?: string;
  onCancel?: () => void;
}