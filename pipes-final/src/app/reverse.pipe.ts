import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    console.log('in reverse')
    return Array.from(value)
      .reverse()
      .join('');
  }
}
