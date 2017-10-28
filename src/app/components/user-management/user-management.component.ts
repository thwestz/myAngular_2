import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../services/user-management.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  private userList: User[];
  private respone;
  private isEditable: boolean[];
  private status: string;
  constructor(private http: Http, private userManagementService: UserManagementService) { }

  ngOnInit() {


    this.status = "superadmin";

    this.isEditable = [];

    this.getAllUser();


  }

  getAllUser() {
    this.userManagementService.getAllUser().subscribe((response) => {
      this.userList = response;
      this.isEditable = [];
      for (var i = 0; i < this.userList.length; i++) {
        this.isEditable.push(false);
      }
      console.log(this.isEditable);
    });
  }


  addUser(username, password, email) {
    this.userManagementService.createNewUser(username, password, email, this.status).subscribe((response) => {
      this.respone = response;
      this.getAllUser();
    });
  }

  deleteUser(id) {
    console.log("http://61.90.233.80:8082/admin/removeadmin/" + id);
    return this.http.delete("http://61.90.233.80:8082/admin/removeadmin/", id)
      .map((res) => res.json());
  }

  editUser(id, username, password, email, status) {
    this.userManagementService.editUser(id, username, password, email, status).subscribe((response) => {
      this.getAllUser();
    });
  }

  toggleEdit(i) {
    this.isEditable.forEach((element, index) => {
      if (i == index) {
        this.isEditable[index] = !this.isEditable[index]
      } else {
        this.isEditable[index] = false;
      }
    });
    console.log(this.isEditable);
  }


}

interface User {
  adm_id: string;
  username: string;
  email: string;
  password: string;
  status: string;
}
