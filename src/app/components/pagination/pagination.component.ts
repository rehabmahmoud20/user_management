import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  constructor() {}
  arrowleft: string = '../../../assets/icons/arrowLeft.svg';
  arrowRight: string = '../../../assets/icons/arrowRight.svg';

  @Input() currentpage: number = 1;
  @Input() total: number = 0;
  @Input() limit: number = 5;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  pages: any = [];
  totalPages: number = 0;

  ngOnInit(): void {
    const totalPages = Math.ceil(this.total / this.limit);
    this.pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  handleChangePage(page: number) {
    if (page > this.pages.length) return;

    this.changePage.emit(page);
  }
}
