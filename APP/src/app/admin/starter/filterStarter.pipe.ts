import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPipeStarter implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
        searchText = searchText.toLocaleLowerCase();
        var con = items.find(function (element) {
            return element.room.toLowerCase().includes(searchText);
        });

        var sum = []
        for (let sub of items) {
            if (items.find(fruit => sub.room.includes(searchText))) {
                console.log('1')
                sum.push(sub);
            }
        }
        return sum;
    }
}