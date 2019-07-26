import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedSectionComponent } from './related-section.component';

describe('RelatedSectionComponent', () => {
  let component: RelatedSectionComponent;
  let fixture: ComponentFixture<RelatedSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
