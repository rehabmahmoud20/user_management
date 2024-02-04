import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Data } from '../../interfaces/data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  constructor(private __SharedService: SharedService) {}
  searchVal: string = '';
  dataList: Data[] = [];
  dataListCopy: Data[] = [];

  handleChange(): void {
    this.__SharedService.dataListValue.subscribe(
      (value) => (this.dataList = value)
    );
    this.__SharedService.dataListCopyValue.subscribe(
      (value) => (this.dataListCopy = value)
    );

    const filteredData = this.dataListCopy.filter((item) =>
      item['name'].toLowerCase().includes(this.searchVal.toLowerCase())
    );
    this.__SharedService.updateDataListValue(filteredData);
  }
}
