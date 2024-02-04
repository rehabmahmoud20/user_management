import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Data } from '../interfaces/data';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}
  private isEditable = new BehaviorSubject<boolean>(false);
  isEditableValue = this.isEditable.asObservable();
  private itemId = new BehaviorSubject<string>('');
  itemIdValue = this.itemId.asObservable();
  private initialFormData = new BehaviorSubject<any>({
    name: '',
    email: '',
    location: '',
    joined: '',
    permissions: '',
  });
  initialFormDataValues = this.initialFormData.asObservable();

  // dataList
  private dataList = new BehaviorSubject<Data[]>([]);
  dataListValue = this.dataList.asObservable();
  // data list copy to be able make filtration on it
  private dataListCopy = new BehaviorSubject<Data[]>([]);
  dataListCopyValue = this.dataListCopy.asObservable();

  updateIsEditable(newValue: boolean): void {
    this.isEditable.next(newValue);
  }
  updateItemId(newValue: string): void {
    this.itemId.next(newValue);
  }
  updateIntialFormData(newValue: any): void {
    this.initialFormData.next({ ...newValue });
  }
  updateDataListValue(newValue: Data[]): void {
    this.dataList.next([...newValue]);
  }
  updateDataListCopyValue(newValue: Data[]): void {
    this.dataListCopy.next([...newValue]);
  }
  
}
