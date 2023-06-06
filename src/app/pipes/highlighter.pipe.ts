import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlighter',
})
export class HighlighterPipe implements PipeTransform {
  transform(value: string, search: string): unknown {
    if (!search) return value;
    const re = new RegExp(search, 'igm');
    return value.replace(re, '<mark>$&</mark>');
  }
}
