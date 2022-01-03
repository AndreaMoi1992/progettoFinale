import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesDatabaseListComponent } from './movies-database-list.component';

describe('MoviesDatabaseListComponent', () => {
  let component: MoviesDatabaseListComponent;
  let fixture: ComponentFixture<MoviesDatabaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesDatabaseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesDatabaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
