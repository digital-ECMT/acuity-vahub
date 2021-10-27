package com.acuity.visualisations.rawdatamodel.statistics.filters;

import com.acuity.visualisations.rawdatamodel.filters.Filters;
import com.acuity.visualisations.rawdatamodel.filters.RenalFilters;
import com.acuity.visualisations.rawdatamodel.vo.wrappers.Renal;

public class RenalFilterSummaryStatistics implements FilterSummaryStatistics<Renal> {

    private RenalFilters renalFilters = new RenalFilters();
    private int count = 0;

    @Override
    public void accept(Object value) {
        count++;
        Renal renal = (Renal) value;

        renalFilters.getMeasurementName().completeWithValue(renal.getEvent().getLabCode());
        renalFilters.getLabUnit().completeWithValue(renal.getEvent().getUnit());
        renalFilters.getMeasurementTimePoint().completeWithValue(renal.getAccessibleMeasurementTimePoint());
        renalFilters.getDaysOnStudy().completeWithValue(renal.getDaysSinceFirstDose());
        renalFilters.getAnalysisVisit().completeWithValue(renal.getEvent().getAnalysisVisit());
        renalFilters.getVisitNumber().completeWithValue(renal.getEvent().getVisitNumber());
        renalFilters.getCkdStage().completeWithValue(renal.getEvent().getCkdStageName());
        renalFilters.getLabValue().completeWithValue(renal.getEvent().getValue());
        renalFilters.getLabValueOverUpperRefValue().completeWithValue(renal.getTimesUpperReferenceRange());
        renalFilters.getUpperRefValue().completeWithValue(renal.getEvent().getRefHigh());
        renalFilters.getStudyPeriods().completeWithValue(renal.getEvent().getStudyPeriods());

        renalFilters.setMatchedItemsCount(count);
    }

    @Override
    public void combine(FilterSummaryStatistics<Renal> other) {
        RenalFilters otherFilters = (RenalFilters) other.getFilters();

        renalFilters.getMeasurementName().complete(otherFilters.getMeasurementName());
        renalFilters.getLabUnit().complete(otherFilters.getLabUnit());
        renalFilters.getMeasurementTimePoint().complete(otherFilters.getMeasurementTimePoint());
        renalFilters.getDaysOnStudy().complete(otherFilters.getDaysOnStudy());
        renalFilters.getAnalysisVisit().complete(otherFilters.getAnalysisVisit());
        renalFilters.getVisitNumber().complete(otherFilters.getVisitNumber());
        renalFilters.getCkdStage().complete(otherFilters.getCkdStage());
        renalFilters.getLabValue().complete(otherFilters.getLabValue());
        renalFilters.getLabValueOverUpperRefValue().complete(otherFilters.getLabValueOverUpperRefValue());
        renalFilters.getUpperRefValue().complete(otherFilters.getUpperRefValue());
        renalFilters.getStudyPeriods().complete(otherFilters.getStudyPeriods());

        count += other.count();
        renalFilters.setMatchedItemsCount(count);
    }

    @Override
    public Filters<Renal> getFilters() {
        return renalFilters;
    }

    @Override
    public int count() {
        return count;
    }

    @Override
    public FilterSummaryStatistics<Renal> build() {
        return this;
    }

    @Override
    public FilterSummaryStatistics<Renal> newStatistics() {
        return new RenalFilterSummaryStatistics();
    }

    @Override
    public String toString() {
        return String.format(
                "%s{renalFilters=%s",
                this.getClass().getSimpleName(),
                this.renalFilters.toString());
    }
}
