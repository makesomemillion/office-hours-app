import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [RegisterComponent],
    imports: [RegisterRoutingModule, CommonModule, MaterialModule, FormsModule, ReactiveFormsModule]
})
export class RegisterModule {}
