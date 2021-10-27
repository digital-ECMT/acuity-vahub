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

@Getter
@EqualsAndHashCode(of = "id")
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder(toBuilder = true)
@AcuityEntity(version = 4)
public class QtProlongationRaw implements HasStringId, HasSubjectId, Serializable {
    private String id;
    private String subjectId;
    @Column(columnName = "measurementCategory", order = 1, displayName = "Measurement category")
    private String measurementCategory;
    @Column(columnName = "measurementName", order = 2, displayName = "Measurement name")
    private String measurementName;
    @Column(columnName = "measurementTimePoint", order = 3, displayName = "Measurement time point")
    private Date measurementTimePoint;
    @Column(columnName = "daysOnStudy", order = 4, displayName = "Days on study")
    private Integer daysOnStudy;
    @Column(columnName = "visitNumber", order = 5, displayName = "Visit number")
    private Double visitNumber;
    @Column(columnName = "resultValue", order = 6, displayName = "Result value")
    private Double resultValue;
    @Column(columnName = "alertLevel", order = 7, displayName = "Algorithm outcome")
    private String alertLevel;
    @Column(columnName = "sourceName", order = 8, displayName = "Source name")
    private String sourceName;
    @Column(columnName = "sourceVersion", order = 9, displayName = "Source version")
    private String sourceVersion;
    @Column(columnName = "sourceType", order = 10, displayName = "Source type")
    private String sourceType;
    private Date doseFirstDate;
}
