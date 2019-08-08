import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsOrphansComponent } from './fs-orphans.component';

describe('FsOrphansComponent', () => {
  let component: FsOrphansComponent;
  let fixture: ComponentFixture<FsOrphansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsOrphansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsOrphansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
