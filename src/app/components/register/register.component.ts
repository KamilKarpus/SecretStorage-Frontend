import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user/user.service';
import { UserRegister } from 'src/app/_models/user/UserRegister.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  displayName: string="";
  password: string;
  passwordConfirm: string;

  public errorMsg: string;
  action: boolean = true;
  actionButtonLabel: string = 'X';

  constructor(public router: Router, public userService: UserService, public snackBar: MatSnackBar, public toastr: ToastrService) { }

  ngOnInit(): void {
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword(password){
    var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    return paswd.test(String(password));
  }

  register(){

    if(!this.validateEmail(this.email)){
      this.toastr.warning("Błędnie sformatowany adres email!");
    }
    else if(this.password!=this.passwordConfirm) {
      this.toastr.warning("Błędnie powtóżone hasło!");
    }
    else if(this.password==this.passwordConfirm && !this.validatePassword(this.password)){
      this.toastr.warning("Hasło musi składać się z przynajmniej 8 znaków, zawierać wielkie, małe litey, cyfrę oraz znak specjalny!");
    }
    else if(((this.displayName).length)<3){
      console.log((this.displayName).length)
      this.toastr.warning("Nazwa użytkownika musi składać się z przynajmniej 3 znaków!");
    }
    else {
      this.userService.registerUser(new UserRegister(this.email, this.password, this.displayName))
        .subscribe(
          data=>{
          if(data.id!=null) {
            this.toastr.success("Pomyślnie zarejestrowano!");
            this.router.navigate(['/login']);
          }
        })
    }
  }

}
