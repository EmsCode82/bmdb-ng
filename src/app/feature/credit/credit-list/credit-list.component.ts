import { Component, OnInit } from '@angular/core';
import { Credit } from 'src/app/model/credit.class';
import { CreditService } from 'src/app/service/credit.service';

@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.css']
})
export class CreditListComponent implements OnInit {
  credits: Credit[];
  title: string = 'Credit-List';

  constructor(private creditSvc: CreditService) { }

  ngOnInit() {
    // populate credits
    this.creditSvc.list().subscribe(
      jr => {
        this.credits = jr.data as Credit[];
        console.log(this.credits);
      }
    );
  }

}