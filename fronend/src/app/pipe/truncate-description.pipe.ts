import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateDescription',
  standalone: true,
})
export class TruncateDescriptionPipe implements PipeTransform {
  transform(description: string, char: number): string {
    if (description.length > char) {
      return description.slice(0, char) + '...';
    }
    return description;
  }
}
