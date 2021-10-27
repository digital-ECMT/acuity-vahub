import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CIEventsComponent} from './CIEventsComponent';
import {TrellisingComponentModule} from '../../common/trellising/trellising/TrellisingComponent.module';
import {CommonDirectivesModule} from '../../common/directives/directives.module';
import {AEsComponentModule} from '../aes/AEsComponent.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        TrellisingComponentModule,
        CommonDirectivesModule,
        AEsComponentModule
    ],
    declarations: [CIEventsComponent],
    exports: [CIEventsComponent],
    providers: []
})

export class CIEventsComponentModule {

}