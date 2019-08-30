import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from './authentication/authentication.component';


@NgModule({
    declarations: [
        SignInComponent,
        SignUpComponent,
        AuthenticationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule,
        ReactiveFormsModule
    ],
    exports: [
           
    ]
})


export class AuthModule {

}