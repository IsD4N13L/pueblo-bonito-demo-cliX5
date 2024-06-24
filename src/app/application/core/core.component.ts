import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-core',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [AppService],
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent {

}
