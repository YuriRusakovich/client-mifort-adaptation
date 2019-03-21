import { Component, Input } from '@angular/core';

@Component({
  selector: 'details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.scss']
})
export class DetailsUploadComponent {

  @Input() fileUpload: string;

  constructor() { }

}
