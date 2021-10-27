package com.acuity.visualisations.rawdatamodel.metadata;

import com.acuity.visualisations.common.study.metadata.MetadataItem;
import com.acuity.visualisations.rawdatamodel.Constants;
import com.acuity.visualisations.rawdatamodel.dataproviders.AeIncidenceDatasetsDataProvider;
import com.acuity.visualisations.rawdatamodel.service.dod.DoDCommonService;
import com.acuity.visualisations.rawdatamodel.util.Column;
import com.acuity.visualisations.rawdatamodel.vo.AeRaw;
import com.acuity.visualisations.rawdatamodel.vo.Subject;
import com.acuity.visualisations.rawdatamodel.vo.wrappers.Ae;
import com.acuity.va.security.acl.domain.Datasets;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.HashMap;

import static com.google.common.collect.Lists.newArrayList;
import static net.javacrumbs.jsonunit.fluent.JsonFluentAssert.assertThatJson;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyCollection;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class AeModuleMetadataTest {
    @InjectMocks
    private AeModuleMetadata moduleMetadata;
    @Mock
    private AeIncidenceDatasetsDataProvider aeIncidenceDatasetsDataProvider;
    @Mock
    private DoDCommonService doDCommonService;

    @Before
    public void setUp() {
        moduleMetadata.aeIncidenceDatasetsDataProvider = aeIncidenceDatasetsDataProvider;
    }

    @Test
    public void shouldGetMetadata() {
        //Given
        when(aeIncidenceDatasetsDataProvider.loadData(any(Datasets.class))).thenReturn(newArrayList(
                new Ae(new AeRaw(), new Subject()),
                new Ae(new AeRaw(), new Subject())));
        final HashMap<String, String> cols = new HashMap<>();
        cols.put("column1", "title 1");
        cols.put("column2", "title 2");
        when(doDCommonService.getDoDColumns(any(Column.DatasetType.class), anyCollection())).thenReturn(cols);

        //When
        MetadataItem result = moduleMetadata.getMetadataItem(Constants.DATASETS);

        //Then
        assertThat(result.getKey()).isEqualTo("aes");
        String json = result.build();
        assertThat(json).contains("\"count\": 2");
        assertThat(json).contains("\"hasData\": true");
        assertThatJson(json).node("aes.detailsOnDemandColumns").isEqualTo(newArrayList("column1", "column2"));
//        assertThatJson(json).node("aes-java." + AVAILABLE_YAXIS_OPTIONS).isEqualTo(newArrayList(
//                "REF_RANGE_NORM_VALUE",
//                "TIMES_UPPER_REF_VALUE",
//                "TIMES_LOWER_REF_VALUE",
//                "ABSOLUTE_CHANGE_FROM_BASELINE",
//                "PERCENTAGE_CHANGE_FROM_BASELINE",
//                "ACTUAL_VALUE"));
    }
}
