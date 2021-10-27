import {Pipe, PipeTransform} from '@angular/core';
import * as  _ from 'lodash';

@Pipe({ name: 'cohortUserFilter' })
export class CohortUserPipe implements PipeTransform {

    transform(input: any, args: string[]): string[] {
        let query = args[0];
        if (query) {

            query = query.toLowerCase();

            const filteredResults: string[] = input.filter((item) => {
                const name = item.fullName.toLowerCase();
                return name.indexOf(query) >= 0;
            });

            return filteredResults;
        } else {
            return input;
        }
    }
}