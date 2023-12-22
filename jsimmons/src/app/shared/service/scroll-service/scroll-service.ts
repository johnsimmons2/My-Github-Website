import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { fromEvent } from "rxjs/internal/observable/fromEvent";

@Injectable({
    providedIn: 'root'
})
export class ScrollService {
    getScrollPosition() {
        return fromEvent(window, 'scroll').pipe(map(()=> window.scrollY));
    }
}