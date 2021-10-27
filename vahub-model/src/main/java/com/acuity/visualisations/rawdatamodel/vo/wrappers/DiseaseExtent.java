package com.acuity.visualisations.rawdatamodel.vo.wrappers;

import com.acuity.visualisations.rawdatamodel.vo.DiseaseExtentRaw;
import com.acuity.visualisations.rawdatamodel.vo.EntityAttribute;
import com.acuity.visualisations.rawdatamodel.vo.GroupByOption;
import com.acuity.visualisations.rawdatamodel.vo.Subject;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public final class DiseaseExtent extends SubjectAwareWrapper<DiseaseExtentRaw> {

    public DiseaseExtent(DiseaseExtentRaw event, Subject subject) {
        super(event, subject);
    }

    public enum Attributes implements GroupByOption<DiseaseExtent> {

        ID(EntityAttribute.attribute("id", (DiseaseExtent e) -> e.getEvent().getId())),
        STUDY_ID(EntityAttribute.attribute("studyId", (DiseaseExtent e) -> e.getSubject().getClinicalStudyCode())),
        STUDY_PART(EntityAttribute.attribute("studyPart", (DiseaseExtent e) -> e.getSubject().getStudyPart())),
        SUBJECT_ID(EntityAttribute.attribute("subjectId", (DiseaseExtent e) -> e.getSubject().getSubjectId())),
        SUBJECT(EntityAttribute.attribute("subject", (DiseaseExtent e) -> e.getSubject().getSubjectCode())),
        RECENT_PROGRESSION_DATE(EntityAttribute.attribute("recentProgressionDate", (DiseaseExtent e) -> e.getEvent().getRecentProgressionDate()));

        @Getter
        private final EntityAttribute<DiseaseExtent> attribute;

        Attributes(EntityAttribute<DiseaseExtent> attribute) {
            this.attribute = attribute;
        }
    }
}