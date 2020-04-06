import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user/user.service';
import { UserRegister } from 'src/app/_models/user/UserRegister.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  displayName: string;
  password: string;
  passwordConfirm: string;

  public errorMsg: string;
  action: boolean = true;
  actionButtonLabel: string = 'X';

  constructor(public router: Router, public userService: UserService, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

  register(){
    if(this.password===this.passwordConfirm) {
        this.userService.registerUser(new UserRegister(this.email, this.password, this.displayName))
        .subscribe(
          data=>{
          if(data.id!=null) {
            this.router.navigate(['/login']);
          }
        },
          error=>{
            // this.errorMsg = error.errors.Password[0] + error.errors.DisplayName[0];
            // console.log(this.errorMsg)
          // this.errorMsg = error.errors.Email[0]+error.errors.Password[0]; 
          // console.log(this.errorMsg);
          // this.snackBar.open(this.errorMsg, this.action ? this.actionButtonLabel : undefined,
          //    {duration:3000, panelClass: ['snack-bar']});
          }
        )
    }
  }

}
