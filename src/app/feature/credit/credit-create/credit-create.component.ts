import { Component, OnInit } from '@angular/core';
import { Actor } from 'src/app/model/actor.class';
import { Movie } from 'src/app/model/movie.class';
import { CreditService } from 'src/app/service/credit.service';
import { ActorService } from 'src/app/service/actor.service';
import { MovieService } from 'src/app/service/movie.service';
import { Router } from '@angular/router';
import { Credit } from 'src/app/model/credit.class';

@Component({
  selector: 'app-credit-create',
  templateUrl: './credit-create.component.html',
  styleUrls: ['./credit-create.component.css']
})
export class CreditCreateComponent implements OnInit {
    title: string = "Credit-Create";
    actors: Actor[] = [];
    movies: Movie[] = [];
    credit: Credit = new Credit();
    errorMessage: string = "";  

  constructor(private creditSvc: CreditService,
              private actorSvc: ActorService,
              private movieSvc: MovieService,
              private router: Router) { }

  ngOnInit(): void {
    this.actorSvc.list().subscribe(jr => {
      this.actors = jr.data as Actor[];
      //grab list of actors
    });
    this.movieSvc.list().subscribe(jr => {
      this.movies = jr.data as Movie[];
      //grab list of movies
    });
    // ajax calls asyncrous calls (same time) multiple request
  }
  
  create() {
    this.creditSvc.create(this.credit).subscribe(jr => {
      if (jr.errors == null) {
        this.router.navigateByUrl("/credit/list")
        //redirect
      }
      else {
        console.log("*** Error creating credit: ",this.credit,jr.errors);
        this.errorMessage = "Error creating Credit.  Try Again.";
      }
    });

  }

}
