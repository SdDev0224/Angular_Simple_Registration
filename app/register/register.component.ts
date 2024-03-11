import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AlertService, UserService } from '../_services/index';
import { User } from '../_models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    updateUser: User;
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private activatedRoute: ActivatedRoute) { }
    
    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            let userId = params['id'];
            this.userService.getById(userId).subscribe(user => { this.model = user; this.updateUser = user; });
        });
    }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    update() {
        this.loading = true;
        this.userService.update(this.model)
            .subscribe(
                data => {
                    this.alertService.success('User update successful', true);
                    this.router.navigate(['login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
