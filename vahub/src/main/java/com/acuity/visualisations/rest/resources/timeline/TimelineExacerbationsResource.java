package com.acuity.visualisations.rest.resources.timeline;

import com.acuity.visualisations.rawdatamodel.service.timeline.ExacerbationsTimelineService;
import com.acuity.visualisations.rawdatamodel.vo.timeline.exacerbations.SubjectExacerbationSummary;
import com.acuity.visualisations.rest.model.request.respiratory.exacerbation.TimelineExacerbationsRequest;
import com.acuity.visualisations.rest.util.Constants;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * Created by ksnd199.
 */
@RestController
@Api(value = "/resources/timeline/exacerbations/", description = "rest endpoints for for exacerbations timeline")
@RequestMapping(value = "/resources/timeline/exacerbations/",
        consumes = APPLICATION_JSON_VALUE, produces = APPLICATION_JSON_VALUE)
@PreAuthorize(Constants.PRE_AUTHORISE_VISUALISATION)
@CacheConfig(keyGenerator = "datasetsKeyGenerator", cacheResolver = "refreshableCacheResolver")
public class TimelineExacerbationsResource {

    @Autowired
    private ExacerbationsTimelineService timelineExacerbationsService;

    @ApiOperation(
            value = "Gets the exacerbations summary information for the timeline for the currently selected population and exacerbations filters",
            nickname = "getExacerbationsSummaries",
            response = List.class,
            httpMethod = "POST"
    )
    @PostMapping("summaries")
    @Cacheable
    public List<SubjectExacerbationSummary> getExacerbationsSummaries(
            @ApiParam(value = "TimelineExacerbationsRequest:  Exacerbations and Population Filters e.g. {exacerbationsFilters: {}, populationFilters: {}}",
                    required = true)
            @RequestBody @Valid TimelineExacerbationsRequest requestBody) {

        return timelineExacerbationsService.getExacerbationsSummary(
                requestBody.getDatasetsObject(), requestBody.getDayZero().getValue(), requestBody.getDayZero().getStringarg(),
                requestBody.getPopulationFilters(), requestBody.getExacerbationFilters());
    }
}
