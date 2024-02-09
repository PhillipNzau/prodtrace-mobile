import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverser'
})
export class ReverserPipe implements PipeTransform {

  transform(value: any): any {
    if (!value) return

    return value.reverse;
  }

}
