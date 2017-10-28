
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class UserManagementService {
  constructor(private http: Http) { }

  getAllUser() {
    return this.http.get("http://61.90.233.80:8082/admin/all")
      .map((res) => res.json());
  }

  createNewUser(username, password, email, status) {

    let body = {
      "username": username,
      "email": email,
      "password": password,
      "status": status
    }

    return this.http.post("http://61.90.233.80:8082/admin/newadmin", body)
      .map((res) => res.json());
  }

  editUser(id, username, password, email, status) {

    let body = {
      "adm_id": id,
      "username": username,
      "email": email,
      "password": password,
      "status": status
    }

    return this.http.put("http://61.90.233.80:8082/admin/editadmin/" + id, body)
      .map((res) => res.json());
  }
}
