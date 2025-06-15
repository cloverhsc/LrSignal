import { Component, computed, signal, untracked } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  counter = signal(1);
  derivedCounter = computed(() => {
        console.log('Derived counter recalculated');
        return untracked(this.counter) * 10;
      });

  list = signal(['Hello', 'World']);
  object = signal({ id: 1, name: 'Angular' });

  constructor() {
    // console.log('Initial counter value:', this.counter());
    // this.list().push('Again');
    // this.object().name = 'Angular 19';

    this.list.set(['Hello', 'World', 'Again']);
    this.object.set({ id: 1, name: 'Angular 19' });
  }

  increment() {
    console.log(`Updating Counter...`);
    // this.counter.set(this.counter() + 1);
    this.counter.update(value => value + 1);
    if(this.counter() > 3) {
      this.derivedCounter = computed(() => {
        console.log('Derived counter recalculated after update');
        return untracked(this.counter);
      });
    }
  }
}
