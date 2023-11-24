import React, { useRef, useEffect, useState, useContext } from "react";
import Plot from "react-plotly.js";
import MiniDrawer from "../MiniDrawer";
import { useLocation, useHistory, Prompt, useParams } from "react-router-dom";
import EmailEditor from "react-email-editor";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import _ from "lodash";
import Dialog from "@mui/material/Dialog";
import moment from "moment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import configData from "../config.json";
// Auth context
import { AuthContext } from "../context";

//components
import SimpleInsetGraphBlock from "../Components/SubPlots/InsetPlots/SimpleInsetGraphBlock";
import CustomNodeDataLabelsHover from "../Components/scatterPlots/CustomNodeDataLabelsHover";
import CustomNodeScatterPlotWithColorDimension from "../Components/scatterPlots/CustomNodeScatterPlotWithColorDimension";
import CustomNodeBasicLinePlot from "../Components/lineCharts/CustomNodeBasicLinePlot";
import CustomNodeLineandScatterPlotWithNames from "../Components/lineCharts/CustomNodeLineandScatterPlotWithNames";
import CustomLineandScatterStyling from "../Components/lineCharts/CustomLineandScatterStyling";
import CustomNodeStyledLinePlot from "../Components/lineCharts/CustomNodeStyledLinePlot";
import CustomNodeColoredandStyledScatterPlot from "../Components/lineCharts/CustomNodeColoredandStyledScatterPlot";
import CustomNodeLineShapeOptionsforInterpolation from "../Components/lineCharts/CustomNodeLineShapeOptionsforInterpolation";
import CustomNodeLineDash from "../Components/lineCharts/CustomNodeLineDash";
import CustomNodeBasicBarChart from "../Components/barCharts/CustomNodeBasicBarChart";
import CustomNodeGroupedBarChart from "../Components/barCharts/CustomNodeGroupedBarChart";
import CustomNodeBarChartwithHoverText from "../Components/barCharts/CustomNodeBarChartwithHoverText";
import CustomNodeBarChartwithDirectLabels from "../Components/barCharts/CustomNodeBarChartwithDirectLabels";
import CustomNodeGroupedBarChartwithDirectLabels from "../Components/barCharts/CustomNodeGroupedBarChartwithDirectLabels";
import CustomNodeCustomizingIndividualBarColors from "../Components/barCharts/CustomNodeCustomizingIndividualBarColors";
import CustomNodeCustomizingIndividualBarWidths from "../Components/barCharts/CustomNodeCustomizingIndividualBarWidths";
import CustomNodeCustomizingIndividualBarBase from "../Components/barCharts/CustomNodeCustomizingIndividualBarBase";
import CustomNodeColoredandStyledBarChart from "../Components/barCharts/CustomNodeColoredandStyledBarChart";
import CustomNodeBarChartwithRelativeBarmode from "../Components/barCharts/CustomNodeBarChartwithRelativeBarmode";
import CustomNodeBasicPieChart from "../Components/pieCharts/CustomNodeBasicPieChart";
import CustomNodePieChartSubplots from "../Components/pieCharts/CustomNodePieChartSubplots";
import CustomNodeDonutChart from "../Components/pieCharts/CustomNodeDonutChart";
import ControlTextOrientationInsidePieChartSectors from "../Components/pieCharts/ControlTextOrientationInsidePieChartSectors";
import CustomNodeBubbleSizeonBubbleChart from "../Components/bubbleCharts/CustomNodeBubbleSizeBubbleChart";
import CustomNodeMarkerSizeandColorBubbleChart from "../Components/bubbleCharts/CustomNodeMarkerSizeandColorBubbleChart";
import CustomNodeHoverTextonBubbleChart from "../Components/bubbleCharts/CustomNodeHoverTextonBubbleChart";
import CustomNodeMarkerSizeColorandSymbolasArray from "../Components/bubbleCharts/CustomNodeMarkerSizeColorandSymbolasArray";
import CustomNodeBasicOverlaidAreaChart from "../Components/filledAreaPlots/CustomNodeBasicOverlaidAreaChart";
import CustomNodeOverlaidAreaChartWithoutBoundaryLines from "../Components/filledAreaPlots/CustomNodeOverlaidAreaChartWithoutBoundaryLines";
import CustomNodeStackedAreaChart from "../Components/filledAreaPlots/CustomNodeStackedAreaChart";
import CustomNodeNormalizedStackedAreaChart from "../Components/filledAreaPlots/CustomNodeNormalizedStackedAreaChart";
import CustomNodeSelectHoverPoints from "../Components/filledAreaPlots/CustomNodeSelectHoverPoints";
import CustomNodeBarChartwithLinePlot from "../Components/HorizontalBarCharts/CustomNodeBarChartwithLinePlot";
import CustomNodeStyledPointCloud from "../Components/PointCloud/CustomNodeStyledPointCloud";
import BasicSunBurstChart from "../Components/SunburstCharts/BasicSunBurstChart";
import BranchValues from "../Components/SunburstCharts/BranchValues";
import SunburstWithRepetedLabels from "../Components/SunburstCharts/SunburstWithRepetedLabels";
import SunburstLargeNumberSlices from "../Components/SunburstCharts/SunburstLargeNumberSlices";
import SunburstTextOrientaion from "../Components/SunburstCharts/SunburstTextOrientaion";
import SankeyDiagrams from "../Components/SankeyDiagrams/SankeyDiagrams";
import CreateSankeyCanvas from "../Components/SankeyDiagrams/CreateSankeyCanvas";
import AddNodesBlock from "../Components/SankeyDiagrams/AddNodesBlock";
import AddLinksBlock from "../Components/SankeyDiagrams/AddLinksBlock";
import DefineNodePositionBlock from "../Components/SankeyDiagrams/DefineNodePositionBlock";
import StyleSankeyDiagramBlock from "../Components/SankeyDiagrams/StyleSankeyDiagramBlock";
import BasicSymmetricErrorBarsBlock from "../Components/ErrorBars/BasicSymmetricErrorBarsBlock";
import BarChartwithErrorBarsBlock from "../Components/ErrorBars/BarChartwithErrorBarsBlock";
import HorizontalErrorBarsBlock from "../Components/ErrorBars/HorizontalErrorBarsBlock";
import AsymmetricErrorBarsBlock from "../Components/ErrorBars/AsymmetricErrorBarsBlock";
import ColoredandStyledErrorBarsBlock from "../Components/ErrorBars/ColoredandStyledErrorBarsBlock";
import ErrorBarsasaPercentageoftheyValueBlock from "../Components/ErrorBars/ErrorBarsasaPercentageoftheyValueBlock";
import AsymmetricErrorBarswithaConstantOffsetBlock from "../Components/ContinuousErrorBars/AsymmetricErrorBarswithaConstantOffsetBlock";
import BoxPlotThatDisplayesUnderlyingdataBlock from "../Components/boxPlots/BoxPlotThatDisplayesUnderlyingdataBlock";
import BoxPlotStylingOutliersBlock from "../Components/boxPlots/BoxPlotStylingOutliersBlock";
import BoxPlotStylingMeanandStandardDeviationBlock from "../Components/boxPlots/BoxPlotStylingMeanandStandardDeviationBlock";
import GroupedHorizontalBoxPlotBlock from "../Components/boxPlots/GroupedHorizontalBoxPlotBlock";
import ColoredBoxPlotBlock from "../Components/boxPlots/ColoredBoxPlotBlock";
import RainBowBoxPlotBlock from "../Components/boxPlots/RainBowBoxPlotBlock";
import HorizontalHistogramBlock from "../Components/histograms/HorizontalHistogramBlock";
import OverlaidHistogramBlock from "../Components/histograms/OverlaidHistogramBlock";
import StackedHistogramBlock from "../Components/histograms/StackedHistogramBlock";
import NormalizedHistogramBlock from "../Components/histograms/NormalizedHistogramBlock";
import SpecifyBinningFunctionBlock from "../Components/histograms/SpecifyBinningFunctionBlock";
import TwoDHistogramContourPlotwithHistogramSubplotsBlock from "../Components/2dDensityPLots/2DHistogramContourPlotwithHistogramSubplotsBlock";
import SimpleContourPlotBlock from "../Components/ContourPlots/SimpleContourPlotBlock";
import BasicContourPlotBlock from "../Components/ContourPlots/BasicContourPlotBlock";
import SettingXandYCoordinatesinaContourPlotBlock from "../Components/ContourPlots/SettingXandYCoordinatesinaContourPlotBlock";
import ColorscaleforContourPlotBlock from "../Components/ContourPlots/ColorscaleforContourPlotBlock";
import CustomizingSpacingBetweenXandYTicksBlock from "../Components/ContourPlots/CustomizingSpacingBetweenXandYTicksBlock";
import ConnecttheGapsbetweenNullValuesintheZMatrixBlock from "../Components/ContourPlots/ConnecttheGapsbetweenNullValuesintheZMatrixBlock";
import SmoothingContourLinesBlock from "../Components/ContourPlots/SmoothingContourLinesBlock";
import SmoothContourColoringBlock from "../Components/ContourPlots/SmoothContourColoringBlock";
import ContourLineLabelsBlock from "../Components/ContourPlots/ContourLineLabelsBlock";
import ContourLinesBlock from "../Components/ContourPlots/ContourLinesBlock";
import CustomColorscaleforContourPlotBlock from "../Components/ContourPlots/CustomColorscaleforContourPlotBlock";
import ColorBarTitleBlock from "../Components/ContourPlots/ColorBarTitleBlock";
import ColorBarSizeBlock from "../Components/ContourPlots/ColorBarSizeBlock";
import StylingColorBarTicksforContourPlotsBlock from "../Components/ContourPlots/StylingColorBarTicksforContourPlotsBlock";
import BasicHeatmapBlock from "../Components/Heatmaps/BasicHeatmapBlock";
import HeatmapwithCategoricalAxisLabelsBlock from "../Components/Heatmaps/HeatmapwithCategoricalAxisLabelsBlock";
import BasicTernaryPlotwithMarkersBlock from "../Components/TerneryPlots/BasicTernaryPlotwithMarkersBlock";
import SoilTypesTernaryPlotBlock from "../Components/TerneryPlots/SoilTypesTernaryPlotBlock";
import AddingDimensionsBlock from "../Components/ParallelCoordinatesPlot/AddingDimensionsBlock";
import BasicParallelCoordinatesPlotBlock from "../Components/ParallelCoordinatesPlot/BasicParallelCoordinatesPlotBlock";
import AnnotatedParallelCoordinatesPlotBlock from "../Components/ParallelCoordinatesPlot/AnnotatedParallelCoordinatesPlotBlock";
import AdvancedParallelCoordinatesPlotBlock from "../Components/ParallelCoordinatesPlot/AdvancedParallelCoordinatesPlotBlock";
import LogarithmicAxesBlock from "../Components/LogPlots/LogarithmicAxesBlock";
import BasicWaterfallChartBlock from "../Components/FinancialCharts/WaterfallCharts/BasicWaterfallChartBlock";
import MultiCategoryWaterfallChartBlock from "../Components/FinancialCharts/WaterfallCharts/MultiCategoryWaterfallChartBlock";
import HorizontalWaterfallChartBlock from "../Components/FinancialCharts/WaterfallCharts/HorizontalWaterfallChartBlock";
import StyleWaterfallChartBlock from "../Components/FinancialCharts/WaterfallCharts/StyleWaterfallChartBlock";
import SimpleCandleStickChartBlock from "../Components/CandleStickCharts/SimpleCandleStickChartBlock";
import CandlestickChartwithoutRangesliderBlock from "../Components/CandleStickCharts/CandlestickChartwithoutRangesliderBlock";
import CustomiseCandlestickChartwithShapesandAnnotationsBlock from "../Components/CandleStickCharts/CustomiseCandlestickChartwithShapesandAnnotationsBlock";
import CustomizingCandlestickChartColorsBlock from "../Components/CandleStickCharts/CustomizingCandlestickChartColorsBlock";
import AddRangeselectorBlock from "../Components/CandleStickCharts/AddRangeselectorBlock";
import BasicFunnelPlotBlock from "../Components/FinancialCharts/FunnelandFunnelAreaCharts/BasicFunnelPlotBlock";
import SettingMarkerSizeandColorBlock from "../Components/FinancialCharts/FunnelandFunnelAreaCharts/SettingMarkerSizeandColorBlock";
import StackedFunnelBlock from "../Components/FinancialCharts/FunnelandFunnelAreaCharts/StackedFunnelBlock";
import FunnelareaPlotBlock from "../Components/FinancialCharts/FunnelandFunnelAreaCharts/FunnelareaPlotBlock";
import MultiFunnelareaBlock from "../Components/FinancialCharts/FunnelandFunnelAreaCharts/MultiFunnelareaBlock";
import DateStringsBlock from "../Components/FinancialCharts/TimeSeries/DateStringsBlock";
import BasicTimeSeriesBlock from "../Components/FinancialCharts/TimeSeries/BasicTimeSeriesBlock";
import ManuallySetRangeBlock from "../Components/FinancialCharts/TimeSeries/ManuallySetRangeBlock";
import TimeSerieswithRangesliderBlock from "../Components/FinancialCharts/TimeSeries/TimeSerieswithRangesliderBlock";
import ThreeDScatterPlotBlock from "../Components/3DCharts/3DScatterPlot/ThreeDScatterPlotBlock";
import BasicRibbonPlotBlock from "../Components/3DCharts/BasicRibbonPlot/BasicRibbonPlotBlock";
import Topographical3DSurfacePlotBlock from "../Components/3DCharts/3DSurfacePlots/Topographical3DSurfacePlotBlock";
import SurfacePlotWithContoursBlock from "../Components/3DCharts/3DSurfacePlots/SurfacePlotWithContoursBlock";
import Multiple3DSurfacePlotsBlock from "../Components/3DCharts/3DSurfacePlots/Multiple3DSurfacePlotsBlock";
import Simple3DMeshPlotBlock from "../Components/3DCharts/3DMeshPlots/Simple3DMeshPlotBlock";
import ThreeDMeshPlotwithAlphahullBlock from "../Components/3DCharts/3DMeshPlots/3DMeshPlotwithAlphahullBlock";
import ThreeDMeshTetrahedronBlock from "../Components/3DCharts/3DMeshPlots/3DMeshTetrahedronBlock";
import ThreeDMeshCubeBlock from "../Components/3DCharts/3DMeshPlots/3DMeshCubeBlock";
import ThreeDLinewithMarkersPlotBlock from "../Components/3DCharts/3DLinePlots/3DLinewithMarkersPlotBlock";
import ThreeDLineSpiralPlotBlock from "../Components/3DCharts/3DLinePlots/3DLineSpiralPlotBlock";
import ThreeDRandomWalkPlotBlock from "../Components/3DCharts/3DLinePlots/3DRandomWalkPlotBlock";
import SimpleSubplotBlock from "../Components/SubPlots/SubPlots/SimpleSubplotBlock";
import CustomSizedSubplotBlock from "../Components/SubPlots/SubPlots/CustomSizedSubplotBlock";
import MultipleSubplotsBlock from "../Components/SubPlots/SubPlots/MultipleSubplotsBlock";
import SubplotswithSharedAxesBlock from "../Components/SubPlots/SubPlots/SubplotswithSharedAxesBlock";
import StackedSubplotsBlock from "../Components/SubPlots/SubPlots/StackedSubplotsBlock";
import StackedSubplotswithaSharedXAxisBlock from "../Components/SubPlots/SubPlots/StackedSubplotswithaSharedXAxisBlock";
import MultipleCustomSizedSubplotsBlock from "../Components/SubPlots/SubPlots/MultipleCustomSizedSubplotsBlock";
import Multiple3DSubplotsBlock from "../Components/SubPlots/3DSubPLots/Multiple3DSubplotsBlock";
import MixedSubPlotsBlock from "../Components/SubPlots/MixedSubPlots/MixedSubPlotsBlock";
import TableandChartSubplotBlock from "../Components/SubPlots/TableSubplots/TableandChartSubplotBlock";
import ClickEventDataBlock from "../Components/CustomChartEvents/ClickEvents/ClickEventDataBlock";
import BindingToClickEventBlock from "../Components/CustomChartEvents/ClickEvents/BindingToClickEventBlock";
import HoverEventDataBlock from "../Components/CustomChartEvents/HoverEvents/HoverEventDataBlock";
import CapturingHoverEventsDataBlock from "../Components/CustomChartEvents/HoverEvents/CapturingHoverEventsDataBlock";
import CapturingHoverEventsPixelsBlock from "../Components/CustomChartEvents/HoverEvents/CapturingHoverEventsPixelsBlock";
import TriggeringHoverEventsBlock from "../Components/CustomChartEvents/HoverEvents/TriggeringHoverEventsBlock";
import CoupledHoverEventsBlock from "../Components/CustomChartEvents/HoverEvents/CoupledHoverEventsBlock";
import CombinedClickandHoverEventsBlock from "../Components/CustomChartEvents/HoverEvents/CombinedClickandHoverEventsBlock";
import DisablingZoomEventsforXAxisBlock from "../Components/CustomChartEvents/DisableZoomEvents/DisablingZoomEventsforXAxisBlock";
import DisablingZoomEventsforXandYAxisBlock from "../Components/CustomChartEvents/DisableZoomEvents/DisablingZoomEventsforXandYAxisBlock";
import FilterBlock from "../Components/Transforms/FilterBlock";
import GroupByBlock from "../Components/Transforms/GroupBy/GroupByBlock";
import AggregationsBlock from "../Components/Transforms/Aggregations/AggregationsBlock";
import AggregateFunctionsBlock from "../Components/Transforms/Aggregations/AggregateFunctionsBlock";
import HistogramBinningBlock from "../Components/Transforms/Aggregations/HistogramBinningBlock";
import MappingWithAggregatesBlock from "../Components/Transforms/Aggregations/MappingWithAggregatesBlock";
import FilterAndGroupbyBlock from "../Components/Transforms/MultipleTransforms/FilterAndGroupbyBlock";
import FilterAndAggregatesBlock from "../Components/Transforms/MultipleTransforms/FilterAndAggregatesBlock";
import AllTransformsBlock from "../Components/Transforms/MultipleTransforms/AllTransformsBlock";
import AddTwoDropdownMenustoaChartBlock from "../Components/CustomControls/DropDownEvents/AddTwoDropdownMenustoaChartBlock";
import BinddropdowneventstochartsBlock from "../Components/CustomControls/DropDownEvents/BinddropdowneventstochartsBlock";
import RestyleButtonSingleAttributeBlock from "../Components/CustomControls/ButtonEvents/RestyleButtonSingleAttributeBlock";
import RestyleButtonMultipleAttributesBlock from "../Components/CustomControls/ButtonEvents/RestyleButtonMultipleAttributesBlock";
import RelayoutButtonBlock from "../Components/CustomControls/ButtonEvents/RelayoutButtonBlock";
import UpdateButtonBlock from "../Components/CustomControls/ButtonEvents/UpdateButtonBlock";
import AnimateButtonBlock from "../Components/CustomControls/ButtonEvents/AnimateButtonBlock";
import StylethebuttonsBlock from "../Components/CustomControls/ButtonEvents/StylethebuttonsBlock";
import BasicSliderBlock from "../Components/CustomControls/SliderEvents/BasicSliderBlock";
import BindComponentstotheAppearanceofaPlotBlock from "../Components/CustomControls/SliderEvents/BindComponentstotheAppearanceofaPlotBlock";
import AddaPlayButtontoControlaSliderBlock from "../Components/CustomControls/SliderEvents/AddaPlayButtontoControlaSliderBlock";
import LassoSelectionBlock from "../Components/CustomControls/LassoSelection/LassoSelectionBlock";
import BasicRangeSlideronTimeSeriesBlock from "../Components/CustomControls/RangeSliderandSelector/BasicRangeSlideronTimeSeriesBlock";
import AnimatingtheDataBlock from "../Components/Animations/Animations/AnimatingtheDataBlock";
import AnimatingtheLayoutBlock from "../Components/Animations/Animations/AnimatingtheLayoutBlock";
import DefiningNamedFramesaddFramesBlock from "../Components/Animations/Animations/DefiningNamedFramesaddFramesBlock";
import AnimatingSequencesofFramesBlock from "../Components/Animations/Animations/AnimatingSequencesofFramesBlock";
import AnimatingManyFramesQuicklyBlock from "../Components/Animations/Animations/AnimatingManyFramesQuicklyBlock";
import ObjectConstancyBlock from "../Components/Animations/Animations/ObjectConstancyBlock";
import FrameGroupsandAnimationModesBlock from "../Components/Animations/Animations/FrameGroupsandAnimationModesBlock";
import AnimatingwithaSliderBlock from "../Components/Animations/Animations/AnimatingwithaSliderBlock";
import FilledAreaAnimationBlock from "../Components/Animations/FilledAreaAnimation/FilledAreaAnimationBlock";
import MultipleTraceFilledAreaBlock from "../Components/Animations/FilledAreaAnimation/MultipleTraceFilledAreaBlock";
import MapAnimationsBlock from "../Components/Animations/MapAnimation/MapAnimationsBlock";
import BasicTreemapsBlock from "../Components/TreeMaps/BasicTreemapsBlock";
import SetDifferentAttributesinTreeMapBlock from "../Components/TreeMaps/SetDifferentAttributesinTreeMapBlock";
import SetColorofTreemapSectorsBlock from "../Components/TreeMaps/SetColorofTreemapSectorsBlock";
import NestedLayersinTreemapBlock from "../Components/TreeMaps/NestedLayersinTreemapBlock";
import ContourandScatterPlotoftheMethodofSteepestDescentBlock from "../Components/MultipleChartTypes/ContourandScatterPlotoftheMethodofSteepestDescentBlock";
import LineChartandBarChartBlock from "../Components/MultipleChartTypes/LineChartandBarChartBlock";
import WebGLwithOneLakhpointsBlock from "../Components/WebGL/WebGLwithOneLakhpointsBlock";
import WebGLwithOneMillionpointsBlock from "../Components/WebGL/WebGLwithOneMillionpointsBlock";
import WebGLwithmanytracesBlock from "../Components/WebGL/WebGLwithmanytracesBlock";
import CustomNodeGraphandAxesTitles from "../Components/lineCharts/CustomNodeGraphandAxesTitles";
import CustomNodeDataLabelsOnThePlot from "../Components/scatterPlots/CustomNodeDataLabelsOnThePlot";
import CustomNodeConnectGapsBetweenData from "../Components/lineCharts/CustomNodeConnectGapsBetweenData";
import CustomNodeWaterfallBarChart from "../Components/barCharts/CustomNodeWaterfallBarChart";
import CustomNodeStackedBarChart from "../Components/barCharts/CustomNodeStackedBarChart";
import CustomNodeAutomaticallyAdjustMargin from "../Components/pieCharts/CustomNodeAutomaticallyAdjustMargin";
import CustomNodeCategoricalDotPlot from "../Components/DotPlot/CustomNodeCategoricalDotPlot";
import CustomNodeBasicHorizontalBarChart from "../Components/HorizontalBarCharts/CustomNodeBasicHorizontalBarChart";
import CustomNodeBasicPointCloud from "../Components/PointCloud/CustomNodeBasicPointCloud";
import BasicBoxPlotBlock from "../Components/boxPlots/BasicBoxPlotBlock";
import HorizontalBoxPlotBlock from "../Components/boxPlots/HorizontalBoxPlotBlock";
import GroupedBoxPlotBlock from "../Components/boxPlots/GroupedBoxPlotBlock";
import FullyStyledBoxPlotBlock from "../Components/boxPlots/FullyStyledBoxPlotBlock";
import ColoredandStyledHistogramBlock from "../Components/histograms/ColoredandStyledHistogramBlock";
import CumulativeHistogramBlock from "../Components/histograms/CumulativeHistogramBlock";
import TwoDHistogramContourPlotwithSliderControlBlock from "../Components/2dDensityPLots/2DHistogramContourPlotwithSliderControlBlock";
import FilledLinesBlock from "../Components/ContinuousErrorBars/FilledLinesBlock";
import CustomizingSizeandRangeofaContourPlotContoursBlock from "../Components/ContourPlots/CustomizingSizeandRangeofaContourPlotContoursBlock";
import AnnotatedHeatmapBlock from "../Components/Heatmaps/AnnotatedHeatmapBlock";
import HeatmapwithUnequalBlockSizesBlock from "../Components/Heatmaps/HeatmapwithUnequalBlockSizesBlock";
import CreateannotationonclickeventBlock from "../Components/CustomChartEvents/ClickEvents/CreateannotationonclickeventBlock";
import BasicHistogramBlock from "../Components/histograms/BasicHistogramBlock";
import BindingtoZoomEventsBlock from "../Components/CustomChartEvents/ZoomEvents/BindingtoZoomEventsBlock";
import ThreeDLinePlotBlock from "../Components/3DCharts/3DLinePlots/3DLinePlotBlock";
import EuropeBubbleMap from "../Components/Maps/BubbleMaps/EuropeBubbleMap";
import USABubbleMap from "../Components/Maps/BubbleMaps/USABubbleMap";
import USAChoroplethMap from "../Components/Maps/ChoroplethMaps/USAChoroplethMap";
import CustomNodeLineandScatterPlot from "../Components/lineCharts/CustomNodeLineandScatterPlot";

