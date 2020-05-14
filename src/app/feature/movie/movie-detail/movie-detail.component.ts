import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie.class';
import { MovieService } from 'src/app/service/movie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Credit } from 'src/app/model/credit.class';
import { CreditService } from 'src/app/service/credit.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie: Movie = new Movie();
  title: string = 'Movie-detail';
  movieId: number = 0;
  credits: Credit[] = [];

  constructor(
    private creditSvc: CreditService,
    private movieSvc: MovieService,
    private router: Router,
    private route: ActivatedRoute // pulls id from the 'activated/current' route
  ) {}

  ngOnInit(): void {
    // get the ID from the route
    // current route| subscribe to the parameter|
    this.route.params.subscribe((parms) => (this.movieId = parms['id']));
    // get the movie for the movieId
    this.movieSvc.get(this.movieId).subscribe((jr) => {
      this.movie = jr.data as Movie;
      console.log('Movie found! ', this.movie);
    });
    // get the credits for this movie
    this.creditSvc.getAllActorsForMovie(this.movieId).subscribe((jr) => {
      this.credits = jr.data as Credit[];
    });
  }

  delete() {
    this.movieSvc.delete(this.movieId).subscribe((jr) => {
      if (jr.errors == null) {
        console.log(jr.data as string);
        this.router.navigateByUrl('/movie/list');
      } else {
        console.log('***Error deleting movie.***', this.movieId, jr.errors);
      }
    });
  }
}