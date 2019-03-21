import {Component, OnInit} from '@angular/core';
import {UploadFileService} from '../upload-file.service';
import {HttpResponse, HttpEventType} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  isFilesExist: boolean;
  fileUploads: Observable<string[]>;
  progress: { percentage: number } = {percentage: 0};

  constructor(private uploadService: UploadFileService) {
  }

  ngOnInit() {
    this.fileUploads = this.uploadService.getFiles();
    this.fileUploads.subscribe( value => {
       this.isFilesExist = value.length > 0;
     });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.currentFileUpload = this.selectedFiles.item(0);
  }

  upload() {
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.fileUploads = this.uploadService.getFiles();
        this.fileUploads.subscribe( value => {
          this.isFilesExist = value.length > 0;
        });
        this.selectedFiles = undefined;
        setTimeout(() => {
          this.currentFileUpload = undefined;
          this.progress.percentage = 0;
          $('input[type=\'file\']')[0].value = '';
        }, 1000);
      }
    });

  }
}
