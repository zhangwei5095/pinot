<section id="dimension-heat-map-section">
    <script id="treemap-template" type="text/x-handlebars-template">
        {{#each metrics as |metricName metricIndex|}}
        <div class="metric-section-wrapper" rel="{{metricName}}">
            <div class="dimension-heat-map-treemap-section">
                <div class="title-box">
                    <table>
                        <tbody><tr>
                            <th colspan="4"><p>metric: <b>{{metricName}}</b></p></th>
                            <th> Baseline Total:</th>
                            <th> Current Total:</th>
                            <th> Delta Value:</th>
                            <th> Delta (%):</th>
                        </tr>
                        <tr>
                            <th>Start: </th>
                            <td class="title-stat baseline-date-time">{{displayDate  @root/summary/simpleFields/baselineStart}}</td>
                            <th> End: </th>
                            <td class="title-stat current-date-time">{{displayDate @root/summary/simpleFields/currentStart}}</td>
                            <td class="title-stat baseline-total">{{@root/summary/simpleFields/baselineTotal}}</td>
                            <td class="title-stat current-total">{{@root/summary/simpleFields/currentTotal}}</td>
                            <td class="title-stat delta-value">{{@root/summary/simpleFields/deltaChange}} </td>
                            <td class="title-stat delta-ratio">{{@root/summary/simpleFields/deltaPercentage}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="uk-button-group dimension-treemap-toggle-buttons" data-uk-button-radio>
                    <button class="uk-button dimension-treemap-mode" id="treemap_contribution-total-change-percent" mode="0">
                        <i class="uk-icon-eye-slash"></i> Percentage Change
                    </button>
                    <button class="uk-button dimension-treemap-mode" id="treemap_contribution-total-percent" mode="1">
                        <i class="uk-icon-eye-slash"></i> Contribution Change (%)
                    </button>
                    <button class="uk-button dimension-treemap-mode" id="treemap_contribution-change-percent" mode="2">
                        <i class="uk-icon-eye-slash"></i> Contribution to overall Change (%)
                    </button>
                </div>

                <div id="metric_{{metricName}}_treemap_0" class="treemap-container  uk-margin" mode="0">
                    <table class="treemap-display-tbl" style="position: relative; width: 100%;">
                        {{#each @root/dimensions as |dimensionName dimensionIndex|}}
                        <tr style="position: relative; width: 100%;">
                            <td class="treemap-display-tbl-dim"><div style="text-align: left;">{{dimensionName}}</div></td><td id="metric_{{metricName}}_dim_{{dimensionIndex}}_treemap_0" class="dimension-treemap" rel="{{dimensionName}}" style="position: relative; left: 0px; top: 0px; width: 100%; height: 100px;"></td>
                        </tr>
                        {{/each}}
                    </table>
                </div>

                <div id="metric_{{metricName}}_treemap_1" class="treemap-container  uk-margin" mode="1">
                    <table class="treemap-display-tbl" style="position: relative; width: 100%;">
                        {{#each @root/dimensions as |dimensionName dimensionIndex|}}
                        <tr style="position: relative; width: 100%;">
                            <td class="treemap-display-tbl-dim"><div style="text-align: left;">{{dimensionName}}</div></td><td id="metric_{{metricName}}_dim_{{dimensionIndex}}_treemap_1" class="dimension-treemap" rel="{{dimensionName}}" style="position: relative; left: 0px; top: 0px; width: 100%; height: 100px;" ></td>
                        </tr>
                        {{/each}}
                    </table>
                </div>

                <div id="metric_{{metricName}}_treemap_2" class="treemap-container  uk-margin" mode="2">
                    <table class="treemap-display-tbl" style="position: relative; width: 100%;">
                        {{#each @root/dimensions as |dimensionName dimensionIndex|}}
                        <tr style="position: relative; width: 100%;">
                            <td class="treemap-display-tbl-dim"><div style="text-align: left;">{{dimensionName}}</div></td><td id="metric_{{metricName}}_dim_{{dimensionIndex}}_treemap_2" class="dimension-treemap" rel="{{dimensionName}}" style="position: relative; left: 0px; top: 0px; width: 100%; height: 100px;" ></td>
                        </tr>
                        {{/each}}
                    </table>
                </div>
            </div>
        </div>
        {{/each}}
    </script>
</section>