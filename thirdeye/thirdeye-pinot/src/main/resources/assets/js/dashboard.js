$(document).ready( function() {

    /** Handelbars template for tabs **/
    //DASHBOARD TAB
    var dasboard_tab_options = {
        tabName: "dashboard",
        showChartSection: true,
        showSelfServiceForms: false
    }
    var result_tab_template = HandleBarsTemplates.template_tab(dasboard_tab_options)
    $("#dashboard").append(result_tab_template);

    //COMPARE TAB
    var compare_tab_options = {
        tabName: "compare",
        showChartSection: true,
        showSelfServiceForms: false
    }
    var result_tab_template = HandleBarsTemplates.template_tab(compare_tab_options)
    $("#compare").append(result_tab_template);

    //TIMESERIES TAB
    var timseries_tab_options = {
        tabName: "timeseries",
        showChartSection: true,
        showSelfServiceForms: false
    }
    var result_tab_template = HandleBarsTemplates.template_tab(timseries_tab_options)
    $("#timeseries").append(result_tab_template);

    //ANOMALIES TAB
    var anomalies_tab_options = {
        tabName: "anomalies",
        showChartSection: true,
        showSelfServiceForms: false
    }
    var result_tab_template = HandleBarsTemplates.template_tab(anomalies_tab_options)
    $("#anomalies").append(result_tab_template);


    //SELF SERVICE TAB
    var self_service_tab_options = {
        tabName: "self-service",
        showChartSection: false,
        showSelfServiceForms: true
    }
    var result_tab_template = HandleBarsTemplates.template_tab(self_service_tab_options)
    $("#self-service").append(result_tab_template);



    /** Handelbars template for forms on tabs* */
    //DASHBOARD TAB/FORM
    var dasboard_section_options = {
        tabName: "dashboard",
        needQueryForm: true,
        showDashboardSelection: true,
        showMultiMetricSelection: false,
        showSingleMetricSelection: false,
        showDimensionSelection: false,
        showFilterSelection: false,
        showGranularity: true,
        showAggregateAllGranularity: false,
        needComparisonTimeRange: true,
        showSelfServiceBoard: false
    }
    var result_form_template = HandleBarsTemplates.template_form(dasboard_section_options)
    $("#dashboard-section #form-area").append(result_form_template);

    //COMPARE TAB/FORM
    var compare_section_options = {
        tabName: "compare",
        needQueryForm: true,
        showDashboardSelection: false,
        showMultiMetricSelection: true,
        showSingleMetricSelection: false,
        showDimensionSelection: true,
        showFilterSelection: true,
        showGranularity: true,
        showAggregateAllGranularity: true,
        needComparisonTimeRange: true,
        showSelfServiceBoard: false
    }
    var result_form_template = HandleBarsTemplates.template_form(compare_section_options)
    $("#compare-section #form-area").append(result_form_template);

    //TIMESERIES TAB/FORM
    var timseries_section_options = {
        tabName: "timeseries",
        needQueryForm: true,
        showDashboardSelection: false,
        showMultiMetricSelection: true,
        showSingleMetricSelection: false,
        showDimensionSelection: true,
        showFilterSelection: true,
        showGranularity: true,
        showAggregateAllGranularity: false,
        needComparisonTimeRange: false,
        showSelfServiceBoard: false
    }

    var result_form_template = HandleBarsTemplates.template_form(timseries_section_options)
    $("#timeseries-section #form-area").append(result_form_template);

    //ANOMALIES TAB/FORM
    var anomalies_section_options = {
        tabName: "anomalies",
        needQueryForm: true,
        showDashboardSelection: false,
        showMultiMetricSelection: false,
        showSingleMetricSelection: true,
        showDimensionSelection: false,
        showFilterSelection: false,
        showGranularity: false,
        showAggregateAllGranularity: false,
        needComparisonTimeRange: false,
        showSelfServiceBoard: false
    }

    var result_form_template = HandleBarsTemplates.template_form(anomalies_section_options)
    $("#anomalies-section #form-area").append(result_form_template);

    //SELF SERVICE TAB/FORM
    var self_service_section_options = {
        tabName: "self-service",
        needQueryForm: false,
        showDashboardSelection: false,
        showMultiMetricSelection: false,
        showSingleMetricSelection: false,
        showDimensionSelection: false,
        showFilterSelection: false,
        showGranularity: false,
        showAggregateAllGranularity: false,
        needComparisonTimeRange: false,
        showSelfServiceBoard: true
    }

    var result_form_template = HandleBarsTemplates.template_form(self_service_section_options)
    $("#self-service-section #form-area").append(result_form_template);


    /** Handelbars template for main content
     /** Handelbars template for SELF SERVICE tab ANOMALY FUNCTION FORM **/

    //Harcoding the function type metadata till backend endpoint is updated/available: "/thirdeye/function/metadata"
    //Todo: get the function-type metadata from the backend once endpoint is updated
    var anomalyFunctionTypeMetaData = {
        KALMAN_FILTER: [
            "order","knob","seasonal","pValueThreshold"
        ],
        MIN_MAX_THRESHOLD: ["min","max"
        ],
        WEEK_OVER_WEEK_RULE: [
            "baseline","changeThreshold","averageVolumeThreshold"
        ],
        SIGN_TEST: [
            "pattern","signTestSize","signTestUnit","seasonalSize","seasonalUnit","baselineSeasonalPeriod","pValueThreshold","baselineShift","baselineLift","enableAutoTune","autoTuneThreshold"
        ],
        SCAN_STATISTICS: [
            "pValueThreshold","complementaryPattern","complementaryLevel","seasonal","minIncrement","minWindowLength","maxWindowLength","bootstrap","numSimulations",
            "notEqualEpsilon","proportionAnomalyInTraining","enableSTL","robust","periodic","enableOfflineTrain","numOfOfflineAnomalies","filterOnSeverity","targetPattern","targetLevel"
        ]
    }

        //Adding property defaults and datatypes from: https://gitli.corp.linkedin.com/ars-projects/anomaly-detection/source/bdafe93d4b4e57a439b16a8ca82c5b4119218ddd:anomaly-detection/src/main/java/com/linkedin/anomaly/api
        //Todo: get the property defaults from the backend once an endpoint is ready
        var propertyDefs = {
            "schema": {
                 "defaultValue": 0,
                 "validType": 1,
                 "description": 2
            },
            "propertyDef": {
                "KALMAN_FILTER|knob": [10000, "double"],
                "KALMAN_FILTER|order": [1, "int"],
                "KALMAN_FILTER|pValueThreshold": [0.05, "double"],
                "KALMAN_FILTER|seasonal": [0, "int"],
                "MIN_MAX_THRESHOLD|max": [],
                "MIN_MAX_THRESHOLD|min": [],
                "SCAN_STATISTICS|bootstrap": [true, "boolean"],
                "SCAN_STATISTICS|complementaryLevel": ["", "double"],
                "SCAN_STATISTICS|complementaryPattern": ["", "Pattern"],
                "SCAN_STATISTICS|enableOfflineTrain": [false, "boolean"],
                "SCAN_STATISTICS|enableSTL": [false, "boolean"],
                "SCAN_STATISTICS|filterOnSeverity": ["NaN", "string"],
                "SCAN_STATISTICS|maxWindowLength": ["", "int"],
                "SCAN_STATISTICS|minIncrement": [1, "int"],
                "SCAN_STATISTICS|minWindowLength": [1, "int"],
                "SCAN_STATISTICS|notEqualEpsilon": [0.1, "double"],
                "SCAN_STATISTICS|numOfOfflineAnomalies": [1, "int"],
                "SCAN_STATISTICS|numSimulations": [1000, "int"],
                "SCAN_STATISTICS|pValueThreshold": [0.05, "double"],
                "SCAN_STATISTICS|periodic": [true, "boolean"],
                "SCAN_STATISTICS|proportionAnomalyInTraining": [0.5, "double"],
                "SCAN_STATISTICS|robust": [true, "boolean"],
                "SCAN_STATISTICS|seasonal": [168, "int"],
                "SCAN_STATISTICS|targetLevel": ["", "double"],
                "SCAN_STATISTICS|targetPattern": ["", "Pattern"],
                "SIGN_TEST|autoTuneThreshold": [0.05, "double"],
                "SIGN_TEST|baselineLift": [1.05, "String"],
                "SIGN_TEST|baselineSeasonalPeriod": [4, "int"],
                "SIGN_TEST|baselineShift": ["0.0", "String"],
                "SIGN_TEST|enableAutoTune": [false, "boolean"],
                "SIGN_TEST|pValueThreshold": [0.01, "double"],
                "SIGN_TEST|pattern": ["", "Pattern"],
                "SIGN_TEST|seasonalSize": [7, "int"],
                "SIGN_TEST|seasonalUnit": ["DAYS", "TimeUnit"],
                "SIGN_TEST|signTestSize": [2, "int"],
                "SIGN_TEST|signTestUnit": ["HOURS", "TimeUnit"],
                "WEEK_OVER_WEEK_RULE|averageVolumeThreshold": [],
                "WEEK_OVER_WEEK_RULE|baseline": [],
                "WEEK_OVER_WEEK_RULE|changeThreshold": []
            }
        }

        var functionInfo = {propertyDefs : propertyDefs, fnTypeMetaData : anomalyFunctionTypeMetaData}

        //cache the data
        window.sessionStorage.setItem('anomalyFunctionTypeMetaData', JSON.stringify(functionInfo));

    var result_anomaly_function_form_template = HandleBarsTemplates.template_anomaly_function_form(functionInfo);
    $("#create-anomaly-functions-tab").html(result_anomaly_function_form_template);


    //Global object where the dataset params will be cached
    window.datasetConfig = {};
    //Global object with the query params
    hash = parseHashParameters(window.location.hash);
    hash.view = hash.hasOwnProperty("view") ? hash.view : "dashboard";
    $("#" + hash.view + "-header-tab").click();


    /** --- ) Set initial view on pageload ---**/

    //getDataSetList as a callback triggers ajax calls for all data on the form:
    // dashboard list, metric, dimension and dimension value list, and the dataset configs
    //ie. maxDate etc.
    getDataSetList();

    //Add onhashchange event listener to window object to enable back button usage on the browser
    window.onhashchange = routeToTab;

    // experimental hidden tab
    if (hash.view === 'exp') {
        renderFunctionAnalyze();
        routeToTab();
    }


    function routeToTab() {
        hash = parseHashParameters(window.location.hash);

        //'rand' parameter's role is to trigger hash change in case of page reload
        delete hash.rand
        updateDashboardFormFromHash();

        //close all uikit dropdown
        closeAllUIKItDropdowns();

        //If hash has dataset and (dashboard or (view & metric )trigger form submit
        if (hash.hasOwnProperty("dataset")) {

            if (hash.hasOwnProperty("dashboard") || hash.hasOwnProperty("metrics")) {

                switch (hash.view) {
                    case "timeseries":
                        var tab = "timeseries";
                        getTimeSeries(tab);
                        break;
                    case "compare":

                        var tab = "compare";
                        if (hash.aggTimeGranularity.toLowerCase() == "aggregateall") {

                            getHeatmap(tab);
                            //else aggTimeGranularity == HOURS or DAY
                        } else if (hash.hasOwnProperty("metrics")) {

                            if (hash.hasOwnProperty("dimensions")) {
                                getContributors(tab);
                            } else {
                                getTabular(tab);
                            }
                        }
                        break;
                    case "anomalies":
                        var tab = "anomalies";
                        getAnomalies(tab);
                        break;
                    default://dashboard tab
                        var tab = "dashboard"
                        getCustomDashboard(tab);
                        break;
                }
            }
        }
    }
});
