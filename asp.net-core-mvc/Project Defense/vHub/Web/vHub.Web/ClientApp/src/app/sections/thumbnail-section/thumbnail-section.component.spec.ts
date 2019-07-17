import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailSectionComponent } from './thumbnail-section.component';

describe('ThumbnailSectionComponent', () => {
  let component: ThumbnailSectionComponent;
  let fixture: ComponentFixture<ThumbnailSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThumbnailSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
