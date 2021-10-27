package com.acuity.visualisations.rawdatamodel.dataset.info;

import com.acuity.visualisations.common.lookup.AcuityRepository;
import com.acuity.va.security.acl.domain.ClinicalStudy;
import com.acuity.va.security.acl.domain.vasecurity.ClinicalStudyInfo;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * map_clinical_study.mcs_study_id is the study name
 * 
 * @author Glen
 */
@AcuityRepository
@Transactional(readOnly = true)
public interface InfoStudyRepository {

    String ALL_STUDIES = "SELECT DISTINCT mcs_study_id AS study_id, mcs_study_name AS study_name, mpr_drug_display_name AS drug_project"
            + " FROM map_clinical_study "
            + "JOIN map_project_rule ON map_project_rule.mpr_id = map_clinical_study.mcs_mpr_id";
    /**
     * High-level information of the clinical study for the name
     */
    @Select(ALL_STUDIES
            + " WHERE mcs_study_id = #{name} ")
    @Results(value = {
        @Result(property = "code", column = "study_id"),
        @Result(property = "name", column = "study_name"),
        @Result(property = "drugProgramme", column = "drug_project")
    })
    ClinicalStudyInfo getClinicalStudyInfo(ClinicalStudy clinicalStudy);
  
    /**
     * List all clinical studies
     */
    @Select("SELECT DISTINCT study_id "
            + " FROM ("
            + ALL_STUDIES
            + " ) as all_studies")
    List<String> listClinicalStudyCodes();
}
