import {animate, style, transition, trigger} from "@angular/animations";

export const slideInAnimation =
  trigger(
    'inOutAnimation',
    [
      transition(
        ':enter',
        [
          style({height: 0, opacity: 1}),
          animate('.3s ease-out',
            style({height: 150, opacity: 1}))
        ]),
      transition(
        ':leave',
        [
          style({height: 150, opacity: 1}),
          animate('.3s ease-in',
            style({height: 0, opacity: 1}))
        ]
      )
    ]);
export const zoomInAnimation =
  trigger(
    'zoomInAnimation',
    [
      transition(
        ':enter',
        [
          style({  opacity: 0 }),
          animate('.5s ease-out',
            style({ opacity: 1 }))
        ]
      ),
      transition(
        ':leave',
        [
          style({ opacity: 1 }),
          animate('.5s ease-in',
            style({  opacity: 0 }))
        ]
      )
    ]
  )

export const slideInModalAnimation =
  trigger(
    'slideInModalAnimation',
    [
      transition(
        ':enter',
        [
          style({height: 0,  opacity: 0.8 }),
          animate('.5s ease-out',
            style({ height: 340, opacity: 1 }))
        ]
      ),
      transition(
        ':leave',
        [
          style({ height: 340, opacity: 1 }),
          animate('.5s ease-in',
            style({  height: 0, opacity: 0.8 }))
        ]
      )
    ]
  )
