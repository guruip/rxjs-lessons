import { Observable, fromEvent } from "rxjs";
import { map, debounceTime, distinctUntilChanged, takeUntil } from "rxjs/operators";


// const search$ = new Observable<Event>(observer => {
//     const search = document.getElementById('search');
//     const stop = document.getElementById('stop');

//     if (!search || !stop) {
//         observer.error("error");
//         return;
//     }

//     const onSearch = event => {
//         checkSubscription();
//         observer.next(event);
//     }

//     const onStop = event => {
//         checkSubscription();
//         observer.complete();
//         clear();
//     }

//     search.addEventListener('input', onSearch);
//     stop.addEventListener('click', onStop);

//     const checkSubscription = () => {
//         if (observer.closed) {
//             clear();
//         }
//     }


//     const clear = () => {
//         search.removeEventListener('input', onSearch);
//         stop.removeEventListener('click', onStop);

//     }
// });


const search$: Observable<Event> = fromEvent<Event>(
    document.getElementById('search'),
    'input'
)

const stop$: Observable<Event> = fromEvent<Event>(
    document.getElementById('stop'),
    'click'
)

search$.pipe(
    map(event => {
        return(event.target as HTMLInputElement).value;
    }),
    debounceTime(500),
    map(value => value.length > 3 ? value : ''),
    distinctUntilChanged(),
    takeUntil(stop$)
).subscribe(value => {
    console.log(value);
})

search$.subscribe( value => {
    // console.log(value);
}, err => console.log(err));
