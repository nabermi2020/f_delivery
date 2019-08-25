import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const authRoutes: Routes = [
    { path: 'signin', component: SignInComponent},
    { path: 'signup', component: SignUpComponent},
    { path: '', redirectTo: '/signin', pathMatch: "full" }
]

@NgModule({
    imports: [
        RouterModule.forChild(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AuthRoutingModule { }