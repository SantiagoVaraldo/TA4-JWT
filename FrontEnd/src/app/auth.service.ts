import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(private http: HttpClient) {
  }
    
  login(email:string, password:string ): Observable<User> {
      const url = 'localhost:3000/api/login';
      const body = {email,password};
      return this.http.post<User>(url,body);
  }
}
