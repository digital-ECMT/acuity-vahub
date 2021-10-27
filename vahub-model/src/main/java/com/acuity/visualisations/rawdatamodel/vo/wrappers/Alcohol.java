package com.acuity.visualisations.rawdatamodel.vo.wrappers;

import com.acuity.visualisations.rawdatamodel.vo.AlcoholRaw;
import com.acuity.visualisations.rawdatamodel.vo.EntityAttribute;
import com.acuity.visualisations.rawdatamodel.vo.GroupByOption;
import com.acuity.visualisations.rawdatamodel.vo.Subject;
import java.io.Serializable;
import lombok.Getter;
import lombok.ToString;

@ToString(callSuper = true)
public class Alcohol extends SubjectAwareWrapper<AlcoholRaw> implements Serializable {
    public Alcohol(AlcoholRaw event, Subject subject) {
        super(event, subject);
    }

    public enum Attributes implements GroupByOption<Alcohol> {

        ID(EntityAttribute.attribute("id", (Alcohol e) -> e.getEvent().getId())),
        STUDY_ID(EntityAttribute.attribute("studyId", (Alcohol e) -> e.getSubject().getClinicalStudyCode())),
        STUDY_PART(EntityAttribute.attribute("studyPart", (Alcohol e) -> e.getSubject().getStudyPart())),
        SUBJECT_ID(EntityAttribute.attribute("subjectId", (Alcohol e) -> e.getSubject().getSubjectId())),
        SUBJECT(EntityAttribute.attribute("subject", (Alcohol e) -> e.getSubject().getSubjectCode())),
        SUBSTANCE_CATEGORY(EntityAttribute.attribute("substanceCategory", (Alcohol e) -> e.getEvent().getSubstanceCategory())),
        SUBSTANCE_USE_OCCURRENCE(EntityAttribute.attribute("substanceUseOccurrence", (Alcohol e) -> e.getEvent().getSubstanceUseOccurrence())),
        SUBSTANCE_TYPE(EntityAttribute.attribute("substanceType", (Alcohol e) -> e.getEvent().getSubstanceType())),
        OTHER_SUBSTANCE_TYPE_SPEC(EntityAttribute.attribute("otherSubstanceTypeSpec", (Alcohol e) -> e.getEvent().getOtherSubstanceTypeSpec())),
        FREQUENCY(EntityAttribute.attribute("frequency", (Alcohol e) -> e.getEvent().getFrequency())),
        SUBSTANCE_TYPE_USE_OCCURRENCE(EntityAttribute.attribute("substanceTypeUseOccurrence", (Alcohol e) -> e.getEvent().getSubstanceTypeUseOccurrence())),
        SUBSTANCE_CONSUMPTION(EntityAttribute.attribute("substanceConsumption", (Alcohol e) -> e.getEvent().getSubstanceConsumption())),
        START_DATE(EntityAttribute.attribute("startDate", (Alcohol e) -> e.getEvent().getStartDate())),
        END_DATE(EntityAttribute.attribute("endDate", (Alcohol e) -> e.getEvent().getEndDate()));

        @Getter
        private final EntityAttribute<Alcohol> attribute;

        Attributes(EntityAttribute<Alcohol> attribute) {
            this.attribute = attribute;
        }
    }
}
