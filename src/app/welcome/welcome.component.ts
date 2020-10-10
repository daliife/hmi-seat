import { EventEmitter, Output, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  @Output() clickStart = new EventEmitter<boolean>();
  @Output() clickKombi = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void { }

  onClickStart(): void {
    this.clickStart.emit(true);
  }
  onClickKombi(): void {
    this.clickKombi.emit(true);
  }

}
