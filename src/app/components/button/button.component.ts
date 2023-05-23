import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() disabled: boolean = false;
  @Input() isDanger: boolean = false;
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  whenClicked() {
    this.onClick.emit();
  }
}
