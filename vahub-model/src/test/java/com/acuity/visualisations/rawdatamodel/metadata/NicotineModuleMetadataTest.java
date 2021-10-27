package com.acuity.visualisations.rawdatamodel.metadata;

import com.acuity.visualisations.common.study.metadata.MetadataItem;
import com.acuity.visualisations.rawdatamodel.Constants;
import com.acuity.visualisations.rawdatamodel.dataproviders.NicotineDatasetsDataProvider;
import com.acuity.visualisations.rawdatamodel.service.dod.DoDCommonService;
import com.acuity.visualisations.rawdatamodel.util.Column;
import com.acuity.visualisations.rawdatamodel.vo.NicotineRaw;
import com.acuity.visualisations.rawdatamodel.vo.Subject;
import com.acuity.visualisations.rawdatamodel.vo.wrappers.Nicotine;
import com.acuity.va.security.acl.domain.Datasets;
import org.assertj.core.api.JUnitSoftAssertions;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;

import static net.javacrumbs.jsonunit.fluent.JsonFluentAssert.assertThatJson;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyCollection;
import static org.mockito.Mockito.when;

public class NicotineModuleMetadataTest {
    @InjectMocks
    private NicotineModuleMetadata moduleMetadata;
    @Mock
    private NicotineDatasetsDataProvider datasetsDataProvider;
    @Mock
    private DoDCommonService dodCommonService;

    @Rule
    public final JUnitSoftAssertions softly = new JUnitSoftAssertions();

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        moduleMetadata.datasetsDataProvider = Collections.singletonList(datasetsDataProvider);
    }

    @Test
    public void shouldGetMetadata() {
        //Given
        when(datasetsDataProvider.loadData(any(Datasets.class))).thenReturn(Arrays.asList(
                new Nicotine(NicotineRaw.builder().build(), Subject.builder().build()),
                new Nicotine(NicotineRaw.builder().build(), Subject.builder().build()),
                new Nicotine(NicotineRaw.builder().build(), Subject.builder().build())));

        final HashMap<String, String> cols = new HashMap<>();
        cols.put("column1", "title 1");
        cols.put("column2", "title 2");
        when(dodCommonService.getDoDColumns(any(Column.DatasetType.class), anyCollection())).thenReturn(cols);

        //When
        MetadataItem result = moduleMetadata.getMetadataItem(Constants.DATASETS);

        //Then
        softly.assertThat(result.getKey()).isEqualTo("nicotine");
        String json = result.build();
        softly.assertThat(json).contains("\"count\": 3");
        softly.assertThat(json).contains("\"hasData\": true");
        assertThatJson(json).node("nicotine.detailsOnDemandColumns").isEqualTo(Arrays.asList("column1", "column2"));
    }
}
