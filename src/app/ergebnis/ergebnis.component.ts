import { Component,Input,ChangeDetectorRef } from '@angular/core';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-ergebnis',
  templateUrl: './ergebnis.component.html',
  styleUrls: ['./ergebnis.component.css']
})
export class ErgebnisComponent {

  constructor(private changeDetector: ChangeDetectorRef,
    public shs: SharedService){}

    ngOnChanges(){
      this.changeDetector.detectChanges();
    }
}
