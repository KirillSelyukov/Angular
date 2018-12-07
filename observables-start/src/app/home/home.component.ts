import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numbersObsSubscription: Subscription;
  customObsSubscription: Subscription;
  constructor() {}

  ngOnInit() {
    const myNumbers$ = interval(1000);
    this.numbersObsSubscription = myNumbers$.subscribe((number: number) => {
      console.log(number);
    });

    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(() => {
        observer.next('First package');
      }, 2000);
      setTimeout(() => {
        observer.next('Second package');
      }, 4000);
      setTimeout(() => {
        observer.complete();
      }, 5000);
    });
    this.customObsSubscription = myObservable.subscribe(
      (data: string) => console.log(data),
      (error: string) => console.log(error),
      () => console.log('comleated')
    );
  }
  ngOnDestroy() {
    this.customObsSubscription.unsubscribe();
    this.numbersObsSubscription.unsubscribe();
  }
}
