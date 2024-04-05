import { EventEmitter, Injectable } from '@angular/core';
import { SignUp, login } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  InvalidUserAuth= new EventEmitter<boolean>(false)
  isLoginError: any;

  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(user: SignUp) {
    // console.warn(user)
    this.http.post("http://localhost:3000/users", user, { observe: 'response' })
      .subscribe((result) => {
        // console.warn(result);
        if (result) {
          localStorage.setItem('user', JSON.stringify(result.body))
          this.router.navigate(['/'])
        }

      })
  }
  userauthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/'])
    }
  }

  // userLogin(data: login) {
  //   this.http.get<login[]>(`http://localhost:3000/users?email=${data.email}&&password=${data.password}`, { observe: 'response' })
  //     .subscribe((result) => {
  //       if (result && result.body) {
  //         console.warn(result);
  //         this.InvalidUserAuth.emit(false)
          
  //         localStorage.setItem('user', JSON.stringify(result.body[0]))
  //         this.router.navigate(['/'])
  //       }
  //       else{
  //         this.InvalidUserAuth.emit(true)
  //       }
  //     })
  // }

  userLogin(data:login){
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
    {observe:'response'}
    ).subscribe((result)=>{
      if(result && result.body?.length){
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.router.navigate(['/']);
        this.InvalidUserAuth.emit(false)
      }else{
        this.InvalidUserAuth.emit(true)
      }
    })
  }
}
