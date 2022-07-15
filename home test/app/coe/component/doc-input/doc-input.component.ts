import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';

@Component({
  selector: 'doc-input',
  templateUrl: './doc-input.component.html',
  styleUrls: ['./doc-input.component.css']
})
export class DocInputComponent implements OnInit {
  @Input() label: string;
  @Input() isConfirm: boolean;
  @Input() multiple: boolean = false;
  @Output() selectFile = new EventEmitter<FileList>();

  fileName = ''
  filesToUploads: FileList;
  constructor() {
  }

  ngOnInit() {
  }

  onFileSelected(files: FileList) {
    if (files.length > 0) {
      this.filesToUploads = files
      for (let i = 0; i < files.length; i++) {
        this.fileName += i == 0 ? files.item(i).name : ", " + files.item(i).name
      }
      this.selectFile.emit(this.filesToUploads)
    }
  }

  resetFile(): void {
    this.filesToUploads = null;
    this.fileName = '';
  }

  viewFile() {

  }
}
