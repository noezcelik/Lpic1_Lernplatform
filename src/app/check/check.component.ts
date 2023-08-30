import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuestionService } from '../question.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css'],
})
export class CheckComponent {
  constructor(
    private service: QuestionService,
    private router: Router,
    private shs: SharedService
  ) {}

  Questions: any[] = [];
  currentIndex: number = 0;
  selectedOption: string[] = [];

  correctAnswer: number = 0;
  falseAnswer: number = 0;
  benutzerAnswers: any[] = [];
  isQuestionIncorrect: boolean = false;
  errorText: string = ''; // Hata metni ekledik

  ngOnInit(): void {
    this.service.getQuestions().subscribe((data) => {
      this.Questions = data;
      this.shs.resetDaten();
    });
  }

  getResult() {}

  nextQuestion(): void {
    if (this.currentIndex < this.Questions.length - 1) {
      this.currentIndex++;
      this.correctAnswer++;
      this.selectedOption = this.benutzerAnswers[this.currentIndex];
    }
  }

  previousQuestion(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.selectedOption = this.benutzerAnswers[this.currentIndex];
    }
  }

  SkipQuestion(): void {
    this.currentIndex++;
  }

  isTrue(questionArrayIndex: number, benutzerAntwort: string[]): void {
    const correctAnswer = this.Questions[this.currentIndex].correctAnswer;
    const sortedCorrectAnswer = correctAnswer.slice().sort();
    const sortedBenutzerAntwort = benutzerAntwort.slice().sort();

    if (this.benutzerAnswers.length > questionArrayIndex) {
      this.benutzerAnswers[questionArrayIndex] = sortedBenutzerAntwort;
    } else {
      this.benutzerAnswers.push(sortedBenutzerAntwort);
    }

    if (this.isEqual(sortedCorrectAnswer, sortedBenutzerAntwort)) {
      this.nextQuestion();
      this.isQuestionIncorrect = false;
    } else {
      this.falseAnswer++;
      this.selectedOption = [];
      this.isQuestionIncorrect = true;
      this.errorText = 'Ihre Antwort ist entweder falsch oder unvollständig.';
    }

    if (this.currentIndex > 120 || this.falseAnswer > 6) {
      this.router.navigate(['/ergebnis']);
    }
    this.shs.setCorrectAnswer(this.correctAnswer);
    this.shs.getCorrectAnswer();
    this.shs.setfalseAnswer(this.falseAnswer);
    this.shs.getFalseAnswer();
  }

  Gewaehlt(option: string, event: any): void {
    const questionType = this.Questions[this.currentIndex].questionType;

    if (questionType === 'fill-in') {
      this.handleFillInQuestion(event);
    } else if (questionType === 'multiple-choice') {
      this.handleMultipleChoiceQuestion(option, event);
    } else if (questionType === 'single-choice') {
      this.handleSingleChoiceQuestion(option);
    }
  }

  handleFillInQuestion(event: any): void {
    this.selectedOption = [];
    this.selectedOption.push(event.target.value);
  }

  handleMultipleChoiceQuestion(option: string, event: any): void {
    if (event.target.checked) {
      this.selectedOption.push(option);
    } else {
      const index = this.selectedOption.indexOf(option);
      if (index >= 0) {
        this.selectedOption.splice(index, 1);
      }
    }
  }

  handleSingleChoiceQuestion(option: string): void {
    this.selectedOption = [];
    this.selectedOption.push(option);
  }

  isEqual(arr1: string[], arr2: string[]): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }
    const sorted1 = arr1.slice().sort();
    const sorted2 = arr2.slice().sort();

    for (let i = 0; i < sorted1.length; i++) {
      if (sorted1[i] !== sorted2[i]) {
        return false;
      }
    }
    return true;
  }

  reset(): void {
    this.selectedOption = [];
  }

  async onButtonClick() {
    const questionArrayIndex = this.currentIndex;
    const benutzerAntwort = this.selectedOption;
    await this.isTrue(questionArrayIndex, benutzerAntwort);
    this.reset();
  }
  Beenden(){
    this.router.navigate(['ergebnis']);
  }
}
