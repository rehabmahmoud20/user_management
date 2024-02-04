import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { ModalComponent } from 'src/app/components/shared/modal/modal.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { DropDownComponent } from 'src/app/components/drop-down/drop-down.component';
import { UsersListComponent } from 'src/app/components/users/users-list/users-list.component';
import { DatePipe } from '@angular/common';

// angular material
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
     path:'',
     component:HomeComponent
   }
 ];

@NgModule({
  declarations: [
    PaginationComponent,
    ModalComponent,
    SearchComponent,
    DropDownComponent,
    UsersListComponent,
    HomeComponent,

  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatMenuModule,
    [RouterModule.forChild(routes)]

  ],
  exports: [
    PaginationComponent,
    ModalComponent,
    SearchComponent,
    DropDownComponent,
    UsersListComponent,
  ],
  providers: [DatePipe],
})
export class HomeModule {}
