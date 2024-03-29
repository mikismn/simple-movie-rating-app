import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService,
    private http: HttpClient
  ) {}
  searchQuery = '';
  trendingMovies: any;
  theatreMovies: any;
  popularMovies: any;

  ngOnInit(): void {
    this.getTrendingMovies();
    this.getThreatreMovies();
    this.getPopularMovies();
  }

  getThreatreMovies() {
    this.http
      .get('http://localhost:4200/assets/data/theatre-movies.json')
      .subscribe((movies) => {
        this.theatreMovies = movies;
        console.log(this.theatreMovies);
      });
  }

  getTrendingMovies() {
    this.http
      .get('http://localhost:4200/assets/data/trending-movies.json')
      .subscribe((movies) => {
        this.trendingMovies = movies;
        console.log(this.trendingMovies);
      });
  }

  getPopularMovies() {
    this.http
      .get('http://localhost:4200/assets/data/popular-movies.json')
      .subscribe((movies) => {
        this.popularMovies = movies;
        console.log(this.popularMovies);
      });
  }

  goToHome() {
    this.router.navigate(['home']);
  }
  logout() {
    this.auth.logout();
  }
  search() {
    const query = this.searchQuery.toLowerCase();
    const allMovies = [
      ...this.popularMovies,
      ...this.trendingMovies,
      ...this.theatreMovies,
    ];

    let scoredMovies: any[] = [];

    for (let i = 0; i < allMovies.length; i++) {
      const movie = allMovies[i];
      const name = movie['name'].toLowerCase();
      let score = 0;

      for (let j = 0; j < query.length; j++) {
        for (let k = 1; k < query.length - j; k++) {
          const snip = query.slice(j, k + j + 1);

          if (name.includes(snip)) {
            score += snip.length;
          }
        }
      }

      scoredMovies.push([movie, score]);
    }

    console.log(scoredMovies.sort((a, b) => b[1] - a[1]));

    const bestMatch = scoredMovies[0][0];
    let bestType = 'popular';

    if (this.theatreMovies.includes(bestMatch)) {
      bestType = 'theatre';
    } else if (this.trendingMovies.includes(bestMatch)) {
      bestType = 'trending';
    }

    if (scoredMovies[0][1] === 0) {
      alert('no movie found like dat DADDY')
    } else {

      this.router.navigate(['movie', bestType, bestMatch['id']]);
    }
  }
}
