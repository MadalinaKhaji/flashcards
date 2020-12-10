import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeckAddComponent } from './deck-add.component';

describe('DeckAddComponent', () => {
  let component: DeckAddComponent;
  let fixture: ComponentFixture<DeckAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
