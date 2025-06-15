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
  object = signal(
    { id: 1, name: 'Angular For Beginners' },
    {
      equal: (prev, next) => prev.id === next.id && prev.name === next.name
    }
  );
  title = computed(() => {
    console.log('Calling title computed');
    const course = this.object();
    return course.name;
  });

  constructor() {
    /** Bad way to change signal value */
    // this.list().push('Again');
    // this.object().name = 'Angular 19';

    /** Good way to change signal value */
    // this.list.set(['Hello', 'World', 'Again']);
    // this.object.set({ id: 1, name: 'Angular 19' });
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

  updateObject() {

    // We are setting the signal with the exact same
    // object to see if the derived title signal will
    // be recalculated or not
    this.object.set({
      id: 1,
      name: "Angular For Beginners"
    });

  }
}
