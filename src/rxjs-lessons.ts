import { Observable, fromEvent } from "rxjs";
import { map, debounceTime, distinctUntilChanged } from "rxjs/operators";


// const search$ = new Observable(observer => {
//     const search = document.getElementById('search');

//     if (!search) {
//         observer.error("error");
//         return;
//     }

//     search.addEventListener('input', event => {
//         observer.next(event);
//     })
// });
const search$: Observable<Event> = fromEvent<Event>(
    document.getElementById('search'),
    'input'
)

search$.pipe(
    map(event => {
        return(event.target as HTMLInputElement).value;
    }),
    debounceTime(500),
    map(value => value.length > 3 ? value : ''),
    distinctUntilChanged()
).subscribe(value => {
    console.log(value);
})

search$.subscribe( value => {
    console.log(value);
}, err => console.log(err));

console.log("end");
