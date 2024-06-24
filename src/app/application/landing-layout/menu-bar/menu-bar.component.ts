import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [CommonModule, ToolbarModule, ButtonModule, SplitButtonModule],
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Hoteles',
        icon: 'material-icons-outlined mi-hotel',
        routerLink: '/fileupload'
      },
      {
        label: 'Habitaciones',
        icon: 'material-icons-outlined mi-meeting-room',
        routerLink: '/fileupload'
      },
      {
        label: 'Reservaciones',
        icon: 'material-icons-outlined mi-book-online',
        routerLink: '/fileupload'
      }
    ];
  }

  goToadminPanel() {
    inject(Router).navigate(['/admin']);
  }
}

