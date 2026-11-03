import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarRatingComponent } from './star-rating.component';

describe('StarRatingComponent', () => {
  let fixture: ComponentFixture<StarRatingComponent>;
  let component: StarRatingComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ declarations: [StarRatingComponent] }).compileComponents();
    fixture = TestBed.createComponent(StarRatingComponent);
    component = fixture.componentInstance;
  });

  it('fills the number of stars given by rating', () => {
    component.rating = 3;
    component.readonly = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.star.filled').length).toBe(3);
  });

  it('is not clickable when readonly', () => {
    component.readonly = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('button').length).toBe(0);
  });

  it('emits the chosen value when a star is clicked', () => {
    let emitted = 0;
    component.rated.subscribe((v) => (emitted = v));
    fixture.detectChanges();
    fixture.nativeElement.querySelectorAll('button')[3].click();
    expect(emitted).toBe(4);
  });
});
