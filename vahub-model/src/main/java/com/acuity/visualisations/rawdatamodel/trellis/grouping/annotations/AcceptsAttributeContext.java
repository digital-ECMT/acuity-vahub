package com.acuity.visualisations.rawdatamodel.trellis.grouping.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Created by knml167 on 9/7/2017.
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface AcceptsAttributeContext {
    boolean required() default true;
}
