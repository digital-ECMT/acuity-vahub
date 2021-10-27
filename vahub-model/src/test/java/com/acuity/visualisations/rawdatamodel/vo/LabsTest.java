package com.acuity.visualisations.rawdatamodel.vo;

import com.acuity.visualisations.rawdatamodel.util.DateUtils;
import com.acuity.visualisations.rawdatamodel.vo.wrappers.Lab;
import com.google.common.collect.ImmutableMap;
import org.junit.Test;

import java.util.Date;
import java.util.Map;

import static com.acuity.visualisations.rawdatamodel.util.DateUtils.toDate;
import static org.assertj.core.api.Assertions.assertThat;

/**
 *
 * @author ksnd199
 */
public class LabsTest {

    private final Map<String, Date> drugFirstDoseDate1 = ImmutableMap.<String, Date>builder().
            put("drug1", toDate("01.08.2015")).
            put("drug2", toDate("01.10.2015")).build();

    private Subject SUBJECT1 = Subject.builder().subjectId("sid1").subjectCode("E01").datasetId("test")
            .firstTreatmentDate(DateUtils.toDate("01.08.2015"))
            .dateOfRandomisation(DateUtils.toDate("02.08.2015"))
            .lastTreatmentDate(DateUtils.toDate("09.08.2016"))
            .drugFirstDoseDate(drugFirstDoseDate1).build();
    private Subject SUBJECT2 = Subject.builder().subjectId("sid2").subjectCode("E02").datasetId("test")
            .firstTreatmentDate(DateUtils.toDate("02.08.2015"))
            .dateOfRandomisation(DateUtils.toDate("03.08.2015"))
            .lastTreatmentDate(DateUtils.toDate("09.08.2015"))
            .drugFirstDoseDate(drugFirstDoseDate1).build();
  
    private Lab vital1 = new Lab(LabRaw.builder().id("1").calcChangeFromBaselineIfNull(true).calcDaysSinceFirstDoseIfNull(true).
            baseline(10.).value(20.).measurementTimePoint(toDate("04.08.2015")).daysSinceFirstDose(null).changeFromBaselineRaw(null).
            subjectId("sid1").build(), SUBJECT1);
    private Lab vital2 = new Lab(LabRaw.builder().id("1").calcChangeFromBaselineIfNull(true).calcDaysSinceFirstDoseIfNull(true).
            baseline(10.).value(20.).measurementTimePoint(toDate("04.08.2015")).daysSinceFirstDose(5).changeFromBaselineRaw(4.).
            subjectId("sid1").build(), SUBJECT1);
    private Lab vital3 =  new Lab(LabRaw.builder().id("1").calcChangeFromBaselineIfNull(false).calcDaysSinceFirstDoseIfNull(false).
            baseline(10.).value(20.).measurementTimePoint(toDate("04.08.2015")).daysSinceFirstDose(6).changeFromBaselineRaw(5.).
            subjectId("sid1").build(), SUBJECT2);   
    private Lab vital4 =  new Lab(LabRaw.builder().id("1").calcChangeFromBaselineIfNull(false).calcDaysSinceFirstDoseIfNull(false).
            baseline(10.).value(20.).measurementTimePoint(toDate("04.08.2015")).daysSinceFirstDose(null).changeFromBaselineRaw(null).
            subjectId("sid1").build(), SUBJECT2);   

    @Test
    public void shouldCalcDaysSinceFirstDoseForLab1() {

        Integer daysSinceFirstDose = vital1.getDaysSinceFirstDose();
        assertThat(daysSinceFirstDose).isEqualTo(3);
    }
    
    @Test
    public void shouldCalcDaysSinceFirstDoseForLab2() {

        Integer daysSinceFirstDose = vital2.getDaysSinceFirstDose();
        assertThat(daysSinceFirstDose).isEqualTo(5);
    }
    
    @Test
    public void shouldCalcDaysSinceFirstDoseForLab3() {

        Integer daysSinceFirstDose = vital3.getDaysSinceFirstDose();
        assertThat(daysSinceFirstDose).isEqualTo(6);
    }
    
    @Test
    public void shouldCalcDaysSinceFirstDoseForLab4() {

        Integer daysSinceFirstDose = vital4.getDaysSinceFirstDose();
        assertThat(daysSinceFirstDose).isNull();
    }
    
    @Test
    public void shouldCalcChangeFromBaselineForLab1() {

        Double changeFromBaseline = vital1.getChangeFromBaseline();
        assertThat(changeFromBaseline).isEqualTo(10.);
    }
    
    @Test
    public void shouldntCalcChangeFromBaselineForLab2() {

        Double changeFromBaseline = vital2.getChangeFromBaseline();
        assertThat(changeFromBaseline).isEqualTo(4.);
    }
    
    @Test
    public void shouldntCalcChangeFromBaselineForLab3() {

        Double changeFromBaseline = vital3.getChangeFromBaseline();
        assertThat(changeFromBaseline).isEqualTo(5.);
    }
    
    @Test
    public void shouldntCalcChangeFromBaselineForLab4() {

        Double changeFromBaseline = vital4.getChangeFromBaseline();
        assertThat(changeFromBaseline).isNull();
    }
}
