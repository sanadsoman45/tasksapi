import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { LoaderService } from './core/Services/loaderService';
import { Loader } from './shared/components/loader/loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, Loader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('task-api');

  isCollapsed = false;

  constructor(private router: Router, public loaderService: LoaderService) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  isAuthRoute(): boolean {
    const route = this.router.url;
    return route.includes('/login') || route.includes('/signup');
  }

  navUrl(url:string){
    this.router.navigateByUrl(url);
  }

  logout(){
    this.router.navigateByUrl("/login");
    localStorage.clear();
  }
}
