package com.acuity.visualisations.rawdatamodel.vo;

import com.acuity.visualisations.rawdatamodel.util.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

import static com.acuity.visualisations.rawdatamodel.util.Constants.NOT_IMPLEMENTED;

@EqualsAndHashCode(of = "id")
@ToString
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@AcuityEntity(version = 2)
public class DoseDiscRaw implements HasStringId, HasSubjectId, Serializable {

    private String id;
    private String subjectId;

    @Column(order = 1, displayName = "Study drug", type = Column.Type.SSV)
    @Column(order = 1, displayName = "Study drug",
            type = Column.Type.DOD, datasetType = Column.DatasetType.ACUITY)
    private String studyDrug;
    private String permanentDisc;
    @Column(order = 2,
            displayName = "Date of IP discontinuation",
            type = Column.Type.DOD,
            datasetType = Column.DatasetType.ACUITY,
            defaultSortBy = true,
            defaultSortOrder = 1)
    @Column(order = 3, displayName = "Date of IP discontinuation", type = Column.Type.SSV)
    private Date discDate;
    @Column(order = 4, displayName = "Main reason for IP discontinuation",
            type = Column.Type.DOD, datasetType = Column.DatasetType.ACUITY)
    @Column(order = 5, displayName = "Main reason for IP discontinuation", type = Column.Type.SSV)
    private String discReason;
    @Column(order = 5, displayName = "IP discontinuation specification",
            type = Column.Type.DOD, datasetType = Column.DatasetType.ACUITY)
    private String ipDiscSpec;
    @Column(order = 6, displayName = "Subject decision specification",
            type = Column.Type.DOD, datasetType = Column.DatasetType.ACUITY)
    private String subjectDecisionSpec;
    @Column(order = 7, displayName = "Other subject decision specification",
            type = Column.Type.DOD, datasetType = Column.DatasetType.ACUITY)
    private String subjectDecisionSpecOther;

    @Column(order = 2, columnName = "permanentDisc", displayName = "Permanent discontinuation", type = Column.Type.SSV)
    public String getPermanentDisc() {
        return NOT_IMPLEMENTED;
    }
}
