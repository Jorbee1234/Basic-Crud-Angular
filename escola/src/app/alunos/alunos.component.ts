import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AlunosService } from '../alunos.service';
import { AlunoModel } from './aluno.model';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {


  aluno: AlunoModel = new AlunoModel();
  alunos: Array<any> = new Array();
  variavelteste:any;

  constructor(private alunosService: AlunosService) { }

  ngOnInit(): void {
    this.listarAlunos();
  }

  listarAlunos(){
    firstValueFrom(this.alunosService.listarAlunos()).then(alunos => {
      this.alunos = alunos;
    }, err =>{
      console.log('Erro ao listar os alunos', err);
    })
  }

  cadastrar(){
    console.log(this.aluno)
    firstValueFrom(this.alunosService.cadastrarAluno(this.aluno)).then(aluno => {
      this.aluno = new AlunoModel();
      this.listarAlunos();
    }, err =>{
      console.log('Erro ao cadastrar o aluno', err);
    })
  }

  atualizar(id:number){
    firstValueFrom(this.alunosService.atualizar(id, this.aluno)).then(aluno => {
      this.aluno = new AlunoModel();
      this.listarAlunos();
    }, err =>{
      console.log('Erro ao atualizar cadastro do aluno', err)
    })
  }

  remover(id: number){
    firstValueFrom(this.alunosService.remover(id)).then(aluno => {
      this.aluno = new AlunoModel();
      this.listarAlunos();
    }, err =>{
      console.log('Erro ao atualizar cadastro do aluno', err)
    })
  }
}
