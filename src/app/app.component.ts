import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';
import { dayList } from './events-list';
import {
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatButtonModule } from '@angular/material/button';

interface Day {
  count: number,
  event: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{
  title = 'ramandanCalendar';
  days: Day[] = dayList;
  colorList: string[] = [ "red", "purple", "darkblue", "turquoise", "lime", "brown", "orange", "green", "maroon", "chocolate","blueviolet", "deeppink", "dodgerblue", "crimson",
  "red", "purple", "darkblue", "turquoise", "lime", "brown", "orange", "green", "maroon", "chocolate","blueviolet", "deeppink", "dodgerblue", "crimson", "gold", "orchid"
]

  constructor(public dialog: MatDialog){ }

  ngOnInit(){
    let len = this.days.length,
        currentIndex;
    for (currentIndex = len - 1; currentIndex > 0; currentIndex--) {
        let randIndex = Math.floor(Math.random() * (currentIndex + 1) );
        var temp = this.days[currentIndex];
        this.days[currentIndex] = this.days[randIndex];
        this.days[randIndex] = temp;
    }
  }

  onClickDay(day:Day){
    const hijri = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {day: 'numeric', month: 'long',weekday: 'long',year : 'numeric'}).format(Date.now());
    const hijriToday = hijri.split('Ramadan')[1].split(',')[0].trim();
    const time = new Date().getTime();
    const celebrationTime = new Date().setHours(18, 0);
    if(day.count == parseInt(hijriToday) &&  time > celebrationTime){
      this.celebrate(day);
      console.log(hijriToday);
    }
  }

  celebrate(day:Day) {
    var duration = 5 * 1000;
    var end = Date.now() + duration;

    (function frame() {
      // launch a few confetti from the left edge
      confetti({
        particleCount: 7,
        angle: 60,
        shapes :['star', 'square', 'circle'],
        spread: 75,
        origin: { x: 0 }
      });
      // and launch a few from the right edge
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 75,
        shapes :['star', 'square', 'circle'],
        origin: { x: 1 }
      });

      // keep going until we are out of time
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
    this.openDialog(day);
  }

  openDialog(day: Day): void {
    console.log('opened')
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {name: day.event, color:this.colorList[day.count -1]},
      width: '250px',
      enterAnimationDuration: 300,
      exitAnimationDuration : 300
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

