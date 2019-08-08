import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbOrphansComponent } from './db-orphans.component';

describe('DbOrphansComponent', () => {
  let component: DbOrphansComponent;
  let fixture: ComponentFixture<DbOrphansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbOrphansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbOrphansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
