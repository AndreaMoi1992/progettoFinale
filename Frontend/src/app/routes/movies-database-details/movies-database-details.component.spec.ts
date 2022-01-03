import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesDatabaseDetailsComponent } from './movies-database-details.component';

describe('MoviesDatabaseDetailsComponent', () => {
  let component: MoviesDatabaseDetailsComponent;
  let fixture: ComponentFixture<MoviesDatabaseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesDatabaseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesDatabaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
