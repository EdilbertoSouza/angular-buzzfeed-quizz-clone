import { Component, OnInit } from '@angular/core';
//import quizz_questions from "../../../assets/data/quizz_questions.json"
import quizz_list from "../../../assets/data/quizz_list.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  title:string = ""

  questions:any
  quizzSelected:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ""

  quizzIndex:number = 0
  questionIndex:number = 0
  questionMaxIndex:number= 0

  finished:boolean = false

  constructor() { }

  ngOnInit(): void {
    this.playerQuizz()
  }

  playerQuizz(){
    if(quizz_list){
      //console.log(this.quizzIndex)
      this.quizzSelected = quizz_list[this.quizzIndex]

      if(this.quizzSelected){
        this.finished = false
        this.title = this.quizzSelected.title
  
        this.questions = this.quizzSelected.questions
        this.questionSelected = this.questions[this.questionIndex]
  
        this.questionIndex = 0
        this.questionMaxIndex = this.questions.length  
      }
    }
  }

  nextQuizz(){
    this.quizzIndex += 1
    this.questionIndex = 0    
    this.playerQuizz()
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
        this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = this.quizzSelected.results[finalAnswer as keyof typeof this.quizzSelected.results ]
    }
  }

  async checkResult(anwsers:string[]){
    const result = anwsers.reduce((previous, current, i, arr)=>{
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
    })
    return result
  }

}
