import {Component} from '@angular/core';
import {DatasetViews} from '../../security/module';
import {Router} from '@angular/router';
import {AbstractPluginComponent} from '../AbstractPluginComponent';

@Component({
    templateUrl: '../respiratory/RespiratoryComponent.html'
})
export class ExacerbationsComponent extends AbstractPluginComponent {

    constructor(public datasetViews: DatasetViews,
                private router: Router) {
        super();
    }

    isActive(value: string): boolean {
        return this.router.isActive(value, false);
    }
}
