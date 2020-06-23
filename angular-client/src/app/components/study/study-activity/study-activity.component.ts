import { Component, OnInit } from '@angular/core';
import { FLAService } from '../../../services/fla.service';
import { StudySession } from '../../../models/session.model';

@Component({
  selector: 'app-study-activity',
  templateUrl: './study-activity.component.html',
  styleUrls: ['./study-activity.component.css']
})
export class StudyActivityComponent implements OnInit {

  studySessions: StudySession[] = [];

  data: any;

  color: string;

  overview: string;

  constructor(private FLAService: FLAService) { }

  ngOnInit(): void {
    this.getStudySessions();
  }

  getStudySessions() {
    this.FLAService.getStudySessionsByUserId().subscribe((sessions: StudySession[]) => {
      this.studySessions = sessions;

      console.log(this.studySessions);
    });
  }

}
