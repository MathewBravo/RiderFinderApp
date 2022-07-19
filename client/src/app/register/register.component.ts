import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() registerCancelHandler = new EventEmitter();
  registrationForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formInit();
    this.maxDate = new Date();
    this.maxDate.setFullYear(
      this.maxDate.getFullYear() - 18
    );
  }

  registerHandler() {
    this.accountService
      .registerHandler(this.registrationForm.value)
      .subscribe(
        (response) => {
          this.router.navigateByUrl('/rider/edit');
          this.cancelHandler();
        },
        (error) => {
          this.validationErrors = error;
        }
      );
  }

  cancelHandler() {
    this.registerCancelHandler.emit(false);
  }

  formInit() {
    this.registrationForm = this.formBuilder.group({
      gender: ['non-binary', Validators.required],
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(16),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          this.passwordMatchValidator('password'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  passwordMatchValidator(matchValue: string): ValidatorFn {
    return (control: AbstractControl) => {
      // access control we attach validator to, and compare it to
      // the value of the matchValue parameter
      return control?.value ==
        control?.parent?.controls[matchValue].value
        ? null
        : { passMatch: true };
    };
  }
}
