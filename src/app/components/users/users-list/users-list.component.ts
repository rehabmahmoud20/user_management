import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from 'src/app/interfaces/data';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import { SharedService } from 'src/app/services/shared.service';
import { ModalComponent } from 'src/app/components/shared/modal/modal.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  constructor(
    private __FetchDataService: FetchDataService,
    private __SharedService: SharedService,
    private dialog: MatDialog
  ) {}
  menueIcon:string='../../../../assets/icons/menueBtn.svg'
  // pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  itemsPerPageArray: number[] = [10,15 , 20];
  changePageHandler(page: number): void {
    this.currentPage = page;
  }
  handlePaginationMenue(limit: number): void {
    this.itemsPerPage = limit;
  }
  get paginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.data.slice(startIndex, endIndex);
  }

  image: string = '../../../assets/images/person.png';
  displayedColumns: string[] = [
    'select',
    'name',
    'email',
    'location',
    'joined',
    'permissions',
    'static',
    'actions',
  ];
  data: Data[] = [];
  dataSource = new MatTableDataSource<Data>(this.data);
  selection = new SelectionModel<Data>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data?.length;

    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Data): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }
  // get data
  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.__FetchDataService.getAllUsers().subscribe({
      next: (response) => {
        console.log(response);
        this.__SharedService.updateDataListValue([...response]);
        this.__SharedService.updateDataListCopyValue([...response]);
        this.__SharedService.dataListValue.subscribe(
          (value) => (this.data = value)
        );
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }
  handleDelete(id: string): void {
    this.__FetchDataService.deleteUser(id).subscribe({
      next: (reponse) => {
        console.log(reponse);
        this.getData();
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }
  handleEdit(id: string): void {
    this.__SharedService.updateIsEditable(true);
    this.__SharedService.updateItemId(id);
    // make request to get single user from database
    this.__FetchDataService.getSingleUser(id).subscribe({
      next: (reponse) => {
        this.__SharedService.updateIntialFormData({ ...reponse });
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });

    this.dialog.open(ModalComponent, { width: '700px' });
  }

  ////
}
