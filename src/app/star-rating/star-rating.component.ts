import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent {
  readonly stars = [1, 2, 3, 4, 5];

  /** The value to display (0 = nothing selected). */
  @Input() rating = 0;
  /** Read-only mode just displays `rating`; otherwise stars are clickable. */
  @Input() readonly = false;
  @Input() size: 'sm' | 'md' = 'md';
  @Output() rated = new EventEmitter<number>();

  hoverValue = 0;

  select(star: number): void {
    this.rating = star;
    this.rated.emit(star);
  }
}
