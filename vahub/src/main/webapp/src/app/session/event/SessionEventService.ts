import {Injectable} from '@angular/core';
import {UserInfo} from '../userInfo/UserInfo';
import {EnvService} from '../../env/module';
import {BaseEventService} from '../../common/event/BaseEventService';
import * as fromStudySelection from '../../studyselection/store/reducers/StudySelectionReducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {Map} from 'immutable';
import {UpdateSelectedDatasetsAction} from '../../studyselection/store/actions/StudySelectionActions';
import {ApplicationState} from '../../common/store/models/ApplicationState';
import Dataset = Request.Dataset;
import * as _ from 'lodash';
/**
 * Sends events/obserables for all the session information.
 */
@Injectable()
export class SessionEventService extends BaseEventService {
    /**
     * sends messages about the selected study/acl
     */
    currentDatasets: Observable<Dataset[]>;

    currentSelectedDatasets: Dataset[];

    /**
     * Used for the constructor, to be removed when using  Observable.forkJoin(
     */
    public userDetails: any;

    /**
     * Loads both the acls and the user details for the current user and then
     * emits this as an event using sessionHttpService
     */
    constructor(private envService: EnvService,
                private _store: Store<ApplicationState>) {
        super();

        this.currentDatasets = this._store.select(fromStudySelection.getSelectedDatasets);

        if (this.envService.env.isLocalHost) {
            const currentStudyInLocal = JSON.parse(localStorage.getItem('selectedDataset'));
            if (!_.isEmpty(currentStudyInLocal)) {
                currentStudyInLocal.map((dataset) => {
                    this._store.dispatch(new UpdateSelectedDatasetsAction({dataset: Map(dataset)}));
                });
            }
        }

        this.currentDatasets
            .subscribe((datasets: any): void => {
                this.setSelectedDataset(datasets.toJS());
            });
    }

    setUserInfo(userInfo: UserInfo): void {
        this.userDetails = userInfo;
        console.log('setUserInfo ', userInfo);
    }

    private setSelectedDataset(selectedDatasets: Dataset[]): void {
        this.currentSelectedDatasets = selectedDatasets;

        if (this.envService.env.isLocalHost) {
            localStorage.setItem('selectedDataset', JSON.stringify(this.currentSelectedDatasets));
        }
    }
}
