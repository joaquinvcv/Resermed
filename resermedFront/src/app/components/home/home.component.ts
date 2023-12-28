import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/services/registro.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  toggle: boolean = false;
  message!: string;
  sub!: Subscription;

  constructor(private data: RegistroService, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.data.current.subscribe(message => this.message = message);
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleList() {
    if (!this.toggle) {
      this.toggle = true;
    } else {
      this.toggle = false;
    }
  }
}