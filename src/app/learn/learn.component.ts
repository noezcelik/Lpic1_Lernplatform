import { Component,OnInit } from '@angular/core';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent {

  questions:any[]=[]
  selectedQuestionIndex: number | null = null;

  constructor(private service:QuestionService){}

  ngOnInit(): void{
    this.service.getQuestions().subscribe(data=>{this.questions=data})
  }

  showAnswer(index: number) {
    this.questions[index].showAnswer = true;
  }


  selectQuestion(index: number): void {
    this.selectedQuestionIndex = index;
  }
  deselectQuestion(): void {
    this.selectedQuestionIndex = null;
  }

  OnNext(): void{
if(this.selectedQuestionIndex!<this.questions.length-1){
this.selectedQuestionIndex!++;
}
 }

 onBack():void{
  if (this.selectedQuestionIndex!>0){
    this.selectedQuestionIndex!--;
  }
 }

}
