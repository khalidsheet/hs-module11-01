import {
  trigger,
  transition,
  style,
  animateChild,
  group,
  animate,
  query,
} from '@angular/animations';

export const FadeAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),
    query(':enter', [style({ opacity: 0 })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(
        ':leave',
        [
          animate(
            '200ms ease-out',
            style({
              opacity: 0,
              scale: 1.015,
            })
          ),
        ],
        {
          optional: true,
        }
      ),
      query(
        ':enter',
        [
          animate(
            '600ms ease-out',
            style({
              opacity: 1,
              overflow: 'auto',
            })
          ),
        ],
        {
          optional: true,
        }
      ),
    ]),
  ]),
]);
