import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AbstractPluginComponent} from '../AbstractPluginComponent';
import {DatasetViews} from '../../security/DatasetViews';

@Component({
    templateUrl: './BiomarkersComponent.html'
})

export class BiomarkersComponent extends AbstractPluginComponent {
    constructor(public datasetViews: DatasetViews, private router: Router) {
        super();
    }

    isActive(value: string): boolean {
        return this.router.isActive(value, false);
    }
}