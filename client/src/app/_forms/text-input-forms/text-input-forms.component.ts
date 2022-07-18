import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input-forms',
  templateUrl: './text-input-forms.component.html',
  styleUrls: ['./text-input-forms.component.css']
})
export class TextInputFormsComponent implements ControlValueAccessor {
  @Input () label: string;
  @Input () type: 'text';



  constructor(@Self() public ngControl: NgControl) { 
    this.ngControl.valueAccessor = this;
  }
  
  writeValue(obj: any): void {
    
  }
  registerOnChange(fn: any): void {
    
  }
  registerOnTouched(fn: any): void {
    
  }
  setDisabledState?(isDisabled: boolean): void {
    
  }
}
