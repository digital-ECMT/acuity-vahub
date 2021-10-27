package com.acuity.visualisations.config;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.extern.slf4j.Slf4j;

import javax.sql.DataSource;
import java.util.Map;
import java.util.WeakHashMap;

@Data
@Slf4j
@EqualsAndHashCode
public class TomcatDatasourceProperties {
    private String url;
    private String username;
    private String password;
    private String driverClassName;
    private int maxActive;
    private int maxWait;
    private int maxIdle;
    private int minIdle;
    private String validationQuery;
    private boolean testWhileIdle;
    private boolean testOnBorrow;
    private boolean testOnReturn;

    private static Map<TomcatDatasourceProperties, DataSource> dataSources = new WeakHashMap<>();

    public static DataSource getDataSourceFromProperties(TomcatDatasourceProperties properties) {
        if (dataSources == null) {
            log.error("MAP IS NULL!");
        } else {
            log.error("MAP is OK; size: " + dataSources.size());
        }

        if (properties == null) {
            log.error("PROPERTIES IS NULL");
        } else {
            log.error("PROPERTIES is OK; content: " + properties.toString());
        }

        if (dataSources.get(properties) == null) {
            log.error("VALUE NOT FOUND!");
            org.apache.tomcat.jdbc.pool.DataSource newDataSource = new org.apache.tomcat.jdbc.pool.DataSource();
            newDataSource.setDriverClassName(properties.getDriverClassName());
            newDataSource.setUrl(properties.getUrl());
            newDataSource.setUsername(properties.getUsername());
            newDataSource.setPassword(properties.getPassword());
            newDataSource.setMaxActive(properties.getMaxActive());
            newDataSource.setMinIdle(properties.getMinIdle());
            newDataSource.setMaxIdle(properties.getMaxIdle());
            newDataSource.setMaxWait(properties.getMaxWait());
            newDataSource.setTestWhileIdle(properties.isTestWhileIdle());
            newDataSource.setTestOnBorrow(properties.isTestOnBorrow());
            newDataSource.setTestOnReturn(properties.isTestOnReturn());
            newDataSource.setValidationQuery(properties.getValidationQuery());
            dataSources.put(properties, newDataSource);
        } else {
            log.error("VALUE FOUND!");
        }

        return dataSources.get(properties);
    }
}
