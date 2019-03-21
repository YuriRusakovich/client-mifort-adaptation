import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.scss']
})
export class ListUploadComponent {

  @Input() fileUploads: Observable<string[]>;

  constructor() { }
}
