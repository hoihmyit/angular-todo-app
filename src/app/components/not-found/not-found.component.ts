import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  title: string = '404 - Page Not Found';
  message: string = "Sorry, the page you're looking for doesn't exist.";

  constructor(private route: ActivatedRoute) {
    const routeTitle = this.route.snapshot.data['title'];
    if (routeTitle) {
      this.title = routeTitle;
    }
  }
}
