import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/Auth.service';
import { FormComponent } from '../../../_templates/form/form.component';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends FormComponent implements OnInit {

  // child event
  @Output() displaySignUpEvent = new EventEmitter<void>();

  // variables
  public stayLogged: boolean = true;

  constructor(
    formBuilder: FormBuilder,
    authService: AuthService,
    private route: ActivatedRoute
  ) { 
    super(formBuilder, authService);
    super.formCheckout = this.formBuilder.group({
      login: new FormControl('', [
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit() {
  }

  public getPassword(): AbstractControl | null {
    return this.formCheckout.get('password');
  }
  
  public getLogin(): AbstractControl | null {
    return this.formCheckout.get('login');
  }

  public getAuthService(): AuthService {
    return this.authService;
  }

  /**
   * overrided send data
   */
  protected sendData(): void {
    this.authService.SignIn(
      this.formCheckout.value.login,
      this.formCheckout.value.password
    );
  }

  public displaySignUp(): void {
    if(this.displaySignUpEvent.observers.length > 0) { 
      this.displaySignUpEvent.emit();
    }
  }
}
