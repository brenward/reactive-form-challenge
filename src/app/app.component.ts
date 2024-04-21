import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from './custom-validators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm:FormGroup;
  statuses=['Stable', 'Critical', 'Finished'];
  
  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, CustomValidators.forbiddenProjectName.bind(this)], CustomValidators.asyncForbiddenProjectName.bind(this)),
      'email': new FormControl(null,[Validators.required, Validators.email]),
      'status': new FormControl(null)
    });
  }

  onSubmit(){
    console.log(this.projectForm);
  }

  forbiddenProjectName(control:FormControl):{[s:string]:boolean}{
    if(control.value === 'Test'){
      return {'forbiddenProjectName':true};
    }
    return null;
  }
  
  asyncForbiddenProjectName(control:FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) =>{
      setTimeout(() =>{
        if(control.value == 'test'){
          resolve({'asyncForbiddenProjectName':true});
        }else{
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
