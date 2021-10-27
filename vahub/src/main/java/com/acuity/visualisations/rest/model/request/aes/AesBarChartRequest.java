package com.acuity.visualisations.rest.model.request.aes;

import com.acuity.visualisations.rawdatamodel.axes.CountType;
import com.acuity.visualisations.rawdatamodel.trellis.grouping.AeGroupByOptions;
import com.acuity.visualisations.rawdatamodel.trellis.grouping.ChartGroupByOptionsFiltered;
import com.acuity.visualisations.rawdatamodel.vo.wrappers.Ae;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotNull;

@Data
@EqualsAndHashCode(callSuper = true)
public class AesBarChartRequest extends AesRequest {
    @NotNull
    private ChartGroupByOptionsFiltered<Ae, AeGroupByOptions> settings;
    @NotNull
    private CountType countType;
}
