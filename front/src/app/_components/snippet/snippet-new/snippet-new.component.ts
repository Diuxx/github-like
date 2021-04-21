import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/Auth.service';
import { Snippet } from 'src/app/_models/snippet';
import { SnippetService } from 'src/app/_services/snippet.service';
import { FormComponent } from 'src/app/_templates/form/form.component';

@Component({
  selector: 'app-snippet-new',
  templateUrl: './snippet-new.component.html',
  styleUrls: ['./snippet-new.component.scss']
})
export class SnippetNewComponent extends FormComponent {

  @Output() canceled = new EventEmitter<void>();
  @Output() created = new EventEmitter<Snippet>();

  constructor(
    formBuilder: FormBuilder,
    authService: AuthService,
    private snippetService: SnippetService
  ) {
    super(formBuilder, authService);
    super.formCheckout = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required
      ]),
      desc: new FormControl('', [
        Validators.required
      ])
    });
  }

  public submit(): void {
    let snippet: Snippet = { Title: this.getName().value, Desc: this.getDesc().value };
    this.snippetService.post<Snippet>(snippet)
    .subscribe(s => {
      console.log(s);
      this.snippetHasBeenCreated(s);
    }, err => {
      console.log(err);
    });
  }

  public cancel(): void {
    this.resetFields();
    if (this.canceled.observers.length > 0)
    {
      this.canceled.emit();
    }
  }

  public snippetHasBeenCreated(s: Snippet): void {
    this.resetFields();
    if (this.created.observers.length > 0)
    {
      this.created.emit(s);
    } 
  }

  public getName(): AbstractControl | null {
    return this.formCheckout.get('name');
  }

  public getDesc(): AbstractControl | null {
    return this.formCheckout.get('desc');
  }

  private resetFields(): void {
    this.getName().reset();
    this.getDesc().reset();
  }
}
