import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {IUser} from '../../shared/interfaces/user.interface';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list-profile',
  templateUrl: './list-profile.component.html',
  styleUrls: ['./list-profile.component.css']
})
export class ListProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<IUser>();
  private subscription: Subscription = new Subscription();
  displayedColumns: string[] = ['username', 'email', 'actions'];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {

    this.subscription.add(this.userService.getAllUsers().subscribe((users) => {
      this.dataSource.data = users;
    }));
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
