import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

export class CustomValidators {
  static forbiddenProjectName(control:FormControl):{[s:string]:boolean}{
    if(control.value === 'Test'){
      return {'forbiddenProjectNameCustom':true};
    }
    return null;
  }

  static asyncForbiddenProjectName(control:FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve, reject) =>{
      setTimeout(() =>{
        if(control.value == 'test'){
          resolve({'asyncForbiddenProjectNameCustom':true});
        }else{
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
