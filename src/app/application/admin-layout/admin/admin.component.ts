import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MenuBarComponent, CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

}
