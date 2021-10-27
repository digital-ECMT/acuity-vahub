package com.acuity.visualisations.rest.resources;

import com.acuity.visualisations.rawdatamodel.service.event.CtDnaService;
import com.acuity.visualisations.rest.model.request.DetailsOnDemandRequest;
import com.acuity.visualisations.rest.test.config.DisableAutowireRequiredInitializer;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockServletContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static com.acuity.visualisations.config.util.TestConstants.DUMMY_DETECT_DATASETS;
import static com.google.common.collect.Sets.newHashSet;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyLong;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(
        initializers = DisableAutowireRequiredInitializer.class,
        classes = {MockServletContext.class}
)
@WebAppConfiguration
public class CtDnaResourceTest {
    @InjectMocks
    private CtDnaResource ctDnaResource;
    @Mock
    private CtDnaService dnaService;
    private MockMvc mvc;
    private static ObjectMapper mapper;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mvc = MockMvcBuilders.standaloneSetup(ctDnaResource).build();

        mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @Test
    public void shouldGetDetailsOnDemandData() throws Exception {
        DetailsOnDemandRequest requestBody = new DetailsOnDemandRequest();
        requestBody.setDatasets(DUMMY_DETECT_DATASETS.getDatasetsList());
        requestBody.setEventIds(newHashSet("1"));
        requestBody.setSortAttrs(Collections.emptyList());
        requestBody.setStart(0);

        List<Map<String, String>> mockedResponse = new ArrayList();
        Map<String, String> mockedItem = new HashMap<>();
        mockedItem.put("key1", "value1");
        mockedResponse.add(mockedItem);

        when(dnaService.getDetailsOnDemandData(eq(DUMMY_DETECT_DATASETS), any(Set.class), any(), anyLong(), anyLong()))
                .thenReturn(mockedResponse);

        MockHttpServletRequestBuilder post = MockMvcRequestBuilders.
                post("/resources/ctdna/details-on-demand").
                content(mapper.writeValueAsString(requestBody)).
                contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mvc.perform(post)
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        List<Map<String, String>> response =
                mapper.readValue(result.getResponse().getContentAsString(), new TypeReference<List<Map<String, String>>>() {
                });

        assertThat(response.get(0).get("key1")).isEqualTo("value1");

        verify(dnaService, times(1)).getDetailsOnDemandData(eq(DUMMY_DETECT_DATASETS),
                any(Set.class), any(), anyLong(), anyLong());
        verifyNoMoreInteractions(dnaService);
    }
}
