import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class LoginComponent implements OnInit {
  name = '';

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(): void {
    if (this.name.trim().length > 0) {
      this.authService.login(this.name.trim()).subscribe({
        next: (res: any) => {
          //   console.log(res);
          this.authService.user = res.payload;
          window.sessionStorage.setItem('user', JSON.stringify(res.payload));
          this.router.navigateByUrl('/landing');
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
