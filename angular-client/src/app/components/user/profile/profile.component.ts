import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FLAService } from '../../../services/fla.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  isSRSEnabled: boolean;

  constructor(private FLAService: FLAService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.FLAService.getUserById().subscribe(user => {
      this.user = user;
      this.isSRSEnabled = this.user.SRS;
    });
  }

  toggleSRS() {
    if (this.isSRSEnabled) {
      this.isSRSEnabled = false;
    } else {
      this.isSRSEnabled = true;
    }

    this.FLAService.updateSRSByUserId(this.isSRSEnabled).subscribe(() => {
      console.log("Updated succesfully");
    });
  }

}
