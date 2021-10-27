package com.acuity.visualisations.rest.resources;

import com.acuity.visualisations.rawdatamodel.axes.AxisOptions;
import com.acuity.visualisations.rawdatamodel.filters.CvotEndpointFilters;
import com.acuity.visualisations.rawdatamodel.filters.Filters;
import com.acuity.visualisations.rawdatamodel.service.event.CvotEndpointService;
import com.acuity.visualisations.rawdatamodel.trellis.TrellisOptions;
import com.acuity.visualisations.rawdatamodel.trellis.grouping.CvotEndpointGroupByOptions;
import com.acuity.visualisations.rawdatamodel.vo.compatibility.TrellisedBarChart;
import com.acuity.visualisations.rawdatamodel.vo.compatibility.TrellisedOvertime;
import com.acuity.visualisations.rawdatamodel.vo.plots.SelectionDetail;
import com.acuity.visualisations.rawdatamodel.vo.wrappers.CvotEndpoint;
import com.acuity.visualisations.rest.model.request.cvot.endpoint.CvotEndpointBarChartRequest;
import com.acuity.visualisations.rest.model.request.cvot.endpoint.CvotEndpointBarChartSelectionRequest;
import com.acuity.visualisations.rest.model.request.cvot.endpoint.CvotEndpointBarLineChartRequest;
import com.acuity.visualisations.rest.model.request.cvot.endpoint.CvotEndpointRequest;
import com.acuity.visualisations.rest.model.request.DetailsOnDemandRequest;
import com.acuity.visualisations.rest.model.request.SingleSubjectRequest;
import com.acuity.visualisations.rest.util.Constants;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping(value = "/resources/cvotendpoint", consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
@CacheConfig(keyGenerator = "datasetsKeyGenerator", cacheResolver = "refreshableCacheResolver")
@PreAuthorize(Constants.PRE_AUTHORISE_VISUALISATION)
@Api(value = "/resources/cvotendpoint", description = "rest endpoints for cvotendpoint")
public class CvotEndpointResource {

    @Autowired
    private CvotEndpointService cvotEndpointService;

    private static void setDownloadHeaders(HttpServletResponse response) {
        response.addHeader("Content-disposition", "attachment;filename=details_on_demand.csv");
        response.setContentType("txt/csv");
    }

    @ApiOperation(
            value = "Gets the bar charts for requested trellising",
            nickname = "getBarChartData",
            response = List.class,
            httpMethod = "POST"
    )
    @RequestMapping(value = "/countsbarchart", method = POST)
    @Cacheable(condition = Constants.EMPTY_EVENT_AND_POPULATION_FILTER)
    public List<TrellisedBarChart<CvotEndpoint, CvotEndpointGroupByOptions>> getBarChartData(
            @ApiParam(value = "CvotEndpointBarChartRequest: Request parameters for the bar chart plots e.g. "
                    + "{trellising : [{trellisedBy: 'FINAL_DIAGNOSIS', options: ['d1', 'd2']}], "
                    + "cvotEndpointFilters: {}, populationFilters: {}, countType:'COUNT_OF_SUBJECTS', demographicsType: {}", required = true)
            @RequestBody CvotEndpointBarChartRequest requestBody) {
        return cvotEndpointService.getBarChart(requestBody.getDatasetsObject(), requestBody.getSettings(), requestBody.getEventFilters(),
                requestBody.getPopulationFilters(), requestBody.getCountType());
    }

    @ApiOperation(
            value = "Get additional suspected CVOT endpoints over time",
            nickname = "getLineBarChartData",
            response = List.class,
            httpMethod = "POST"
    )
    @RequestMapping(value = "/overtime", method = POST)
    @Cacheable(condition = Constants.EMPTY_EVENT_AND_POPULATION_FILTER)
    public List<TrellisedOvertime<CvotEndpoint, CvotEndpointGroupByOptions>> getLineBarChartData(
            @ApiParam(value = "BarLineChartRequest: Request parameters for the bar line chart e.g. "
                    + "categoryType: {value: 'START_DATE', intarg: 1, stringarg: null}, {trellising : [], "
                    + "cvotEndpointFilters: {}, populationFilters: {}", required = true)
            @RequestBody CvotEndpointBarLineChartRequest requestBody) {
        return cvotEndpointService.getLineBarChart(requestBody.getDatasetsObject(), requestBody.getSettings(), requestBody.getEventFilters(),
                requestBody.getPopulationFilters());
    }

    @ApiOperation(
            value = "Gets the available trellising and options",
            nickname = "getAvailableTrellising",
            response = Set.class,
            httpMethod = "POST"
    )
    @RequestMapping(value = "/trellising", method = POST)
    @Cacheable(condition = Constants.EMPTY_EVENT_AND_POPULATION_FILTER)
    public List<TrellisOptions<CvotEndpointGroupByOptions>> getAvailableTrellising(
            @ApiParam(value = "CvotEndpointTrellisingRequest:  CvotEndpoint and Population Filters e.g. {cvotEndpointFilters : {}, "
                    + "populationFilters: {}, countType: 'COUNT_OF_EVENTS'}",
                    required = true)
            @RequestBody @Valid CvotEndpointRequest requestBody) {
        return cvotEndpointService.getTrellisOptions(requestBody.getDatasetsObject(), requestBody.getEventFilters(),
                requestBody.getPopulationFilters());
    }

    @RequestMapping(value = "/colorby-options", method = POST)
    @Cacheable(condition = Constants.EMPTY_EVENT_AND_POPULATION_FILTER)
    public List<TrellisOptions<CvotEndpointGroupByOptions>> getAvailableColorBy(
            @RequestBody @Valid CvotEndpointRequest requestBody) {
        return cvotEndpointService.getBarChartColorBy(requestBody.getDatasetsObject(), requestBody.getEventFilters(),
                requestBody.getPopulationFilters());
    }

    @ApiOperation(
            value = "Gets the available cvotendpoint filters for the currently selected cvotendpoint and population filters",
            nickname = "getAvailableFilters",
            response = CvotEndpointFilters.class,
            httpMethod = "POST"
    )
    @RequestMapping(value = "/filters", method = POST)
    @Cacheable(condition = Constants.EMPTY_EVENT_AND_POPULATION_FILTER)
    public Filters<CvotEndpoint> getAvailableFilters(@ApiParam(
            value = "CvotEndpointRequest:  CvotEndpoint and Population Filters e.g. {cvotEndpointFilters : {}, populationFilters: {}}", required = true)
                                                     @RequestBody @Valid CvotEndpointRequest requestBody) {
        return cvotEndpointService.getAvailableFilters(requestBody.getDatasetsObject(),
                requestBody.getEventFilters(),
                requestBody.getPopulationFilters());
    }

    @ApiOperation(
            value = "Gets the available bar chart axis",
            nickname = "getBarChartXAxis",
            response = List.class,
            httpMethod = "POST"
    )
    @RequestMapping(value = "/countsbarchart-xaxis", method = POST)
    @Cacheable(condition = Constants.EMPTY_EVENT_AND_POPULATION_FILTER)
    public AxisOptions<CvotEndpointGroupByOptions> getBarChartXAxis(@ApiParam(
            value = "CvotEndpointRequest:  CvotEndpoint and Population Filters e.g. {cvotEndpointFilters : {}, populationFilters: {}}", required = true)
                                                                    @RequestBody @Valid CvotEndpointRequest requestBody) {
        return cvotEndpointService.getAvailableBarChartXAxis(requestBody.getDatasetsObject(),
                requestBody.getEventFilters(),
                requestBody.getPopulationFilters());
    }

    @ApiOperation(
            value = "Gets the available overtime chart axis",
            nickname = "getOvertimeXAxis",
            response = List.class,
            httpMethod = "POST"
    )
    @RequestMapping(value = "/overtime-xaxis", method = POST)
    @Cacheable(condition = Constants.EMPTY_EVENT_AND_POPULATION_FILTER)
    public AxisOptions<CvotEndpointGroupByOptions> getOvertimeXAxis(@ApiParam(
            value = "CvotEndpointRequest:  CvotEndpoint and Population Filters e.g. {cvotEndpointFilters : {}, populationFilters: {}}", required = true)
                                                                    @RequestBody @Valid CvotEndpointRequest requestBody) {
        return cvotEndpointService.getAvailableOverTimeChartXAxis(requestBody.getDatasetsObject(),
                requestBody.getEventFilters(),
                requestBody.getPopulationFilters());
    }

    @ApiOperation(
            value = "Gets selection details for bar chart",
            nickname = "getSelectionDetailWithinBarChart",
            response = SelectionDetail.class,
            httpMethod = "POST"
    )
    @RequestMapping(value = "/selection", method = POST)
    public SelectionDetail getSelectionDetailWithinBarChart(
            @RequestBody @Valid CvotEndpointBarChartSelectionRequest requestBody) {
        return cvotEndpointService.getSelectionDetails(requestBody.getDatasetsObject(), requestBody.getEventFilters(),
                requestBody.getPopulationFilters(), requestBody.getSelection());
    }

    @ApiOperation(
            value = "Gets details on demand data",
            nickname = "getDetailsOnDemandData",
            response = List.class,
            httpMethod = "POST"
    )
    @RequestMapping(value = "/details-on-demand", method = POST)
    public List<Map<String, String>> getDetailsOnDemandData(
            @ApiParam(value = "Details On Demand Request body: A list of event IDs to get the data for e.g. "
                    + "['ev-1', 'ev-2']", required = true)
            @RequestBody @Valid DetailsOnDemandRequest requestBody) {

        return cvotEndpointService.getDetailsOnDemandData(
                requestBody.getDatasetsObject(), requestBody.getEventIds(), requestBody.getSortAttrs(),
                requestBody.getStart(), (long) requestBody.getEnd() - requestBody.getStart());
    }

    @ApiOperation(
            value = "Downloads all of the data for the details on demand table",
            nickname = "getAllDetailsOnDemandCsv",
            response = List.class,
            httpMethod = "POST"
    )
    @RequestMapping(value = "/download-details-on-demand", method = POST)
    public void downloadAllDetailsOnDemandData(@RequestBody @Valid CvotEndpointRequest requestBody,
                                               HttpServletResponse response) throws IOException {
        setDownloadHeaders(response);
        cvotEndpointService.writeAllDetailsOnDemandCsv(requestBody.getDatasetsObject(), response.getWriter(),
                requestBody.getEventFilters(), requestBody.getPopulationFilters());
    }

    @ApiOperation(
            value = "Downloads data for the details on demand table for the selected IDs",
            nickname = "getAllDetailsOnDemandCsv",
            response = List.class,
            httpMethod = "POST"
    )
    @RequestMapping(value = "/download-selected-details-on-demand", method = POST)
    public void downloadSelectedDetailsOnDemandData(@RequestBody @Valid DetailsOnDemandRequest requestBody,
                                                    HttpServletResponse response) throws IOException {
        setDownloadHeaders(response);
        cvotEndpointService.writeSelectedDetailsOnDemandCsv(requestBody.getDatasetsObject(), requestBody.getEventIds(), response.getWriter());
    }

    @ApiOperation(
            value = "Gets all data for a single subject",
            nickname = "getSingleSubjectData",
            response = List.class,
            httpMethod = "POST"
    )
    @RequestMapping(value = "/single-subject", method = POST)
    @Cacheable(condition = "#requestBody.getEventFilters().isEmpty()")
    public List<Map<String, String>> getSingleSubjectData(
            @ApiParam(value = "Single Subject Request body: The subject ID to get the data for", required = true)
            @RequestBody @Valid SingleSubjectRequest<CvotEndpointFilters> requestBody) {

        return cvotEndpointService.getSingleSubjectData(
                requestBody.getDatasetsObject(), requestBody.getSubjectId(), requestBody.getEventFilters());
    }

    @ApiOperation(
            value = "Gets the subjects in available cvotEndpoint filters for the currently selected CvotEndpoint and population filters",
            nickname = "getSubjects",
            response = CvotEndpointFilters.class,
            httpMethod = "POST"
    )
    @RequestMapping(value = "/filters-subjects", method = POST)
    @Cacheable(condition = Constants.EMPTY_EVENT_AND_POPULATION_FILTER)
    public List<String> getSubjects(
            @ApiParam(value = "CvotEndpointRequest:  CvotEndpoint and Population Filters e.g. {cvotEndpointFilters : {}, populationFilters: {}}",
                    required = true)
            @RequestBody CvotEndpointRequest requestBody) {
        return cvotEndpointService.getSubjects(requestBody.getDatasetsObject(), requestBody.getEventFilters(), requestBody.getPopulationFilters());
    }

}
