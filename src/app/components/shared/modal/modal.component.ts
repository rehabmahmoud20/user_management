import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private __FetchDataService: FetchDataService,
    private __SharedService: SharedService,
    public dialogRef: MatDialogRef<ModalComponent>
  ) {}
  isEditable: boolean = false;

  permissions: { value: number; label: string }[] = [
    { value: 1, label: 'admin' },
    { value: 2, label: 'viewer' },
    { value: 3, label: 'contriputer' },
  ];

  modalForm: FormGroup;
  id: string;
  ngOnInit(): void {
    this.modalForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      location: ['', [Validators.required]],
      date: ['', [Validators.required]],
      permissions: ['', [Validators.required]],
    });
    //  reset the initial values of the form in case of edit(to each user data) or add
    this.__SharedService.initialFormDataValues.subscribe((value) => {
      const recivedPermissions = this.permissions.filter(
        (item) => item.label === value.permissions
      );
      const formatedDate = this.datePipe.transform(value.joined, 'yyyy,MM,dd');
      const vals = {
        ...value,
        date: new Date(formatedDate as string),
        permissions: recivedPermissions[0].value,
      };
      this.modalForm.patchValue(vals);
    });
  }
  get formControls() {
    return this.modalForm.controls;
  }
  getData(): void {
    this.__FetchDataService.getAllUsers().subscribe({
      next: (response) => {
        console.log(response);
        this.__SharedService.updateDataListValue([...response]);
        this.__SharedService.updateDataListCopyValue([...response]);
        // this.__SharedService.dataListValue.subscribe(
        //   (value) => (this.data = value)
        // );
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }
  onSubmit(): void {
    const sentPremission = this.permissions.filter(
      (item) => item.value === this.modalForm.value.permissions
    );
    const data = {
      name: this.modalForm.value.name,
      email: this.modalForm.value.email,
      location: this.modalForm.value.location,
      joined: this.datePipe.transform(this.modalForm.value.date, 'MMM d, y'),
      permissions: sentPremission[0].label,
    };
    // check if the form opended for add or edit
    this.__SharedService.isEditableValue.subscribe(
      (value) => (this.isEditable = value)
    );

    if (this.isEditable) {
      this.__SharedService.itemIdValue.subscribe((value) => (this.id = value));
      this.__FetchDataService.editSingleUser(this.id, data).subscribe({
        next: (reponse) => {
          this.getData();

          console.log(reponse);
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
    } else {
      this.__FetchDataService.addUser(data).subscribe({
        next: (reponse) => {
          console.log(reponse);
          this.getData();
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      });
    }
    this.dialogRef.close();
  }
}
