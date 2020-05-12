import { Component, OnInit } from '@angular/core';
import { Credit } from 'src/app/model/credit.class';
import { CreditService } from 'src/app/service/credit.service';

@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.css']
})
export class CreditListComponent implements OnInit {
  title: string = "Credit-List";
  // credits will hold our list of credits from the back end
  // will be one way bound on our html to provide a table view of movies
  credits: Credit[] = [];

  constructor(private creditSvc: CreditService) { }

  ngOnInit(): void {
    // call our actor service to populate the list of actors (p. 139)
    this.creditSvc.list().subscribe(
      jr => {
        this.credits = jr.data as Credit[];
        console.log("List of credits",this.credits);
      }
    );
  }

}
