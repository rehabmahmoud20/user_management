import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/shared/modal/modal.component';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private dialog: MatDialog,
    private __SharedService: SharedService
  ) {}
  exportImage:string='../../../assets/icons/plus.svg'
  dotsImage:string ="../../../assets/icons/more.svg"
  squareImg:string ="../../../assets/icons/Group 18.svg"

  permissions: {value:number,label:string}[] = [
    { value: 1, label: 'admin' },
    { value: 2, label: 'viewer' },
    { value: 3, label: 'contriputer' },
  ];
  joined: {value:number,label:string}[] = [
    { value: 1, label: 'any time' },
    { value: 2, label: 'before 2020' },
    { value: 3, label: 'after 2020' },
  ];
  permissionsLabel:string='permissions'
  joinedLabel:string='joined'

  openDialog(): void {
    this.__SharedService.updateIsEditable(false);

    this.__SharedService.updateIntialFormData({
      name: '',
      email: '',
      location: '',
      joined: '',
      permissions: '',
    });

    this.dialog.open(ModalComponent, { width: '700px' });
  }
}
