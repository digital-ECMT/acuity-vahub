package com.acuity.visualisations.rawdatamodel.filters;

import org.junit.Test;

import java.util.Arrays;
import java.util.HashSet;

import static com.google.common.collect.Sets.newHashSet;
import static org.assertj.core.api.Assertions.assertThat;

public class SetFilterTest {

    @Test
    public void testSetFrom() {
        SetFilter<String> setFilter = new SetFilter<>(newHashSet("subject1", "subject2"));
        assertThat(setFilter.getValues()).containsExactly("subject1", "subject2");
    }

    @Test
    public void testIsValid() {
        SetFilter<String> setFilter = new SetFilter<>();
        assertThat(setFilter.isValid()).isFalse();
        setFilter = new SetFilter<>(newHashSet("subject1", "subject2"));
        assertThat(setFilter.isValid()).isTrue();
        setFilter = new SetFilter<String>(new HashSet<>(), true);
        assertThat(setFilter.isValid()).isTrue();
    }

    @Test
    public void testCompleteWithValue() {

        SetFilter<String> setFilter = new SetFilter<>();
        setFilter.completeWithValue("subject1");
        assertThat(setFilter.getValues()).containsExactly("subject1");
        setFilter.completeWithValue("subject2");
        assertThat(setFilter.getSortedValues()).containsExactly("subject1", "subject2");
        assertThat(setFilter.getIncludeEmptyValues()).isFalse();
        setFilter.completeWithValue(null);
        assertThat(setFilter.getSortedValues()).containsExactly("subject1", "subject2", null);
        assertThat(setFilter.getIncludeEmptyValues()).isTrue();
    }

    @Test
    public void testComplete() {

        SetFilter<String> setFilter = new SetFilter<>();
        SetFilter<String> setFilter2 = new SetFilter<>();
        setFilter2.completeWithValue("subject1");
        setFilter.complete(setFilter2);
        assertThat(setFilter.getValues()).containsExactly("subject1");
        assertThat(setFilter.getIncludeEmptyValues()).isFalse();
        SetFilter<String> setFilter3 = new SetFilter<>();
        setFilter3.completeWithValue("subject2");
        setFilter3.setIncludeEmptyValues(true);
        setFilter.complete(setFilter3);
        assertThat(setFilter.getSortedValues()).containsExactly("subject1", "subject2");
        assertThat(setFilter.getIncludeEmptyValues()).isTrue();
    }

    @Test
    public void testSorting() {
        SetFilter<String> setFilter = new SetFilter<>();

        setFilter.setSortedValues(Arrays.asList("E000010270", "E0000100143", "E0000100057"));
        assertThat(setFilter.getSortedValues()).containsExactly("E000010270", "E0000100057", "E0000100143");

        setFilter.setSortedValues(Arrays.asList("no", "yes"));
        setFilter.setSortedValues(Arrays.asList("no", "yes"));

        setFilter.setSortedValues(Arrays.asList("013", "0000014"));
        setFilter.setSortedValues(Arrays.asList("013", "0000014"));

        setFilter.setSortedValues(Arrays.asList("Cohort C1 (solid tumour)", "Cohort C4"));
        assertThat(setFilter.getSortedValues()).containsExactly("Cohort C1 (solid tumour)", "Cohort C4");


        setFilter.setSortedValues(Arrays.asList("3", "222", "222.01"));
        assertThat(setFilter.getSortedValues()).containsExactly("3", "222", "222.01");

        setFilter.setSortedValues(Arrays.asList("60 mg", "100 mg", "10 mg"));
        assertThat(setFilter.getSortedValues()).containsExactly("10 mg", "60 mg", "100 mg");
    }
}
