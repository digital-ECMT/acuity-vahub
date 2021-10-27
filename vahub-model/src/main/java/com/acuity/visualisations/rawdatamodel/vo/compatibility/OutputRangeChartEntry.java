package com.acuity.visualisations.rawdatamodel.vo.compatibility;

import com.acuity.visualisations.rawdatamodel.vo.plots.RangeChartCalculationObject;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode
public final class OutputRangeChartEntry implements Serializable {
    private String x;
    private Double xRank;
    private Integer dataPoints;
    private Double y;
    private Double min;
    private Double max;
    private Double stdDev;
    private Double stdErr;
    private String name;

    public static OutputRangeChartEntry of(String x, Double xRank, RangeChartCalculationObject boxplot, StatType yType) {
        if (boxplot != null) {
            return OutputRangeChartEntry.builder()
                    .xRank(xRank)
                    .x(x)
                    .dataPoints(boxplot.getDataPoints())
                    .y(yType == StatType.MEAN ? boxplot.getMean() : boxplot.getMedian())
                    .min(yType == StatType.MEAN
                            ? countDiff(boxplot)
                            : boxplot.getMin())
                    .max(yType == StatType.MEAN
                            ? countSum(boxplot)
                            : boxplot.getMax())
                    .stdDev(boxplot.getStdDev())
                    .stdErr(boxplot.getStdErr())
                    .name(boxplot.getName())
                    .build();
        }
        return empty(x, xRank);
    }

    private static Double countDiff(RangeChartCalculationObject boxplot) {
        if (boxplot.getMean() == null || boxplot.getStdErr() == null) {
            return null;
        }
        return boxplot.getMean() - boxplot.getStdErr();
    }

    private static Double countSum(RangeChartCalculationObject boxplot) {
        if (boxplot.getMean() == null || boxplot.getStdErr() == null) {
            return null;
        }
        return boxplot.getMean() + boxplot.getStdErr();
    }

    public static OutputRangeChartEntry empty(String x, Double xRank) {
        return OutputRangeChartEntry.builder()
                .xRank(xRank)
                .x(x)
                .dataPoints(0)
                .build();
    }
}
