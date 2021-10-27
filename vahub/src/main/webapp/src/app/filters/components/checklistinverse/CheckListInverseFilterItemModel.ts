import {FILTER_TYPE, CheckedValues} from '../dtos';
import {CheckListFilterItemModel} from '../checklist/CheckListFilterItemModel';
import * as  _ from 'lodash';

export class CheckListInverseFilterItemModel extends CheckListFilterItemModel {

    constructor(key: string, displayName: string) {
        super(key, displayName);
        this.type = FILTER_TYPE.CHECK_LIST_INVERSE;
        this.reset();
    }

    /**
     * Transform the filter field data into server object.
     *
     *  eg.
     * {
     *   causality: {
     *      includeEmptyValues: true,
     *      checkedValues: ["STDY4321: Yes", "additional_drug: No", "additional_drug: Yes"],
     *      uncheckedValues: ["STDY4321: No"]
     *   }
     * }
     */
    public toServerObject(manuallyApplied = false): any {
        const serverObject: any = {};
        if (manuallyApplied) {
            this.appliedSelectedValues = this.selectedValues;
        }
        const uncheckedValues = _.difference(this.initialValues, this.appliedSelectedValues);

        //if initial is null, then apply when values.length > 0, else 0 < value.length < initial.length
        if ((_.isUndefined(this.initialValues) && this.appliedSelectedValues.length > 0) || (this.initialValues) && (0 < this.appliedSelectedValues.length && this.appliedSelectedValues.length < this.initialValues.length)) {

            serverObject[this.key] = {};

            //  check if has null or empty, if so add includeEmptyValues = true to the object
            if (this.hasEmpty()) {
                serverObject[this.key].includeEmptyValues = true;
            }

            serverObject[this.key].checkedValues = this.removeEmpty(this.appliedSelectedValues);
            serverObject[this.key].uncheckedValues = this.removeEmpty(uncheckedValues);
        }

        return serverObject;
    }

    /**
     * returnedServerObject: { values ['ABDOMINAL PAIN'] }
     */
    public fromServerObject(returnedServerObject: CheckedValues): void {

        if (returnedServerObject) {
            this.availableValues = returnedServerObject.checkedValues;

            if (this.initialValues && !this.initialValues.length ||
                this.initialValues.length < returnedServerObject.checkedValues.length) {

                this.initialValues = returnedServerObject.checkedValues;
                this.selectedValues = _.cloneDeep(returnedServerObject.checkedValues);
            }
        } else {
            this.availableValues = [];
        }
        this.appliedSelectedValues = _.clone(this.selectedValues);
    }
}
