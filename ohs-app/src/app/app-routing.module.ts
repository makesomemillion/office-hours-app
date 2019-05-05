import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { LoggedInGuard } from './auth/guards/logged-in.guard';
import { InstructorGuard } from './auth/guards/instructor.guard';
import { StudentGuard } from './auth/guards/student.guard';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        loadChildren: './auth/login/login.module#LoginModule',
        data: { title: 'Login' },
        canActivate: [LoggedInGuard]
    },
    {
        path: 'register',
        loadChildren: './auth/register/register.module#RegisterModule',
        data: { title: 'Register' },
        canActivate: [LoggedInGuard]
    },
    {
        path: 'instructor',
        loadChildren: './instructor/instructor.module#InstructorModule',
        data: { title: 'Instructor' },
        canActivate: [InstructorGuard]
    },
    {
        path: 'student',
        loadChildren: './student/student.module#StudentModule',
        data: { title: 'Student' },
        canActivate: [StudentGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
