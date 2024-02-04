import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Data } from '../../interfaces/data';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
})
export class DropDownComponent {
  constructor(
    private __SharedService: SharedService,
    private datePipe: DatePipe
  ) {}
  selectedValue: string;
  dataList: Data[] = [];
  dataListCopy: Data[] = [];
  filteredDataValues: any[] = [];
  @Input()
  filteredValues: any[] = [{ value: 0, label: '' }];
  @Input()
  label: string = '';
  handleChange(): void {
   
    this.__SharedService.dataListCopyValue.subscribe(
      (value) => (this.dataListCopy = value)
    );

    if (this.label === 'joined') {
      const formatedDateArray = this.dataListCopy.map((item) => ({
        ...item,
        joined: new Date(
          this.datePipe.transform(item.joined, 'yyyy,MM,dd') as string
        ),
      }));
      if (this.selectedValue === '2') {
        this.filteredDataValues = formatedDateArray.filter(
          (item) => item.joined.getFullYear() < 2020
        );
      } else if (this.selectedValue === '3') {
        this.filteredDataValues = formatedDateArray.filter(
          (item) => item.joined.getFullYear() > 2020
        );
      } else {
        this.filteredDataValues = formatedDateArray;
      }
      //handle the array to change the date formate to be the original form
      const filteredFormatedDateArray = this.filteredDataValues.map(
        (item) => ({
          ...item,
          joined: this.datePipe.transform(item.joined, 'MMM d, y'),
        })
      );
      this.__SharedService.updateDataListValue(filteredFormatedDateArray);
    } else {
      //  bring the value to filter based on it
      const [{ label }] = this.filteredValues.filter(
        (item) => item.value === +this.selectedValue
      );

      this.filteredDataValues= this.dataListCopy.filter(
        (item) => item.permissions === label
      );

      this.__SharedService.updateDataListValue(this.filteredDataValues);
    }
  }
}
