import { Component } from '@angular/core';
import { StorageService } from './servicios/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CAMI';
  productos: any;
}
