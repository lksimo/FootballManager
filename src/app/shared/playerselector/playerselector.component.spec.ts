import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerselectorComponent } from './playerselector.component';

describe('PlayerselectorComponent', () => {
  let component: PlayerselectorComponent;
  let fixture: ComponentFixture<PlayerselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
