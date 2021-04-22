import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/Auth.service';
import { File } from 'src/app/_models/file';
import { Language } from 'src/app/_models/language';
import { Snippet } from 'src/app/_models/snippet';
import { LangageService } from 'src/app/_services/langage.service';
import { FormComponent } from 'src/app/_templates/form/form.component';

@Component({
  selector: 'app-snippet-new-file',
  templateUrl: './snippet-new-file.component.html',
  styleUrls: ['./snippet-new-file.component.scss']
})
export class SnippetNewFileComponent extends FormComponent {

  // variables
  public langages: Language[];
  public selectedLangages: Language;

  @Input() snippet: Snippet;

  // outputs
  @Output() onCanceled = new EventEmitter<void>();
  @Output() onCreated = new EventEmitter<File | Partial<any>>();

  constructor(
    formBuilder: FormBuilder,
    authService: AuthService,
    private langageService: LangageService
  ) {
    super(formBuilder, authService);
    super.formCheckout = this.formBuilder.group({
      fileName: new FormControl('', [
        Validators.required
      ]),
      langage: new FormControl('', [
        Validators.required
      ])
    });
    this.getLangages();
  }

  /**
   * get all langages
   */
  private getLangages(): void {
    this.langageService.getAll<Language>().subscribe(l => {
        console.log(l);
        this.langages = l;
    }, err => { 
      console.log(err);
    });
  }

  public submit(): void {
    let file: any = {
      Language: this.getLangage().value,
      FileName: this.getFileName().value,
      LanguageId: this.getLangage().value.Id,
      SnippetId: this?.snippet.Id,
      Ext: this.getLangage().value.Extension
    };

    this.onCreated.emit(file);

    // reset all fields
    this.resetFields();
  }

  public cancel(): void {
    this.resetFields();
    this.onCanceled.emit();
  }

  public getFileName(): AbstractControl | null {
    return this.formCheckout.get('fileName');
  }

  public getLangage(): AbstractControl | null {
    return this.formCheckout.get('langage')
  }

  private resetFields(): void {
    this.getFileName().reset();
    this.getLangage().reset();
  }
}
