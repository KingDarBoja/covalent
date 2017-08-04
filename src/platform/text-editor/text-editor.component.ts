import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, ViewChild,
         ElementRef, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as SimpleMDECss from 'simplemde/dist/simplemde.min.css';
import * as SimpleMDE from 'simplemde';
// Have to use require here as ng test won't work with import and external modules
// see https://github.com/angular/angular-cli/issues/5651
/* tslint:disable-next-line */
// let SimpleMDE: any = require('simplemde');

const noop: any = () => {
  // empty method
};

@Component({
  selector: 'td-text-editor',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './text-editor.component.html',
  styles: [ SimpleMDECss ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TdTextEditorComponent),
    multi: true,
  }],
})
export class TdTextEditorComponent implements AfterViewInit, ControlValueAccessor {

  private _value: string = '';
  private _simpleMDE: any;

  @ViewChild('simplemde') textarea: ElementRef;

  /**
   * Set if using Electron mode when object is created
   */
  constructor(private elementRef: ElementRef) {}

  /* tslint:disable-next-line */
  propagateChange = (_: any) => {};
  onTouched = () => noop;

  /**
   * value?: string
   * Value in the Editor after async getEditorContent was called
   */
  @Input('value')
  set value(value: string) {
    this._simpleMDE.value(value);
  }

  get value(): string {
      return this._simpleMDE.value();
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngAfterViewInit(): void {
    this._simpleMDE = new SimpleMDE({ element: this.elementRef.nativeElement.value });
  }
}