var addedWidget = 0;
var widgetData, operationsBox;
var widget1 = [];
var widget2 = [];
var widget3 = [];
var widget4 = [];
var widget5 = [];
var data = {};
var widgetsData = [];
let fileObject;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  variant: "menu",
};
const TestDashboard = (props) => {
  var currentHtmlCode;
  let height, width;

  height = window.innerHeight;
  width = window.innerWidth;
  const { subscription_id } = useParams();

  var url,
    x = "my test";
  let temp2 = {};
  // console.log(
  //   'CheckURL',
  //   window.location.protocol + '//' + window.location.host + '/custom.js'
  // )

  const saveDashModalstyle = {
    position: "relative",
    top: "14%",
    left: "30%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    height: 470,
    width: 500,
    display: "flex",
    flexDirection: "column",
    // overflow: "auto",
    borderRadius: "5px",
  };

  const exportDashModalstyle = {
    position: "relative",
    top: "34%",
    left: "30%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    height: 185,
    width: 500,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    borderRadius: "5px",
  };
  const viewDashModalstyle = {
    position: "relative",
    top: "35%",
    left: "30%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    height: 200,
    width: 500,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    borderRadius: "5px",
  };

  const modalstyle2 = {
    position: "relative",
    top: "20%",
    left: "28%",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    height: 350,
    width: 600,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    borderRadius: "4px",
  };

  const myTemplate2 = {
    counters: {
      u_column: 1,
      u_row: 1,
      u_content_heading: 1,
      u_content_image: 1,
    },
    body: {
      id: "kH5navYTVY",
      rows: [
        {
          id: "d45d15NvwE",
          cells: [1],
          columns: [
            {
              id: "UapVDNOP3_",
              contents: [
                {
                  id: "eRfkswK9Yu",
                  type: "heading",
                  values: {
                    containerPadding: "10px",
                    anchor: "",
                    headingType: "h1",
                    fontSize: "22px",
                    textAlign: "left",
                    lineHeight: "140%",
                    linkStyle: {
                      inherit: true,
                      linkColor: "#0000ee",
                      linkHoverColor: "#0000ee",
                      linkUnderline: true,
                      linkHoverUnderline: true,
                    },
                    displayCondition: null,
                    _meta: {
                      htmlID: "u_content_heading_1",
                      htmlClassNames: "u_content_heading",
                    },
                    selectable: true,
                    draggable: true,
                    duplicatable: true,
                    deletable: true,
                    hideable: true,
                    text: "Heading",
                  },
                },
                {
                  id: "Tfi4DEszEJ",
                  type: "image",
                  values: {
                    containerPadding: "10px",
                    anchor: "",
                    src: {
                      url: "https://igneousbucket.s3.ap-south-1.amazonaws.com/1692194536097-bg.jpeg",
                      width: 2560,
                      height: 1600,
                    },
                    textAlign: "center",
                    altText: "",
                    action: {
                      name: "web",
                      values: {
                        href: "",
                        target: "_blank",
                      },
                    },
                    displayCondition: null,
                    _meta: {
                      htmlID: "u_content_image_1",
                      htmlClassNames: "u_content_image",
                    },
                    selectable: true,
                    draggable: true,
                    duplicatable: true,
                    deletable: true,
                    hideable: true,
                  },
                },
              ],
              values: {
                backgroundColor: "",
                padding: "0px",
                border: {},
                _meta: {
                  htmlID: "u_column_1",
                  htmlClassNames: "u_column",
                },
              },
            },
          ],
          values: {
            displayCondition: null,
            columns: false,
            backgroundColor: "",
            columnsBackgroundColor: "",
            backgroundImage: {
              url: "",
              fullWidth: true,
              repeat: "no-repeat",
              size: "custom",
              position: "center",
            },
            padding: "0px",
            anchor: "",
            hideDesktop: false,
            _meta: {
              htmlID: "u_row_1",
              htmlClassNames: "u_row",
            },
            selectable: true,
            draggable: true,
            duplicatable: true,
            deletable: true,
            hideable: true,
          },
        },
      ],
      values: {
        popupPosition: "center",
        popupWidth: "600px",
        popupHeight: "auto",
        borderRadius: "10px",
        contentAlign: "center",
        contentVerticalAlign: "center",
        contentWidth: "500px",
        fontFamily: {
          label: "Arial",
          value: "arial,helvetica,sans-serif",
        },
        textColor: "#000000",
        popupBackgroundColor: "#FFFFFF",
        popupBackgroundImage: {
          url: "",
          fullWidth: true,
          repeat: "no-repeat",
          size: "cover",
          position: "center",
        },
        popupOverlay_backgroundColor: "rgba(0, 0, 0, 0.1)",
        popupCloseButton_position: "top-right",
        popupCloseButton_backgroundColor: "#DDDDDD",
        popupCloseButton_iconColor: "#000000",
        popupCloseButton_borderRadius: "0px",
        popupCloseButton_margin: "0px",
        popupCloseButton_action: {
          name: "close_popup",
          attrs: {
            onClick:
              "document.querySelector('.u-popup-container').style.display = 'none';",
          },
        },
        backgroundColor: "#e7e7e7",
        backgroundImage: {
          url: "",
          fullWidth: true,
          repeat: "no-repeat",
          size: "custom",
          position: "center",
        },
        preheaderText: "",
        linkStyle: {
          body: true,
          linkColor: "#0000ee",
          linkHoverColor: "#0000ee",
          linkUnderline: true,
          linkHoverUnderline: true,
        },
        _meta: {
          htmlID: "u_body",
          htmlClassNames: "u_body",
        },
      },
    },
    schemaVersion: 15,
  };

  var istemplate = 0,
    dashboardId,
    htmlCode,
    chartData,
    data2;

  const emailEditorRef = useRef(null);

  const [data, setData] = useState([]);
  const [columnX, setColumnX] = useState(0);
  const [columnY, setColumnY] = useState(1);
  const [columnZ, setColumnZ] = useState(2);
  const [xName, setXName] = useState("");
  const [yName, setYName] = useState("");
  const [zName, setZName] = useState("");
  const [columnXData, setColumnXData] = useState([]);
  const [columnYData, setColumnYData] = useState([]);
  const [columnZData, setColumnZData] = useState([]);
  const [chartSubType, setchartSubType] = useState("special20");
  const [color1, setColor1] = useState();
  const [color2, setColor2] = useState();
  const [dashboardName, setdashboardName] = useState("");
  const [dashboardDesc, setdashboardDesc] = useState("");
  const [isSaveDashboard, setisSaveDashboard] = useState(false);
  const [isExportDashboard, setisExportDashboard] = useState(false);
  const [fileName, setFileName] = useState("");
  const [noFileName, setNoFileName] = useState(false);
  const [dId, setDId] = useState();
  const [selectedViewDashboard, setselectedViewDashboard] = useState(false);
  const [viewOnlyDashboards, setViewOnlyDashboards] = useState([]);

  const [dashboardSaved, setDashboardSaved] = useState(false);
  const [dashboardUpdated, setDashboardUpdated] = useState(false);
  const [vDashboardData, setvDashboardData] = useState();
  const [vDashId, setVDashId] = useState();
  const [viewOnlyModal, setViewOnlyModal] = useState(false);
  const [useLegend, setUseLegend] = useState(false);
  const [widgets, setWidgets] = useState([]);
  const [noDashboardTitle, setNoDashboardTitle] = useState(false);
  const [columns, setColumns] = useState([]);

  const [widgetNumber, setWidgetNumber] = useState(0);
  const [myCustomJS, setMyCustomJS] = useState();

  const [xNumeric, setXNumeric] = useState(false);
  const [yNumeric, setYNumeric] = useState(false);
  const [zNumeric, setZNumeric] = useState(false);

  const [saveAsSuccess, setSaveAsSuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [existingDashboard, setExistingDashboard] = useState(false);

  const [designLoaded, serDesignLoaded] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [dashboardURL, setDashboardURL] = useState();
  const [mailBody, setMailBody] = useState();
  const [users, setUsers] = useState();
  const [sentSuccess, setSentSuccess] = useState(false);

  const [dateValue, setDateValue] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [categories, setCategories] = React.useState(null);
  const [selectedValue, setSelectedValue] = React.useState(1);
  const [exportedID, setExportedID] = React.useState();

  const location = useLocation();
  const authContext = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (dateValue) {
      let d1 = dateValue?._d.toJSON();
      console.log(
        "dateValue-",
        // dateValue?._d.toJSON(),
        moment(d1).format("DD/MM/YYYY"),
        moment(d1).format("hh:mm:ss A")
      );
    }
  }, [dateValue]);

  useEffect(() => {
    if (subscription_id === "free_5508") localStorage.setItem("viewMode", 1);
    else localStorage.setItem("viewMode", 0);

    addedWidget = 0;
    console.log(
      "check--",
      location.deep,
      window.innerHeight,
      window.innerWidth
    );
    scrollToTop();
    widgetsData = [];
    widget1 = [];
    widget2 = [];
    widget3 = [];
    widget4 = [];
    widget5 = [];
    widget_viewall();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
               in place of 'smooth' */
    });
  };

  const handleClose3 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSaveAsSuccess(false);
  };

  const handleClose4 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSaveSuccess(false);
  };

  const handleCallback = (childData) => {
    // console.log("childdata>", childData);
    //  chartData = childData
    //  localStorage.setItem('GChartData', JSON.stringify(childData))

    if (
      global.subscription_id === "price_1LfOlnSBwqDDsny7nprdkWUQ" ||
      global.subscription_id === "price_1LfOnUSBwqDDsny71PPaevJ8"
    ) {
      if (_.isEmpty(childData) === false) {
        localStorage.setItem("W1ChartData", JSON.stringify(childData));
        saveWidgetsData_ForSub1(JSON.stringify(childData), 1);
      }
    }

    if (global.subscription_id === "price_1LfOpESBwqDDsny7sB1s8fra") {
      if (addedWidget === 1) {
        if (_.isEmpty(childData) === false) {
          localStorage.setItem("W1ChartData", JSON.stringify(childData));
          saveWidgetsData(JSON.stringify(childData), 1);
        }
      } else if (addedWidget === 2) {
        if (_.isEmpty(childData) === false) {
          localStorage.setItem("W2ChartData", JSON.stringify(childData));
          saveWidgetsData(JSON.stringify(childData), 1);
        }
      } else if (addedWidget === 3) {
        if (_.isEmpty(childData) === false) {
          localStorage.setItem("W3ChartData", JSON.stringify(childData));
          saveWidgetsData(JSON.stringify(childData), 1);
        }
      } else if (addedWidget === 4) {
        if (_.isEmpty(childData) === false) {
          localStorage.setItem("W4ChartData", JSON.stringify(childData));
          saveWidgetsData(JSON.stringify(childData), 1);
        }
      } else if (addedWidget === 5) {
        if (_.isEmpty(childData) === false) {
          localStorage.setItem("W5ChartData", JSON.stringify(childData));
          saveWidgetsData(JSON.stringify(childData), 1);
        }
      }
    }
  };
  const exportHtml = (mode) => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      // console.log(html);
      htmlCode = html;
      storeExportedHtml();
      if (mode === undefined) downloadTxtFile(html);
    });
  };

  const getCurrentHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      // console.log('html??', html)
      currentHtmlCode = html;
    });
  };

  const downloadTxtFile = (htmlData) => {
    const element = document.createElement("a");
    const file = new Blob([htmlData], { type: "text/html" });

    var fileBox = new File([file], fileName, {
      type: "text/html",
      lastModified: Date.now(),
    });
    fileObject = fileBox;
    console.log("check file", fileBox);
    element.href = URL.createObjectURL(file);
    element.download = fileName + ".html";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const saveDesign = (mode) => {
    emailEditorRef.current.editor.saveDesign((data) => {
      // const { design, html } = data
      console.log("check ID,mode", dId, mode == 1, selectedValue);
      let date = dateValue?._d.toJSON();
      axios
        .post(
          mode == 1
            ? configData.API_URL + "personalAccount/database/dashboard_save"
            : configData.API_URL + "personalAccount/database/dashboard_edit",
          mode == 1
            ? {
                account_id: localStorage.getItem("account_id").toString(),
                name: dashboardName,
                description: dashboardDesc,
                data: data,
                type: 0,
                scheduledDate: dateValue
                  ? moment(date).format("YYYY-MM-DD")
                  : "",
                scheduledTime: dateValue ? moment(date).format("HH:mm:ss") : "",
                isScheduled: 0,
                isDeepADashboard: location.deep ? 1 : 0,
                isAutoDashboard: location.deep ? 0 : 1,
                isMlDashboard: 0,
                categoryId: selectedValue,
              }
            : {
                id: dId,
                data: data,
              },

          {}
        )
        .then((response) => {
          console.log("response", response.data);
          if (mode == 1) {
            setDashboardSaved(true);
            setSaveAsSuccess(true);
          }
          if (mode == 2) {
            setDashboardUpdated(true);
            setSaveSuccess(true);
          }
          setTimeout(
            () =>
              mode == 1 ? setDashboardSaved(false) : setDashboardUpdated(false),
            2000
          );

          return response;
        })
        .catch((error) => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log(error.message);
          }
        });
    });
  };

  const getCats = () => {
    axios
      .get(configData.API_URL + "personalAccount/database/dashboard_category")
      .then((response) => {
        console.log("getCats response", response?.data);
        setCategories(response?.data?.data);
        return response;
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(error.message);
        }
      });
  };

  const loadTemplate = () => {
    //console.log('template>', currentHtmlCode)
    // emailEditorRef.current.editor.loadDesign(myTemplate)
    emailEditorRef.current.editor.loadDesign(currentHtmlCode);
  };
  const onLoad = () => {
    localStorage.setItem(
      "W1ChartData",
      JSON.stringify([
        {
          x: [
            "GEO Region",
            "US",
            "US",
            "US",
            "US",
            "US",
            "US",
            "Canada",
            "Canada",
            "Canada",
            "Canada",
            "Canada",
            "Canada",
            "Asia",
            "Asia",
            "Europe",
            "Europe",
            "Europe",
            "Europe",
            "Australia / Oceania",
            "Australia / Oceania",
            "Australia / Oceania",
            "US",
            "US",
            "US",
            "US",
            "US",
            "Canada",
            "Canada",
            "Canada",
            "Mexico",
            "Mexico",
            "Mexico",
            "Asia",
            "Asia",
            "Asia",
            "Asia",
            "US",
            "US",
            "US",
            "US",
            "US",
            "US",
            "Asia",
            "Asia",
            "Asia",
            "Asia",
            "US",
            "US",
            "US",
          ],
          y: [
            "GEO Summary",
            "Domestic",
            "Domestic",
            "Domestic",
            "Domestic",
            "Domestic",
            "Domestic",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "Domestic",
            "Domestic",
            "Domestic",
            "Domestic",
            "Domestic",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "Domestic",
            "Domestic",
            "Domestic",
            "Domestic",
            "Domestic",
            "Domestic",
            "International",
            "International",
            "International",
            "International",
            "Domestic",
            "Domestic",
            "Domestic",
          ],
          type: "bar",
          marker: {},
          name: "Color1",
        },
        {
          type: "bar",
          x: [
            "GEO Region",
            "US",
            "US",
            "US",
            "US",
            "US",
            "US",
            "Canada",
            "Canada",
            "Canada",
            "Canada",
            "Canada",
            "Canada",
            "Asia",
            "Asia",
            "Europe",
            "Europe",
            "Europe",
            "Europe",
            "Australia / Oceania",
            "Australia / Oceania",
            "Australia / Oceania",
            "US",
            "US",
            "US",
            "US",
            "US",
            "Canada",
            "Canada",
            "Canada",
            "Mexico",
            "Mexico",
            "Mexico",
            "Asia",
            "Asia",
            "Asia",
            "Asia",
            "US",
            "US",
            "US",
            "US",
            "US",
            "US",
            "Asia",
            "Asia",
            "Asia",
            "Asia",
            "US",
            "US",
            "US",
          ],
          y: [
            "GEO Summary",
            "Domestic",
            "Domestic",
            "Domestic",
            "Domestic",
            "Domestic",
            "Domestic",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "Domestic",
            "Domestic",
            "Domestic",
            "Domestic",
            "Domestic",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "International",
            "Domestic",
            "Domestic",
            "Domestic",
            "Domestic",
            "Domestic",
            "Domestic",
            "International",
            "International",
            "International",
            "International",
            "Domestic",
            "Domestic",
            "Domestic",
          ],
          name: "Color2",
          marker: {},
        },
      ])
    );
    localStorage.setItem(
      "W1Operations",
      JSON.stringify({
        id: 406,
        name: "test102",
        discription: "",
        operations:
          '{"xColumn": 0, "yColumn": 1, "zColumn": 2, "graphType": "special34", "operation": [{"type": "slice", "slice": {"end_index": "50", "start_index": 0}, "typeId": 3}, {"type": "change_color", "typeId": 17, "change_color": {"color1": "", "color2": "#940f0f"}}], "chart_type": -1, "flow_graph": "", "chart_category": "0"}',
        data: '{"x": ["GEO Region", "US", "US", "US", "US", "US", "US", "Canada", "Canada", "Canada", "Canada", "Canada", "Canada", "Asia", "Asia", "Europe", "Europe", "Europe", "Europe", "Australia / Oceania", "Australia / Oceania", "Australia / Oceania", "US", "US", "US", "US", "US", "Canada", "Canada", "Canada", "Mexico", "Mexico", "Mexico", "Asia", "Asia", "Asia", "Asia", "US", "US", "US", "US", "US", "US", "Asia", "Asia", "Asia", "Asia", "US", "US", "US"], "y": ["GEO Summary", "Domestic", "Domestic", "Domestic", "Domestic", "Domestic", "Domestic", "International", "International", "International", "International", "International", "International", "International", "International", "International", "International", "International", "International", "International", "International", "International", "Domestic", "Domestic", "Domestic", "Domestic", "Domestic", "International", "International", "International", "International", "International", "International", "International", "International", "International", "International", "Domestic", "Domestic", "Domestic", "Domestic", "Domestic", "Domestic", "International", "International", "International", "International", "Domestic", "Domestic", "Domestic"], "z": ["Cargo Type Code", "Cargo", "Cargo", "Cargo", "Mail", "Cargo", "Mail", "Cargo", "Express", "Mail", "Cargo", "Express", "Mail", "Cargo", "Cargo", "Cargo", "Mail", "Cargo", "Mail", "Cargo", "Mail", "Cargo", "Cargo", "Express", "Cargo", "Express", "Mail", "Cargo", "Cargo", "Mail", "Cargo", "Express", "Cargo", "Cargo", "Mail", "Cargo", "Mail", "Cargo", "Mail", "Cargo", "Mail", "Cargo", "Cargo", "Cargo", "Cargo", "Cargo", "Cargo", "Cargo", "Cargo", "Mail"], "result": [["GEO Region", "GEO Summary", "Cargo Type Code", "Cargo Weight LBS", "Operating Airline", "Published Airline", "Activity Type Code", "Cargo Aircraft Type", "ï»¿Cargo Metric TONS", "Operating Airline IATA Code", "Published Airline IATA Code"], ["US", "Domestic", "Cargo", 45423, "ABX Air", "ABX Air", "Deplaned", "Freighter", 20.604, "GB", "GB"], ["US", "Domestic", "Cargo", 106869, "ABX Air", "ABX Air", "Enplaned", "Freighter", 48.476, "GB", "GB"], ["US", "Domestic", "Cargo", 55427, "ATA Airlines", "ATA Airlines", "Deplaned", "Passenger", 25.142, "TZ", "TZ"], ["US", "Domestic", "Mail", 50278, "ATA Airlines", "ATA Airlines", "Deplaned", "Passenger", 22.806, "TZ", "TZ"], ["US", "Domestic", "Cargo", 74183, "ATA Airlines", "ATA Airlines", "Enplaned", "Passenger", 33.649, "TZ", "TZ"], ["US", "Domestic", "Mail", 347558, "ATA Airlines", "ATA Airlines", "Enplaned", "Passenger", 157.652, "TZ", "TZ"], ["Canada", "International", "Cargo", 47025, "Air Canada", "Air Canada", "Deplaned", "Passenger", 21.331, "AC", "AC"], ["Canada", "International", "Express", 7234, "Air Canada", "Air Canada", "Deplaned", "Passenger", 3.281, "AC", "AC"], ["Canada", "International", "Mail", 29762, "Air Canada", "Air Canada", "Deplaned", "Passenger", 13.5, "AC", "AC"], ["Canada", "International", "Cargo", 37291, "Air Canada", "Air Canada", "Enplaned", "Passenger", 16.915, "AC", "AC"], ["Canada", "International", "Express", 6707, "Air Canada", "Air Canada", "Enplaned", "Passenger", 3.042, "AC", "AC"], ["Canada", "International", "Mail", 67831, "Air Canada", "Air Canada", "Enplaned", "Passenger", 30.768, "AC", "AC"], ["Asia", "International", "Cargo", 1127590, "Air China", "Air China", "Deplaned", "Passenger", 511.475, "CA", "CA"], ["Asia", "International", "Cargo", 353098, "Air China", "Air China", "Enplaned", "Passenger", 160.165, "CA", "CA"], ["Europe", "International", "Cargo", 464002, "Air France", "Air France", "Deplaned", "Passenger", 210.471, "AF", "AF"], ["Europe", "International", "Mail", 38810, "Air France", "Air France", "Deplaned", "Passenger", 17.604, "AF", "AF"], ["Europe", "International", "Cargo", 423069, "Air France", "Air France", "Enplaned", "Passenger", 191.904, "AF", "AF"], ["Europe", "International", "Mail", 100001, "Air France", "Air France", "Enplaned", "Passenger", 45.36, "AF", "AF"], ["Australia / Oceania", "International", "Cargo", 317156, "Air New Zealand", "Air New Zealand", "Deplaned", "Passenger", 143.862, "NZ", "NZ"], ["Australia / Oceania", "International", "Mail", 11548, "Air New Zealand", "Air New Zealand", "Deplaned", "Passenger", 5.238, "NZ", "NZ"], ["Australia / Oceania", "International", "Cargo", 221652, "Air New Zealand", "Air New Zealand", "Enplaned", "Passenger", 100.541, "NZ", "NZ"], ["US", "Domestic", "Cargo", 153748, "Alaska Airlines", "Alaska Airlines", "Deplaned", "Passenger", 69.74, "AS", "AS"], ["US", "Domestic", "Express", 3713, "Alaska Airlines", "Alaska Airlines", "Deplaned", "Passenger", 1.684, "AS", "AS"], ["US", "Domestic", "Cargo", 295930, "Alaska Airlines", "Alaska Airlines", "Enplaned", "Passenger", 134.234, "AS", "AS"], ["US", "Domestic", "Express", 3367, "Alaska Airlines", "Alaska Airlines", "Enplaned", "Passenger", 1.527, "AS", "AS"], ["US", "Domestic", "Mail", 28705, "Alaska Airlines", "Alaska Airlines", "Enplaned", "Passenger", 13.021, "AS", "AS"], ["Canada", "International", "Cargo", 34206, "Alaska Airlines", "Alaska Airlines", "Deplaned", "Passenger", 15.516, "AS", "AS"], ["Canada", "International", "Cargo", 21031, "Alaska Airlines", "Alaska Airlines", "Enplaned", "Passenger", 9.54, "AS", "AS"], ["Canada", "International", "Mail", 48979, "Alaska Airlines", "Alaska Airlines", "Enplaned", "Passenger", 22.217, "AS", "AS"], ["Mexico", "International", "Cargo", 99222, "Alaska Airlines", "Alaska Airlines", "Deplaned", "Passenger", 45.007, "AS", "AS"], ["Mexico", "International", "Express", 140, "Alaska Airlines", "Alaska Airlines", "Deplaned", "Passenger", 0.064, "AS", "AS"], ["Mexico", "International", "Cargo", 16838, "Alaska Airlines", "Alaska Airlines", "Enplaned", "Passenger", 7.638, "AS", "AS"], ["Asia", "International", "Cargo", 820116, "All Nippon Airways", "All Nippon Airways", "Deplaned", "Passenger", 372.005, "NH", "NH"], ["Asia", "International", "Mail", 95590, "All Nippon Airways", "All Nippon Airways", "Deplaned", "Passenger", 43.36, "NH", "NH"], ["Asia", "International", "Cargo", 347156, "All Nippon Airways", "All Nippon Airways", "Enplaned", "Passenger", 157.47, "NH", "NH"], ["Asia", "International", "Mail", 190201, "All Nippon Airways", "All Nippon Airways", "Enplaned", "Passenger", 86.275, "NH", "NH"], ["US", "Domestic", "Cargo", 1745713, "American Airlines", "American Airlines", "Deplaned", "Passenger", 791.855, "AA", "AA"], ["US", "Domestic", "Mail", 394829, "American Airlines", "American Airlines", "Deplaned", "Passenger", 179.094, "AA", "AA"], ["US", "Domestic", "Cargo", 2610403, "American Airlines", "American Airlines", "Enplaned", "Passenger", 1184.079, "AA", "AA"], ["US", "Domestic", "Mail", 867692, "American Airlines", "American Airlines", "Enplaned", "Passenger", 393.585, "AA", "AA"], ["US", "Domestic", "Cargo", 46448, "Ameriflight", "Ameriflight", "Deplaned", "Freighter", 21.069, "A8", "A8"], ["US", "Domestic", "Cargo", 13271, "Ameriflight", "Ameriflight", "Enplaned", "Freighter", 6.02, "A8", "A8"], ["Asia", "International", "Cargo", 377597, "Asiana Airlines", "Asiana Airlines", "Deplaned", "Freighter", 171.278, "OZ", "OZ"], ["Asia", "International", "Cargo", 646310, "Asiana Airlines", "Asiana Airlines", "Deplaned", "Passenger", 293.166, "OZ", "OZ"], ["Asia", "International", "Cargo", 392733, "Asiana Airlines", "Asiana Airlines", "Enplaned", "Freighter", 178.144, "OZ", "OZ"], ["Asia", "International", "Cargo", 672216, "Asiana Airlines", "Asiana Airlines", "Enplaned", "Passenger", 304.917, "OZ", "OZ"], ["US", "Domestic", "Cargo", 1159652, "Astar Air Cargo", "Astar Air Cargo", "Deplaned", "Freighter", 526.018, "ER", "ER"], ["US", "Domestic", "Cargo", 1535268, "Astar Air Cargo", "Astar Air Cargo", "Enplaned", "Freighter", 696.398, "ER", "ER"], ["US", "Domestic", "Mail", 11, "Atlantic Southeast Airlines", "Delta Air Lines", "Deplaned", "Passenger", 0.005, "EV", "DL"], ["Europe", "International", "Cargo", 1021909, "British Airways", "British Airways", "Deplaned", "Passenger", 463.538, "BA", "BA"], ["Europe", "International", "Mail", 15096, "British Airways", "British Airways", "Deplaned", "Passenger", 6.848, "BA", "BA"], ["Europe", "International", "Cargo", 776831, "British Airways", "British Airways", "Enplaned", "Passenger", 352.371, "BA", "BA"], ["Europe", "International", "Cargo", 1029715, "Cargolux Airlines", "Cargolux Airlines", "Deplaned", "Freighter", 467.079, "CV", "CV"], ["Europe", "International", "Cargo", 786402, "Cargolux Airlines", "Cargolux Airlines", "Enplaned", "Freighter", 356.712, "CV", "CV"], ["Asia", "International", "Cargo", 920693, "Cathay Pacific", "Cathay Pacific", "Deplaned", "Freighter", 417.626, "CX", "CX"], ["Asia", "International", "Cargo", 241333, "Cathay Pacific", "Cathay Pacific", "Deplaned", "Passenger", 109.469, "CX", "CX"], ["Asia", "International", "Mail", 129473, "Cathay Pacific", "Cathay Pacific", "Deplaned", "Passenger", 58.729, "CX", "CX"], ["Asia", "International", "Cargo", 1110414, "Cathay Pacific", "Cathay Pacific", "Enplaned", "Freighter", 503.684, "CX", "CX"], ["Asia", "International", "Cargo", 251430, "Cathay Pacific", "Cathay Pacific", "Enplaned", "Passenger", 114.049, "CX", "CX"], ["Asia", "International", "Express", 3, "Cathay Pacific", "Cathay Pacific", "Enplaned", "Passenger", 0.001, "CX", "CX"], ["Asia", "International", "Mail", 251430, "Cathay Pacific", "Cathay Pacific", "Enplaned", "Passenger", 114.049, "CX", "CX"], ["Asia", "International", "Cargo", 2108144, "China Airlines", "China Airlines", "Deplaned", "Freighter", 956.254, "CI", "CI"], ["Asia", "International", "Mail", 66167, "China Airlines", "China Airlines", "Deplaned", "Freighter", 30.013, "CI", "CI"], ["Asia", "International", "Cargo", 2065410, "China Airlines", "China Airlines", "Enplaned", "Freighter", 936.87, "CI", "CI"], ["Asia", "International", "Mail", 47294, "China Airlines", "China Airlines", "Enplaned", "Freighter", 21.453, "CI", "CI"], ["Asia", "International", "Cargo", 315657, "China Cargo Airlines", "China Cargo Airlines", "Deplaned", "Freighter", 143.182, "CK", "CK"], ["Asia", "International", "Cargo", 403914, "China Cargo Airlines", "China Cargo Airlines", "Enplaned", "Freighter", 183.215, "CK", "CK"], ["US", "Domestic", "Cargo", 722328, "Delta Air Lines", "Delta Air Lines", "Deplaned", "Passenger", 327.648, "DL", "DL"], ["US", "Domestic", "Express", 531960, "Delta Air Lines", "Delta Air Lines", "Deplaned", "Passenger", 241.297, "DL", "DL"], ["US", "Domestic", "Mail", 160118, "Delta Air Lines", "Delta Air Lines", "Deplaned", "Passenger", 72.63, "DL", "DL"], ["US", "Domestic", "Cargo", 64769, "Delta Air Lines", "Delta Air Lines", "Enplaned", "Passenger", 29.379, "DL", "DL"], ["US", "Domestic", "Express", 1481410, "Delta Air Lines", "Delta Air Lines", "Enplaned", "Passenger", 671.968, "DL", "DL"], ["US", "Domestic", "Mail", 213104, "Delta Air Lines", "Delta Air Lines", "Enplaned", "Passenger", 96.664, "DL", "DL"], ["Asia", "International", "Cargo", 3343546, "EVA Airways", "EVA Airways", "Deplaned", "Combi", 1516.632, "BR", "BR"], ["Asia", "International", "Cargo", 97764, "EVA Airways", "EVA Airways", "Deplaned", "Passenger", 44.346, "BR", "BR"], ["Asia", "International", "Cargo", 2123959, "EVA Airways", "EVA Airways", "Enplaned", "Combi", 963.428, "BR", "BR"], ["Asia", "International", "Cargo", 62104, "EVA Airways", "EVA Airways", "Enplaned", "Passenger", 28.17, "BR", "BR"], ["US", "Domestic", "Cargo", 215807, "Evergreen International Airlines", "Evergreen International Airlines", "Deplaned", "Freighter", 97.89, "EZ", "EZ"], ["US", "Domestic", "Cargo", 8985408, "Federal Express", "Federal Express", "Deplaned", "Freighter", 4075.781, "FX", "FX"], ["US", "Domestic", "Cargo", 7879802, "Federal Express", "Federal Express", "Enplaned", "Freighter", 3574.278, "FX", "FX"], ["US", "Domestic", "Cargo", 37720, "Frontier Airlines", "Frontier Airlines", "Deplaned", "Passenger", 17.11, "F9", "F9"], ["US", "Domestic", "Express", 11381, "Frontier Airlines", "Frontier Airlines", "Deplaned", "Passenger", 5.162, "F9", "F9"], ["US", "Domestic", "Cargo", 79810, "Frontier Airlines", "Frontier Airlines", "Enplaned", "Passenger", 36.202, "F9", "F9"], ["US", "Domestic", "Express", 1664, "Frontier Airlines", "Frontier Airlines", "Enplaned", "Passenger", 0.755, "F9", "F9"], ["US", "Domestic", "Cargo", 147814, "Hawaiian Airlines", "Hawaiian Airlines", "Deplaned", "Passenger", 67.048, "HA", "HA"], ["US", "Domestic", "Cargo", 420021, "Hawaiian Airlines", "Hawaiian Airlines", "Enplaned", "Passenger", 190.522, "HA", "HA"], ["US", "Domestic", "Cargo", 26270, "Horizon Air", "Alaska Airlines", "Deplaned", "Passenger", 11.916, "QX", "AS"], ["US", "Domestic", "Cargo", 5330, "Horizon Air", "Alaska Airlines", "Enplaned", "Passenger", 2.418, "QX", "AS"], ["Europe", "International", "Cargo", 11856, "Icelandair (Inactive)", "Icelandair (Inactive)", "Deplaned", "Passenger", 5.378, "FI", "FI"], ["Europe", "International", "Cargo", 82208, "Icelandair (Inactive)", "Icelandair (Inactive)", "Enplaned", "Passenger", 37.29, "FI", "FI"], ["Asia", "International", "Cargo", 1464911, "Japan Airlines", "Japan Airlines", "Deplaned", "Freighter", 664.484, "JL", "JL"], ["Asia", "International", "Cargo", 490152, "Japan Airlines", "Japan Airlines", "Deplaned", "Passenger", 222.333, "JL", "JL"], ["Asia", "International", "Mail", 168662, "Japan Airlines", "Japan Airlines", "Deplaned", "Freighter", 76.505, "JL", "JL"], ["Asia", "International", "Mail", 56433, "Japan Airlines", "Japan Airlines", "Deplaned", "Passenger", 25.598, "JL", "JL"], ["Asia", "International", "Cargo", 1554286, "Japan Airlines", "Japan Airlines", "Enplaned", "Freighter", 705.024, "JL", "JL"], ["Asia", "International", "Cargo", 520057, "Japan Airlines", "Japan Airlines", "Enplaned", "Passenger", 235.898, "JL", "JL"], ["Asia", "International", "Mail", 186902, "Japan Airlines", "Japan Airlines", "Enplaned", "Freighter", 84.779, "JL", "JL"], ["Asia", "International", "Mail", 62537, "Japan Airlines", "Japan Airlines", "Enplaned", "Passenger", 28.367, "JL", "JL"], ["Europe", "International", "Cargo", 702079, "KLM Royal Dutch Airlines", "KLM Royal Dutch Airlines", "Deplaned", "Passenger", 318.463, "KL", "KL"]], "columns": ["GEO Region", "GEO Summary", "Cargo Type Code", "Cargo Weight LBS", "Operating Airline", "Published Airline", "Activity Type Code", "Cargo Aircraft Type", "ï»¿Cargo Metric TONS", "Operating Airline IATA Code", "Published Airline IATA Code"]}',
        account_id: "9c209d4c-dcb8-4625-a7b0-f48b7e69829d",
        parent_id: 0,
        image_link: null,
        is_deleted: 0,
        created_at: "2022-09-15T12:48:28.000Z",
        updated_at: "2022-09-15T12:48:29.000Z",
        isFavorite: 1,
      })
    );
    setTimeout(() => {
      console.log("loaded", localStorage.getItem("viewMode") == 1);
      // editor instance is created
      // you can load your template here;
      // const templateJson = {};
      if (localStorage.getItem("viewMode") == 1) {
        displayViewOnlyDashboard(location?.state?.id);
      } else {
        if (istemplate) emailEditorRef.current.editor.loadDesign(temp2);
        else emailEditorRef.current.editor.loadDesign(myTemplate2);
        // emailEditorRef.current.editor.loadDesign(myTemplate2);
      }
      serDesignLoaded(true);
    }, 500);
  };

  const onReady = () => {
    // editor is ready
    console.log("onReady");
  };

  const storeExportedHtml = () => {
    console.log(
      "dashboardId-",
      dId,
      localStorage.getItem("account_id"),
      fileName
    );
    axios
      .post(
        configData.API_URL + "personalAccount/database/dashboard_export",
        {
          dashboard_id: dId,
          name: fileName,
          data: htmlCode,
          account_id:
            localStorage.getItem("account_id") &&
            localStorage.getItem("account_id").toString(),
        },
        {}
      )
      .then((response) => {
        console.log("export response", response.data?.data?.insertId);
        setExportedID(response.data?.data?.insertId);
        dashboardFileSave();
        return response;
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(error.message);
        }
      });
  };

  const viewExportedDashboards = () => {
    console.log("DashboardID-", dId);
    axios
      .post(
        configData.API_URL +
          "personalAccount/database/dashboard_export_viewall",
        {
          dashboard_id: dId,
        },
        {}
      )
      .then((response) => {
        console.log(
          "response",
          // JSON.parse(response.data.data[0].data),
          response.data.data
        );
        setViewOnlyDashboards(response.data.data);
        return response;
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(error.message);
        }
      });
  };

  const dashboardFileSave = () => {
    console.log(
      "DashboardID-",
      dId,
      fileObject,
      fileName,
      localStorage.getItem("account_id")
    );

    const formData = new FormData();

    formData.append("userId", localStorage.getItem("account_id"));
    formData.append("dashboardFile", fileObject);
    formData.append("fileName", fileName);

    axios
      .post(
        configData.API_URL + "personalAccount/database/dashboard_file_save",
        // {
        //   userId: localStorage.getItem("account_id"),
        //   dashboardFile: htmlCode,
        //   fileName: fileName,
        // }
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(
          "response dashboard_file_save",
          response,
          // JSON.parse(response.data.data[0].data),
          response?.data
        );
        setDashboardURL("http://44.241.186.53:4141" + response?.data);
        // setMailBody("http://44.241.186.53:4141" + response?.data);

        setMailBody(
          `<html>
  <body>
      <p>Dear User,</p>

      <p>To access the shared dashboard, follow these simple steps:</p>

      <p>Visit <a href="http://44.241.186.53:3000/signin">http://44.241.186.53:3000/signin</a></p>
      <p>Log in with:</p>
      <ul>
          <li>Username: Your email address</li>
          <li>Password: Abcd!@3</li>
      </ul>

      <p>Explore the dashboard and feel free to reach out if you need any assistance.</p>

      <p>Best regards</p>
  </body>
  </html>`
        );

        setShareModal(true);
        return response;
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(error.message);
        }
      });
  };

  const sendEmail = () => {
    console.log("dashboardId-", mailBody, users.split(","), exportedID);
    axios
      .post(
        configData.API_URL + "personalAccount/users/sendEmail",
        {
          userId: localStorage.getItem("user_id"),
          message: mailBody,
          mailid: users.split(","),
          exportDashboardId: exportedID,
        },
        {}
      )
      .then((response) => {
        console.log("response send email", response.data);
        setSentSuccess(true);

        setTimeout(() => {
          setSentSuccess(false);
        }, 1200);
        return response;
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(error.message);
        }
      });
  };

  const getData = () => {
    console.log("IDD", localStorage.getItem("account_id"));
    axios
      .get(
        configData.API_URL +
          "personalAccount/users/getMyDetails?id=" +
          localStorage.getItem("account_id")
      )
      .then((response) => {
        // console.log("ssss", response.data);
        console.log("getMyDetails response", response.data.data[0]?.user_id);
        localStorage.setItem("user_id", response.data.data[0]?.user_id);
        console.log("check userID", localStorage.getItem("user_id"));
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(error.message);
        }
      });
  };
  useEffect(() => {
    //console.log('location',location.state)
    console.log(
      "check onMount",
      localStorage.getItem("viewMode") == 1,
      location.share
    );
    if (location.state != undefined) {
      if (localStorage.getItem("viewMode") == 1) {
      } else {
        if (location.state.data != undefined) {
          setExistingDashboard(true);
          let temp = JSON.parse(location.state.data);
          //   console.log('details2', temp)
          temp2["counters"] = temp.counters;
          temp2["body"] = temp.body;
          temp2["schemaVersion"] = temp.schemaVersion;
          console.log("check2 data", temp2);
          dashboardId = location.state.id;
          console.log("Did..", dashboardId);
          setDId(dashboardId);
          istemplate = 1;
          onLoad();
        } else {
          let temp3 = JSON.parse(location.state);
          console.log("details2", location.state);
          temp2["counters"] = temp3.counters;
          temp2["body"] = temp3.body;
          temp2["schemaVersion"] = temp3.schemaVersion;
          //console.log('check2 data', temp2)
          istemplate = 1;
          onLoad();
        }
      }
    } else {
      localStorage.setItem("W1ChartData", null);
      localStorage.setItem("W2ChartData", null);
      localStorage.setItem("W3ChartData", null);
      localStorage.setItem("W4ChartData", null);
      localStorage.setItem("W5ChartData", null);
      localStorage.setItem("W1Operations", null);
      localStorage.setItem("W2Operations", null);
      localStorage.setItem("W3Operations", null);
      localStorage.setItem("W4Operations", null);
      localStorage.setItem("W5Operations", null);
    }
  }, [location]);

  useEffect(() => {
    if (designLoaded) {
      if (location.share) {
        // exportHtml(2);
        setTimeout(() => {
          setisExportDashboard(true);
          // setShareModal(true);
        }, 1600);
      }
    }
  }, [designLoaded]);

  useEffect(() => {
    viewExportedDashboards();
  }, [dId != undefined]);

  useEffect(() => {
    setXNumeric(!columnXData.some(isNaN));
  }, [columnXData]);
  useEffect(() => {
    setYNumeric(!columnYData.some(isNaN));
  }, [columnYData]);
  useEffect(() => {
    setZNumeric(!columnZData.some(isNaN));
  }, [columnZData]);

  useEffect(() => {
    console.log("addedWidget", addedWidget);
  }, [addedWidget]);

  useEffect(() => {
    getData();
    getCats();
  }, []);

  const displayViewOnlyDashboard = (Id) => {
    // console.log("IIII", vDashId, location.state.data);
    setvDashboardData(location.state.data);
  };

  // useEffect(() => {
  //   console.log(location.pathname)
  //   console.log(location.state)
  //   setchartSubType(location.state.type)
  //   setData(location.state.data)
  //   setcolumnXData(location.state.x)
  //   setcolumnYData(location.state.y)
  //   setcolumnZData(location.state.z)
  //   setColor1(location.state.colo1)
  //   setColor2(location.state.color2)
  // }, [location])

  const widget_viewall = () => {
    setTimeout(() => {
      axios
        .post(
          configData.API_URL + "personalAccount/database/widget_viewall",
          {
            account_id: localStorage.getItem("account_id").toString(),
          },

          {}
        )
        .then((response) => {
          console.log("response All widgets", response.data.data);
          setWidgets(response.data.data);
          return response;
        })
        .catch((error) => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log(error.message);
          }
        });
    }, 1000);
  };

  const saveWidgetsData = (data1, mode) => {
    if (addedWidget === 1) {
      if (mode === 1) {
        widget1.push({ data: data1 });
      } else if (mode === 2) {
        widget1.push({ operations: data1 });
      }
    }
    if (addedWidget === 2) {
      if (mode === 1) {
        widget2.push({ data: data1 });
      } else if (mode === 2) {
        widget2.push({ operations: data1 });
      }
    }
    if (addedWidget === 3) {
      if (mode === 1) {
        widget3.push({ data: data1 });
      } else if (mode === 2) {
        widget3.push({ operations: data1 });
      }
    }
    if (addedWidget === 4) {
      if (mode === 1) {
        widget4.push({ data: data1 });
      } else if (mode === 2) {
        widget4.push({ operations: data1 });
      }
    }
    if (addedWidget === 5) {
      if (mode === 1) {
        widget5.push({ data: data1 });
      } else if (mode === 2) {
        widget5.push({ operations: data1 });
      }
    }
  };

  const saveWidgetsData_ForSub1 = (data1, mode) => {
    if (mode === 1) {
      widget1.push({ data: data1 });
    } else if (mode === 2) {
      widget1.push({ operations: data1 });
    }

    // if (addedWidget === 2) {
    //   if (mode === 1) {
    //     widget2.push({ data: data1 });
    //   } else if (mode === 2) {
    //     widget2.push({ operations: data1 });
    //   }
    // }
    // if (addedWidget === 3) {
    //   if (mode === 1) {
    //     widget3.push({ data: data1 });
    //   } else if (mode === 2) {
    //     widget3.push({ operations: data1 });
    //   }
    // }
    // if (addedWidget === 4) {
    //   if (mode === 1) {
    //     widget4.push({ data: data1 });
    //   } else if (mode === 2) {
    //     widget4.push({ operations: data1 });
    //   }
    // }
    // if (addedWidget === 5) {
    //   if (mode === 1) {
    //     widget5.push({ data: data1 });
    //   } else if (mode === 2) {
    //     widget5.push({ operations: data1 });
    //   }
    // }
  };

  const copyToClipboard = async (url) => {
    if (document.hasFocus()) {
      try {
        await navigator.clipboard.writeText(url);
        alert("Image URL copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
        alert("Failed to copy the image URL to clipboard.");
      }
    } else {
      alert("Failed to copy the image URL to clipboard.");
      // Handle the case where the document is not focused (e.g., show an error message).
    }
  };

  return (
    <>
      {authContext.isLoggedIn ? (
        <>
          <MiniDrawer appBar={true} hideSideBar={true} />
          {localStorage.getItem("viewMode") == 0 && (
            <div style={{ position: "absolute", top: 80, left: 90 }}>
              <Button
                sx={{
                  bgcolor: "#0aafff",
                  color: "white",
                  "&:hover, &:focus": {
                    bgcolor: "#067ab4",
                    color: "white",
                  },
                }}
                onClick={() => {
                  setisSaveDashboard(true);
                }}
                variant="outlined"
              >
                Save As Dashboard
              </Button>
            </div>
          )}
          {localStorage.getItem("viewMode") == 0 && existingDashboard && (
            <div style={{ position: "absolute", top: 80, left: 290 }}>
              <Button
                sx={{
                  bgcolor: "#0aafff",
                  color: "white",
                  "&:hover, &:focus": {
                    bgcolor: "#067ab4",
                    color: "white",
                  },
                }}
                onClick={() => {
                  saveDesign(2);
                }}
                variant="outlined"
              >
                Save Dashboard
              </Button>
            </div>
          )}

          {localStorage.getItem("viewMode") == 0 && (
            <div
              style={{
                position: "absolute",
                top: 80,
                left: !existingDashboard ? 300 : 470,
              }}
            >
              <Button
                sx={{
                  bgcolor: "#0aafff",
                  color: "white",
                  "&:hover, &:focus": {
                    bgcolor: "#067ab4",
                    color: "white",
                  },
                }}
                onClick={() => setisExportDashboard(true)}
                variant="outlined"
              >
                Export Dashboard
              </Button>
            </div>
          )}
          <div style={{ position: "absolute", top: 80, left: "90%" }}>
            <Button
              sx={{
                bgcolor: "#0aafff",
                color: "white",
                "&:hover, &:focus": {
                  bgcolor: "#067ab4",
                  color: "white",
                },
              }}
              onClick={() => {
                history.goBack();
              }}
              variant="outlined"
            >
              Go Back
            </Button>
          </div>
          {localStorage.getItem("viewMode") == 0 && (
            <div
              style={{
                position: "absolute",
                top: 80,
                left: "56%",
              }}
            >
              <Button
                sx={{
                  bgcolor: "#0aafff",
                  color: "white",
                  "&:hover, &:focus": {
                    bgcolor: "#067ab4",
                    color: "white",
                  },
                }}
                onClick={() => {
                  if (localStorage.getItem("WIDGET_URL"))
                    copyToClipboard(localStorage.getItem("WIDGET_URL"));
                }}
                variant="outlined"
              >
                Get Widget Image URL
              </Button>
            </div>
          )}

          {localStorage.getItem("viewMode") == 0 && (
            <div style={{ position: "absolute", top: 85, left: "75%" }}>
              <div style={{ marginTop: 0 }}>
                <select
                  onChange={(e) => {
                    getCurrentHtml();
                    addedWidget++;
                    setWidgetNumber(addedWidget);
                    localStorage.setItem("WIDGET", addedWidget);
                    // loadTemplate()
                    var widgetIndex = e.target.value;

                    var operations = widgets[widgetIndex].operations;
                    var data1 = widgets[widgetIndex].data;
                    //  console.log('WidgetData$?', JSON.parse(data1).result)
                    console.log(
                      "operations?",
                      JSON.parse(operations).operation
                    );
                    operationsBox = JSON.parse(operations).operation;
                    var legend = operationsBox.filter((e) => e.typeId == 24);
                    console.log("legend?", legend);
                    if (legend[0] && legend[0].add_legend === true)
                      setUseLegend(true);
                    widgetData = JSON.parse(data1).result;

                    setchartSubType(JSON.parse(operations).graphType);
                    // localStorage.setItem(
                    //   'GChartData2',
                    //   JSON.stringify(widgets[widgetIndex])
                    // )
                    if (
                      global.subscription_id ===
                        "price_1LfOlnSBwqDDsny7nprdkWUQ" ||
                      global.subscription_id ===
                        "price_1LfOnUSBwqDDsny71PPaevJ8"
                    ) {
                      localStorage.setItem(
                        "W1Operations",
                        JSON.stringify(widgets[widgetIndex])
                      );
                      saveWidgetsData_ForSub1(
                        JSON.stringify(widgets[widgetIndex]),
                        2
                      );
                      widgetsData.push({ widget1: widget1 });

                      data2 = JSON.parse(data1);
                      console.log("widgetsData", widgetsData);
                      // console.log('check???', data2)
                      setColumnXData(data2.x);
                      setColumnYData(data2.y);
                      setColumnZData(data2.z);
                      setColumns(data2.columns);
                    }

                    if (
                      global.subscription_id ===
                      "price_1LfOpESBwqDDsny7sB1s8fra"
                    ) {
                      if (addedWidget === 1) {
                        localStorage.setItem(
                          "W1Operations",
                          JSON.stringify(widgets[widgetIndex])
                        );
                        saveWidgetsData(
                          JSON.stringify(widgets[widgetIndex]),
                          2
                        );
                        widgetsData.push({ widget1: widget1 });
                      } else if (addedWidget === 2) {
                        localStorage.setItem(
                          "W2Operations",
                          JSON.stringify(widgets[widgetIndex])
                        );
                        saveWidgetsData(
                          JSON.stringify(widgets[widgetIndex]),
                          2
                        );
                        widgetsData.push({ widget2: widget2 });
                      } else if (addedWidget === 3) {
                        localStorage.setItem(
                          "W3Operations",
                          JSON.stringify(widgets[widgetIndex])
                        );
                        saveWidgetsData(
                          JSON.stringify(widgets[widgetIndex]),
                          2
                        );
                        widgetsData.push({ widget3: widget3 });
                      } else if (addedWidget === 4) {
                        localStorage.setItem(
                          "W4Operations",
                          JSON.stringify(widgets[widgetIndex])
                        );
                        saveWidgetsData(
                          JSON.stringify(widgets[widgetIndex]),
                          2
                        );
                        widgetsData.push({ widget4: widget4 });
                      } else if (addedWidget === 5) {
                        localStorage.setItem(
                          "W5Operations",
                          JSON.stringify(widgets[widgetIndex])
                        );
                        saveWidgetsData(
                          JSON.stringify(widgets[widgetIndex]),
                          2
                        );
                        widgetsData.push({ widget5: widget5 });
                      }

                      data2 = JSON.parse(data1);
                      console.log("widgetsData", widgetsData);
                      // console.log('check???', data2)
                      setColumnXData(data2.x);
                      setColumnYData(data2.y);
                      setColumnZData(data2.z);
                      setColumns(data2.columns);
                    }
                  }}
                  style={{
                    border: "1px solid #FFF",
                    width: 150,
                    height: 36,
                    marginTop: -10,
                    backgroundColor: "white",
                    border: "0.5px solid",
                    borderRadius: 10,
                    fontSize: 12,
                    color: "#067AB4",
                  }}
                >
                  <option
                    style={{
                      fontSize: 14,
                      height: 25,
                      marginBottom: 20,
                    }}
                    // value={0}
                  >
                    {"Select Widget"}
                  </option>
                  {widgets &&
                    widgets.map((ele, i) => (
                      <option style={{ fontSize: 14, height: 25 }} value={i}>
                        {ele.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          )}

          {isSaveDashboard && (
            <Modal
              open={isSaveDashboard}
              onClose={() => {
                setisSaveDashboard(false);
                setNoDashboardTitle(false);
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={saveDashModalstyle}>
                <>
                  <CloseIcon
                    onClick={() => {
                      setisSaveDashboard(false);
                      setNoDashboardTitle(false);
                    }}
                    style={{
                      position: "absolute",
                      left: "95%",
                      top: "1%",
                      cursor: "pointer",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        marginLeft: 20,
                        marginTop: 5,
                        fontSize: 16,
                        fontFamily: "Trebuchet MS",
                      }}
                    >
                      Dashboard Name
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <input
                        style={{
                          marginLeft: 20,
                          alignSelf: "center",
                          width: 350,
                          height: 40,
                          border: "1px solid #CCC",
                        }}
                        type={"text"}
                        placeholder={"Add Dashboard Title.."}
                        value={dashboardName}
                        onChange={(e) => setdashboardName(e.target.value)}
                      />
                    </div>

                    <div
                      style={{
                        marginTop: 5,
                        marginLeft: 20,
                        marginTop: 5,
                        fontSize: 16,
                        fontFamily: "Trebuchet MS",
                      }}
                    >
                      Dashboard Description
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <textarea
                        style={{
                          marginLeft: 20,
                          width: 350,
                          height: 160,
                          border: "1px solid #CCC",
                          overflow: "auto",
                        }}
                        placeholder={"Add Dashboard Description.."}
                        value={dashboardDesc}
                        onChange={(e) => setdashboardDesc(e.target.value)}
                        cols={40}
                        rows={10}
                      />
                    </div>
                    <div
                      style={{
                        marginTop: 5,
                        marginLeft: 20,
                        fontSize: 16,
                        fontFamily: "Trebuchet MS",
                      }}
                    >
                      Select Category
                    </div>
                    <Select
                      style={{
                        marginTop: "10px",
                        marginLeft: 15,
                        height: 25,
                        width: 300,
                        border: "0.5px solid",
                        backgroundColor: "white",
                        borderRadius: 10,
                        fontSize: 12,
                        color: "#067AB4",
                      }}
                      // labelId='mutiple-select-label'
                      disableUnderline
                      value={selectedValue}
                      onChange={(e) => setSelectedValue(e.target.value)}
                      // renderValue={(selected4) => selected4}
                      MenuProps={MenuProps}
                    >
                      {categories?.map((option, index) => (
                        <MenuItem
                          style={{ height: 30, padding: 10 }}
                          key={index}
                          value={index + 1}
                        >
                          {/* <ListItemIcon>
                        <Checkbox
                          checked={selected4.indexOf(option.type) > -1}
                        />
                      </ListItemIcon> */}
                          <ListItemText primary={option.name} />
                        </MenuItem>
                      ))}
                    </Select>
                    <div>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DemoContainer components={["DateTimePicker"]}>
                          <DateTimePicker
                            sx={{
                              width: "350px",
                              marginLeft: "20px",
                              marginTop: "15px",
                            }}
                            PopperProps={{
                              placement: "top-end",
                              anchorEl: anchorEl,
                            }}
                            label="Schedule Date and Time (Optional)"
                            value={dateValue}
                            onChange={(newValue) => setDateValue(newValue)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: 20,
                      display: "flex",
                      alignSelf: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    {noDashboardTitle && (
                      <Alert
                        style={{
                          height: 40,
                          width: 220,
                          alignItems: "center",
                          marginRight: 20,
                          padding: 5,
                        }}
                        severity={"error"}
                      >
                        Please enter dashboard title
                      </Alert>
                    )}
                    <div style={{ marginRight: 10, marginBottom: 20 }}>
                      <Button
                        sx={{
                          bgcolor: "#067AB4",
                          color: "white",
                          fontFamily: "Trebuchet MS",
                          "&:hover, &:focus": {
                            bgcolor: "#0BAFFF",
                            color: "white",
                          },
                        }}
                        onClick={() => {
                          setisSaveDashboard(false);
                          setNoDashboardTitle(false);
                        }}
                        variant="outlined"
                      >
                        CANCEL
                      </Button>
                    </div>
                    <div style={{ marginRight: 20, marginBottom: 20 }}>
                      <Button
                        sx={{
                          bgcolor: "#067AB4",
                          color: "white",
                          fontFamily: "Trebuchet MS",
                          "&:hover, &:focus": {
                            bgcolor: "#0BAFFF",
                            color: "white",
                          },
                        }}
                        onClick={() => {
                          if (dashboardName === "") {
                            setNoDashboardTitle(true);
                            return;
                          } else {
                            saveDesign(1);
                            setisSaveDashboard(false);
                          }
                        }}
                        variant="outlined"
                      >
                        SAVE {"&"} CLOSE
                      </Button>
                    </div>
                  </div>
                </>
              </Box>
            </Modal>
          )}
          {isExportDashboard && (
            <Modal
              open={isExportDashboard}
              onClose={() => setisExportDashboard(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={exportDashModalstyle}>
                <>
                  <CloseIcon
                    onClick={() => setisExportDashboard(false)}
                    style={{
                      position: "absolute",
                      left: "95%",
                      top: "1%",
                      cursor: "pointer",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        marginLeft: 20,
                        marginTop: 5,
                        fontSize: 16,
                        fontFamily: "Trebuchet MS",
                      }}
                    >
                      File Name
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <input
                        style={{
                          marginLeft: 20,
                          alignSelf: "flex-start",
                          width: "90%",
                          height: 40,
                          border: "1px solid #CCC",
                        }}
                        type={"text"}
                        placeholder={"Add File Name.."}
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: 25,
                      display: "flex",
                      alignSelf: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div style={{ marginRight: 10, marginBottom: 20 }}>
                      <Button
                        sx={{
                          bgcolor: "#067AB4",
                          color: "white",
                          fontFamily: "Trebuchet MS",
                          "&:hover, &:focus": {
                            bgcolor: "#0BAFFF",
                            color: "white",
                          },
                        }}
                        onClick={() => {
                          setisExportDashboard(false);
                        }}
                        variant="outlined"
                      >
                        CANCEL
                      </Button>
                    </div>
                    <div style={{ marginRight: 20, marginBottom: 10 }}>
                      <Button
                        sx={{
                          bgcolor: "#067AB4",
                          color: "white",
                          fontFamily: "Trebuchet MS",
                          "&:hover, &:focus": {
                            bgcolor: "#0BAFFF",
                            color: "white",
                          },
                        }}
                        onClick={() => {
                          if (fileName === "") {
                            setNoFileName(true);
                            return;
                          }
                          exportHtml();

                          setTimeout(() => {
                            viewExportedDashboards();
                          }, 2000);
                          setisExportDashboard(false);
                        }}
                        variant="outlined"
                      >
                        Export To HTML
                      </Button>
                    </div>
                  </div>

                  {noFileName && (
                    <Alert
                      style={{
                        alignSelf: "center",
                        marginTop: -8,
                        height: 25,
                        width: 230,
                        alignItems: "center",
                      }}
                      severity={"error"}
                    >
                      Please Enter a Filename
                    </Alert>
                  )}
                </>
              </Box>
            </Modal>
          )}

          {viewOnlyModal && (
            <Modal
              open={viewOnlyModal}
              onClose={() => setViewOnlyModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={viewDashModalstyle}>
                <>
                  <CloseIcon
                    onClick={() => setViewOnlyModal(false)}
                    style={{
                      position: "absolute",
                      left: "95%",
                      top: "1%",
                      cursor: "pointer",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        marginTop: 20,
                        border: "0.5px solid #CCC",
                        height: 85,
                        width: "90%",
                      }}
                    >
                      <div
                        style={{
                          marginLeft: 20,
                          marginTop: 5,
                          fontSize: 16,
                          fontFamily: "Trebuchet MS",
                        }}
                      >
                        Select view only dashboard
                      </div>

                      <div style={{ marginLeft: 20 }}>
                        <select
                          onChange={(e) => {
                            // setselectedViewDashboard(true)
                            setVDashId(e.target.value);
                            // displayViewOnlyDashboard(e.target.value)
                          }}
                          value={vDashId}
                          style={{
                            width: 200,
                            height: 30,
                            marginTop: 10,
                            backgroundColor: "white",
                            border: "0.5px solid",
                            borderRadius: 10,
                            fontSize: 12,
                            color: "#067AB4",
                          }}
                        >
                          {viewOnlyDashboards.map((ele) => (
                            <option
                              style={{ fontSize: 14 }}
                              key={ele.id}
                              value={ele.id}
                            >
                              {ele.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: 25,
                      display: "flex",
                      alignSelf: "flex-end",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div style={{ marginRight: 10, marginBottom: 20 }}>
                      <Button
                        sx={{
                          bgcolor: "#067AB4",
                          color: "white",
                          fontFamily: "Trebuchet MS",
                          "&:hover, &:focus": {
                            bgcolor: "#0BAFFF",
                            color: "white",
                          },
                        }}
                        onClick={() => {
                          setViewOnlyModal(false);
                          setselectedViewDashboard(false);
                        }}
                        variant="outlined"
                      >
                        CANCEL
                      </Button>
                    </div>
                    <div style={{ marginRight: 20, marginBottom: 20 }}>
                      <Button
                        sx={{
                          bgcolor: "#067AB4",
                          color: "white",
                          fontFamily: "Trebuchet MS",
                          "&:hover, &:focus": {
                            bgcolor: "#0BAFFF",
                            color: "white",
                          },
                        }}
                        onClick={() => {
                          displayViewOnlyDashboard(dId);
                          setViewOnlyModal(false);
                        }}
                        variant="outlined"
                      >
                        View Dashboard
                      </Button>
                    </div>
                  </div>
                </>
              </Box>
            </Modal>
          )}
          {vDashboardData == undefined ? (
            <div
              style={{
                marginLeft: 65,
                marginTop: 12,
                height: "100vh",
              }}
            >
              <EmailEditor
                projectId={87474}
                ref={emailEditorRef}
                onLoad={localStorage.getItem("viewMode") == 1 ? onLoad : null}
                onReady={onReady}
                options={{
                  customJS:
                    global.subscription_id ===
                      "price_1LfOlnSBwqDDsny7nprdkWUQ" ||
                    global.subscription_id === "price_1LfOnUSBwqDDsny71PPaevJ8"
                      ? [
                          "unlayer.registerTool({ name: 'my_tool1', label: 'Widget1', icon: 'fa-object-group', supportedDisplayModes: ['web', 'email'], options: {}, values: {}, renderer: { Viewer: unlayer.createViewer({ render(values) { return `<iframe src='http://44.241.186.53:3006/widget1.html' height='500px'  width='550px' title='W3Schools Free Online Web Tutorials'> </iframe>`; }, }), exporters: { web: function (values) { return `<iframe src='http://44.241.186.53:3006/widget1.html' height='500px'  width='550px' title='W3Schools Free Online Web Tutorials'> </iframe>`; }, email: function (values) { return `<iframe src='http://44.241.186.53:3006/widget1.html' height='500px'  width='550px' title='W3Schools Free Online Web Tutorials'> </iframe>`; }, }, head: { css: function (values) {}, js: function (values) {}, }, }, });",
                        ]
                      : [
                          "unlayer.registerTool({ name: 'my_tool1', label: 'Widget1', icon: 'fa-object-group', supportedDisplayModes: ['web', 'email'], options: {}, values: {}, renderer: { Viewer: unlayer.createViewer({ render(values) { return `<iframe src='http://44.241.186.53:3006/widget1.html' height='500px' min-width='500px' width='550px' title='W3Schools Free Online Web Tutorials'> </iframe>`; }, }), exporters: { web: function (values) { return `<iframe src='http://44.241.186.53:3006/widget1.html' height='500px' min-width='500px' width='550px' title='W3Schools Free Online Web Tutorials'> </iframe>`; }, email: function (values) { return `<iframe src='http://44.241.186.53:3006/widget1.html' height='500px' min-width='500px' width='550px' title='W3Schools Free Online Web Tutorials'> </iframe>`; }, }, head: { css: function (values) {}, js: function (values) {}, }, }, }); unlayer.registerTool({ name: 'my_tool2', label: 'Widget2', icon: 'fa-object-group', supportedDisplayModes: ['web', 'email'], options: {}, values: {}, renderer: { Viewer: unlayer.createViewer({ render(values) { return `<iframe src='http://44.241.186.53:3006/widget2.html' height='500px' min-width='500px' width='550px' title='W3Schools Free Online Web Tutorials'> </iframe>`; }, }), exporters: { web: function (values) { return `<iframe src='http://44.241.186.53:3006/widget2.html' height='500px' min-width='500px' width='550px' title='W3Schools Free Online Web Tutorials'> </iframe>`; }, email: function (values) { return `<iframe src='http://44.241.186.53:3006/widget2.html' height='500px' min-width='500px' width='550px' title='W3Schools Free Online Web Tutorials'> </iframe>`; }, }, head: { css: function (values) {}, js: function (values) {}, }, }, }); unlayer.registerTool({ name: 'my_tool3', label: 'Widget3', icon: 'fa-object-group', supportedDisplayModes: ['web', 'email'], options: {}, values: {}, renderer: { Viewer: unlayer.createViewer({ render(values) { return `<iframe src='http://44.241.186.53:3006/widget3.html' height='500px' min-width='500px' width='550px' title='W3Schools Free Online Web Tutorials'> </iframe>`; }, }), exporters: { web: function (values) { return `<iframe src='http://44.241.186.53:3006/widget3.html' height='500px' min-width='500px' width='550px' title='W3Schools Free Online Web Tutorials'> </iframe>`; }, email: function (values) { return `<iframe src='http://44.241.186.53:3006/widget3.html' height='500px' min-width='500px' width='550px' title='W3Schools Free Online Web Tutorials'> </iframe>`; }, }, head: { css: function (values) {}, js: function (values) {}, }, }, }); unlayer.registerTool({ name: 'my_tool4', label: 'Widget4', icon: 'fa-object-group', supportedDisplayModes: ['web', 'email'], options: {}, values: {}, renderer: { Viewer: unlayer.createViewer({ render(values) { return `<iframe src='http://44.241.186.53:3006/widget4.html' height='500px' min-width='500px' width='550px' title='W3Schools Free Online Web Tutorials'> </iframe>`; }, }), exporters: { web: function (values) { return `<iframe src='http://44.241.186.53:3006/widget4.html' height='500px' min-width='500px' width='550px' title='W3Schools Free Online Web Tutorials'> </iframe>`; }, email: function (values) { return `<iframe src='http://44.241.186.53:3006/widget4.html' height='500px' min-width='500px' width='550px' title='W3Schools Free Online Web Tutorials'> </iframe>`; }, }, head: { css: function (values) {}, js: function (values) {}, }, }, }); unlayer.registerTool({ name: 'my_tool5', label: 'Widget5', icon: 'fa-object-group', supportedDisplayModes: ['web', 'email'], options: {}, values: {}, renderer: { Viewer: unlayer.createViewer({ render(values) { return `<iframe src='http://44.241.186.53:3006/widget5.html' height='500px' min-width='500px' width='550px' title='W3Schools Free Online Web Tutorials'> </iframe>`; }, }), exporters: { web: function (values) { return `<iframe src='http://44.241.186.53:3006/widget5.html' height='500px' min-width='500px' width='550px' title='W3Schools Free Online Web Tutorials'> </iframe>`; }, email: function (values) { return `<iframe src='http://44.241.186.53:3006/widget5.html' height='500px' min-width='500px' width='550px' title='W3Schools Free Online Web Tutorials'> </iframe>`; }, }, head: { css: function (values) {}, js: function (values) {}, }, }, });",
                        ],
                  customCSS: [
                    " .blockbuilder-preview { background-color: #067AB4; background-image: none;} ",
                  ],
                }}
                minHeight="100%"
              />
            </div>
          ) : (
            vDashboardData && (
              <div
                style={{ marginTop: 12 }}
                dangerouslySetInnerHTML={{ __html: vDashboardData }}
              />
            )
          )}
          {/* {vDashboardData == undefined ? (
            <div
              style={{
                right: 70,
                position: "absolute",
                marginTop: -36,
                height: 25,
                width: 300,
                backgroundColor: "#eeeeee",
              }}
            ></div>
          ) : null} */}

          <div
            style={{
              marginLeft: -20,
              overflow: "hidden",
              height: 800,
              width: 900,
              display: "none",
            }}
          >
            {chartSubType == "special20" ? (
              <CustomNodeLineandScatterPlot
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special21" ? (
              <CustomNodeDataLabelsHover
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special22" ? (
              <CustomNodeDataLabelsOnThePlot
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special23" ? (
              <CustomNodeScatterPlotWithColorDimension
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special24" ? (
              <CustomNodeBasicLinePlot
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special25" ? (
              <CustomNodeLineandScatterPlot
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special26" ? (
              <CustomNodeLineandScatterPlotWithNames
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special27" ? (
              <CustomLineandScatterStyling
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special28" ? (
              <CustomNodeStyledLinePlot
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special29" ? (
              <CustomNodeColoredandStyledScatterPlot
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special30" ? (
              <CustomNodeLineShapeOptionsforInterpolation
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special31" ? (
              <CustomNodeGraphandAxesTitles
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special32" ? (
              <CustomNodeLineDash
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special33" ? (
              <CustomNodeConnectGapsBetweenData
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special34" ? (
              <CustomNodeBasicBarChart
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
                // addAnnotaion={addAnnotaion}
              />
            ) : chartSubType == "special35" ? (
              <CustomNodeGroupedBarChart
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special36" ? (
              <CustomNodeStackedBarChart
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special37" ? (
              <CustomNodeBarChartwithHoverText
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special38" ? (
              <CustomNodeBarChartwithDirectLabels
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special39" ? (
              <CustomNodeGroupedBarChartwithDirectLabels
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special40" ? (
              <CustomNodeBarChartwithDirectLabels
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special41" ? (
              <CustomNodeCustomizingIndividualBarColors
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special42" ? (
              <CustomNodeCustomizingIndividualBarWidths
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special43" ? (
              <CustomNodeCustomizingIndividualBarBase
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special44" ? (
              <CustomNodeColoredandStyledBarChart
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special45" ? (
              <CustomNodeWaterfallBarChart
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special46" ? (
              <CustomNodeBarChartwithRelativeBarmode
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special47" ? (
              <CustomNodeBasicPieChart
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={xNumeric === true ? true : false}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special48" ? (
              <CustomNodePieChartSubplots
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true && zNumeric === true
                    ? true
                    : false
                }
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special49" ? (
              <CustomNodeDonutChart
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special50" ? (
              <CustomNodeAutomaticallyAdjustMargin
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={xNumeric === true ? true : false}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special51" ? (
              <ControlTextOrientationInsidePieChartSectors
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={xNumeric === true ? true : false}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special52" ? (
              <CustomNodeBubbleSizeonBubbleChart
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special53" ? (
              <CustomNodeMarkerSizeandColorBubbleChart
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special54" ? (
              <CustomNodeHoverTextonBubbleChart
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special55" ? (
              <CustomNodeBubbleSizeonBubbleChart
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special56" ? (
              <CustomNodeMarkerSizeColorandSymbolasArray
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special57" ? (
              <CustomNodeCategoricalDotPlot
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special58" ? (
              <CustomNodeBasicOverlaidAreaChart
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special59" ? (
              <CustomNodeOverlaidAreaChartWithoutBoundaryLines
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special60" ? (
              <CustomNodeStackedAreaChart
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special61" ? (
              <CustomNodeNormalizedStackedAreaChart
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special62" ? (
              <CustomNodeSelectHoverPoints
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special63" ? (
              <CustomNodeBasicHorizontalBarChart
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special64" ? (
              <CustomNodeColoredandStyledBarChart
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special65" ? (
              <CustomNodeBarChartwithLinePlot
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special66" ? (
              <CustomNodeBasicPointCloud
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special67" ? (
              <CustomNodeStyledPointCloud
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special68" ? (
              <BasicSunBurstChart
                block={false}
                main={true}
                data2={props.data4}
                data={widgetData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special69" ? (
              <BranchValues
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                data2={props.data4}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special70" ? (
              <SunburstWithRepetedLabels
                block={false}
                main={true}
                data2={props.data4}
                data={widgetData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special71" ? (
              <SunburstLargeNumberSlices
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                data2={props.data4}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special72" ? (
              <SunburstTextOrientaion
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                data2={props.data4}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special73" ? (
              <SankeyDiagrams
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric == true && yNumeric == true ? true : false
                }
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special74" ? (
              <CreateSankeyCanvas
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special75" ? (
              <AddNodesBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special76" ? (
              <AddLinksBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special77" ? (
              <StyleSankeyDiagramBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric == true && yNumeric == true ? true : false
                }
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special78" ? (
              <DefineNodePositionBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special81" ? (
              <BasicSymmetricErrorBarsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special82" ? (
              <BarChartwithErrorBarsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special83" ? (
              <HorizontalErrorBarsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special84" ? (
              <AsymmetricErrorBarsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special85" ? (
              <ColoredandStyledErrorBarsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special86" ? (
              <ErrorBarsasaPercentageoftheyValueBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special87" ? (
              <AsymmetricErrorBarswithaConstantOffsetBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special88" ? (
              <BasicBoxPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special89" ? (
              <BoxPlotThatDisplayesUnderlyingdataBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special90" ? (
              <HorizontalBoxPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special91" ? (
              <GroupedBoxPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                IsDataNumeric={
                  xNumeric === false && yNumeric === true ? true : false
                }
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special92" ? (
              <BoxPlotStylingOutliersBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special93" ? (
              <BoxPlotStylingMeanandStandardDeviationBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special94" ? (
              <GroupedHorizontalBoxPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special95" ? (
              <ColoredBoxPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special96" ? (
              <FullyStyledBoxPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special97" ? (
              <RainBowBoxPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special98" ? (
              <BasicHistogramBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special99" ? (
              <HorizontalHistogramBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special100" ? (
              <OverlaidHistogramBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special101" ? (
              <StackedHistogramBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special102" ? (
              <ColoredandStyledHistogramBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special103" ? (
              <CumulativeHistogramBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special104" ? (
              <NormalizedHistogramBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special105" ? (
              <SpecifyBinningFunctionBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
              />
            ) : chartSubType == "special106" ? (
              <TwoDHistogramContourPlotwithHistogramSubplotsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special107" ? (
              <TwoDHistogramContourPlotwithSliderControlBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special108" ? (
              <FilledLinesBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special109" ? (
              <AsymmetricErrorBarswithaConstantOffsetBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special110" ? (
              <SimpleContourPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true && zNumeric
                    ? true
                    : false
                }
              />
            ) : chartSubType == "special111" ? (
              <BasicContourPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                box={props.box1}
              />
            ) : chartSubType == "special112" ? (
              <SettingXandYCoordinatesinaContourPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                box={props.box5}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special113" ? (
              <ColorscaleforContourPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                box={props.box1}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special114" ? (
              <CustomizingSizeandRangeofaContourPlotContoursBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                box={props.box1}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special115" ? (
              <CustomizingSpacingBetweenXandYTicksBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                box={props.box1}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special116" ? (
              <ConnecttheGapsbetweenNullValuesintheZMatrixBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                box={props.box1}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special120" ? (
              <SmoothingContourLinesBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                box={props.box1}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special121" ? (
              <SmoothContourColoringBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                box={props.box1}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special122" ? (
              <ContourLinesBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                box={props.box1}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special123" ? (
              <ContourLineLabelsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                box={props.box1}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special124" ? (
              <CustomColorscaleforContourPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                box={props.box1}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special125" ? (
              <ColorBarTitleBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                box={props.box1}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special126" ? (
              <ColorBarSizeBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                box={props.box1}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special127" ? (
              <StylingColorBarTicksforContourPlotsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                box={props.box1}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special128" ? (
              <BasicHeatmapBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                box={props.box}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special129" ? (
              <HeatmapwithCategoricalAxisLabelsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true && zNumeric
                    ? true
                    : false
                }
                box={props.box4}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special130" ? (
              <AnnotatedHeatmapBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true && zNumeric
                    ? true
                    : false
                }
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special131" ? (
              <HeatmapwithUnequalBlockSizesBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true && zNumeric
                    ? true
                    : false
                }
                box={props.box5}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special132" ? (
              <BasicTernaryPlotwithMarkersBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special133" ? (
              <SoilTypesTernaryPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special134" ? (
              <AddingDimensionsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true && zNumeric === true
                    ? true
                    : false
                }
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special135" ? (
              <BasicParallelCoordinatesPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true && zNumeric === true
                    ? true
                    : false
                }
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special136" ? (
              <AnnotatedParallelCoordinatesPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true && zNumeric === true
                    ? true
                    : false
                }
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special137" ? (
              <AdvancedParallelCoordinatesPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true && zNumeric === true
                    ? true
                    : false
                }
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special138" ? (
              <LogarithmicAxesBlock
                block={false}
                main={true}
                data={widgetData}
                x={props.x}
                y={props.y}
                z={props.z}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special139" ? (
              <BasicWaterfallChartBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special140" ? (
              <MultiCategoryWaterfallChartBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special141" ? (
              <HorizontalWaterfallChartBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special142" ? (
              <StyleWaterfallChartBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special147" ? (
              <SimpleCandleStickChartBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special148" ? (
              <CandlestickChartwithoutRangesliderBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special149" ? (
              <CustomiseCandlestickChartwithShapesandAnnotationsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special150" ? (
              <CustomizingCandlestickChartColorsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special151" ? (
              <AddRangeselectorBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special152" ? (
              <BasicFunnelPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special153" ? (
              <SettingMarkerSizeandColorBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special154" ? (
              <StackedFunnelBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special155" ? (
              <FunnelareaPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special156" ? (
              <MultiFunnelareaBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
              />
            ) : chartSubType == "special157" ? (
              <DateStringsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special158" ? (
              <BasicTimeSeriesBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special159" ? (
              <ManuallySetRangeBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special160" ? (
              <TimeSerieswithRangesliderBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special161" ? (
              <ThreeDScatterPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special162" ? (
              <BasicRibbonPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special163" ? (
              <Topographical3DSurfacePlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special164" ? (
              <SurfacePlotWithContoursBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special165" ? (
              <Multiple3DSurfacePlotsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special166" ? (
              <Simple3DMeshPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true && zNumeric === true
                    ? true
                    : false
                }
                xbox={props.xbox}
                ybox={props.ybox}
                zbox={props.zbox}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special167" ? (
              <ThreeDMeshPlotwithAlphahullBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true && zNumeric === true
                    ? true
                    : false
                }
                xbox={props.xbox}
                ybox={props.ybox}
                zbox={props.zbox}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special168" ? (
              <ThreeDMeshTetrahedronBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special169" ? (
              <ThreeDMeshCubeBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special170" ? (
              <ThreeDLinePlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true && zNumeric === true
                    ? true
                    : false
                }
                xbox={props.xbox}
                ybox={props.ybox}
                zbox={props.zbox}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special171" ? (
              <ThreeDLinewithMarkersPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special172" ? (
              <ThreeDLineSpiralPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special173" ? (
              <ThreeDRandomWalkPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special174" ? (
              <SimpleSubplotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special175" ? (
              <CustomSizedSubplotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special176" ? (
              <MultipleSubplotsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special177" ? (
              <SubplotswithSharedAxesBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special178" ? (
              <StackedSubplotsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special179" ? (
              <StackedSubplotswithaSharedXAxisBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special180" ? (
              <MultipleCustomSizedSubplotsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special181" ? (
              <SimpleInsetGraphBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special182" ? (
              <Multiple3DSubplotsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true && zNumeric
                    ? true
                    : false
                }
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special183" ? (
              <MixedSubPlotsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special184" ? (
              <TableandChartSubplotBlock
                block={false}
                main={true}
                columns={columns}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special85" ? (
              <ClickEventDataBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special186" ? (
              <BindingToClickEventBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special187" ? (
              <CreateannotationonclickeventBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special88" ? (
              <HoverEventDataBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special189" ? (
              <CapturingHoverEventsDataBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special190" ? (
              <CapturingHoverEventsPixelsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special191" ? (
              <TriggeringHoverEventsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special192" ? (
              <CoupledHoverEventsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special193" ? (
              <CombinedClickandHoverEventsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special194" ? (
              <BindingtoZoomEventsBlock
                block={false}
                main={true}
                data={widgetData}
                x={props.x}
                y={props.y}
                z={props.z}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special195" ? (
              <DisablingZoomEventsforXAxisBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special196" ? (
              <DisablingZoomEventsforXandYAxisBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special197" ? (
              <FilterBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special198" ? (
              <GroupByBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special199" ? (
              <AggregationsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special200" ? (
              <AggregateFunctionsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special201" ? (
              <HistogramBinningBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special202" ? (
              <MappingWithAggregatesBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special203" ? (
              <FilterAndGroupbyBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special204" ? (
              <FilterAndAggregatesBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special205" ? (
              <AllTransformsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special208" ? (
              <AddTwoDropdownMenustoaChartBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special209" ? (
              <BinddropdowneventstochartsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special210" ? (
              <RestyleButtonSingleAttributeBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                box={props.box1}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special211" ? (
              <RestyleButtonMultipleAttributesBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                box={props.box1}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special212" ? (
              <RelayoutButtonBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special213" ? (
              <UpdateButtonBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special214" ? (
              <AnimateButtonBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special215" ? (
              <StylethebuttonsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                box={props.box1}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true ? true : false
                }
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special216" ? (
              <BasicSliderBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special219" ? (
              <BindComponentstotheAppearanceofaPlotBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special220" ? (
              <AddaPlayButtontoControlaSliderBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special221" ? (
              <LassoSelectionBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special222" ? (
              <BasicRangeSlideronTimeSeriesBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special223" ? (
              <AnimatingtheDataBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special224" ? (
              <AnimatingtheLayoutBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special225" ? (
              <DefiningNamedFramesaddFramesBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special226" ? (
              <AnimatingSequencesofFramesBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special227" ? (
              <AnimatingManyFramesQuicklyBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special228" ? (
              <ObjectConstancyBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special229" ? (
              <FrameGroupsandAnimationModesBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special230" ? (
              <AnimatingwithaSliderBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special231" ? (
              <FilledAreaAnimationBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special232" ? (
              <MultipleTraceFilledAreaBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special233" ? (
              <MapAnimationsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special234" ? (
              <BasicTreemapsBlock
                block={false}
                main={true}
                data2={props.data4}
                data={widgetData}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special235" ? (
              <SetDifferentAttributesinTreeMapBlock
                block={false}
                main={true}
                data2={props.data4}
                data={widgetData}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special236" ? (
              <SetColorofTreemapSectorsBlock
                block={false}
                main={true}
                data2={props.data4}
                data={widgetData}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special237" ? (
              <NestedLayersinTreemapBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                data2={props.data4}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special238" ? (
              <ContourandScatterPlotoftheMethodofSteepestDescentBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                IsDataNumeric={
                  xNumeric === true && yNumeric === true && zNumeric
                    ? true
                    : false
                }
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special239" ? (
              <LineChartandBarChartBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special240" ? (
              <WebGLwithOneLakhpointsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special241" ? (
              <WebGLwithOneMillionpointsBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special242" ? (
              <WebGLwithmanytracesBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special243" ? (
              <AnimatingwithaSliderBlock
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special256" ? (
              <EuropeBubbleMap
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special257" ? (
              <USABubbleMap
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : chartSubType == "special258" ? (
              <USAChoroplethMap
                block={false}
                main={true}
                data={widgetData}
                x={columnXData}
                y={columnYData}
                z={columnZData}
                color1={color1}
                color2={color2}
                useLegend={useLegend}
                columnX={columnX}
                columnY={columnY}
                columnZ={columnZ}
                xName={xName}
                yName={yName}
                zName={zName}
                parentCallback={handleCallback}
              />
            ) : null}
          </div>
        </>
      ) : (
        history.push("/Login")
      )}

      <Prompt
        when={true}
        message="Are you sure you want to leave? Unsaved changes will be gone"
      />

      <Snackbar
        open={saveAsSuccess}
        autoHideDuration={2000}
        onClose={handleClose3}
      >
        <Alert elevation={6} variant="filled" severity="success">
          New Dashboard Saved Successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={saveSuccess}
        autoHideDuration={2000}
        onClose={handleClose4}
      >
        <Alert elevation={6} variant="filled" severity="success">
          Dashboard Saved Successfully!
        </Alert>
      </Snackbar>

      {shareModal && (
        <Modal
          open={shareModal}
          onClose={() => setShareModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalstyle2}>
            <>
              <CloseIcon
                onClick={() => setShareModal(false)}
                style={{
                  position: "absolute",
                  left: "95%",
                  top: "1%",
                  cursor: "pointer",
                }}
              />

              <div
                style={{
                  marginLeft: 25,
                  marginTop: 25,
                  fontSize: 18,
                  fontFamily: "Trebuchet MS",
                }}
              >
                Share
              </div>

              <div
                style={{
                  marginLeft: 25,
                  marginTop: 20,
                  fontSize: 16,
                  fontFamily: "Trebuchet MS",
                }}
              >
                Share with users and groups or enter an email address to invite
                a new user.
              </div>
              <div style={{ display: "flex" }}>
                <input
                  style={{
                    marginLeft: 25,
                    marginTop: 15,
                    width: "70%",
                    height: 40,
                    border: "1px solid #CCC",
                  }}
                  type={"text"}
                  placeholder={"Enter users, groups or emails"}
                  value={users}
                  onChange={(e) => setUsers(e.target.value)}
                />
                <div style={{ marginTop: 15, marginLeft: 8 }}>
                  <Button
                    sx={{
                      bgcolor: "#067AB4",
                      color: "white",
                      "&:hover, &:focus": {
                        bgcolor: "#0BAFFF",
                        color: "white",
                      },
                    }}
                    onClick={() => {
                      sendEmail();
                      setShareModal(false);
                    }}
                    variant="outlined"
                  >
                    Share
                  </Button>
                </div>
              </div>

              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginLeft: "70px",
                }}
              >
                <p>Dear User,</p>

                <p>
                  To access the shared dashboard, follow these simple steps:
                </p>

                <p>
                  Visit{" "}
                  <a href="http://44.241.186.53:3000/signin">
                    http://44.241.186.53:3000/signin
                  </a>
                </p>
                <p>Log in with:</p>
                <ul>
                  <li>Username: Your email address</li>
                  <li>Password: Abcd!@3</li>
                </ul>

                <p>
                  Explore the dashboard and feel free to reach out if you need
                  any assistance.
                </p>

                <p>Best regards</p>
              </div>

              {/* <textarea
                style={{
                  marginTop: 20,
                  alignSelf: "center",
                  width: "92%",
                  height: 120,
                  border: "1px solid #CCC",
                  overflow: "auto",
                }}
                placeholder={"I thought you might find this card interesting."}
                value={mailBody}
                onChange={(e) => setMailBody(e.target.value)}
                cols={40}
                rows={10}
              /> */}
            </>
          </Box>
        </Modal>
      )}

      <Dialog
        open={sentSuccess}
        onClose={() => setSentSuccess(false)}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
            overflow: "hidden",
          },
        }}
      >
        <Alert
          style={{ height: 100, alignItems: "center", padding: 15 }}
          severity={"success"}
        >
          Email Sent Successfully
        </Alert>
      </Dialog>
    </>
  );
};

export default TestDashboard;
