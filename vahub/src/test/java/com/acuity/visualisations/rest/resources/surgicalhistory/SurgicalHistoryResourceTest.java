package com.acuity.visualisations.rest.resources.surgicalhistory;

import com.acuity.visualisations.rawdatamodel.filters.PopulationFilters;
import com.acuity.visualisations.rawdatamodel.filters.SetFilter;
import com.acuity.visualisations.rawdatamodel.filters.SurgicalHistoryFilters;
import com.acuity.visualisations.rawdatamodel.service.event.SurgicalHistoryService;
import com.acuity.visualisations.rest.model.request.SingleSubjectRequest;
import com.acuity.visualisations.rest.model.request.surgicalhistory.SurgicalHistoryRequest;
import com.acuity.visualisations.rest.model.response.DetailsOnDemandResponse;
import com.acuity.va.security.acl.domain.Datasets;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import static com.acuity.visualisations.config.util.TestConstants.DUMMY_DETECT_DATASETS;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasKey;
import static org.hamcrest.Matchers.hasValue;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = SurgicalHistoryResource.class, secure = false)
public class SurgicalHistoryResourceTest {
    private static final String BASE_URL = "/resources/surgical-history";

    @Autowired
    private MockMvc mvc;

    @MockBean
    private SurgicalHistoryService surgicalHistoryService;

    private ObjectMapper mapper = new ObjectMapper();

    @Test
    public void shouldGetAvailableFilters() throws Exception {
        SurgicalHistoryFilters filters = new SurgicalHistoryFilters();
        filters.setCurrentMedication(new SetFilter<>(Arrays.asList("current_medication")));

        SurgicalHistoryRequest request = new SurgicalHistoryRequest();
        request.setDatasets(DUMMY_DETECT_DATASETS.getDatasetsList());
        request.setSurgicalHistoryFilters(filters);
        request.setPopulationFilters(PopulationFilters.empty());

        when(surgicalHistoryService.getAvailableFilters(any(Datasets.class),
                any(SurgicalHistoryFilters.class), any(PopulationFilters.class)))
                .thenReturn(filters);

        this.mvc.perform(post(BASE_URL + "/filters")
                .content(mapper.writeValueAsString(request))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.currentMedication.values[0]", equalTo("current_medication")))
                .andReturn();

        verify(surgicalHistoryService, times(1))
                .getAvailableFilters(eq(DUMMY_DETECT_DATASETS), any(SurgicalHistoryFilters.class), any(PopulationFilters.class));
        verifyNoMoreInteractions(surgicalHistoryService);
    }

    @Test
    public void shouldGetSingleSubjectData() throws Exception {
        SingleSubjectRequest<SurgicalHistoryFilters> requestBody = new SingleSubjectRequest();
        requestBody.setEventFilters(SurgicalHistoryFilters.empty());
        requestBody.setSubjectId("subject_id");
        requestBody.setDatasets(DUMMY_DETECT_DATASETS.getDatasetsList());

        Map<String, String> dodMap = new HashMap<>();
        dodMap.put("column_1", "value_1");
        dodMap.put("column_2", "value_2");

        DetailsOnDemandResponse responseToReturn = new DetailsOnDemandResponse(Arrays.asList(dodMap));

        when(surgicalHistoryService.getDetailsOnDemandData(any(Datasets.class), anyString(), any(SurgicalHistoryFilters.class)))
                .thenReturn(responseToReturn.getDodData());

        MockHttpServletRequestBuilder post = MockMvcRequestBuilders.
                post(BASE_URL + "/single-subject").
                content(mapper.writeValueAsString(requestBody)).
                contentType(MediaType.APPLICATION_JSON);

        mvc.perform(post)
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.dodData[0]", hasKey("column_2")))
                .andExpect(jsonPath("$.dodData[0]", hasValue("value_2")))
                .andExpect(jsonPath("$.dodData[0]", hasKey("column_1")))
                .andExpect(jsonPath("$.dodData[0]", hasValue("value_1")))
                .andReturn();

        verify(surgicalHistoryService, times(1))
                .getDetailsOnDemandData(eq(DUMMY_DETECT_DATASETS), anyString(), any(SurgicalHistoryFilters.class));
        verifyNoMoreInteractions(surgicalHistoryService);
    }
}
