import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth';
import { PlayerService } from 'src/app/shared/services/player';
import { Player } from 'src/app/shared/services/player/model';

@Component({
  selector: 'app-login',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
})
export class LoginComponent implements OnInit {
  name = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {}

  login(): void {
    if (this.name.trim().length > 0) {
      this.authService.login(this.name.trim()).subscribe({
        next: (res: Player) => {
          this.playerService.player = res;
          window.sessionStorage.setItem('player', JSON.stringify(res));
          this.router.navigateByUrl('/landing');
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
