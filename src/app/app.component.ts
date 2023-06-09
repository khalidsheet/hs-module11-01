import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { FadeAnimation } from './animations/fade.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [FadeAnimation],
})
export class AppComponent {
  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
