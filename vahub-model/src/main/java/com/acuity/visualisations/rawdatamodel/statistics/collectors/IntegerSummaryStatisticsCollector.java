package com.acuity.visualisations.rawdatamodel.statistics.collectors;

import java.util.EnumSet;
import java.util.Set;
import java.util.function.BiConsumer;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collector;

/**
 *
 * @author ksnd199
 */
public class IntegerSummaryStatisticsCollector implements Collector<Integer, IntegerSummaryStatistics, IntegerSummaryStatistics> {

    public static Collector<Integer, IntegerSummaryStatistics, IntegerSummaryStatistics> toIntegerSummaryStatistics() {
        return new IntegerSummaryStatisticsCollector();
    }

    @Override
    public Supplier supplier() {
        return IntegerSummaryStatistics::new;
    }

    @Override
    public Set<Characteristics> characteristics() {
        return EnumSet.of(Characteristics.CONCURRENT);
    }

    @Override
    public BiConsumer<IntegerSummaryStatistics, Integer> accumulator() {
        return (builder, t) -> builder.accept(t);
    }

    @Override
    public BinaryOperator<IntegerSummaryStatistics> combiner() {
        return (l, r) -> {
            l.combine(r);
            return l;
        };
    }

    @Override
    public Function<IntegerSummaryStatistics, IntegerSummaryStatistics> finisher() {
        return (dss) -> dss.build();
    }
}