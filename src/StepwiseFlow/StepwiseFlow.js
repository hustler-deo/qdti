import Card from '@mui/material/Card'
import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext
} from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import ReactFlow, {
  ReactFlowProvider,
  Handle,
  addEdge,
  MiniMap,
  Controls
} from 'react-flow-renderer'
import configData from '../config.json'
import _ from 'lodash'
import axios from 'axios'
import PropTypes from 'prop-types'
import Spreadsheet from 'react-spreadsheet'
import { readString } from 'react-papaparse'
import ColorSelectorNode from '../DataBlocks/ColorSelectorNode'
import Modal from 'react-modal'
import Modal2 from '@mui/material/Modal'
import { styled } from '@mui/material/styles'
import Tabletop from 'tabletop'
import MiniDrawer from '../MiniDrawer'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import FuzzySearch from 'fuzzy-search'

import Check from '@mui/icons-material/Check'
import SettingsIcon from '@mui/icons-material/Settings'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import VideoLabelIcon from '@mui/icons-material/VideoLabel'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import TransformIcon from '@mui/icons-material/Transform'
import InsertChartIcon from '@mui/icons-material/InsertChart'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'

import StepConnector, {
  stepConnectorClasses
} from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import Alert from '@mui/material/Alert'
import { Divider } from '@material-ui/core'

import CustomNodeInputFile from '../Components/CustomNodeInputFile'
import CustomNodePaste from '../Components/CustomNodePaste'
import CustomNodeHttpReq from '../Components/CustomNodeHttpReq'
import CustomNodeGroupBlock from '../Components/CustomNodeGroupBlock'
import CustomNodeMergeBlock from '../Components/CustomNodeMergeBlock'
import CustomNodeStatsBlock from '../Components/CustomNodeStatsBlock'
import CustomNodeExportBlock from '../Components/CustomNodeExportBlock'

import CustomNodeLineandScatterPlotWithNames from '../Components/lineCharts/CustomNodeLineandScatterPlotWithNames'
import CustomNodeColoredandStyledScatterPlot from '../Components/lineCharts/CustomNodeColoredandStyledScatterPlot'
import CustomNodeLineShapeOptionsforInterpolation from '../Components/lineCharts/CustomNodeLineShapeOptionsforInterpolation'
import CustomNodeGraphandAxesTitles from '../Components/lineCharts/CustomNodeGraphandAxesTitles'
import CustomNodeLineDash from '../Components/lineCharts/CustomNodeLineDash'
import CustomNodeConnectGapsBetweenData from '../Components/lineCharts/CustomNodeConnectGapsBetweenData'
import CustomNodeBarChartwithHoverText from '../Components/barCharts/CustomNodeBarChartwithHoverText'
import CustomNodeBasicBarChart from '../Components/barCharts/CustomNodeBasicBarChart'
import CustomNodeBasicLinePlot from '../Components/lineCharts/CustomNodeBasicLinePlot'
import CustomNodeLineandScatterPlot from '../Components/lineCharts/CustomNodeLineandScatterPlot'
import CustomNodeDataLabelsHover from '../Components/scatterPlots/CustomNodeDataLabelsHover'
import CustomNodeDataLabelsOnThePlot from '../Components/scatterPlots/CustomNodeDataLabelsOnThePlot'
import CustomNodeScatterPlotWithColorDimension from '../Components/scatterPlots/CustomNodeScatterPlotWithColorDimension'
import CustomNodeGroupedBarChart from '../Components/barCharts/CustomNodeGroupedBarChart'
import CustomNodeStackedBarChart from '../Components/barCharts/CustomNodeStackedBarChart'
import CustomNodeBarChartwithDirectLabels from '../Components/barCharts/CustomNodeBarChartwithDirectLabels'
import CustomNodeGroupedBarChartwithDirectLabels from '../Components/barCharts/CustomNodeGroupedBarChartwithDirectLabels'
import CustomNodeBarChartwithRotatedLabels from '../Components/barCharts/CustomNodeBarChartwithRotatedLabels'
import CustomNodeCustomizingIndividualBarColors from '../Components/barCharts/CustomNodeCustomizingIndividualBarColors'
import CustomNodeCustomizingIndividualBarWidths from '../Components/barCharts/CustomNodeCustomizingIndividualBarWidths'
import CustomNodeCustomizingIndividualBarBase from '../Components/barCharts/CustomNodeCustomizingIndividualBarBase'
import CustomNodeColoredandStyledBarChart from '../Components/barCharts/CustomNodeColoredandStyledBarChart'
import CustomNodeWaterfallBarChart from '../Components/barCharts/CustomNodeWaterfallBarChart'
import CustomNodePieChartSubplots from '../Components/pieCharts/CustomNodePieChartSubplots'
import CustomNodeDonutChart from '../Components/pieCharts/CustomNodeDonutChart'
import CustomNodeBasicPieChart from '../Components/pieCharts/CustomNodeBasicPieChart'
import ControlTextOrientationInsidePieChartSectors from '../Components/pieCharts/ControlTextOrientationInsidePieChartSectors'
import CustomNodeMarkerSizeandColorBubbleChart from '../Components/bubbleCharts/CustomNodeMarkerSizeandColorBubbleChart'
import CustomNodeHoverTextonBubbleChart from '../Components/bubbleCharts/CustomNodeHoverTextonBubbleChart'
import CustomNodeBubbleSizeonBubbleChart from '../Components/bubbleCharts/CustomNodeBubbleSizeBubbleChart'
import CustomNodeMarkerSizeColorandSymbolasArray from '../Components/bubbleCharts/CustomNodeMarkerSizeColorandSymbolasArray'
import CustomNodeBasicOverlaidAreaChart from '../Components/filledAreaPlots/CustomNodeBasicOverlaidAreaChart'
import CustomNodeOverlaidAreaChartWithoutBoundaryLines from '../Components/filledAreaPlots/CustomNodeOverlaidAreaChartWithoutBoundaryLines'
import CustomNodeStackedAreaChart from '../Components/filledAreaPlots/CustomNodeStackedAreaChart'
import CustomNodeNormalizedStackedAreaChart from '../Components/filledAreaPlots/CustomNodeNormalizedStackedAreaChart'
import CustomNodeSelectHoverPoints from '../Components/filledAreaPlots/CustomNodeSelectHoverPoints'
import CustomNodeBasicHorizontalBarChart from '../Components/HorizontalBarCharts/CustomNodeBasicHorizontalBarChart'
import CustomNodeColoredBarChart from '../Components/HorizontalBarCharts/CustomNodeColoredBarChart'
import CustomNodeBarChartwithLinePlot from '../Components/HorizontalBarCharts/CustomNodeBarChartwithLinePlot'
import CustomNodeCategoricalDotPlot from '../Components/DotPlot/CustomNodeCategoricalDotPlot'
import CustomNodeBasicPointCloud from '../Components/PointCloud/CustomNodeBasicPointCloud'
import CustomNodeStyledPointCloud from '../Components/PointCloud/CustomNodeStyledPointCloud'
import CustomNodeBarChartwithRelativeBarmode from '../Components/barCharts/CustomNodeBarChartwithRelativeBarmode'
import CustomNodeAutomaticallyAdjustMargin from '../Components/pieCharts/CustomNodeAutomaticallyAdjustMargin'
import CustomNodeStyledLinePlot from '../Components/lineCharts/CustomNodeStyledLinePlot'
import CustomLineandScatterStyling from '../Components/lineCharts/CustomLineandScatterStyling'
import BasicBoxPlotBlock from '../Components/boxPlots/BasicBoxPlotBlock'
import BoxPlotThatDisplayesUnderlyingdataBlock from '../Components/boxPlots/BoxPlotThatDisplayesUnderlyingdataBlock'
import HorizontalBoxPlotBlock from '../Components/boxPlots/HorizontalBoxPlotBlock'
import GroupedBoxPlotBlock from '../Components/boxPlots/GroupedBoxPlotBlock'
import BoxPlotStylingOutliersBlock from '../Components/boxPlots/BoxPlotStylingOutliersBlock'
import BoxPlotStylingMeanandStandardDeviationBlock from '../Components/boxPlots/BoxPlotStylingMeanandStandardDeviationBlock'
import GroupedHorizontalBoxPlotBlock from '../Components/boxPlots/GroupedHorizontalBoxPlotBlock'
import ColoredBoxPlotBlock from '../Components/boxPlots/ColoredBoxPlotBlock'
import FullyStyledBoxPlotBlock from '../Components/boxPlots/FullyStyledBoxPlotBlock'
import RainBowBoxPlotBlock from '../Components/boxPlots/RainBowBoxPlotBlock'
import BasicHistogramBlock from '../Components/histograms/BasicHistogramBlock'
import HorizontalHistogramBlock from '../Components/histograms/HorizontalHistogramBlock'
import OverlaidHistogramBlock from '../Components/histograms/OverlaidHistogramBlock'
import StackedHistogramBlock from '../Components/histograms/StackedHistogramBlock'
import ColoredandStyledHistogramBlock from '../Components/histograms/ColoredandStyledHistogramBlock'
import CumulativeHistogramBlock from '../Components/histograms/CumulativeHistogramBlock'
import NormalizedHistogramBlock from '../Components/histograms/NormalizedHistogramBlock'
import SpecifyBinningFunctionBlock from '../Components/histograms/SpecifyBinningFunctionBlock'
import TwoDHistogramContourPlotwithHistogramSubplotsBlock from '../Components/2dDensityPLots/2DHistogramContourPlotwithHistogramSubplotsBlock'
import FilledLinesBlock from '../Components/ContinuousErrorBars/FilledLinesBlock'
import BasicContourPlotBlock from '../Components/ContourPlots/BasicContourPlotBlock'
import SettingXandYCoordinatesinaContourPlotBlock from '../Components/ContourPlots/SettingXandYCoordinatesinaContourPlotBlock'
import ColorscaleforContourPlotBlock from '../Components/ContourPlots/ColorscaleforContourPlotBlock'
import CustomizingSizeandRangeofaContourPlotContoursBlock from '../Components/ContourPlots/CustomizingSizeandRangeofaContourPlotContoursBlock'
import SmoothContourColoringBlock from '../Components/ContourPlots/SmoothContourColoringBlock'
import SmoothingContourLinesBlock from '../Components/ContourPlots/SmoothingContourLinesBlock'
import ContourLineLabelsBlock from '../Components/ContourPlots/ContourLineLabelsBlock'
import CustomColorscaleforContourPlotBlock from '../Components/ContourPlots/CustomColorscaleforContourPlotBlock'
import ColorBarTitleBlock from '../Components/ContourPlots/ColorBarTitleBlock'
import ColorBarSizeBlock from '../Components/ContourPlots/ColorBarSizeBlock'
import StylingColorBarTicksforContourPlotsBlock from '../Components/ContourPlots/StylingColorBarTicksforContourPlotsBlock'
import BasicHeatmapBlock from '../Components/Heatmaps/BasicHeatmapBlock'
import HeatmapwithCategoricalAxisLabelsBlock from '../Components/Heatmaps/HeatmapwithCategoricalAxisLabelsBlock'
import AnnotatedHeatmapBlock from '../Components/Heatmaps/AnnotatedHeatmapBlock'
import HeatmapwithUnequalBlockSizesBlock from '../Components/Heatmaps/HeatmapwithUnequalBlockSizesBlock'
import BasicTernaryPlotwithMarkersBlock from '../Components/TerneryPlots/BasicTernaryPlotwithMarkersBlock'
import SoilTypesTernaryPlotBlock from '../Components/TerneryPlots/SoilTypesTernaryPlotBlock'
import AddingDimensionsBlock from '../Components/ParallelCoordinatesPlot/AddingDimensionsBlock'
import AnnotatedParallelCoordinatesPlotBlock from '../Components/ParallelCoordinatesPlot/AnnotatedParallelCoordinatesPlotBlock'
import AdvancedParallelCoordinatesPlotBlock from '../Components/ParallelCoordinatesPlot/AdvancedParallelCoordinatesPlotBlock'
import LogarithmicAxesBlock from '../Components/LogPlots/LogarithmicAxesBlock'
import BasicWaterfallChartBlock from '../Components/FinancialCharts/WaterfallCharts/BasicWaterfallChartBlock'
import MultiCategoryWaterfallChartBlock from '../Components/FinancialCharts/WaterfallCharts/MultiCategoryWaterfallChartBlock'
import HorizontalWaterfallChartBlock from '../Components/FinancialCharts/WaterfallCharts/HorizontalWaterfallChartBlock'
import StyleWaterfallChartBlock from '../Components/FinancialCharts/WaterfallCharts/StyleWaterfallChartBlock'
import BasicFunnelPlotBlock from '../Components/FinancialCharts/FunnelandFunnelAreaCharts/BasicFunnelPlotBlock'
import SettingMarkerSizeandColorBlock from '../Components/FinancialCharts/FunnelandFunnelAreaCharts/SettingMarkerSizeandColorBlock'
import StackedFunnelBlock from '../Components/FinancialCharts/FunnelandFunnelAreaCharts/StackedFunnelBlock'
import FunnelareaPlotBlock from '../Components/FinancialCharts/FunnelandFunnelAreaCharts/FunnelareaPlotBlock'
import MultiFunnelareaBlock from '../Components/FinancialCharts/FunnelandFunnelAreaCharts/MultiFunnelareaBlock'
import DateStringsBlock from '../Components/FinancialCharts/TimeSeries/DateStringsBlock'
import BasicTimeSeriesBlock from '../Components/FinancialCharts/TimeSeries/BasicTimeSeriesBlock'
import ManuallySetRangeBlock from '../Components/FinancialCharts/TimeSeries/ManuallySetRangeBlock'
import TimeSerieswithRangesliderBlock from '../Components/FinancialCharts/TimeSeries/TimeSerieswithRangesliderBlock'
import ThreeDScatterPlotBlock from '../Components/3DCharts/3DScatterPlot/ThreeDScatterPlotBlock'
import BasicRibbonPlotBlock from '../Components/3DCharts/BasicRibbonPlot/BasicRibbonPlotBlock'
import Topographical3DSurfacePlotBlock from '../Components/3DCharts/3DSurfacePlots/Topographical3DSurfacePlotBlock'
import SurfacePlotWithContoursBlock from '../Components/3DCharts/3DSurfacePlots/SurfacePlotWithContoursBlock'
import Multiple3DSurfacePlotsBlock from '../Components/3DCharts/3DSurfacePlots/Multiple3DSurfacePlotsBlock'
import Simple3DMeshPlotBlock from '../Components/3DCharts/3DMeshPlots/Simple3DMeshPlotBlock'
import ThreeDMeshPlotwithAlphahullBlock from '../Components/3DCharts/3DMeshPlots/3DMeshPlotwithAlphahullBlock'
import ThreeDMeshTetrahedronBlock from '../Components/3DCharts/3DMeshPlots/3DMeshTetrahedronBlock'
import ThreeDMeshCubeBlock from '../Components/3DCharts/3DMeshPlots/3DMeshCubeBlock'
import ThreeDLinePlotBlock from '../Components/3DCharts/3DLinePlots/3DLinePlotBlock'
import ThreeDLinewithMarkersPlotBlock from '../Components/3DCharts/3DLinePlots/3DLinewithMarkersPlotBlock'
import ThreeDLineSpiralPlotBlock from '../Components/3DCharts/3DLinePlots/3DLineSpiralPlotBlock'
import ThreeDRandomWalkPlotBlock from '../Components/3DCharts/3DLinePlots/3DRandomWalkPlotBlock'
import SimpleSubplotBlock from '../Components/SubPlots/SubPlots/SimpleSubplotBlock'
import CustomSizedSubplotBlock from '../Components/SubPlots/SubPlots/CustomSizedSubplotBlock'
import MultipleSubplotsBlock from '../Components/SubPlots/SubPlots/MultipleSubplotsBlock'
import SubplotswithSharedAxesBlock from '../Components/SubPlots/SubPlots/SubplotswithSharedAxesBlock'
import StackedSubplotsBlock from '../Components/SubPlots/SubPlots/StackedSubplotsBlock'
import StackedSubplotswithaSharedXAxisBlock from '../Components/SubPlots/SubPlots/StackedSubplotswithaSharedXAxisBlock'
import MultipleCustomSizedSubplotsBlock from '../Components/SubPlots/SubPlots/MultipleCustomSizedSubplotsBlock'
import SimpleInsetGraphBlock from '../Components/SubPlots/InsetPlots/SimpleInsetGraphBlock'
import Multiple3DSubplotsBlock from '../Components/SubPlots/3DSubPLots/Multiple3DSubplotsBlock'
import MixedSubPlotsBlock from '../Components/SubPlots/MixedSubPlots/MixedSubPlotsBlock'
import TableandChartSubplotBlock from '../Components/SubPlots/TableSubplots/TableandChartSubplotBlock'
import ClickEventDataBlock from '../Components/CustomChartEvents/ClickEvents/ClickEventDataBlock'
import BindingToClickEventBlock from '../Components/CustomChartEvents/ClickEvents/BindingToClickEventBlock'
import CreateannotationonclickeventBlock from '../Components/CustomChartEvents/ClickEvents/CreateannotationonclickeventBlock'
import HoverEventDataBlock from '../Components/CustomChartEvents/HoverEvents/HoverEventDataBlock'
import CapturingHoverEventsDataBlock from '../Components/CustomChartEvents/HoverEvents/CapturingHoverEventsDataBlock'
import CapturingHoverEventsPixelsBlock from '../Components/CustomChartEvents/HoverEvents/CapturingHoverEventsPixelsBlock'
import TriggeringHoverEventsBlock from '../Components/CustomChartEvents/HoverEvents/TriggeringHoverEventsBlock'
import CoupledHoverEventsBlock from '../Components/CustomChartEvents/HoverEvents/CoupledHoverEventsBlock'
import CombinedClickandHoverEventsBlock from '../Components/CustomChartEvents/HoverEvents/CombinedClickandHoverEventsBlock'
import BindingtoZoomEventsBlock from '../Components/CustomChartEvents/ZoomEvents/BindingtoZoomEventsBlock'
import DisablingZoomEventsforXAxisBlock from '../Components/CustomChartEvents/DisableZoomEvents/DisablingZoomEventsforXAxisBlock'
import DisablingZoomEventsforXandYAxisBlock from '../Components/CustomChartEvents/DisableZoomEvents/DisablingZoomEventsforXandYAxisBlock'
import FilterBlock from '../Components/Transforms/FilterBlock'
import GroupByBlock from '../Components/Transforms/GroupBy/GroupByBlock'
import AddTwoDropdownMenustoaChartBlock from '../Components/CustomControls/DropDownEvents/AddTwoDropdownMenustoaChartBlock'
import BinddropdowneventstochartsBlock from '../Components/CustomControls/DropDownEvents/BinddropdowneventstochartsBlock'
import RestyleButtonSingleAttributeBlock from '../Components/CustomControls/ButtonEvents/RestyleButtonSingleAttributeBlock'
import RestyleButtonMultipleAttributesBlock from '../Components/CustomControls/ButtonEvents/RestyleButtonMultipleAttributesBlock'
import RelayoutButtonBlock from '../Components/CustomControls/ButtonEvents/RelayoutButtonBlock'
import AnimateButtonBlock from '../Components/CustomControls/ButtonEvents/AnimateButtonBlock'
import StylethebuttonsBlock from '../Components/CustomControls/ButtonEvents/StylethebuttonsBlock'
import BasicSliderBlock from '../Components/CustomControls/SliderEvents/BasicSliderBlock'
import BindComponentstotheAppearanceofaPlotBlock from '../Components/CustomControls/SliderEvents/BindComponentstotheAppearanceofaPlotBlock'
import AddaPlayButtontoControlaSliderBlock from '../Components/CustomControls/SliderEvents/AddaPlayButtontoControlaSliderBlock'
import LassoSelectionBlock from '../Components/CustomControls/LassoSelection/LassoSelectionBlock'
import BasicRangeSlideronTimeSeriesBlock from '../Components/CustomControls/RangeSliderandSelector/BasicRangeSlideronTimeSeriesBlock'
import AnimatingtheDataBlock from '../Components/Animations/Animations/AnimatingtheDataBlock'
import AnimatingtheLayoutBlock from '../Components/Animations/Animations/AnimatingtheLayoutBlock'
import DefiningNamedFramesaddFramesBlock from '../Components/Animations/Animations/DefiningNamedFramesaddFramesBlock'
import AnimatingSequencesofFramesBlock from '../Components/Animations/Animations/AnimatingSequencesofFramesBlock'
import AnimatingManyFramesQuicklyBlock from '../Components/Animations/Animations/AnimatingManyFramesQuicklyBlock'
import ObjectConstancyBlock from '../Components/Animations/Animations/ObjectConstancyBlock'
import FrameGroupsandAnimationModesBlock from '../Components/Animations/Animations/FrameGroupsandAnimationModesBlock'
import AnimatingwithaSliderBlock from '../Components/Animations/Animations/AnimatingwithaSliderBlock'
import FilledAreaAnimationBlock from '../Components/Animations/FilledAreaAnimation/FilledAreaAnimationBlock'
import MultipleTraceFilledAreaBlock from '../Components/Animations/FilledAreaAnimation/MultipleTraceFilledAreaBlock'
import MapAnimationsBlock from '../Components/Animations/MapAnimation/MapAnimationsBlock'
import AsymmetricErrorBarswithaConstantOffsetBlock from '../Components/ContinuousErrorBars/AsymmetricErrorBarswithaConstantOffsetBlock'
import SimpleContourPlotBlock from '../Components/ContourPlots/SimpleContourPlotBlock'
import CustomizingSpacingBetweenXandYTicksBlock from '../Components/ContourPlots/CustomizingSpacingBetweenXandYTicksBlock'
import BasicParallelCoordinatesPlotBlock from '../Components/ParallelCoordinatesPlot/BasicParallelCoordinatesPlotBlock'
import UpdateButtonBlock from '../Components/CustomControls/ButtonEvents/UpdateButtonBlock'
import ContourLinesBlock from '../Components/ContourPlots/ContourLinesBlock'
import TwoDHistogramContourPlotwithSliderControlBlock from '../Components/2dDensityPLots/2DHistogramContourPlotwithSliderControlBlock'
import ErrorBarsasaPercentageoftheyValueBlock from '../Components/ErrorBars/ErrorBarsasaPercentageoftheyValueBlock'
import ColoredandStyledErrorBarsBlock from '../Components/ErrorBars/ColoredandStyledErrorBarsBlock'
import AsymmetricErrorBarsBlock from '../Components/ErrorBars/AsymmetricErrorBarsBlock'
import HorizontalErrorBarsBlock from '../Components/ErrorBars/HorizontalErrorBarsBlock'
import BarChartwithErrorBarsBlock from '../Components/ErrorBars/BarChartwithErrorBarsBlock'
import BasicSymmetricErrorBarsBlock from '../Components/ErrorBars/BasicSymmetricErrorBarsBlock'
import ConnecttheGapsbetweenNullValuesintheZMatrixBlock from '../Components/ContourPlots/ConnecttheGapsbetweenNullValuesintheZMatrixBlock'
import BasicSunBurstChart from '../Components/SunburstCharts/BasicSunBurstChart'
import BranchValues from '../Components/SunburstCharts/BranchValues'
import SunburstWithRepetedLabels from '../Components/SunburstCharts/SunburstWithRepetedLabels'
import SunburstLargeNumberSlices from '../Components/SunburstCharts/SunburstLargeNumberSlices'
import SunburstTextOrientaion from '../Components/SunburstCharts/SunburstTextOrientaion'
import CreateSankeyCanvas from '../Components/SankeyDiagrams/CreateSankeyCanvas'
import SankeyDiagrams from '../Components/SankeyDiagrams/SankeyDiagrams'
import AddNodesBlock from '../Components/SankeyDiagrams/AddNodesBlock'
import AddLinksBlock from '../Components/SankeyDiagrams/AddLinksBlock'
import StyleSankeyDiagramBlock from '../Components/SankeyDiagrams/StyleSankeyDiagramBlock'
import DefineNodePositionBlock from '../Components/SankeyDiagrams/DefineNodePositionBlock'
import BasicTreemapsBlock from '../Components/TreeMaps/BasicTreemapsBlock'
import SetDifferentAttributesinTreeMapBlock from '../Components/TreeMaps/SetDifferentAttributesinTreeMapBlock'
import SetColorofTreemapSectorsBlock from '../Components/TreeMaps/SetColorofTreemapSectorsBlock'
import NestedLayersinTreemapBlock from '../Components/TreeMaps/NestedLayersinTreemapBlock'
import ContourandScatterPlotoftheMethodofSteepestDescentBlock from '../Components/MultipleChartTypes/ContourandScatterPlotoftheMethodofSteepestDescentBlock'
import LineChartandBarChartBlock from '../Components/MultipleChartTypes/LineChartandBarChartBlock'
import WebGLwithOneLakhpointsBlock from '../Components/WebGL/WebGLwithOneLakhpointsBlock'
import WebGLwithOneMillionpointsBlock from '../Components/WebGL/WebGLwithOneMillionpointsBlock'
import WebGLwithmanytracesBlock from '../Components/WebGL/WebGLwithmanytracesBlock'
import AggregationsBlock from '../Components/Transforms/Aggregations/AggregationsBlock'
import AggregateFunctionsBlock from '../Components/Transforms/Aggregations/AggregateFunctionsBlock'
import HistogramBinningBlock from '../Components/Transforms/Aggregations/HistogramBinningBlock'
import MappingWithAggregatesBlock from '../Components/Transforms/Aggregations/MappingWithAggregatesBlock'
import FilterAndGroupbyBlock from '../Components/Transforms/MultipleTransforms/FilterAndGroupbyBlock'
import FilterAndAggregatesBlock from '../Components/Transforms/MultipleTransforms/FilterAndAggregatesBlock'
import AllTransformsBlock from '../Components/Transforms/MultipleTransforms/AllTransformsBlock'
import CandlestickChartwithoutRangesliderBlock from '../Components/CandleStickCharts/CandlestickChartwithoutRangesliderBlock'
import CustomiseCandlestickChartwithShapesandAnnotationsBlock from '../Components/CandleStickCharts/CustomiseCandlestickChartwithShapesandAnnotationsBlock'
import CustomizingCandlestickChartColorsBlock from '../Components/CandleStickCharts/CustomizingCandlestickChartColorsBlock'
import AddRangeselectorBlock from '../Components/CandleStickCharts/AddRangeselectorBlock'
import SimpleCandleStickChartBlock from '../Components/CandleStickCharts/SimpleCandleStickChartBlock'
import { elementsCustom } from '../../src/graphDataForStepwise'
import { AuthContext } from '../context'

var xaxisNumeric,
  yaxisNumeric,
  zaxisNumeric,
  xbox,
  ybox,
  zbox,
  scolumn,
  flag = 0
var xyData
var xAxis, yAxis, zAxis
var databases = []
var nodeBox = []
var nodeBox2 = []
var tempElements = []
var tempArray = []
var close1 = 1
var close2 = 1
var close3 = 1
var close4 = 1
var column
var exceldata
var xmldata
var pdfdata
var parquetdata
var jsondata
var columns,
  column1,
  column2,
  column3,
  column4,
  column5,
  column6,
  column7,
  column8,
  column9,
  column10
var inputOptionsBox
const exampleData2 = [
  [
    'GEO Region',
    'GEO Summary',
    'Cargo Type Code',
    'Cargo Weight LBS',
    'Operating Airline',
    'Published Airline',
    'Activity Type Code',
    'Cargo Aircraft Type',
    'ï»¿Cargo Metric TONS',
    'Operating Airline IATA Code',
    'Published Airline IATA Code'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    45423,
    'ABX Air',
    'ABX Air',
    'Deplaned',
    'Freighter',
    20.604,
    'GB',
    'GB'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    106869,
    'ABX Air',
    'ABX Air',
    'Enplaned',
    'Freighter',
    48.476,
    'GB',
    'GB'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    55427,
    'ATA Airlines',
    'ATA Airlines',
    'Deplaned',
    'Passenger',
    25.142,
    'TZ',
    'TZ'
  ],
  [
    'US',
    'Domestic',
    'Mail',
    50278,
    'ATA Airlines',
    'ATA Airlines',
    'Deplaned',
    'Passenger',
    22.806,
    'TZ',
    'TZ'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    74183,
    'ATA Airlines',
    'ATA Airlines',
    'Enplaned',
    'Passenger',
    33.649,
    'TZ',
    'TZ'
  ],
  [
    'US',
    'Domestic',
    'Mail',
    347558,
    'ATA Airlines',
    'ATA Airlines',
    'Enplaned',
    'Passenger',
    157.652,
    'TZ',
    'TZ'
  ],
  [
    'Canada',
    'International',
    'Cargo',
    47025,
    'Air Canada',
    'Air Canada',
    'Deplaned',
    'Passenger',
    21.331,
    'AC',
    'AC'
  ],
  [
    'Canada',
    'International',
    'Express',
    7234,
    'Air Canada',
    'Air Canada',
    'Deplaned',
    'Passenger',
    3.281,
    'AC',
    'AC'
  ],
  [
    'Canada',
    'International',
    'Mail',
    29762,
    'Air Canada',
    'Air Canada',
    'Deplaned',
    'Passenger',
    13.5,
    'AC',
    'AC'
  ],
  [
    'Canada',
    'International',
    'Cargo',
    37291,
    'Air Canada',
    'Air Canada',
    'Enplaned',
    'Passenger',
    16.915,
    'AC',
    'AC'
  ],
  [
    'Canada',
    'International',
    'Express',
    6707,
    'Air Canada',
    'Air Canada',
    'Enplaned',
    'Passenger',
    3.042,
    'AC',
    'AC'
  ],
  [
    'Canada',
    'International',
    'Mail',
    67831,
    'Air Canada',
    'Air Canada',
    'Enplaned',
    'Passenger',
    30.768,
    'AC',
    'AC'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    1127590,
    'Air China',
    'Air China',
    'Deplaned',
    'Passenger',
    511.475,
    'CA',
    'CA'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    353098,
    'Air China',
    'Air China',
    'Enplaned',
    'Passenger',
    160.165,
    'CA',
    'CA'
  ],
  [
    'Europe',
    'International',
    'Cargo',
    464002,
    'Air France',
    'Air France',
    'Deplaned',
    'Passenger',
    210.471,
    'AF',
    'AF'
  ],
  [
    'Europe',
    'International',
    'Mail',
    38810,
    'Air France',
    'Air France',
    'Deplaned',
    'Passenger',
    17.604,
    'AF',
    'AF'
  ],
  [
    'Europe',
    'International',
    'Cargo',
    423069,
    'Air France',
    'Air France',
    'Enplaned',
    'Passenger',
    191.904,
    'AF',
    'AF'
  ],
  [
    'Europe',
    'International',
    'Mail',
    100001,
    'Air France',
    'Air France',
    'Enplaned',
    'Passenger',
    45.36,
    'AF',
    'AF'
  ],
  [
    'Australia / Oceania',
    'International',
    'Cargo',
    317156,
    'Air New Zealand',
    'Air New Zealand',
    'Deplaned',
    'Passenger',
    143.862,
    'NZ',
    'NZ'
  ],
  [
    'Australia / Oceania',
    'International',
    'Mail',
    11548,
    'Air New Zealand',
    'Air New Zealand',
    'Deplaned',
    'Passenger',
    5.238,
    'NZ',
    'NZ'
  ],
  [
    'Australia / Oceania',
    'International',
    'Cargo',
    221652,
    'Air New Zealand',
    'Air New Zealand',
    'Enplaned',
    'Passenger',
    100.541,
    'NZ',
    'NZ'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    153748,
    'Alaska Airlines',
    'Alaska Airlines',
    'Deplaned',
    'Passenger',
    69.74,
    'AS',
    'AS'
  ],
  [
    'US',
    'Domestic',
    'Express',
    3713,
    'Alaska Airlines',
    'Alaska Airlines',
    'Deplaned',
    'Passenger',
    1.684,
    'AS',
    'AS'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    295930,
    'Alaska Airlines',
    'Alaska Airlines',
    'Enplaned',
    'Passenger',
    134.234,
    'AS',
    'AS'
  ],
  [
    'US',
    'Domestic',
    'Express',
    3367,
    'Alaska Airlines',
    'Alaska Airlines',
    'Enplaned',
    'Passenger',
    1.527,
    'AS',
    'AS'
  ],
  [
    'US',
    'Domestic',
    'Mail',
    28705,
    'Alaska Airlines',
    'Alaska Airlines',
    'Enplaned',
    'Passenger',
    13.021,
    'AS',
    'AS'
  ],
  [
    'Canada',
    'International',
    'Cargo',
    34206,
    'Alaska Airlines',
    'Alaska Airlines',
    'Deplaned',
    'Passenger',
    15.516,
    'AS',
    'AS'
  ],
  [
    'Canada',
    'International',
    'Cargo',
    21031,
    'Alaska Airlines',
    'Alaska Airlines',
    'Enplaned',
    'Passenger',
    9.54,
    'AS',
    'AS'
  ],
  [
    'Canada',
    'International',
    'Mail',
    48979,
    'Alaska Airlines',
    'Alaska Airlines',
    'Enplaned',
    'Passenger',
    22.217,
    'AS',
    'AS'
  ],
  [
    'Mexico',
    'International',
    'Cargo',
    99222,
    'Alaska Airlines',
    'Alaska Airlines',
    'Deplaned',
    'Passenger',
    45.007,
    'AS',
    'AS'
  ],
  [
    'Mexico',
    'International',
    'Express',
    140,
    'Alaska Airlines',
    'Alaska Airlines',
    'Deplaned',
    'Passenger',
    0.064,
    'AS',
    'AS'
  ],
  [
    'Mexico',
    'International',
    'Cargo',
    16838,
    'Alaska Airlines',
    'Alaska Airlines',
    'Enplaned',
    'Passenger',
    7.638,
    'AS',
    'AS'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    820116,
    'All Nippon Airways',
    'All Nippon Airways',
    'Deplaned',
    'Passenger',
    372.005,
    'NH',
    'NH'
  ],
  [
    'Asia',
    'International',
    'Mail',
    95590,
    'All Nippon Airways',
    'All Nippon Airways',
    'Deplaned',
    'Passenger',
    43.36,
    'NH',
    'NH'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    347156,
    'All Nippon Airways',
    'All Nippon Airways',
    'Enplaned',
    'Passenger',
    157.47,
    'NH',
    'NH'
  ],
  [
    'Asia',
    'International',
    'Mail',
    190201,
    'All Nippon Airways',
    'All Nippon Airways',
    'Enplaned',
    'Passenger',
    86.275,
    'NH',
    'NH'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    1745713,
    'American Airlines',
    'American Airlines',
    'Deplaned',
    'Passenger',
    791.855,
    'AA',
    'AA'
  ],
  [
    'US',
    'Domestic',
    'Mail',
    394829,
    'American Airlines',
    'American Airlines',
    'Deplaned',
    'Passenger',
    179.094,
    'AA',
    'AA'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    2610403,
    'American Airlines',
    'American Airlines',
    'Enplaned',
    'Passenger',
    1184.079,
    'AA',
    'AA'
  ],
  [
    'US',
    'Domestic',
    'Mail',
    867692,
    'American Airlines',
    'American Airlines',
    'Enplaned',
    'Passenger',
    393.585,
    'AA',
    'AA'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    46448,
    'Ameriflight',
    'Ameriflight',
    'Deplaned',
    'Freighter',
    21.069,
    'A8',
    'A8'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    13271,
    'Ameriflight',
    'Ameriflight',
    'Enplaned',
    'Freighter',
    6.02,
    'A8',
    'A8'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    377597,
    'Asiana Airlines',
    'Asiana Airlines',
    'Deplaned',
    'Freighter',
    171.278,
    'OZ',
    'OZ'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    646310,
    'Asiana Airlines',
    'Asiana Airlines',
    'Deplaned',
    'Passenger',
    293.166,
    'OZ',
    'OZ'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    392733,
    'Asiana Airlines',
    'Asiana Airlines',
    'Enplaned',
    'Freighter',
    178.144,
    'OZ',
    'OZ'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    672216,
    'Asiana Airlines',
    'Asiana Airlines',
    'Enplaned',
    'Passenger',
    304.917,
    'OZ',
    'OZ'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    1159652,
    'Astar Air Cargo',
    'Astar Air Cargo',
    'Deplaned',
    'Freighter',
    526.018,
    'ER',
    'ER'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    1535268,
    'Astar Air Cargo',
    'Astar Air Cargo',
    'Enplaned',
    'Freighter',
    696.398,
    'ER',
    'ER'
  ],
  [
    'US',
    'Domestic',
    'Mail',
    11,
    'Atlantic Southeast Airlines',
    'Delta Air Lines',
    'Deplaned',
    'Passenger',
    0.005,
    'EV',
    'DL'
  ],
  [
    'Europe',
    'International',
    'Cargo',
    1021909,
    'British Airways',
    'British Airways',
    'Deplaned',
    'Passenger',
    463.538,
    'BA',
    'BA'
  ],
  [
    'Europe',
    'International',
    'Mail',
    15096,
    'British Airways',
    'British Airways',
    'Deplaned',
    'Passenger',
    6.848,
    'BA',
    'BA'
  ],
  [
    'Europe',
    'International',
    'Cargo',
    776831,
    'British Airways',
    'British Airways',
    'Enplaned',
    'Passenger',
    352.371,
    'BA',
    'BA'
  ],
  [
    'Europe',
    'International',
    'Cargo',
    1029715,
    'Cargolux Airlines',
    'Cargolux Airlines',
    'Deplaned',
    'Freighter',
    467.079,
    'CV',
    'CV'
  ],
  [
    'Europe',
    'International',
    'Cargo',
    786402,
    'Cargolux Airlines',
    'Cargolux Airlines',
    'Enplaned',
    'Freighter',
    356.712,
    'CV',
    'CV'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    920693,
    'Cathay Pacific',
    'Cathay Pacific',
    'Deplaned',
    'Freighter',
    417.626,
    'CX',
    'CX'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    241333,
    'Cathay Pacific',
    'Cathay Pacific',
    'Deplaned',
    'Passenger',
    109.469,
    'CX',
    'CX'
  ],
  [
    'Asia',
    'International',
    'Mail',
    129473,
    'Cathay Pacific',
    'Cathay Pacific',
    'Deplaned',
    'Passenger',
    58.729,
    'CX',
    'CX'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    1110414,
    'Cathay Pacific',
    'Cathay Pacific',
    'Enplaned',
    'Freighter',
    503.684,
    'CX',
    'CX'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    251430,
    'Cathay Pacific',
    'Cathay Pacific',
    'Enplaned',
    'Passenger',
    114.049,
    'CX',
    'CX'
  ],
  [
    'Asia',
    'International',
    'Express',
    3,
    'Cathay Pacific',
    'Cathay Pacific',
    'Enplaned',
    'Passenger',
    0.001,
    'CX',
    'CX'
  ],
  [
    'Asia',
    'International',
    'Mail',
    251430,
    'Cathay Pacific',
    'Cathay Pacific',
    'Enplaned',
    'Passenger',
    114.049,
    'CX',
    'CX'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    2108144,
    'China Airlines',
    'China Airlines',
    'Deplaned',
    'Freighter',
    956.254,
    'CI',
    'CI'
  ],
  [
    'Asia',
    'International',
    'Mail',
    66167,
    'China Airlines',
    'China Airlines',
    'Deplaned',
    'Freighter',
    30.013,
    'CI',
    'CI'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    2065410,
    'China Airlines',
    'China Airlines',
    'Enplaned',
    'Freighter',
    936.87,
    'CI',
    'CI'
  ],
  [
    'Asia',
    'International',
    'Mail',
    47294,
    'China Airlines',
    'China Airlines',
    'Enplaned',
    'Freighter',
    21.453,
    'CI',
    'CI'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    315657,
    'China Cargo Airlines',
    'China Cargo Airlines',
    'Deplaned',
    'Freighter',
    143.182,
    'CK',
    'CK'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    403914,
    'China Cargo Airlines',
    'China Cargo Airlines',
    'Enplaned',
    'Freighter',
    183.215,
    'CK',
    'CK'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    722328,
    'Delta Air Lines',
    'Delta Air Lines',
    'Deplaned',
    'Passenger',
    327.648,
    'DL',
    'DL'
  ],
  [
    'US',
    'Domestic',
    'Express',
    531960,
    'Delta Air Lines',
    'Delta Air Lines',
    'Deplaned',
    'Passenger',
    241.297,
    'DL',
    'DL'
  ],
  [
    'US',
    'Domestic',
    'Mail',
    160118,
    'Delta Air Lines',
    'Delta Air Lines',
    'Deplaned',
    'Passenger',
    72.63,
    'DL',
    'DL'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    64769,
    'Delta Air Lines',
    'Delta Air Lines',
    'Enplaned',
    'Passenger',
    29.379,
    'DL',
    'DL'
  ],
  [
    'US',
    'Domestic',
    'Express',
    1481410,
    'Delta Air Lines',
    'Delta Air Lines',
    'Enplaned',
    'Passenger',
    671.968,
    'DL',
    'DL'
  ],
  [
    'US',
    'Domestic',
    'Mail',
    213104,
    'Delta Air Lines',
    'Delta Air Lines',
    'Enplaned',
    'Passenger',
    96.664,
    'DL',
    'DL'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    3343546,
    'EVA Airways',
    'EVA Airways',
    'Deplaned',
    'Combi',
    1516.632,
    'BR',
    'BR'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    97764,
    'EVA Airways',
    'EVA Airways',
    'Deplaned',
    'Passenger',
    44.346,
    'BR',
    'BR'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    2123959,
    'EVA Airways',
    'EVA Airways',
    'Enplaned',
    'Combi',
    963.428,
    'BR',
    'BR'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    62104,
    'EVA Airways',
    'EVA Airways',
    'Enplaned',
    'Passenger',
    28.17,
    'BR',
    'BR'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    215807,
    'Evergreen International Airlines',
    'Evergreen International Airlines',
    'Deplaned',
    'Freighter',
    97.89,
    'EZ',
    'EZ'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    8985408,
    'Federal Express',
    'Federal Express',
    'Deplaned',
    'Freighter',
    4075.781,
    'FX',
    'FX'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    7879802,
    'Federal Express',
    'Federal Express',
    'Enplaned',
    'Freighter',
    3574.278,
    'FX',
    'FX'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    37720,
    'Frontier Airlines',
    'Frontier Airlines',
    'Deplaned',
    'Passenger',
    17.11,
    'F9',
    'F9'
  ],
  [
    'US',
    'Domestic',
    'Express',
    11381,
    'Frontier Airlines',
    'Frontier Airlines',
    'Deplaned',
    'Passenger',
    5.162,
    'F9',
    'F9'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    79810,
    'Frontier Airlines',
    'Frontier Airlines',
    'Enplaned',
    'Passenger',
    36.202,
    'F9',
    'F9'
  ],
  [
    'US',
    'Domestic',
    'Express',
    1664,
    'Frontier Airlines',
    'Frontier Airlines',
    'Enplaned',
    'Passenger',
    0.755,
    'F9',
    'F9'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    147814,
    'Hawaiian Airlines',
    'Hawaiian Airlines',
    'Deplaned',
    'Passenger',
    67.048,
    'HA',
    'HA'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    420021,
    'Hawaiian Airlines',
    'Hawaiian Airlines',
    'Enplaned',
    'Passenger',
    190.522,
    'HA',
    'HA'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    26270,
    'Horizon Air',
    'Alaska Airlines',
    'Deplaned',
    'Passenger',
    11.916,
    'QX',
    'AS'
  ],
  [
    'US',
    'Domestic',
    'Cargo',
    5330,
    'Horizon Air',
    'Alaska Airlines',
    'Enplaned',
    'Passenger',
    2.418,
    'QX',
    'AS'
  ],
  [
    'Europe',
    'International',
    'Cargo',
    11856,
    'Icelandair (Inactive)',
    'Icelandair (Inactive)',
    'Deplaned',
    'Passenger',
    5.378,
    'FI',
    'FI'
  ],
  [
    'Europe',
    'International',
    'Cargo',
    82208,
    'Icelandair (Inactive)',
    'Icelandair (Inactive)',
    'Enplaned',
    'Passenger',
    37.29,
    'FI',
    'FI'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    1464911,
    'Japan Airlines',
    'Japan Airlines',
    'Deplaned',
    'Freighter',
    664.484,
    'JL',
    'JL'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    490152,
    'Japan Airlines',
    'Japan Airlines',
    'Deplaned',
    'Passenger',
    222.333,
    'JL',
    'JL'
  ],
  [
    'Asia',
    'International',
    'Mail',
    168662,
    'Japan Airlines',
    'Japan Airlines',
    'Deplaned',
    'Freighter',
    76.505,
    'JL',
    'JL'
  ],
  [
    'Asia',
    'International',
    'Mail',
    56433,
    'Japan Airlines',
    'Japan Airlines',
    'Deplaned',
    'Passenger',
    25.598,
    'JL',
    'JL'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    1554286,
    'Japan Airlines',
    'Japan Airlines',
    'Enplaned',
    'Freighter',
    705.024,
    'JL',
    'JL'
  ],
  [
    'Asia',
    'International',
    'Cargo',
    520057,
    'Japan Airlines',
    'Japan Airlines',
    'Enplaned',
    'Passenger',
    235.898,
    'JL',
    'JL'
  ],
  [
    'Asia',
    'International',
    'Mail',
    186902,
    'Japan Airlines',
    'Japan Airlines',
    'Enplaned',
    'Freighter',
    84.779,
    'JL',
    'JL'
  ],
  [
    'Asia',
    'International',
    'Mail',
    62537,
    'Japan Airlines',
    'Japan Airlines',
    'Enplaned',
    'Passenger',
    28.367,
    'JL',
    'JL'
  ]
]

const modalstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  height: 200,
  zIndex: 6
}
const steps = [
  {
    label: 'Step 1',
    description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
    value1: 'File',
    value2: 'Paste',
    // value3: 'Http Request',
    // value4: 'Sheets',
    value5: 'Example Data'
  },
  {
    label: 'Step 2',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
    value1: 'Filter',
    value2: 'Merge',
    value3: 'Group',
    value4: 'Slice',
    value5: 'Sort',
    value6: 'Rename Columns'
  },
  {
    label: 'Step 3',
    description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`
  },
  {
    label: 'Step 4',
    description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`
  },
  {
    label: 'Step 5',
    description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`
  }
]

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#FFF',
    width: 990,
    height: 480,
    zIndex: 4
  },
  overlay: {
    background: 'rgba(0,0,0,0.5)',
    zIndex: 9999
  },
  '.css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active': {
    color: '#7cc2ae'
  }
}

Modal.setAppElement(document.getElementById('root'))

function init () {
  Tabletop.init({
    key: '2PACX-1vSARJKvpJqXydRqji4kHZhoDiEvMIu1-mPKlHnVP8ClMlb4Qd2luRZdf6rqrcjpCzQjMnK0SjCWEan9',
    simpleSheet: true
  }).then(function (data, tabletop) {
    console.log(data)
  })
}
window.addEventListener('DOMContentLoaded', init)

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})
var typeId, dataset1, dataset2

export default function StepwiseFlow () {
  let height, width
  height = window.innerHeight
  width = window.innerWidth
  const location = useLocation()
  var columns2
  var temp9 = []
  var x = [],
    y = [],
    z = []

  var result, min, max, sum, avg

  var sc,
    s = 0,
    l = 1,
    newColumnName = '',
    condition,
    input,
    fuzzyInput

  const { subscription_id } = useParams()

  const [orignalFile, setOriginalFile] = useState('')
  const [nodeType, setNodeType] = useState('')
  const [alertType, setAlertType] = useState()
  const [graphAlreadySelected, setGraphAlreadySelected] = useState(false)
  const [containNull, setContainNull] = useState(0)
  const [isExampleData, setisExampleData] = useState(false)

  const authContext = useContext(AuthContext)

  const exportModalstyle = {
    position: 'relative',
    top: '14%',
    left: '28%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    height: 500,
    width: 700,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    borderRadius: '4px'
  }

  const removeStyle = {
    position: 'absolute',
    top: 20,
    right: 20,
    size: 20,
    cursor: 'pointer',
    color: 'white'
  }

  var inputOptions = {
    section1: [
      {
        title: 'File',
        subtitle: 'Handles CSV, json,geojson or topojson files.',
        img: '/File03.png',
        onpress: () => {
          onAdd()
        }
      },
      {
        title: 'Paste',
        subtitle:
          'Paste input: string, number, csv, json, geojson or topojson.',
        img: '/Paste02.png',
        onpress: () => {
          onAdd2()
        }
      },
      {
        title: 'Example Data',
        subtitle: 'Some example data for playing around with data blocks.',
        img: '/ExampleData.png',
        onpress: () => {
          applyExpData()
        }
      },
      {
        title: 'Select DataSet',
        subtitle: 'Select DataSet',
        img: '/DataSources.png',
        onpress: () => {
          onAdd3()
        }
      }
    ]
  }

  const transformOptions = {
    section1: [
      {
        title: 'Filter',
        subtitle: 'Groups a data set based on a given column name.',
        img: '/Filter02.png',
        onpress: () => {
          onAdd5()
        }
      },
      {
        title: 'Merge',
        subtitle: 'Merges two data sets based on the given column names.',
        img: '/Merge.png',
        onpress: () => {
          onAdd6()
        }
      }
    ],
    section2: [
      {
        title: 'Group',
        subtitle: 'Groups a data set based on a given column name.',
        img: '/Group.png',
        onpress: () => {
          onAdd7()
        }
      },

      {
        title: 'Slice',
        subtitle: 'Slices a data set based on indices.',
        img: '/Slice.png',
        onpress: () => {
          onAdd8()
        }
      }
    ],
    section3: [
      {
        title: 'Sort',
        subtitle: 'Sorts data based on a given column.',
        img: '/Sort.png',
        onpress: () => {
          onAdd9()
        }
      },
      {
        title: 'Rename Columns',
        subtitle: 'Renames multiple columns.',
        img: '/RenameColumn.png',
        onpress: () => {
          onAdd10()
        }
      }
    ],
    section4: [
      {
        title: 'Duplicate',
        subtitle: 'Removes the duplicate rows from data set',
        img: '/Duplicate.png',
        onpress: () => {
          onAdd82()
        }
      },
      {
        title: 'Fuzzy Search',
        subtitle: 'Checks the fuzzy search ',
        img: '/FuzzySearch.png',
        onpress: () => {
          onAdd83()
        }
      }
    ],
    section5: [
      {
        title: 'Standardization',
        subtitle: 'Standardizes the data Sets',
        img: '/standard.png',
        onpress: () => {
          onAdd84()
        }
      },
      {
        title: 'Replace Null',
        subtitle: 'Replaces Null object ',
        img: '/Replace.png',
        onpress: () => {
          onAdd85()
        }
      }
    ],
    section6: [
      {
        title: 'InComplete',
        subtitle: 'Checks for incomplete rows ',
        img: '/Incomplete.png',
        onpress: () => {
          onAdd86()
        }
      },
      {
        title: 'Formatted',
        subtitle: 'Checks for Formation done ',
        img: '/Formatted.png',
        onpress: () => {
          onAdd87()
        }
      }
    ],
    section7: [
      {
        title: 'Case Format',
        subtitle: 'CHecks for case format.',
        img: '/TextFormatting.png',
        onpress: () => {
          onAdd88()
        }
      },
      {
        title: 'Discrete Range',
        subtitle: 'Checks the discreet range in dataset.',
        img: '/DiscreateRange.png',
        onpress: () => {
          onAdd89()
        }
      }
    ]
  }

  const visualizationOptions = {
    section1: [
      {
        title: 'Line And Scatter Plot',
        subtitle: 'Displays a Barchart of given x and y column names.',
        img: '/LineAndScatterPlot.png',
        onpress: () => {
          onAddNode('special20', '20', 'Line And Scatter Plot')
        }
      },
      {
        title: 'Data Labels Hover',
        subtitle: 'Displays a histogram of a given column name.',
        img: '/DataLabelsAndHover.png',
        onpress: () => {
          onAddNode('special21', '21', 'Data Labels Hover')
        }
      },
      {
        title: 'Data Labels on The Plot',
        subtitle: 'Displays a scatterplot of given x and y column names.',
        img: '/DataLabelsOnThePlot.png',

        onpress: () => {
          onAddNode('special22', '22', 'Data Labels on The Plot')
        }
      },
      {
        title: 'Scatter Plot with a Color Dimension',
        subtitle: 'Displays a scatterplot of given x and y column names.',
        img: '/ScatterPlotWithColorDimention.png',
        onpress: () => {
          onAddNode('special23', '23', 'Scatter Plot with a Color Dimension')
        }
      }
    ],

    section2: [
      {
        title: 'Time Series',
        subtitle:
          'Displays a Timeseries line chart of given x and y column names.',
        onpress: () => {
          onAddNode('special49', '49')
        }
      },
      {
        title: 'Binning',
        subtitle: 'Customise data source for Bin chart',
        onpress: () => {
          onAddNode('special51', '51')
        }
      },
      {
        title: 'Number Profiler',
        subtitle:
          'Take user input to do the aggregate profiling (Sum, Count, Minimum, Maximum and Average)',
        onpress: () => {
          onAdd51()
        }
      }
    ],
    section3: [
      {
        title: 'Basic Line Plot',
        subtitle: '',
        img: '/LineChart01.png',
        onpress: () => {
          onAddNode('special24', '24', 'Basic Line Plot')
        }
      },
      {
        title: 'Line and Scatter Plot',
        subtitle: '',
        img: '/LineChart02.png',
        onpress: () => {
          onAddNode('special25', '25', 'Line and Scatter Plot')
        }
      },
      {
        title: 'Adding Names to Line and Scatter Plot',
        subtitle: '',
        img: '/LineChart03.png',
        onpress: () => {
          onAddNode('special26', '26', 'Adding Names to Line and Scatter Plot')
        }
      },
      {
        title: 'Line and Scatter Styling',
        subtitle: '',
        img: '/LineChart04.png',
        onpress: () => {
          onAddNode('special27', '27', 'Line and Scatter Styling')
        }
      },
      {
        title: 'Styled Line Plot',
        subtitle: '',
        img: '/LineChart05.png',
        onpress: () => {
          onAddNode('special28', '28', 'Styled Line Plot')
        }
      },
      {
        title: 'Colored and Styled Scatter Plot',
        subtitle: '',
        img: '/LineChart06.png',
        onpress: () => {
          onAddNode('special29', '29', 'Colored and Styled Scatter Plot')
        }
      },
      {
        title: 'Line Shape Options for Interpolation',
        subtitle: '',
        img: '/LineChart07.png',
        onpress: () => {
          onAddNode('special30', '30', 'Line Shape Options for Interpolation')
        }
      },
      {
        title: 'Graph and Axes Titles',
        subtitle: '',
        img: '/LineChart08.png',
        onpress: () => {
          onAddNode('special31', '31', 'Graph and Axes Titles')
        }
      },
      {
        title: 'Line Dash',
        subtitle: '',
        img: '/LineChart09.png',
        onpress: () => {
          onAddNode('special32', '32', 'Line Dash')
        }
      },
      {
        title: 'Connect Gaps Between Data',
        subtitle: '',
        img: '/LineChart10.png',
        onpress: () => {
          onAddNode('special33', '33', 'Connect Gaps Between Data')
        }
      }
    ],

    section5: [
      {
        title: 'Basic Bar Chart',
        subtitle: '',
        img: '/Barchart01.png',
        onpress: () => {
          onAddNode('special34', '34', 'Basic Bar Chart')
        }
      },
      {
        title: 'Grouped Bar Chart',
        subtitle: '',
        img: '/Barchart02.png',
        onpress: () => {
          onAddNode('special35', '35', 'Grouped Bar Chart')
        }
      },
      {
        title: 'Stacked Bar Chart',
        subtitle: '',
        img: '/Barchart03.png',
        onpress: () => {
          onAddNode('special36', '36', 'Stacked Bar Chart')
        }
      },
      {
        title: 'Bar chart with Hover Text',
        subtitle: '',
        img: '/Barchart04.png',
        onpress: () => {
          onAddNode('special37', '37', 'Bar chart with Hover Text')
        }
      },
      {
        title: 'Bar Charts with Direct Labels',
        subtitle: '',
        img: '/Barchart05.png',
        onpress: () => {
          onAddNode('special38', '38', 'Bar Charts with Direct Labels')
        }
      },
      {
        title: 'Grouped Bar Chart with Direct Labels',
        subtitle: '',
        img: '/Barchart06.png',
        onpress: () => {
          onAddNode('special39', '39', 'Grouped Bar Chart with Direct Labels')
        }
      },
      {
        title: 'Bar Chart with Rotated Labels',
        subtitle: '',
        img: '/Barchart07.png',
        onpress: () => {
          onAddNode('special40', '40', 'Bar Chart with Rotated Labels')
        }
      },
      {
        title: 'Customizing Individual Bar Colors',
        subtitle: '',
        img: '/Barchart08.png',
        onpress: () => {
          onAddNode('special41', '41', 'Customizing Individual Bar Colors')
        }
      },
      {
        title: 'Customizing Individual Bar Widths',
        subtitle: '',
        img: '/Barchart09.png',
        onpress: () => {
          onAddNode('special42', '42', 'Customizing Individual Bar Widths')
        }
      },
      {
        title: 'Customizing Individual Bar Base',
        subtitle: '',
        img: '/Barchart10.png',
        onpress: () => {
          onAddNode('special43', '43', 'Customizing Individual Bar Base')
        }
      },
      {
        title: 'Colored and Styled Bar Chart',
        subtitle: '',
        img: '/Barchart11.png',
        onpress: () => {
          onAddNode('special44', '44', 'Colored and Styled Bar Chart')
        }
      },
      {
        title: 'Waterfall Bar Chart',
        subtitle: '',
        img: '/Barchart12.png',
        onpress: () => {
          onAddNode('special45', '45', 'Waterfall Bar Chart')
        }
      },
      {
        title: 'Bar Chart with Relative Barmode',
        subtitle: '',
        img: '/Barchart13.png',
        onpress: () => {
          onAddNode('special46', '46', 'Bar Chart with Relative Barmode')
        }
      }
    ],
    section4: [
      {
        title: 'Box Plot',
        subtitle: '',
        img: '/boxPlot01.png',
        onpress: () => {
          onAdd14()
        }
      },
      {
        title: 'K mean Cluster',
        subtitle: '',
        onpress: () => {
          onAdd14()
        }
      },
      {
        title: 'Data Source Comparision',
        subtitle: '',
        onpress: () => {
          onAdd14()
        }
      }
    ],
    section4: [
      {
        title: 'Edit Mode Show Record',
        subtitle: '',
        onpress: () => {
          onAdd14()
        }
      }
    ],
    section6: [
      {
        title: 'Basic Pie Chart',
        subtitle: '.',
        img: '/Pie01.png',
        onpress: () => {
          onAddNode('special47', '47', 'Basic Pie Chart')
        }
      },
      {
        title: 'Pie Chart Subplots',
        subtitle: '',
        img: '/Pie02.png',
        onpress: () => {
          onAddNode('special48', '48', 'Pie Chart Subplots')
        }
      },
      {
        title: 'Donut Chart',
        subtitle: '',
        img: '/Pie03.png',
        onpress: () => {
          onAddNode('special49', '49', 'Donut Chart')
        }
      },
      {
        title: 'Automatically Adjust Margins',
        subtitle: '',
        img: '/Pie04.png',
        onpress: () => {
          onAddNode('special50', '50', 'Automatically Adjust Margins')
        }
      },
      {
        title: 'Control Text Orientation Inside Pie Chart Sectors',
        subtitle: '',
        img: '/Pie05.png',
        onpress: () => {
          onAddNode(
            'special51',
            '51',
            'Control Text Orientation Inside Pie Chart Sectors'
          )
        }
      }
    ],
    section7: [
      {
        title: 'Marker Size on Bubble Charts',
        subtitle: '.',
        img: '/Bubble01.png',
        onpress: () => {
          onAddNode('special52', '52', 'Marker Size on Bubble Charts')
        }
      },
      {
        title: 'Marker Size and Color on Bubble Charts',
        subtitle: '.',
        img: '/Bubble02.png',
        onpress: () => {
          onAddNode('special53', '53', 'Marker Size and Color on Bubble Charts')
        }
      },
      {
        title: 'Hover Text on Bubble Charts',
        subtitle: '.',
        img: '/Bubble03.png',
        onpress: () => {
          onAddNode('special54', '54', 'Hover Text on Bubble Charts')
        }
      },
      {
        title: 'Bubble Size Scaling on Charts',
        subtitle: '.',
        img: '/Bubble04.png',
        onpress: () => {
          onAddNode('special55', '55', 'Bubble Size Scaling on Charts')
        }
      },
      {
        title: 'Marker Size, Color, and Symbol as an Array',
        subtitle: '.',
        img: '/Bubble05.png',
        onpress: () => {
          onAddNode(
            'special56',
            '56',
            'Marker Size, Color, and Symbol as an Array'
          )
        }
      }
    ],
    section8: [
      {
        title: 'Categorical Dot Plot',
        subtitle: '.',
        img: '/dot.png',
        onpress: () => {
          onAddNode('special57', '57', 'Categorical Dot Plot')
        }
      }
    ],
    section9: [
      {
        title: 'Basic Overlaid Area Chart',
        subtitle: '.',
        img: '/FilledArea01.png',
        onpress: () => {
          onAddNode('special58', '58', 'Basic Overlaid Area Chart')
        }
      },
      {
        title: 'Overlaid Area Chart Without Boundary Line',
        subtitle: '.',
        img: '/FilledArea02.png',
        onpress: () => {
          onAddNode(
            'special59',
            '59',
            'Overlaid Area Chart Without Boundary Line'
          )
        }
      },
      {
        title: 'Stacked Area Chart',
        subtitle: '.',
        img: '/FilledArea03.png',
        onpress: () => {
          onAddNode('special60', '60', 'Stacked Area Chart')
        }
      },
      {
        title: 'Normalized Stacked Area Chart',
        subtitle: '.',
        img: '/FilledArea04.png',
        onpress: () => {
          onAddNode('special61', '61', 'Normalized Stacked Area Chart')
        }
      },
      {
        title: 'Select Hover Points',
        subtitle: '.',
        img: '/FilledArea05.png',
        onpress: () => {
          onAddNode('special62', '62', 'Select Hover Points')
        }
      }
    ],
    section10: [
      {
        title: 'Basic Horizontal Bar Chart',
        subtitle: '.',
        img: '/HorizontalBar01.png',
        onpress: () => {
          onAddNode('special63', '63', 'Basic Horizontal Bar Chart')
        }
      },
      {
        title: 'Colored Bar Chart',
        subtitle: '.',
        img: '/HorizontalBar02.png',
        onpress: () => {
          onAddNode('special64', '64', 'Colored Bar Chart')
        }
      },
      {
        title: 'Bar Chart with Line Plot',
        subtitle: '.',
        img: '/HorizontalBar03.png',
        onpress: () => {
          onAddNode('special65', '65', 'Bar Chart with Line Plot')
        }
      }
    ],
    section11: [
      {
        title: 'Basic Sunburst chart',
        subtitle: '.',
        img: '/sunburst01.png',
        onpress: () => {
          onAddNode('special68', '68', 'Basic Sunburst chart')
        }
      },
      {
        title: 'Branchvalues',
        subtitle: '.',
        img: '/sunburst02.png',
        onpress: () => {
          onAddNode('special69', '69', 'Branchvalues')
        }
      },
      {
        title: 'Sunburst with Repeated Labels',
        subtitle: '.',
        img: '/sunburst03.png',
        onpress: () => {
          onAddNode('special70', '70', 'Sunburst with Repeated Labels')
        }
      },
      {
        title: 'Large Number of Slices',
        subtitle: '.',
        img: '/sunburst05.png',
        onpress: () => {
          onAddNode('special71', '71', 'Large Number of Slices')
        }
      },
      {
        title: 'Control Text Orientation Inside Sunburst Chart Sectors',
        subtitle: '.',
        img: '/sunburst06.png',
        onpress: () => {
          onAddNode(
            'special72',
            '72',
            'Control Text Orientation Inside Sunburst Chart Sectors'
          )
        }
      }
    ],
    section12: [
      {
        title: 'Sankey Diagrams',
        subtitle: '.',
        img: '/sankey01.png',
        onpress: () => {
          onAddNode('special73', '73', 'Sankey Diagrams')
        }
      },
      {
        title: 'Style Sankey Diagram',
        subtitle: '.',
        img: '/sankey05.png',
        onpress: () => {
          onAddNode('special77', '77', 'Style Sankey Diagram')
        }
      }
    ],
    section13: [
      {
        title: 'Basic Point Cloud',
        subtitle: '.',
        img: '/POintCloud01.png',
        onpress: () => {
          onAddNode('special66', '66', 'Basic Point Cloud')
        }
      },
      {
        title: 'Styled Point Cloud',
        subtitle: '.',
        img: '/POintCloud02.png',
        onpress: () => {
          onAddNode('special67', '67', 'Styled Point Cloud')
        }
      }
    ],
    section14: [
      {
        title: 'Basic TreeMaps',
        subtitle: '.',
        img: '/treemap01.png',
        onpress: () => {
          onAddNode('special234', '234', 'Basic TreeMaps')
        }
      },
      {
        title: 'Set Different Attributes in TreeMap',
        subtitle: '.',
        img: '/treemap02.png',
        onpress: () => {
          onAddNode('special235', '235', 'Set Different Attributes in TreeMap')
        }
      },
      {
        title: 'Set Color of Treemap Sectorss',
        subtitle: '.',
        img: '/treemap03.png',
        onpress: () => {
          onAddNode('special236', '236', 'Set Color of Treemap Sectorss')
        }
      },
      {
        title: 'Nested Layers in Treemap',
        subtitle: '.',
        img: '/treemap04.png',
        onpress: () => {
          onAddNode('special237', '237', 'Nested Layers in Treemap')
        }
      }
    ],
    section15: [
      {
        title: 'A Contour and Scatter Plot of the Method of Steepest Descent',
        subtitle: '.',
        img: '/MultipleChartType01.png',
        onpress: () => {
          onAddNode(
            'special238',
            '238',
            'A Contour and Scatter Plot of the Method of Steepest Descent'
          )
        }
      },
      {
        title: 'Line Chart and a Bar Chart',
        subtitle: '.',
        img: '/MultipleChartType02.png',
        onpress: () => {
          onAddNode('special239', '239', 'Line Chart and a Bar Chart')
        }
      }
    ],
    section16: [
      {
        title: 'WebGL',
        subtitle: '.',
        img: '/WebglWithSVG01.png',
        onpress: () => {
          onAddNode('special240', '240', 'WebGL')
        }
      },
      {
        title: 'WebGL with 1 Million points',
        subtitle: '.',
        img: '/WebglWithSVG02.png',
        onpress: () => {
          onAddNode('special241', '241', 'WebGL with 1 Million points')
        }
      },
      {
        title: 'WebGL with many traces',
        subtitle: '.',
        img: '/WebglWithSVG03.png',
        onpress: () => {
          onAddNode('special242', '242', 'WebGL with many traces')
        }
      }
    ],
    section17: [
      {
        title: 'Basic Symmetric Error Bars',
        subtitle: '.',
        img: '/error01.png',
        onpress: () => {
          onAddNode('special81', '81', 'Basic Symmetric Error Bars')
        }
      },
      {
        title: 'Bar Chart with Error Bars',
        subtitle: '.',
        img: '/error02.png',
        onpress: () => {
          onAddNode('special82', '82', 'Bar Chart with Error Bars')
        }
      },
      {
        title: 'Horizontal Error Bars',
        subtitle: '.',
        img: '/error03.png',
        onpress: () => {
          onAddNode('special83', '83', 'Horizontal Error Bars')
        }
      },
      {
        title: 'Asymmetric Error Bars',
        subtitle: '.',
        img: '/error04.png',
        onpress: () => {
          onAddNode('special84', '84', 'Asymmetric Error Bars')
        }
      },
      {
        title: 'Colored and Styled Error Bars',
        subtitle: '.',
        img: '/error05.png',
        onpress: () => {
          onAddNode('special85', '85', 'Colored and Styled Error Bars')
        }
      },
      {
        title: 'Error Bars as a Percentage of the y-Value',
        subtitle: '.',
        img: '/error06.png',
        onpress: () => {
          onAddNode(
            'special86',
            '86',
            'Error Bars as a Percentage of the y-Value'
          )
        }
      },
      {
        title: 'Asymmetric Error Bars with a Constant Offset',
        subtitle: '.',
        img: '/error07.png',
        onpress: () => {
          onAddNode(
            'special87',
            '87',
            'Asymmetric Error Bars with a Constant Offset'
          )
        }
      }
    ],
    section18: [
      {
        title: 'Basic Box Plot',
        subtitle: '.',
        img: '/boxPlot01.png',
        onpress: () => {
          onAddNode('special88', '88', 'Basic Box Plot')
        }
      },
      {
        title: 'Box Plot That Displays the Underlying Data',
        subtitle: '.',
        img: '/boxPlot02.png',
        onpress: () => {
          onAddNode(
            'special89',
            '89',
            'Box Plot That Displays the Underlying Data'
          )
        }
      },
      {
        title: 'Horizontal Box Plot',
        subtitle: '.',
        img: '/boxPlot03.png',
        onpress: () => {
          onAddNode('special90', '90', 'Horizontal Box Plot')
        }
      },
      {
        title: 'Grouped Box Plot',
        subtitle: '.',
        img: '/boxPlot04.png',
        onpress: () => {
          onAddNode('special91', '91', 'Grouped Box Plot')
        }
      },
      {
        title: 'Box Plot Styling Outliners',
        subtitle: '.',
        img: '/boxPlot05.png',
        onpress: () => {
          onAddNode('special92', '92', 'Box Plot Styling Outliners')
        }
      },
      {
        title: 'Box Plot Styling Mean and Standard Deviation',
        subtitle: '.',
        img: '/boxPlot06.png',
        onpress: () => {
          onAddNode(
            'special93',
            '93',
            'Box Plot Styling Mean and Standard Deviation'
          )
        }
      },
      {
        title: 'Grouped Horizontal Box Plot',
        subtitle: '.',
        img: '/boxPlot07.png',
        onpress: () => {
          onAddNode('special94', '94', 'Grouped Horizontal Box Plot')
        }
      },
      {
        title: 'Colored Box Plot',
        subtitle: '.',
        img: '/boxPlot08.png',
        onpress: () => {
          onAddNode('special95', '95', 'Colored Box Plot')
        }
      },
      {
        title: 'Rainbow Box Plot',
        subtitle: '.',
        img: '/boxPlot10.png',
        onpress: () => {
          onAddNode('special97', '97', 'Rainbow Box Plot')
        }
      }
    ],
    section19: [
      {
        title: 'Basic Histogram',
        subtitle: '.',
        img: '/hitogram01.png',
        onpress: () => {
          onAddNode('special98', '98', 'Basic Histogram')
        }
      },
      {
        title: 'Horizontal Histogram',
        subtitle: '.',
        img: '/hitogram02.png',
        onpress: () => {
          onAddNode('special99', '99', 'Horizontal Histogram')
        }
      },
      {
        title: 'Overlaid Histogram',
        subtitle: '.',
        img: '/hitogram03.png',
        onpress: () => {
          onAddNode('special100', '100', 'Overlaid Histogram')
        }
      },
      {
        title: 'Stacked Histogram',
        subtitle: '.',
        img: '/hitogram04.png',
        onpress: () => {
          onAddNode('special101', '101', 'Stacked Histogram')
        }
      },
      {
        title: 'Colored and Styled Histograms',
        subtitle: '.',
        img: '/hitogram05.png',
        onpress: () => {
          onAddNode('special102', '102', 'Colored and Styled Histograms')
        }
      },
      {
        title: 'Cumulative Histogram',
        subtitle: '.',
        img: '/hitogram06.png',
        onpress: () => {
          onAddNode('special103', '103', 'Cumulative Histogram')
        }
      },
      {
        title: 'Normalized Histogram',
        subtitle: '.',
        img: '/hitogram07.png',
        onpress: () => {
          onAddNode('special104', '104', 'Normalized Histogram')
        }
      },
      {
        title: 'Specify Binning Function',
        subtitle: '.',
        img: '/hitogram08.png',
        onpress: () => {
          onAddNode('special105', '105', 'Specify Binning Function')
        }
      }
    ],
    section20: [
      {
        title: '2D Histogram Contour Plot with Histogram Subplots',
        subtitle: '.',
        img: '/2dDensityPlot01.png',
        onpress: () => {
          onAddNode(
            'special106',
            '106',
            '2D Histogram Contour Plot with Histogram Subplots'
          )
        }
      },
      {
        title: '2D Histogram Contour Plot with Slider Control',
        subtitle: '.',
        img: '/2dDensityPlot02.png',
        onpress: () => {
          onAddNode(
            'special107',
            '107',
            '2D Histogram Contour Plot with Slider Control'
          )
        }
      }
    ],
    section21: [
      {
        title: 'Filled Lines',
        subtitle: '.',
        img: '/ContinuesErrorBars01.png',
        onpress: () => {
          onAddNode('special108', '108', 'Filled Lines')
        }
      },
      {
        title: 'Asymmetric Error Bars with a Constant Offset',
        subtitle: '.',
        img: '/ContinuesErrorBars02.png',
        onpress: () => {
          onAddNode(
            'special109',
            '109',
            'Asymmetric Error Bars with a Constant Offset'
          )
        }
      }
    ],
    section22: [
      {
        title: 'Simple Contour Plot',
        subtitle: '.',
        img: '/ContourPlot01.png',
        onpress: () => {
          onAddNode('special110', '110', 'Simple Contour Plot')
        }
      },
      {
        title: 'Basic Contour Plot',
        subtitle: '.',
        img: '/ContourPlot02.png',
        onpress: () => {
          onAddNode('special111', '111', 'Basic Contour Plot')
        }
      },
      {
        title: 'Setting X and Y Coordinates in a Contour Plot',
        subtitle: '.',
        img: '/ContourPlot03.png',
        onpress: () => {
          onAddNode(
            'special112',
            '112',
            'Setting X and Y Coordinates in a Contour Plot'
          )
        }
      },
      {
        title: 'Color Scale for Contour Plot',
        subtitle: '.',
        img: '/ContourPlot04.png',
        onpress: () => {
          onAddNode('special113', '113', 'Color Scale for Contour Plot')
        }
      },
      {
        title: 'Customizing Size and Range of a Contour Plots Contours',
        subtitle: '.',
        img: '/ContourPlot05.png',
        onpress: () => {
          onAddNode(
            'special114',
            '114',
            'Customizing Size and Range of a Contour Plots Contours'
          )
        }
      },
      {
        title: 'Customizing Spacing Between X and Y Ticks',
        subtitle: '.',
        img: '/ContourPlot06.png',
        onpress: () => {
          onAddNode(
            'special115',
            '115',
            'Customizing Spacing Between X and Y Ticks'
          )
        }
      },
      {
        title: 'Connect the Gaps between Null Values in the Z Matrix',
        subtitle: '.',
        img: '/ContourPlot07.png',
        onpress: () => {
          onAddNode(
            'special116',
            '116',
            'Connect the Gaps between Null Values in the Z Matrix'
          )
        }
      },
      {
        title: 'Smoothing Contour Lines',
        subtitle: '.',
        img: '/ContourPlot08.png',
        onpress: () => {
          onAddNode('special120', '120', 'Smoothing Contour Lines')
        }
      },
      {
        title: 'Smooth Contour Coloring',
        subtitle: '.',
        img: '/ContourPlot08.png',
        onpress: () => {
          onAddNode('special121', '121', 'Smooth Contour Coloring')
        }
      },
      {
        title: 'Contour Lines',
        subtitle: '.',
        img: '/ContourPlot09.png',
        onpress: () => {
          onAddNode('special122', '122', 'Contour Lines')
        }
      },
      {
        title: 'Contour Line Labels',
        subtitle: '.',
        img: '/ContourPlot10.png',
        onpress: () => {
          onAddNode('special123', '123', 'Contour Line Labels')
        }
      },
      {
        title: 'Custom Color scale for Contour Plot',
        subtitle: '.',
        img: '/ContourPlot11.png',
        onpress: () => {
          onAddNode('special124', '124', 'Custom Color scale for Contour Plot')
        }
      },
      {
        title: 'Color Bar Title',
        subtitle: '.',
        img: '/ContourPlot12.png',
        onpress: () => {
          onAddNode('special125', '125', 'Color Bar Title')
        }
      },
      {
        title: 'Color Bar size',
        subtitle: '.',
        img: '/ContourPlot13.png',
        onpress: () => {
          onAddNode('special126', '126', 'Color Bar size')
        }
      },
      {
        title: 'Styling Color Bar Ticks for Contour Plots',
        subtitle: '.',
        img: '/ContourPlot14.png',
        onpress: () => {
          onAddNode(
            'special127',
            '127',
            'Styling Color Bar Ticks for Contour Plots'
          )
        }
      }
    ],
    section23: [
      {
        title: 'Basic Heatmap',
        subtitle: '.',
        img: '/HeatMaps01.png',
        onpress: () => {
          onAddNode('special128', '128', 'Basic Heatmap')
        }
      },
      {
        title: 'Heatmap with Categorical Axis Labels',
        subtitle: '.',
        img: '/HeatMaps02.png',
        onpress: () => {
          onAddNode('special129', '129', 'Heatmap with Categorical Axis Labels')
        }
      },
      {
        title: 'Annotated Heatmap',
        subtitle: '.',
        img: '/HeatMaps03.png',
        onpress: () => {
          onAddNode('special130', '130', 'Annotated Heatmap')
        }
      },
      {
        title: 'Heatmap with Unequal Block Sizes',
        subtitle: '.',
        img: '/HeatMaps04.png',
        onpress: () => {
          onAddNode('special131', '131', 'Heatmap with Unequal Block Sizes')
        }
      }
    ],

    section25: [
      {
        title: 'Adding Dimensions',
        subtitle: '.',
        img: '/ParallelCoordinatePlot01.png',
        onpress: () => {
          onAddNode('special134', '134', 'Adding Dimensions')
        }
      },
      {
        title: 'Basic Parallel Coordinates Plot',
        subtitle: '.',
        img: '/ParallelCoordinatePlot02.png',
        onpress: () => {
          onAddNode('special135', '135', 'Basic Parallel Coordinates Plot')
        }
      },
      {
        title: 'Annotated Parallel Coordinates Plot',
        subtitle: '.',
        img: '/ParallelCoordinatePlot03.png',
        onpress: () => {
          onAddNode('special136', '136', 'Annotated Parallel Coordinates Plot')
        }
      },
      {
        title: 'Advanced Parallel Coordinates Plot',
        subtitle: '.',
        img: '/ParallelCoordinatePlot04.png',
        onpress: () => {
          onAddNode('special137', '137', 'Advanced Parallel Coordinates Plot')
        }
      }
    ],
    section26: [
      {
        title: 'Logarithmic Axes',
        subtitle: '.',
        img: '/LogPlots01.png',
        onpress: () => {
          onAddNode('special138', '138', 'Logarithmic Axes')
        }
      }
    ],
    section27: [
      {
        title: 'Basic Waterfall Chart',
        subtitle: '.',
        img: '/WaterfallCharts01.png',
        onpress: () => {
          onAddNode('special139', '139', 'Basic Waterfall Chart')
        }
      },
      {
        title: 'Multi Category Waterfall Chart',
        subtitle: '.',
        img: '/WaterfallCharts02.png',
        onpress: () => {
          onAddNode('special140', '140', 'Multi Category Waterfall Chart')
        }
      },
      {
        title: 'Horizontal Waterfall Chart',
        subtitle: '.',
        img: '/WaterfallCharts03.png',
        onpress: () => {
          onAddNode('special141', '141', 'Horizontal Waterfall Chart')
        }
      },
      {
        title: 'Style Waterfall Chart',
        subtitle: '.',
        img: '/WaterfallCharts04.png',
        onpress: () => {
          onAddNode('special142', '142', 'Style Waterfall Chart')
        }
      }
    ],
    section28: [
      {
        title: 'A Single Angular Gauge Chart',
        subtitle: '.',
        img: '/Indicators01.png',
        onpress: () => {
          onAddNode('special143', '143', 'A Single Angular Gauge Chart')
        }
      },
      {
        title: 'Bullet Gauge',
        subtitle: '.',
        img: '/Indicators02.png',
        onpress: () => {
          onAddNode('special144', '144', 'Bullet Gauge')
        }
      },
      {
        title: 'Showing Information above Your Chart',
        subtitle: '.',
        img: '/Indicators03.png',
        onpress: () => {
          onAddNode('special145', '145', 'Showing Information above Your Chart')
        }
      },
      {
        title: 'Data Cards/ Big Numbers',
        subtitle: '.',
        img: '/Indicators04.png',
        onpress: () => {
          onAddNode('special146', '146', 'Data Cards/ Big Numbers')
        }
      }
    ],
    section29: [
      {
        title: 'Simple Candlestick Chart',
        subtitle: '.',
        img: '/CandleStickChart01.png',
        onpress: () => {
          onAddNode('special147', '147', 'Simple Candlestick Chart')
        }
      },
      {
        title: 'Candlestick Chart without Rangeslider',
        subtitle: '.',
        img: '/CandleStickChart02.png',
        onpress: () => {
          onAddNode(
            'special148',
            '148',
            'Candlestick Chart without Rangeslider'
          )
        }
      },
      {
        title: 'Customise Candlestick Chart with Shapes and Annotations',
        subtitle: '.',
        img: '/CandleStickChart03.png',
        onpress: () => {
          onAddNode(
            'special149',
            '149',
            'Customise Candlestick Chart with Shapes and Annotations'
          )
        }
      },
      {
        title: 'Customizing Candlestick Chart Colors',
        subtitle: '.',
        img: '/CandleStickChart04.png',
        onpress: () => {
          onAddNode('special150', '150', 'Customizing Candlestick Chart Colors')
        }
      },
      {
        title: 'Add Range Selector',
        subtitle: '.',
        img: '/CandleStickChart05.png',
        onpress: () => {
          onAddNode('special151', '151', 'Add Range Selector')
        }
      }
    ],
    section30: [
      {
        title: 'Basic Funnel Plot',
        subtitle: '.',
        img: '/FunnelAndFunnelAreaChart01.png',
        onpress: () => {
          onAddNode('special152', '152', 'Basic Funnel Plot')
        }
      },
      {
        title: 'Setting Marker Size and Color',
        subtitle: '.',
        img: '/FunnelAndFunnelAreaChart02.png',
        onpress: () => {
          onAddNode('special153', '153', 'Setting Marker Size and Color')
        }
      },
      {
        title: 'Stacked Funnel',
        subtitle: '.',
        img: '/FunnelAndFunnelAreaChart03.png',
        onpress: () => {
          onAddNode('special154', '154', 'Stacked Funnel')
        }
      },
      {
        title: 'Funnel Area Plot',
        subtitle: '.',
        img: '/FunnelAndFunnelAreaChart04.png',
        onpress: () => {
          onAddNode('special155', '155', 'Funnel Area Plot')
        }
      },
      {
        title: 'Multi Funnel area',
        subtitle: '.',
        img: '/FunnelAndFunnelAreaChart05.png',
        onpress: () => {
          onAddNode('special156', '156', 'Multi Funnel area')
        }
      }
    ],
    section31: [
      {
        title: 'Date Strings',
        subtitle: '.',
        img: '/TimeSeries01.png',
        onpress: () => {
          onAddNode('special157', '157', 'Date Strings')
        }
      },
      {
        title: 'Basic Time Series',
        subtitle: '.',
        img: '/TimeSeries02.png',
        onpress: () => {
          onAddNode('special158', '158', 'Basic Time Series')
        }
      },
      {
        title: 'Manually Set Range',
        subtitle: '.',
        img: '/TimeSeries03.png',
        onpress: () => {
          onAddNode('special159', '159', 'Manually Set Range')
        }
      },
      {
        title: 'Time Series with Rangeslider',
        subtitle: '.',
        img: '/TimeSeries04.png',
        onpress: () => {
          onAddNode('special160', '160', 'Time Series with Rangeslider')
        }
      }
    ],
    section32: [
      {
        title: '3D Scatter Plot',
        subtitle: '.',
        img: '/3DScatterPlot01.png',
        onpress: () => {
          onAddNode('special161', '161', '3D Scatter Plot')
        }
      },
      {
        title: 'Basic Ribbon Plot',
        subtitle: '.',
        img: '/BasicLinePlot.png',
        onpress: () => {
          onAddNode('special162', '162', 'Basic Ribbon Plot')
        }
      }
    ],
    sectionSub3D: [
      {
        title: 'Topographical 3D Surface Plot',
        subtitle: '.',
        img: '/3DSurfacePlots01.png',
        onpress: () => {
          onAddNode('special163', '163', 'Topographical 3D Surface Plot')
        }
      },
      {
        title: 'Surface Plot With Contours',
        subtitle: '.',
        img: '/3DSurfacePlots02.png',
        onpress: () => {
          onAddNode('special164', '164', 'Surface Plot With Contours')
        }
      },
      {
        title: 'Multiple 3D Surface Plots',
        subtitle: '.',
        img: '/3DSurfacePlots03.png',
        onpress: () => {
          onAddNode('special165', '165', 'Multiple 3D Surface Plots')
        }
      }
    ],
    section33: [
      {
        title: 'Simple 3D Mesh Plot',
        subtitle: '.',
        img: '/3DMeshPlots01.png',
        onpress: () => {
          onAddNode('special166', '166', 'Simple 3D Mesh Plot')
        }
      },
      {
        title: '3D Mesh Plot with Alphahull',
        subtitle: '.',
        img: '/3DMeshPlots02.png',
        onpress: () => {
          onAddNode('special167', '167', '3D Mesh Plot with Alphahull')
        }
      },
      {
        title: '3D Mesh Tetrahedron',
        subtitle: '.',
        img: '/3DMeshPlots03.png',
        onpress: () => {
          onAddNode('special168', '168', '3D Mesh Tetrahedron')
        }
      },
      {
        title: '3D Mesh Cube',
        subtitle: '.',
        img: '/3DMeshPlots04.png',
        onpress: () => {
          onAddNode('special169', '169', '3D Mesh Cube')
        }
      }
    ],
    section34: [
      {
        title: '3D Line Plot',
        subtitle: '.',
        img: '/3DLinePlot01.png',
        onpress: () => {
          onAddNode('special170', '170', '3D Line Plot')
        }
      },
      {
        title: '3D Line + Markers Plot',
        subtitle: '.',
        img: '/3DLinePlot02.png',
        onpress: () => {
          onAddNode('special171', '171', '3D Line + Markers Plot')
        }
      },
      {
        title: '3D Line Spiral Plot',
        subtitle: '.',
        img: '/3DLinePlot03.png',
        onpress: () => {
          onAddNode('special172', '172', '3D Line Spiral Plot')
        }
      },
      {
        title: '3D Random Walk Plot',
        subtitle: '.',
        img: '/3DLinePlot04.png',
        onpress: () => {
          onAddNode('special173', '173', '3D Random Walk Plot')
        }
      }
    ],
    section35a: [
      {
        title: 'Simple Subplot',
        subtitle: '.',
        img: '/SubPlots01.png',
        onpress: () => {
          onAddNode('special174', '174', 'Simple Subplot')
        }
      },
      {
        title: 'Custom Sized Subplot',
        subtitle: '.',
        img: '/SubPlots02.png',
        onpress: () => {
          onAddNode('special175', '175', 'Custom Sized Subplot')
        }
      },
      {
        title: 'Multiple Subplots',
        subtitle: '.',
        img: '/SubPlots03.png',
        onpress: () => {
          onAddNode('special176', '176', 'Multiple Subplots')
        }
      },
      {
        title: 'Subplots with Shared Axes',
        subtitle: '.',
        img: '/SubPlots04.png',
        onpress: () => {
          onAddNode('special177', '177', 'Subplots with Shared Axes')
        }
      },
      {
        title: 'Stacked Subplots',
        subtitle: '.',
        img: '/SubPlots05.png',
        onpress: () => {
          onAddNode('special178', '178', 'Stacked Subplots')
        }
      },
      {
        title: 'Stacked Subplots with a Shared X-Axis',
        subtitle: '.',
        img: '/SubPlots06.png',
        onpress: () => {
          onAddNode(
            'special179',
            '179',
            'Stacked Subplots with a Shared X-Axis'
          )
        }
      },
      {
        title: 'Multiple Custom Sized Subplots',
        subtitle: '.',
        img: '/SubPlots07.png',
        onpress: () => {
          onAddNode('special180', '180', 'Multiple Custom Sized Subplots')
        }
      }
    ],
    section35: [
      {
        title: 'Simple Inset Plot',
        subtitle: '.',
        img: '/InsetPlots01.png',
        onpress: () => {
          onAddNode('special181', '181', 'Simple Inset Plot')
        }
      }
    ],
    section36: [
      {
        title: 'Multiple 3D Subplots',
        subtitle: '.',
        img: '/3DSubPlots01.png',
        onpress: () => {
          onAddNode('special182', '182', 'Multiple 3D Subplots')
        }
      }
    ],
    section37: [
      {
        title: 'Mixed Subplots',
        subtitle: '.',
        img: '/3DMixedSubPlots.png',
        onpress: () => {
          onAddNode('special183', '183', 'Mixed Subplots')
        }
      }
    ],
    section38: [
      {
        title: 'Table and Chart Subplot',
        subtitle: '.',
        img: '/TableSubPlots01.png',
        onpress: () => {
          onAddNode('special184', '184', 'Table and Chart Subplot')
        }
      }
    ],
    section39: [
      {
        title: 'Binding to Click Events',
        subtitle: '.',
        img: '/ClickEvents02.png',
        onpress: () => {
          onAddNode('special186', '186', 'Binding to Click Events')
        }
      },
      {
        title: 'Create annotation on click event',
        subtitle: '.',
        img: '/LineAndScatterPlot.png',
        onpress: () => {
          onAddNode('special187', '187', 'Create annotation on click event')
        }
      }
    ],
    section40: [
      // {
      //   title: 'Hover Event Data',
      //   subtitle: '.',
      //   img: '/HoverEvents01.png',
      //   onpress: () => {
      //     onAddNode('special188', '188')
      //   }
      // },
      {
        title: 'Capturing Hover Events: Data',
        subtitle: '.',
        img: '/HoverEvents02.png',
        onpress: () => {
          onAddNode('special189', '189', 'Capturing Hover Events: Data')
        }
      },
      {
        title: 'Capturing Hover Events: Pixels',
        subtitle: '.',
        img: '/HoverEvents03.png',
        onpress: () => {
          onAddNode('special190', '190', 'Capturing Hover Events: Pixels')
        }
      },
      {
        title: 'Triggering Hover Events',
        subtitle: '.',
        img: '/HoverEvents04.png',
        onpress: () => {
          onAddNode('special191', '191', 'Triggering Hover Events')
        }
      },
      {
        title: 'Coupled Hover Events',
        subtitle: '.',
        img: '/HoverEvents05.png',
        onpress: () => {
          onAddNode('special192', '192', 'Coupled Hover Events')
        }
      },
      {
        title: 'Combined Click and Hover Events',
        subtitle: '.',
        img: '/LineAndScatterPlot.png',
        onpress: () => {
          onAddNode('special193', '193', 'Combined Click and Hover Events')
        }
      }
    ],
    section41: [
      {
        title: 'Binding to Zoom Events',
        subtitle: '.',
        img: '/ZoomEvents01.png',
        onpress: () => {
          onAddNode('special194', '194', 'Binding to Zoom Events')
        }
      }
    ],
    section42: [
      {
        title: 'Disabling Zoom Events for X Axis',
        subtitle: '.',
        img: '/ZoomEventsDisable01.png',
        onpress: () => {
          onAddNode('special195', '195', 'Disabling Zoom Events for X Axis')
        }
      },
      {
        title: 'Disabling Zoom Events for X and Y Axis',
        subtitle: '.',
        img: '/ZoomEventsDisable02.png',
        onpress: () => {
          onAddNode(
            'special196',
            '196',
            'Disabling Zoom Events for X and Y Axis'
          )
        }
      }
    ],
    section43: [
      {
        title: 'Filter',
        subtitle: '.',
        img: '/Filter01.png',
        onpress: () => {
          onAddNode('special197', '197', 'Filter')
        }
      },
      {
        title: 'Groupby',
        subtitle: '.',
        img: '/GroupBy01.png',
        onpress: () => {
          onAddNode('special198', '198', 'Groupby')
        }
      }
    ],
    section44: [
      {
        title: 'Aggregations',
        subtitle: '.',
        img: '/Aggregations01.png',
        onpress: () => {
          onAddNode('special199', '199', 'Aggregations')
        }
      },
      {
        title: 'Aggregate Functions',
        subtitle: '.',
        img: '/Aggregations02.png',
        onpress: () => {
          onAddNode('special200', '200', 'Aggregate Functions')
        }
      },
      {
        title: 'Histogram Binning',
        subtitle: '.',
        img: '/Aggregations03.png',
        onpress: () => {
          onAddNode('special201', '201', 'Histogram Binning')
        }
      }
    ],
    section46: [
      {
        title: 'Add Two Dropdown Menus to a Chart with Plotly.js',
        subtitle: '.',
        img: '/DropDownEvents01.png',
        onpress: () => {
          onAddNode(
            'special208',
            '208',
            'Add Two Dropdown Menus to a Chart with Plotly.js'
          )
        }
      }
    ],
    section47: [
      {
        title: 'Add Two Dropdown Menus to a Chart with Plotly.js',
        subtitle: '.',
        img: '/LineAndScatterPlot.png',
        onpress: () => {}
      },
      {
        title: 'Bind dropdown events to Plotly.js charts',
        subtitle: '.',
        img: '/LineAndScatterPlot.png',
        onpress: () => {}
      }
    ],
    section48: [
      {
        title: 'Restyle Button Single Attribute',
        subtitle: '.',
        img: '/ButtonEvents01.png',
        onpress: () => {
          onAddNode('special210', '210', 'Restyle Button Single Attribute')
        }
      },
      {
        title: 'Restyle Button Multiple Attributes',
        subtitle: '.',
        img: '/ButtonEvents02.png',
        onpress: () => {
          onAddNode('special211', '211', 'Restyle Button Multiple Attributes')
        }
      },
      {
        title: 'Relayout Button',
        subtitle: '.',
        img: '/ButtonEvents02.png',
        onpress: () => {
          onAddNode('special212', '212', 'Relayout Button')
        }
      },
      {
        title: 'Update Button',
        subtitle: '.',
        img: '/ButtonEvents03.png',
        onpress: () => {
          onAddNode('special213', '213', 'Update Button')
        }
      },
      {
        title: 'Style the buttons',
        subtitle: '.',
        img: '/ButtonEvents05.png',
        onpress: () => {
          onAddNode('special215', '215', 'Style the buttons')
        }
      }
    ],
    section49: [
      {
        title: 'Basic Slider',
        subtitle: '.',
        img: '/SliderEvents01.png',
        onpress: () => {
          onAddNode('special216', '216', 'Basic Slider')
        }
      },
      {
        title: 'Bind Components to the Appearance of a Plot',
        subtitle: '.',
        img: '/SliderEvents02.png',
        onpress: () => {
          onAddNode(
            'special219',
            '219',
            'Bind Components to the Appearance of a Plot'
          )
        }
      },
      {
        title: 'Add a Play Button to Control a Slider',
        subtitle: '.',
        img: '/SliderEvents03.png',
        onpress: () => {
          onAddNode(
            'special220',
            '220',
            'Add a Play Button to Control a Slider'
          )
        }
      }
    ],
    section50a: [
      {
        title: 'Lasso Selection',
        subtitle: '.',
        img: '/LassoSelection01.png',
        onpress: () => {
          onAddNode('special221', '221', 'Lasso Selection')
        }
      }
    ],
    section50: [
      {
        title: 'Basic Range Slider on Time Series',
        subtitle: '.',
        img: '/RangeSliderAndSelector01.png',
        onpress: () => {
          onAddNode('special222', '222', 'Basic Range Slider on Time Series')
        }
      }
    ],
    section51: [
      {
        title: 'Animating the Layout',
        subtitle: '.',
        img: '/Animation02.png',
        onpress: () => {
          onAddNode('special224', '224', 'Animating the Layout')
        }
      },
      {
        title: 'Defining Named Frames with Plotly.addFrames',
        subtitle: '.',
        img: '/Animation03.png',
        onpress: () => {
          onAddNode(
            'special225',
            '225',
            'Defining Named Frames with Plotly.addFrames'
          )
        }
      },
      {
        title: 'Animating Sequences of Frames',
        subtitle: '.',
        img: '/Animation04.png',
        onpress: () => {
          onAddNode('special226', '226', 'Animating Sequences of Frames')
        }
      },
      {
        title: 'Animating Many Frames Quickly',
        subtitle: '.',
        img: '/Animation05.png',
        onpress: () => {
          onAddNode('special227', '227', 'Animating Many Frames Quickly')
        }
      },
      {
        title: 'Object Constancy',
        subtitle: '.',
        img: '/Animation06.png',
        onpress: () => {
          onAddNode('special228', '228', 'Object Constancy')
        }
      },
      {
        title: 'Frame Groups and Animation Modes',
        subtitle: '.',
        img: '/Animation07.png',
        onpress: () => {
          onAddNode('special229', '229', 'Frame Groups and Animation Modes')
        }
      }
    ],
    section53: [
      {
        title: 'Filled-Area-Animation',
        subtitle: '.',
        img: '/FielledAreaAnimation01.png',
        onpress: () => {
          onAddNode('special231', '231', 'Filled-Area-Animation')
        }
      },
      {
        title: 'Multiple Trace Filled-Area',
        subtitle: '.',
        img: '/FielledAreaAnimation02.png',
        onpress: () => {
          onAddNode('special232', '232', 'Multiple Trace Filled-Area')
        }
      }
    ],
    section54: [
      {
        title: 'Map Animations',
        subtitle: '.',
        img: '/MapAnimation01.png',
        onpress: () => {
          onAddNode('special233', '233', 'Map Animations')
        }
      }
    ]
  }

  const miscOptions = {
    section1: [
      {
        title: 'Stats',
        subtitle:
          'Gives you min, max, avg, mean and count of a given column name.',
        img: '/Stats02.png',
        onpress: () => {
          onAdd15()
        }
      },
      {
        title: 'Export',
        subtitle: 'Lets you export data as csv, json or geojson.',
        img: '/Export02.png',
        onpress: () => {
          onAdd16()
        }
      }
    ]
  }
  const [columnsBox, setColumnsBox] = useState(['1', '2', '3'])

  const [isNumeric, setIsNumeric] = useState(false)
  const [node1, setNode1] = useState('')
  const [node2, setNode2] = useState('')
  const [node3, setNode3] = useState('')
  const [node4, setNode4] = useState('')
  const [c1, setC1] = useState('')
  const [c2, setC2] = useState('')
  const [c3, setC3] = useState('')
  const [c4, setC4] = useState('')
  const [c5, setC5] = useState('')
  const [c6, setC6] = useState('')
  const [c7, setC7] = useState('')
  const [c8, setC8] = useState('')
  const [c9, setC9] = useState('')
  const [c10, setC10] = useState('')

  const [openModal1, setOpenModal1] = useState(false)
  const [open, setOpen] = useState(false)
  const handleCloseModal = () => setOpenModal1(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const elementsFinalCustom = [
    {
      id: '1',
      type: node1,
      isHidden: false,
      position: { x: 60, y: 100 },
      data: { text: '' }
    },
    {
      id: '2',
      type: node2,
      isHidden: false,
      position: { x: 470, y: 150 },
      data: { text: '' }
    },
    {
      id: '3',
      type: node3,
      isHidden: false,
      position: { x: 790, y: 200 },
      data: orignalFile ? orignalFile : null
    },
    {
      id: '4',
      type: node4,
      isHidden: false,
      position: { x: 1150, y: 250 },
      data: { text: '' }
    },
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      animated: true,
      style: { stroke: '#000' }
    },
    {
      id: 'e2-3',
      source: '2',
      target: '3',
      sourceHandle: 'a',
      animated: true,
      style: { stroke: '#000' }
    },
    {
      id: 'e3-4',
      source: '3',
      target: '4',
      animated: true,
      style: { stroke: '#000' }
    }
  ]

  let subtitle
  const prepareData = () => {
    console.log('In PrepareData', result)
    // console.log('--DATA', dt, result)
    temp9.push('')
    //  console.log('In useeff', temp.length,data[0].length)

    for (let k = 0; temp9.length < result[0].length - 1; k++) {
      //console.log('In for', temp9.length, result[0].length)

      if (k === 0) {
        temp9.push(result[0][k])
        temp9.push(result[0][k])
      }
      if (k === 1) {
        temp9.push(result[0][k])
        temp9.push(result[0][k])
      }
      if (k === 2) {
        temp9.push(result[0][k])
      }
      if (k === 3) {
        temp9.push(result[0][k])
      }
      if (k === 4) {
        temp9.push(result[0][k])
      }
      if (k === 5) {
        temp9.push(result[0][k])
      }
      if (k === 6) {
        temp9.push(result[0][k])
      }
      if (k === 7) {
        temp9.push(result[0][k])
      }

      if (k === 8) {
        temp9.push(result[0][k])
      }
      if (k === 9) {
        temp9.push(result[0][k])
      }
      if (k === 10) {
        temp9.push(result[0][k])
      }
      if (k === 11) {
        temp9.push(result[0][k])
      }
      if (k === 12) {
        temp9.push(result[0][k])
      }
      if (k === 13) {
        temp9.push(result[0][k])
      }
      if (k === 14) {
        temp9.push(result[0][k])
      }
      if (k === 15) {
        temp9.push(result[0][k])
      }
      if (k === 16) {
        temp9.push(result[0][k])
      }
      if (k === 17) {
        temp9.push(result[0][k])
      }
      if (k === 18) {
        temp9.push(result[0][k])
      }
      if (k === 19) {
        temp9.push(result[0][k])
      }
      if (k === 20) {
        temp9.push(result[0][k])
      }
      if (temp9.length == result[0].length - 1) temp9.push(result[0][0])
      else temp9.push(result[0][k])
    }

    setDt2(temp9)
  }
  const [activeStep, setActiveStep] = React.useState(0)
  const [showCloseIcon, setShowCloseIcon] = React.useState(false)
  const [myFlowId, setMyFlowId] = React.useState(0)

  const history = useHistory()

  const handleNext = () => {
    if (flowName === '') {
      setNoFlowName(true)
      handleClickOpen()
      setAlertType(1)

      return
    }
    if (flowName.length > 128) {
      handleClickOpen()
      setAlertType(3)

      return
    }
    if (flowDescription.length > 256) {
      handleClickOpen()
      setAlertType(4)

      return
    }
    if (/[^-_a-zA-Z0-9\s]/.test(flowName)) {
      setAlertType(2)
      handleClickOpen()
      return
    }

    var n = 0
    setShowCloseIcon(true)

    if (activeStep === 0) {
      tempElements.push({
        id: '1',
        type: node1,
        isHidden: false,
        position: { x: 400, y: 40 },
        data: orignalFile ? orignalFile : null
      })
      close1 = 0
      //   console.log('id1', tempElements)
    }
    if (activeStep === 1) {
      tempElements.push({
        id: '2',
        type: node2,
        isHidden: false,
        position: { x: 800, y: 50 },
        data: { text: 'No duplicates found' }
      })
      close2 = 0
      //    console.log('id2', tempElements)
    }
    if (activeStep === 2) {
      //  console.log('id3-checkNodebox', nodeBox)

      while (n < nodeBox.length) {
        tempElements.push({
          id: (n + 3).toString(),
          type: nodeBox[n],
          isHidden: false,
          position: {
            x: 1190,
            y:
              n === 0
                ? (n + 2) * 30
                : n === 1
                ? (n + 2) * 80
                : n === 2
                ? (n + 2) * 100
                : (n + 2) * 120
          },
          data: result && result
        })
        n++
      }
      close3 = 0

      //   console.log('id3', tempElements)
    }
    if (activeStep === 3) {
      tempElements.push({
        id: (nodeBox.length + 3).toString(),
        type: node4,
        isHidden: false,
        position: { x: 1600, y: 60 },
        data: result && result
      })
      if (nodeBox.length === 1) {
        tempElements.push(
          {
            id: 'e1-2',
            source: '1',
            target: '2',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e2-3',
            source: '2',
            target: '3',
            sourceHandle: 'a',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e3-4',
            source: '3',
            target: '4',
            animated: true,
            style: { stroke: '#000' }
          }
        )
      } else if (nodeBox.length === 2) {
        tempElements.push(
          {
            id: 'e1-2',
            source: '1',
            target: '2',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e2-3',
            source: '2',
            target: '3',
            sourceHandle: 'a',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e2-4',
            source: '2',
            target: '4',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e3-5',
            source: '3',
            target: '5',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e4-5',
            source: '4',
            target: '5',
            animated: true,
            style: { stroke: '#000' }
          }
        )
      } else if (nodeBox.length === 3) {
        tempElements.push(
          {
            id: 'e1-2',
            source: '1',
            target: '2',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e2-3',
            source: '2',
            target: '3',
            sourceHandle: 'a',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e2-4',
            source: '2',
            target: '4',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e2-5',
            source: '2',
            target: '5',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e3-6',
            source: '3',
            target: '6',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e4-6',
            source: '4',
            target: '6',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e5-6',
            source: '5',
            target: '6',
            animated: true,
            style: { stroke: '#000' }
          }
        )
      } else if (nodeBox.length === 4) {
        tempElements.push(
          {
            id: 'e1-2',
            source: '1',
            target: '2',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e2-3',
            source: '2',
            target: '3',
            sourceHandle: 'a',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e2-4',
            source: '2',
            target: '4',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e2-5',
            source: '2',
            target: '5',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e2-6',
            source: '2',
            target: '6',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e3-7',
            source: '3',
            target: '7',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e4-7',
            source: '4',
            target: '7',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e5-7',
            source: '5',
            target: '7',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e6-7',
            source: '6',
            target: '7',
            animated: true,
            style: { stroke: '#000' }
          }
        )
      } else if (nodeBox.length === 5) {
        tempElements.push(
          {
            id: 'e1-2',
            source: '1',
            target: '2',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e2-3',
            source: '2',
            target: '3',
            sourceHandle: 'a',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e2-4',
            source: '2',
            target: '4',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e2-5',
            source: '2',
            target: '5',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e2-6',
            source: '2',
            target: '6',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e2-7',
            source: '2',
            target: '7',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e3-8',
            source: '3',
            target: '8',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e4-8',
            source: '4',
            target: '8',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e5-8',
            source: '5',
            target: '8',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e6-8',
            source: '6',
            target: '8',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e7-8',
            source: '7',
            target: '8',
            animated: true,
            style: { stroke: '#000' }
          }
        )
      } else if (nodeBox.length === 6) {
        tempElements.push(
          {
            id: 'e1-2',
            source: '1',
            target: '2',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e2-3',
            source: '2',
            target: '3',
            sourceHandle: 'a',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e2-4',
            source: '2',
            target: '4',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e2-5',
            source: '2',
            target: '5',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e2-6',
            source: '2',
            target: '6',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e2-7',
            source: '2',
            target: '7',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e2-8',
            source: '2',
            target: '8',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e3-9',
            source: '3',
            target: '9',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e4-9',
            source: '4',
            target: '9',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e5-9',
            source: '5',
            target: '9',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e6-9',
            source: '6',
            target: '9',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e7-9',
            source: '7',
            target: '9',
            animated: true,
            style: { stroke: '#000' }
          },
          {
            id: 'e8-9',
            source: '8',
            target: '9',
            animated: true,
            style: { stroke: '#000' }
          }
        )
      }
      //   console.log('id4', tempElements)
      //   console.log('CHECK UPDATED', tempElements, nodeBox)
      close4 = 0
      setStateElements2(tempElements)
    }

    if (activeStep === 4) {
      history.push('/My Flows')
    }
    let fid = 0
    const formData = new FormData()
    console.log('I am in the Handle Next -----------')
    //    console.log(dt)

    formData.append('file_name', orignalFile)
    formData.append('name', flowName)
    formData.append('description', flowDescription)
    formData.append('type', global.type_id)
    formData.append('account_id', localStorage.getItem('account_id'))
    formData.append('operation_type', 1)
    formData.append('step_number', activeStep + 1)
    formData.append('flowId', myFlowId)
    formData.append('data', activeStep === 1 ? JSON.stringify(dt) : null)
    formData.append(
      'selected_charts',
      activeStep === 2 ? JSON.stringify(nodeBox2) : null
    )
    // console.log('FORM', JSON.stringify(nodeBox2))
    console.log('FORM->', Array.from(formData.entries()))

    axios
      .post(
        configData.API_URL + 'personalAccount/users/saveStepWiseFlow',
        formData,
        {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
      )
      .then(response => {
        //   console.log('I am in next RRRR', response, response.data.data.id)
        //  console.log('STEp IDCHECK', response.data.data.id)
        if (activeStep === 0) {
          console.log('STEp ID', response.data.data.id)
          fid = response.data.data.id
          setMyFlowId(fid)
        }
        console.log('TYPEID', global.type_id, response.data.data, nodeBox2)

        if (global.type_id === 2 && activeStep === 0) {
          exceldata = response.data.data.parsedData
          const array6 = exceldata.map(obj => Object.values(obj))
          console.log('DATA....', array6)
          //  console.log('Columns%%', array6[0])
          exceldata = array6
          columns = array6[0]
          columns2 = columns
          console.log('columns??', columns)

          setColumnsBox(columns)

          setDt(exceldata)
        } else if (global.type_id === 3 && activeStep === 0) {
          console.log('parsed-', Object.keys(response.data.data.parsedData[0]))
          var key1 = Object.keys(response.data.data.parsedData[0])
          console.log(
            'key1-',
            Object.keys(response.data.data.parsedData[0][key1])
          )

          var key2 = Object.keys(response.data.data.parsedData[0][key1])
          console.log('key2-', key2)
          if (key2.length > 1) {
            console.log('what-', response.data.data.parsedData[0][key1])
            let k2 = Object.keys(response.data.data.parsedData[0][key1])
            console.log('see-', response.data.data.parsedData[0][key1][k2[2]])
            if (
              typeof response.data.data.parsedData[0][key1][k2[0]] === 'array'
            )
              key2 = key2[0]
            else if (
              typeof response.data.data.parsedData[0][key1][k2[1]] === 'array'
            )
              key2 = key2[1]
            else if (
              typeof response.data.data.parsedData[0][key1][k2[2]] === 'array'
            )
              key2 = key2[2]

            console.log('PP-', key2)
          } else key2 = Object.keys(response.data.data.parsedData[0][key1])

          var dataWithKeys = response.data.data.parsedData[0][key1][key2]
          //   console.log('key-data', dataWithKeys)
          // console.log('key-data...', response.data.data.parsedData[0])
          //  var ch1 = Object.keys(response.data.data.parsedData[0])
          // console.log('xml data', response.data.data.parsedData[0][ch1[0]], ch1)

          let def4 = []
          let def5 = []
          let temp1

          console.log('dataWithKeys', dataWithKeys)
          for (const [key, value] of Object.entries(dataWithKeys)) {
            console.log('val-', key, value)
            columns = Object.keys(value).flat()
            // console.log('Check??', Object.keys(value).flat())

            // console.log('Check->', Object.values(value).flat())
            temp1 = Object.values(value).flat()
            def5 = []
            temp1.map(e => {
              // console.log('checkE', e, typeof e === 'object')
              if (typeof e === 'object') {
                let t1 = Object.keys(e)
                // console.log('checkE->', e[t1])
                def5.push(e[t1])
                //    def4.push(def5)
              } else {
                //def5.push(e)
                def5.push(e)
              }
              def4.push(def5)
            })
          }
          //  console.log('xmldata', def4)
          xmldata = def4

          setDt(xmldata)

          setColumnsBox(columns)
        } else if (global.type_id === 4 && activeStep === 0) {
          var keys
          //   console.log('jsondata', response.data.data.parsedData)
          let key = Object.keys(response.data.data.parsedData)
          let jsonbox = response.data.data.parsedData[key]
          let def5 = []

          jsonbox.map(e => {
            //  console.log('json1-', e)
            keys = Object.keys(e)
            let values = Object.values(e)
            def5.push(values)
          })
          def5.unshift(keys)
          jsondata = def5
          console.log('jsondata**', jsondata)
          setDt(jsondata)
          columns = jsondata.slice(0, 1)
          const C1 = columns[0]
          columns2 = columns[0]
          columns = columns[0]
          setColumnsBox(columns)
        } else if (global.type_id === 6 && activeStep === 0) {
          pdfdata = response.data.data.parsedData
          console.log('pdf->', response.data.data.parsedData)

          const newData = pdfdata
          console.log('pdfdataCheck', newData)
          pdfdata = newData
          setDt(newData)
          columns = pdfdata.slice(0, 1)
          const C1 = columns[0]
          // console.log('C1....', C1[0])
          columns2 = columns[0]
          columns = columns[0]
          setColumnsBox(columns)
        } else if (global.type_id === 7 && activeStep === 0) {
          // console.log(
          //   'parquetdata',
          //   response.data.data.parsedData[0].schema.fieldList
          // )
          let def4 = []
          for (const [value] of Object.entries(
            response.data.data.parsedData[0].schema.fieldList
          )) {
            def4.push(Object.keys(value))
            def4.push(Object.values(value).flat())
          }
          //   console.log('parquetdata**', def4)
          parquetdata = def4
          // console.log('parquetdata**', parquetdata)
          setDt(parquetdata)
          columns = parquetdata.slice(0, 1)
          const C1 = columns[0]
          //  console.log('C1....', C1[0])
          columns2 = columns[0]
          columns = columns[0]
          setColumnsBox(columns)
        }

        return response.data.data
      })
      .catch(error => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response)
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(error.message)
        }
      })

    setActiveStep(prevActiveStep => prevActiveStep + 1)
    // scrollToTop()
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
    scrollToTop()
    if (activeStep === 1) close1 = 1
    if (activeStep === 2) close2 = 1
    if (activeStep === 3) close3 = 1
    if (activeStep === 4) close4 = 1
  }

  const [modalIsOpen, setIsOpen] = useState(false)
  const [dt, setDt] = useState([])
  const [dt2, setDt2] = useState([])
  const [dsp, setDsp] = useState('1')
  const [dspNo, setDspNo] = useState(false)
  const [selectedColumn, setSelectedColumn] = useState(0)
  const [cpText, setCpText] = useState('')
  const [expData, setExpData] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [stateElements, setStateElements] = useState(elementsCustom)
  const [stateElements2, setStateElements2] = useState(elementsFinalCustom)
  const [selCpText, setSelCpText] = useState('JSON')
  const [isSelected, setIsSelected] = useState(false)
  const [isSelected2, setIsSelected2] = useState(false)
  const [isSelected3, setIsSelected3] = useState(false)

  const reactFlowWrapper = useRef(null)
  const validationMessageRef = useRef()

  const [visible, setVisible] = useState(false)
  const [flowName, setFlowName] = useState('')
  const [flowDescription, setFlowDescription] = useState('')
  const [startIndex, setstartIndex] = useState(0)
  const [lastIndex, setlastIndex] = useState(1)

  const [renameColumn, setRenameColumn] = useState('')
  const [sortType1, setSortType1] = useState(-1)

  const [fuzzyInput2, setFuzzyInput2] = useState()

  const [noFlowName, setNoFlowName] = useState(true)

  const onConnect = params => setStateElements(els => addEdge(params, els))
  const onConnect2 = useCallback(
    params =>
      setStateElements2(els =>
        addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, els)
      ),
    []
  )

  useEffect(() => {
    setStateElements(els =>
      els.map(e => {
        e.id === dsp && (e.isHidden = false)
        return e
      })
    )
  }, [isHidden, dsp])

  useEffect(() => {
    setStateElements(els =>
      els.map(e => {
        e.type === nodeType &&
          (dspNo === true ? (e.isHidden = true) : (e.isHidden = false))
        return e
      })
    )
  }, [nodeType, dspNo])

  useEffect(() => {
    // console.log('clear?', localStorage.getItem('CLEAR'))
    tempElements = []
    setNode2('')
    setNodeType('')
    nodeBox = []
    nodeBox2 = []
    close1 = 1
    close2 = 1
    close3 = 1
    close4 = 1
    setActiveStep(0)
    setDspNo(true)
    setStateElements(els =>
      els.map(e => {
        // console.log('E$', e)
        e.isHidden = true
        return e
      })
    )
    // }
  }, [])

  useEffect(() => {
    // console.log('selected node', node1, node2, node3, node4)
    setStateElements2(els =>
      els.map(e => {
        if (e.id === '1') e.type = node1
        if (e.id === '2') e.type = node2
        if (e.id === '3') e.type = node3
        if (e.id === '4') e.type = node4

        return e
      })
    )
  }, [node1, node2, node3, node4])

  useEffect(() => {
    console.log('Activestep', activeStep)
    scrollToTop()
  }, [activeStep])

  useEffect(() => {
    console.log('CloseIcon..', showCloseIcon)
  }, [showCloseIcon])

  useEffect(() => {
    console.log('finalstateelements', stateElements2)
  }, [stateElements2])

  useEffect(() => {
    console.log('dt changed---', dt)
  }, [dt])

  useEffect(() => {
    console.log('subscription_id', subscription_id)
    if (subscription_id === 'price_1LfOlnSBwqDDsny7nprdkWUQ') {
      inputOptionsBox = inputOptions.section1.filter(
        item => item.title != 'Select DataSet'
      )
      // console.log('inputOptionsBox', inputOptionsBox)
    } else if (
      subscription_id === 'price_1LfOnUSBwqDDsny71PPaevJ8' ||
      subscription_id === 'price_1LfOpESBwqDDsny7sB1s8fra' ||
      subscription_id === 'price_1LfOpESBwqDDsny7sB1s8fra'
    ) {
      inputOptionsBox = inputOptions.section1
      // console.log('inputOptionsBox', inputOptionsBox)
    }
  }, [])

  const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#784af4'
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#784af4',
      zIndex: 1,
      fontSize: 18
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor'
    }
  }))

  function QontoStepIcon (props) {
    const { active, completed, className } = props

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className='QontoStepIcon-completedIcon' />
        ) : (
          <div className='QontoStepIcon-circle' />
        )}
      </QontoStepIconRoot>
    )
  }

  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool
  }

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 25
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: '#b86b31'
        // backgroundImage:
        //   'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
      }
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: '#914206'
        // backgroundImage:
        //   'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
      }
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1
    }
  }))

  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      // backgroundImage:
      //   'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      backgroundColor: '#b86b31'
    }),
    ...(ownerState.completed && {
      backgroundColor: '#853900'
      // backgroundImage:
      //   'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)'
    })
  }))

  function ColorlibStepIcon (props) {
    const { active, completed, className } = props

    const icons = {
      1: <UploadFileIcon />,
      2: <TransformIcon />,
      3: <InsertChartIcon />,
      4: <QueryStatsIcon />,
      5: <DoneIcon />
    }

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    )
  }

  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node
  }

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 300) {
      setVisible(true)
    } else if (scrolled <= 300) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    console.log('SCROLLED')
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
               in place of 'smooth' */
    })
  }

  window.addEventListener('scroll', toggleVisible)

  const handleOnFileLoad = (data, fileInfo, originalFile) => {
    console.log('check', fileInfo, originalFile)
    setOriginalFile(fileInfo)
    // let filetype = fileInfo.name.substring(
    //   fileInfo.name.length - 4,
    //   fileInfo.name.length
    // )
    let filetype = fileInfo.name.substr(fileInfo.name.indexOf('.') + 1)
    console.log('FileType-', filetype, filetype === 'xlsx')

    typeId =
      filetype === 'xls' ||
      filetype === 'xlsx' ||
      filetype === 'xlsm' ||
      filetype === 'xlsb' ||
      filetype === 'xltx' ||
      filetype === 'xltm' ||
      filetype === 'xlt' ||
      filetype === 'xlam' ||
      filetype === 'xla' ||
      filetype === 'xlw' ||
      filetype === 'xlr'
        ? 2
        : filetype === 'xml'
        ? 3
        : filetype === 'json'
        ? 4
        : filetype === 'pdf'
        ? 6
        : filetype === 'parquet'
        ? 7
        : 1
    console.log('FileTypeID-', typeId)
    global.type_id = typeId

    setExpData(false)
    console.log('---------------------------')

    var temp = []
    data.map(e => {
      var temp1 = []
      e.data.map(e2 => {
        temp1.push({ value: e2 })
        return e2
      })
      temp.push(temp1)
      return e
    })
    setDt(temp)

    result = data.map(e => e.data)

    if (selectedColumn === 1) {
      min = result[1][1]
      for (let i = 1; i < result.length; i++) {
        if (result[i][1] < min) {
          min = result[i][1]
        }
      }
    } else if (selectedColumn === 2) {
      min = result[1][2]
      for (let i = 1; i < result.length; i++) {
        if (result[i][2] < min) {
          min = result[i][2]
        }
      }
    }

    if (selectedColumn === 1) {
      max = result[1][1]
      for (let i = 1; i < result.length; i++) {
        if (result[i][1] > max) {
          max = result[i][1]
        }
      }
    } else if (selectedColumn === 2) {
      max = result[1][2]
      for (let i = 1; i < result.length; i++) {
        if (result[i][2] > max) {
          max = result[i][2]
        }
      }
    }

    sum = 0
    var count = 0
    var j = selectedColumn
    var num

    for (let i = 1; i < result.length; i++) {
      num = parseInt(result[i][j])
      sum = sum + num
      count++
    }
    avg = sum / count

    var done = false

    while (!done) {
      done = true
      for (let i = 2; i < result.length; i += 1) {
        if (result[i - 1][j] > result[i][j]) {
          done = false
          var tmp = result[i - 1][j]
          result[i - 1][j] = result[i][j]
          result[i][j] = tmp
        }
      }
    }

    if (global.type_id === 1) {
      //  console.log('DATA FORMAT-', result)
      columns = result.slice(0, 1)
      const C1 = columns[0]
      console.log('columns-typeId1', C1)
      columns2 = columns[0]
      columns = columns[0]
      setColumnsBox(columns)
    }
    console.log('---------------------------')
  }

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  const handleOnRemoveFile = data => {
    console.log('---------------------------')
    // console.log(data)
    console.log('---------------------------')
  }

  const setNodeDsp4 = type => {
    setNode4('')
    setDspNo(true)
    setNodeType(type)
  }
  const setNodeDsp3 = type => {
    setNode3('')
    setNodeType(type)
    //  console.log('beforeR', nodeBox2)
    nodeBox = nodeBox.filter(el => el !== type)
    nodeBox2 = nodeBox2.filter(el => el.type !== type)
    //  console.log('afterR', nodeBox2)
    setDspNo(true)
  }

  const setNodeDsp2 = type => {
    setNode2('')
    setDspNo(true)
    setNodeType(type)
  }
  const setNodeDsp1 = type => {
    setNode1('')
    setDspNo(true)
    setNodeType(type)
  }

  const useExampleData = () => {
    setisExampleData(false)
    result = exampleData2
    columns = exampleData2[0]
    setColumnsBox(columns)
  }

  const handleSlice = event => {
    //  console.log('beforeSlice', typeId, exceldata, result)
    if (typeId === 1) {
      result = result.slice(s, l)
      console.log('Sliced', result.slice(s, l))
      setDt(result)
      result.map(e => {
        if (e[0]) x.push(e[0])
        if (e[1]) y.push(e[1])
        if (e[2]) z.push(e[2])
        return e
      })
      xAxis = x
      yAxis = y
      zAxis = z

      xbox = xAxis
      ybox = yAxis
      zbox = zAxis
      xbox.shift()
      ybox.shift()
      zbox.shift()

      xaxisNumeric = !xbox.some(isNaN)

      yaxisNumeric = !ybox.some(isNaN)

      zaxisNumeric = !zbox.some(isNaN)
    }

    if (typeId === 2) {
      exceldata = exceldata.slice(s, l)
      setDt(exceldata)
      exceldata.map(e => {
        if (e[0]) x.push(e[0])
        if (e[1]) y.push(e[1])
        if (e[2]) z.push(e[2])
        return e
      })
      xAxis = x
      yAxis = y
      zAxis = z

      xbox = xAxis
      ybox = yAxis
      zbox = zAxis
      xbox.shift()
      ybox.shift()
      zbox.shift()

      xaxisNumeric = !xbox.some(isNaN)

      yaxisNumeric = !ybox.some(isNaN)

      zaxisNumeric = !zbox.some(isNaN)
    } else if (typeId === 3) {
      console.log('Xmldata', xmldata)
      xmldata = xmldata.slice(s, l)
      setDt(xmldata)
      xmldata.map(e => {
        if (e[0]) x.push(e[0])
        if (e[1]) y.push(e[1])
        if (e[2]) z.push(e[2])
        return e
      })
      xAxis = x
      yAxis = y
      zAxis = z

      xbox = xAxis
      ybox = yAxis
      zbox = zAxis
      xbox.shift()
      ybox.shift()
      zbox.shift()

      xaxisNumeric = !xbox.some(isNaN)

      yaxisNumeric = !ybox.some(isNaN)

      zaxisNumeric = !zbox.some(isNaN)
    } else if (typeId === 6) {
      console.log('pdfdata>', pdfdata)
      pdfdata = pdfdata.slice(s, l)
      setDt(pdfdata)
      pdfdata.map(e => {
        if (e[0]) x.push(e[0])
        if (e[1]) y.push(e[1])
        if (e[2]) z.push(e[2])
        return e
      })
      xAxis = x
      yAxis = y
      zAxis = z

      xbox = xAxis
      ybox = yAxis
      zbox = zAxis
      xbox.shift()
      ybox.shift()
      zbox.shift()

      xaxisNumeric = !xbox.some(isNaN)

      yaxisNumeric = !ybox.some(isNaN)

      zaxisNumeric = !zbox.some(isNaN)
    } else if (activeStep === 4) {
      result = dt.slice(s, l)
      setDt(result)
      result.map(e => {
        if (e[0]) x.push(e[0])
        if (e[1]) y.push(e[1])
        if (e[2]) z.push(e[2])
        return e
      })
      xAxis = x
      yAxis = y
      zAxis = z

      xbox = xAxis
      ybox = yAxis
      zbox = zAxis
      xbox.shift()
      ybox.shift()
      zbox.shift()

      xaxisNumeric = !xbox.some(isNaN)

      yaxisNumeric = !ybox.some(isNaN)

      zaxisNumeric = !zbox.some(isNaN)
    } else if (typeId === 7) {
      parquetdata = parquetdata.slice(s, l)
      setDt(parquetdata)
      parquetdata.map(e => {
        if (e[0]) x.push(e[0])
        if (e[1]) y.push(e[1])
        if (e[2]) z.push(e[2])
        return e
      })
      xAxis = x
      yAxis = y
      zAxis = z

      xbox = xAxis
      ybox = yAxis
      zbox = zAxis
      xbox.shift()
      ybox.shift()
      zbox.shift()

      xaxisNumeric = !xbox.some(isNaN)

      yaxisNumeric = !ybox.some(isNaN)

      zaxisNumeric = !zbox.some(isNaN)
    } else if (typeId === 4) {
      jsondata = jsondata.slice(s, l)
      setDt(jsondata)
      jsondata.map(e => {
        if (e[0]) x.push(e[0])
        if (e[1]) y.push(e[1])
        if (e[2]) z.push(e[2])
        return e
      })
      xAxis = x
      yAxis = y
      zAxis = z

      xbox = xAxis
      ybox = yAxis
      zbox = zAxis
      xbox.shift()
      ybox.shift()
      zbox.shift()

      xaxisNumeric = !xbox.some(isNaN)

      yaxisNumeric = !ybox.some(isNaN)

      zaxisNumeric = !zbox.some(isNaN)
    } else {
      if (typeId === 'ExampleData') result = exampleData2
      result = result.slice(s, l)
      // console.log('Sliced', result.slice(s, l))
      setDt(result)
      result.map(e => {
        if (e[0]) x.push(e[0])
        if (e[1]) y.push(e[1])
        if (e[2]) z.push(e[2])
        return e
      })
      xAxis = x
      yAxis = y
      zAxis = z

      xbox = xAxis
      ybox = yAxis
      zbox = zAxis
      xbox.shift()
      ybox.shift()
      zbox.shift()
      xaxisNumeric = !xbox.some(isNaN)

      yaxisNumeric = !ybox.some(isNaN)

      zaxisNumeric = !zbox.some(isNaN)
    }

    var t2 = []
    result.map(e => {
      var t3 = []
      e.map(e2 => {
        t3.push({ value: e2 })
        return e2
      })
      t2.push(t3)
      return e
    })
    prepareData()
    console.log('....')
    console.log('activestep', activeStep)
    console.log('activestep', myFlowId)
  }

  const handleFilter = event => {
    column = event.target.value
    console.log('selectC-', column)
  }

  const filter = () => {
    var dataContainer =
      global.type_id === (1 || orignalFile === '')
        ? result
        : global.type_id === 2
        ? exceldata
        : global.type_id === 3
        ? xmldata
        : global.type_id === 4
        ? jsondata
        : global.type_id === 6
        ? pdfdata
        : global.type_id === 7
        ? parquetdata
        : global.type_id === 'ExampleData'
        ? exampleData2
        : result
    var done = false
    var result4 = []
    result4.push(dataContainer[(0, 0)])
    //  console.log(result4)
    while (!done) {
      done = true
      for (let i = 2; i < dataContainer.length; i += 1) {
        if (condition == 0) {
          if (dataContainer[i - 1][column] === input) {
            result4.push(result[i - 1])
          }
        }
        if (condition == 1) {
          if (dataContainer[i - 1][column] !== input) {
            result4.push(dataContainer[i - 1])
          }
        }
        if (condition == 2) {
          if (parseInt(dataContainer[i - 1][column]) === parseInt(input)) {
            result4.push(dataContainer[i - 1])
          }
        }
        if (condition == 3) {
          if (parseInt(dataContainer[i - 1][column]) > parseInt(input)) {
            result4.push(dataContainer[i - 1])
          }
        }
        if (condition == 4) {
          if (parseInt(dataContainer[i - 1][column]) >= parseInt(input)) {
            result4.push(dataContainer[i - 1])
          }
        }
        if (condition == 5) {
          if (parseInt(dataContainer[i - 1][column]) < parseInt(input)) {
            result4.push(dataContainer[i - 1])
          }
        }
        if (condition == 6) {
          if (parseInt(dataContainer[i - 1][column]) <= parseInt(input)) {
            result4.push(dataContainer[i - 1])
          }
        }
      }
    }

    console.log('filtered-', result4)
    result = result4
    setDt(result4)
    result.map(e => {
      if (e[0]) x.push(e[0])
      if (e[1]) y.push(e[1])
      if (e[2]) z.push(e[2])
      return e
    })
    xAxis = x
    yAxis = y
    zAxis = z

    xbox = xAxis
    ybox = yAxis
    zbox = zAxis
    xbox.shift()
    ybox.shift()
    zbox.shift()

    xaxisNumeric = !xbox.some(isNaN)

    yaxisNumeric = !ybox.some(isNaN)

    zaxisNumeric = !zbox.some(isNaN)
    prepareData()
    //converted for displaying data
    var temp2 = []
    result4.map(e => {
      var temp3 = []
      e.map(e2 => {
        temp3.push({ value: e2 })
        return e2
      })
      temp2.push(temp3)
      return e
    })
    // console.log('check data---', temp2)
  }

  const handleFilterCondition = event => {
    condition = event.target.value
  }

  const handleGroup = event => {
    // var column = event.target.value
    //var done = false
    const databox =
      global.type_id === (1 || orignalFile === '')
        ? result
        : global.type_id === 2
        ? exceldata
        : global.type_id === 3
        ? xmldata
        : global.type_id === 4
        ? jsondata
        : global.type_id === 6
        ? pdfdata
        : global.type_id === 7
        ? parquetdata
        : global.type_id === 'ExampleData'
        ? exampleData2
        : result

    var newArr = databox.reduce((acc, cur) => {
      const idx = acc.findIndex(arr => arr[0] === cur[0])
      if (idx != -1) acc[idx][1] += cur[column]
      else acc.push([cur[0], cur[column]])

      return acc
    }, [])

    let t9 = newArr[0]
    console.log('t9', t9)
    setColumnsBox(t9)
    columns = t9

    newArr = newArr.slice(1, newArr.length)
    newArr.unshift(t9)
    result = newArr

    setDt(result)
    result.map(e => {
      x.push(e[0])
      y.push(e[1])
      z.push(e[2])
      return e
    })
    xAxis = x
    yAxis = y
    zAxis = z

    xbox = xAxis
    ybox = yAxis
    zbox = zAxis
    xbox.shift()
    ybox.shift()
    zbox.shift()

    xaxisNumeric = !xbox.some(isNaN)

    yaxisNumeric = !ybox.some(isNaN)

    zaxisNumeric = !zbox.some(isNaN)
    // console.log('XYZAxesNumeric-', xaxisNumeric, yaxisNumeric, zaxisNumeric)
  }

  const CustomNodeComponentExampleDataBlock = d1 => {
    return (
      <>
        <Handle
          type='target'
          position='left'
          id='a'
          isValidConnection={connection => connection.source === '1'}
          onConnect={params => console.log('handle onConnect', params)}
          style={{
            left: '-10px',
            top: '50%',
            borderRadius: 0,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            height: '78px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
        {close2 === 1 && (
          <span
            className='remove'
            style={removeStyle}
            onClick={() => {
              setNode2('')
              setDspNo(true)
              setNodeType('special11')
            }}
          >
            x
          </span>
        )}
        <div
          style={{
            background: configData.NODE_COLORS.BODY,
            color: '#FFF',
            height: '78px',
            width: '250px',
            margin: 10
          }}
        >
          <h3 style={{ top: 8, padding: 10, position: 'absolute' }}>
            Example Data Selected
          </h3>
        </div>
        <Handle
          type='source'
          position='right'
          id='a'
          style={{
            right: '-10px',
            top: '50%',
            borderRadius: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: '78px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentSelectDataSourceBlock = d1 => {
    const removeStyle = {
      position: 'absolute',
      top: 20,
      right: 20,
      cursor: 'pointer',
      color: 'white'
    }
    const viewAllDatasource = () => {
      console.log(
        'checkk',
        localStorage.getItem('ConnectionId'),
        localStorage.getItem('account_id')
      )
      axios
        .post(
          configData.API_URL +
            'personalAccount/database/viewall_datasource_names',
          {
            id: parseInt(localStorage.getItem('ConnectionId')),
            account_id: localStorage.getItem('account_id')
          },
          {}
        )
        .then(response => {
          console.log('all datasources api', response.data)

          databases = response.data.data
          //  console.log('daaaaaa', databases[0].id)
          storeDatasourceResult('e', 2)
          return response
        })
        .catch(error => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response)
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log(error.message)
          }
        })
    }

    const storeDatasourceResult = (event, mode) => {
      axios
        .post(
          configData.API_URL +
            'personalAccount/database/viewall_datasource_result',
          mode === 2
            ? {
                datasource_id: databases[0].id.toString()
              }
            : {
                datasource_id: event.target.value.toString()
              },
          {}
        )
        .then(response => {
          // console.log(' datasource result api', response)
          // console.log(
          //   ' datasource result api',
          //   JSON.parse(response.data.data[0].result)
          // )
          console.log('check ConnID', localStorage.getItem('ConnectionId'))
          const tempArray2 = JSON.parse(response.data.data[0].result)
          // let abc = JSON.parse(response.data.data[0].result)
          let abc =
            localStorage.getItem('ConnectionId') === 91
              ? tempArray2.rows
              : tempArray2
          let def3 = [],
            array6 = []
          if (localStorage.getItem('ConnectionId') === 91) {
            // console.log('rowsdata', tempArray2.rows)
            // console.log('MeTA', tempArray2.metaData)

            for (const [value] of Object.entries(tempArray2.metaData)) {
              def3.push(value.name)
            }
            tempArray2.rows.unshift(def3)
            //  console.log('CheckCOLUMNS', def3, tempArray2.rows)
            result = tempArray2.rows
          } else if (localStorage.getItem('ConnectionId') === 104) {
            const array6 = Object.keys(abc[0])
            const array7 = abc.map(obj => Object.values(obj))
            console.log('Columns', array6, array7)
            array7.unshift(array6)
            result = array7
            setColumnsBox(array6)
            //   console.log('DATA..', result)
          } else if (localStorage.getItem('ConnectionId') === 116) {
            const array6 = Object.keys(abc.rows[0])
            const array7 = abc.rows.map(obj => Object.values(obj))
            //  console.log('Columns', array6, array7)
            array7.unshift(array6)
            result = array7
            setColumnsBox(array6)
            //   console.log('DATA..', result)
          } else if (localStorage.getItem('ConnectionId') === 118) {
            //    const array6 = Object.keys(abc.rows[0])
            const array7 = abc.map(obj => Object.values(obj))
            //    console.log('Columns', array6, array7)
            //   array7.unshift(array6)
            result = array7
            //  console.log('DATA..', result)
          } else if (localStorage.getItem('ConnectionId') === 125) {
            const array6 = Object.keys(abc.pages[0])
            const array7 = abc.pages.map(obj => Object.values(obj))
            //   console.log('Columns', array6)
            array7.unshift(array6)
            result = array7
            setColumnsBox(array6)
            // console.log('DATA..', result)
          } else if (localStorage.getItem('ConnectionId') === 129) {
            const array6 = Object.keys(abc.cardTypes[0])
            // console.log('WHATis this',abc)
            const array7 = abc.cardTypes.map(obj => Object.values(obj))
            //  console.log('Columns', array6)
            array7.unshift(array6)
            result = array7
            setColumnsBox(array6)
            // console.log('DATA..', result)
          } else if (localStorage.getItem('ConnectionId') == 267) {
            const array6 = Object.keys(abc.rows[0])
            const array7 = abc.rows.map(obj => Object.values(obj))
            console.log('Columns%%%', array6, array7)
            array7.unshift(array6)
            result = array7
            setColumnsBox(array6)
            //   console.log('DATA..', result)
          } else {
            console.log('Using Dataset', abc)
            const array6 = Object.keys(abc[0])
            const array7 = abc.map(obj => Object.values(obj))
            //   console.log('Columns', array6, array7)
            array7.unshift(array6)
            result = array7
            columns = array6
            columns2 = array6
            setColumnsBox(array6)
            console.log('DATA.C.', columns)
          }

          if (localStorage.getItem('ConnectionId') === 91) {
            array6 = def3
            // else array6 = Object.keys(abc[0])
            // columns2 = array6[0]

            const C1 = array6
          }

          return response
        })
        .catch(error => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response)
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log(error.message)
          }
        })
    }

    useEffect(() => {
      flag = 0
      viewAllDatasource()
    }, [])

    useEffect(() => {
      console.log('columns>>', columns2)
    }, [columns2])

    return (
      <>
        <Handle
          type='target'
          position='left'
          id='a'
          isValidConnection={connection => connection.source === '1'}
          onConnect={params => console.log('handle onConnect', params)}
          style={{
            left: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            height: '200px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
        {close1 === 1 && (
          <span
            className='remove'
            style={removeStyle}
            onClick={() => {
              setNode2('')
              setDspNo(true)
              setNodeType('special3')
            }}
          >
            x
          </span>
        )}
        <div
          style={{
            background: configData.NODE_COLORS.BODY,
            color: '#FFF',
            height: '200px',
            width: '240px',
            margin: 10
          }}
        >
          <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
            - Select DataSet
          </h3>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              flexDirection: 'column'
            }}
          >
            <div style={{ alignSelf: 'center', marginLeft: 10 }}>DataSets</div>
            <div style={{ alignSelf: 'center' }}>
              <select
                onChange={e => storeDatasourceResult(e, 1)}
                style={{
                  marginTop: 10,
                  background: 'transparent',
                  border: '1px solid #FFF',
                  width: 150,
                  marginLeft: 10
                }}
              >
                <option style={{ fontSize: 14 }} value={-1}>
                  {'Select Dataset'}
                </option>
                {databases &&
                  databases.map(ele => (
                    <option style={{ fontSize: 14 }} value={ele.id}>
                      {ele.name}
                    </option>
                  ))}
              </select>
              {databases.length === 0 && (
                <div style={{ marginTop: 8, fontSize: 12 }}>
                  No datasets or please select a datasource from Import Dataset
                </div>
              )}
            </div>
          </div>
        </div>
        <Handle
          type='source'
          position='right'
          id='a'
          style={{
            right: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: '200px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentInputFile = () => {
    return (
      <CustomNodeInputFile
        setNodeDsp={() => setNodeDsp1('special')}
        close={close1}
        file={activeStep === 4 ? orignalFile.name : ''}
        onFileLoad={handleOnFileLoad}
        onError={handleOnError}
        onRemoveFile={handleOnRemoveFile}
      />
    )
  }

  const CustomNodeComponentPaste = d1 => {
    return (
      <CustomNodePaste
        selCpChange={selCpChange}
        cpTextFunc={cpTextFunc}
        setNodeDsp={() => setNodeDsp1('special2')}
        close={close1}
      />
    )
  }

  const CustomNodeComponentHttpReq = d1 => {
    return <CustomNodeHttpReq />
  }

  const CustomNodeComponentFilterBlock = d1 => {
    return (
      // <CustomNodeFilterBlock />
      <>
        <Handle
          type='target'
          position='left'
          id='a'
          isValidConnection={connection => connection.source === '1'}
          onConnect={params => console.log('handle onConnect', params)}
          style={{
            left: '-10px',
            top: '75%',
            borderRadius: 0,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            height: '20px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
        {close2 === 1 && (
          <span
            style={removeStyle}
            onClick={() => {
              console.log('PRESSED')
              setNode2('')
              setDspNo(true)
              setNodeType('special5')
            }}
          >
            x
          </span>
        )}
        <div
          style={{
            background: configData.NODE_COLORS.BODY,
            color: '#FFF',
            height: '260px',
            width: '220px',
            margin: 10
          }}
        >
          <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
            {activeStep === 2 ? 'Filter Block' : 'Filter Block'}
          </h3>
          <p style={{ marginLeft: 10, marginBottom: 0 }}>Column Name</p>
          <select
            onChange={handleFilter}
            style={{
              marginTop: -12,
              background: 'transparent',
              border: '1px solid #FFF',
              width: 100,
              marginLeft: 4
            }}
          >
            {columns &&
              columns.map((value, index) => {
                return (
                  <option style={{ fontSize: 14 }} key={index} value={index}>
                    {activeStep === 4 ? value : value}
                  </option>
                )
              })}
          </select>

          <p style={{ marginLeft: 10, marginBottom: 0, marginTop: 8 }}>
            Condition
          </p>
          <select
            onChange={handleFilterCondition}
            style={{
              marginTop: -4,
              background: 'transparent',
              border: '1px solid #FFF',
              width: 100,
              marginLeft: 4
            }}
          >
            <option style={{ fontSize: 14 }} value={0}>
              {'text is exactly'}
            </option>
            <option style={{ fontSize: 14 }} value={1}>
              {'text is not exactly'}
            </option>
            <option style={{ fontSize: 14 }} value={2}>
              {'number equals'}
            </option>
            <option style={{ fontSize: 14 }} value={3}>
              {'number is greater than'}
            </option>
            <option style={{ fontSize: 14 }} value={4}>
              {'number is greater than or equals'}
            </option>
            <option style={{ fontSize: 14 }} value={5}>
              {'number is lesser than'}
            </option>
            <option style={{ fontSize: 14 }} value={6}>
              {'number is lesser than or equals'}
            </option>
          </select>

          <input
            style={{ marginLeft: 10, marginBottom: 2, marginTop: 10 }}
            type={'text'}
            defaultValue={null}
            onChange={e => (input = e.target.value)}
          />
          <div>
            <button
              style={{ background: '#CCC', marginTop: '4px', padding: '6px' }}
              onClick={filter}
            >
              Filter
            </button>
          </div>
        </div>
        <Handle
          type='source'
          position='right'
          id='a'
          style={{
            right: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: '260px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentGroupBlock = d1 => {
    return (
      <>
        <Handle
          type='target'
          position='left'
          id='a'
          isValidConnection={connection => connection.source === '1'}
          onConnect={params => console.log('handle onConnect', params)}
          style={{
            left: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            height: '180px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
        {close2 == 1 && (
          <span
            className='remove'
            style={removeStyle}
            onClick={() => setNodeDsp2('special7')}
          >
            x
          </span>
        )}
        <div
          style={{
            background: configData.NODE_COLORS.BODY,
            color: '#FFF',
            height: '180px',
            width: '220px',
            margin: 10
          }}
        >
          <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
            Group Block
          </h3>
          <p style={{ marginLeft: 10, marginBottom: 2 }}>Column Name</p>

          <select
            onChange={event => (column = event.target.value)}
            style={{
              marginTop: -12,
              background: 'transparent',
              border: '1px solid #FFF',
              width: 100,
              marginLeft: 4
            }}
          >
            {columns &&
              columns.map((value, index) => {
                return (
                  <option style={{ fontSize: 14 }} key={index} value={index}>
                    {activeStep === 4 ? value : value}
                  </option>
                )
              })}
          </select>

          <div>
            <button
              style={{ background: '#CCC', marginTop: '4px', padding: '6px' }}
              onClick={handleGroup}
            >
              Group
            </button>
          </div>
        </div>
        <Handle
          type='source'
          position='right'
          id='a'
          style={{
            right: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: '180px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentMergeBlock = d1 => {
    return (
      <CustomNodeMergeBlock
        close={close2}
        setNodeDsp={() => setNodeDsp2('special6')}
      />
    )
  }

  const CustomNodeComponentMergeBlock2 = d1 => {
    const handleMerge = () => {
      //   console.log('datasets?', dataset1, dataset2)
      // let merged = Array.from(new Set(dataset1.concat(dataset2)))
      //       var f1,f2
      // dataset1.map((e1,i)=> {

      //     dataset2.map((e2,j) => {
      //  console.log('F1',i,j)
      // //     f1.map((e3)=> {
      // // e2.push(e3)
      // //     })
      //     })
      // })

      var tdataset2 = dataset2
      for (var p = 0; p < dataset1.length; p++) {
        dataset1[p].map(e => {
          tdataset2[p].push(e)
        })
      }
      //console.log('seee?',tdataset2)

      result = tdataset2

      setDt(result)
      result.map(e => {
        if (e[0]) x.push(e[0])
        if (e[1]) y.push(e[1])
        if (e[2]) z.push(e[2])
        return e
      })
      xAxis = x
      yAxis = y
      zAxis = z

      xbox = xAxis
      ybox = yAxis
      zbox = zAxis
      xbox.shift()
      ybox.shift()
      zbox.shift()
      xaxisNumeric = !xbox.some(isNaN)

      yaxisNumeric = !ybox.some(isNaN)

      zaxisNumeric = !zbox.some(isNaN)

      prepareData()
    }
    const removeStyle = {
      position: 'absolute',
      top: 20,
      right: 20,
      cursor: 'pointer',
      color: 'white'
    }
    const viewAllDatasource = () => {
      console.log(
        'checkk',
        localStorage.getItem('ConnectionId'),
        localStorage.getItem('account_id')
      )
      axios
        .post(
          configData.API_URL +
            'personalAccount/database/viewall_datasource_names',
          {
            id: parseInt(localStorage.getItem('ConnectionId')),
            account_id: localStorage.getItem('account_id')
          },
          {}
        )
        .then(response => {
          console.log('all datasources api', response.data)

          databases = response.data.data
          //  console.log('daaaaaa', databases[0].id)
          storeDatasourceResult('e', 2)
          return response
        })
        .catch(error => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response)
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log(error.message)
          }
        })
    }

    const storeDatasourceResult = (event, mode, dataset) => {
      axios
        .post(
          configData.API_URL +
            'personalAccount/database/viewall_datasource_result',
          mode === 2
            ? {
                datasource_id: databases[0].id.toString()
              }
            : {
                datasource_id: event.target.value.toString()
              },
          {}
        )
        .then(response => {
          // console.log(' datasource result api', response)
          // console.log(
          //   ' datasource result api',
          //   JSON.parse(response.data.data[0].result)
          // )
          console.log('check ConnID', localStorage.getItem('ConnectionId'))
          const tempArray2 = JSON.parse(response.data.data[0].result)
          // let abc = JSON.parse(response.data.data[0].result)
          let abc =
            localStorage.getItem('ConnectionId') === 91
              ? tempArray2.rows
              : tempArray2
          let def3 = [],
            array6 = []
          if (localStorage.getItem('ConnectionId') === 91) {
            // console.log('rowsdata', tempArray2.rows)
            // console.log('MeTA', tempArray2.metaData)

            for (const [value] of Object.entries(tempArray2.metaData)) {
              def3.push(value.name)
            }
            tempArray2.rows.unshift(def3)
            //  console.log('CheckCOLUMNS', def3, tempArray2.rows)
            result = tempArray2.rows
          } else if (localStorage.getItem('ConnectionId') === 104) {
            const array6 = Object.keys(abc[0])
            const array7 = abc.map(obj => Object.values(obj))
            console.log('Columns', array6, array7)
            array7.unshift(array6)
            result = array7
            setColumnsBox(array6)
            //   console.log('DATA..', result)
          } else if (localStorage.getItem('ConnectionId') === 116) {
            const array6 = Object.keys(abc.rows[0])
            const array7 = abc.rows.map(obj => Object.values(obj))
            //  console.log('Columns', array6, array7)
            array7.unshift(array6)
            result = array7
            setColumnsBox(array6)
            //   console.log('DATA..', result)
          } else if (localStorage.getItem('ConnectionId') === 118) {
            //    const array6 = Object.keys(abc.rows[0])
            const array7 = abc.map(obj => Object.values(obj))
            //    console.log('Columns', array6, array7)
            //   array7.unshift(array6)
            result = array7
            //  console.log('DATA..', result)
          } else if (localStorage.getItem('ConnectionId') === 125) {
            const array6 = Object.keys(abc.pages[0])
            const array7 = abc.pages.map(obj => Object.values(obj))
            //   console.log('Columns', array6)
            array7.unshift(array6)
            result = array7
            setColumnsBox(array6)
            // console.log('DATA..', result)
          } else if (localStorage.getItem('ConnectionId') === 129) {
            const array6 = Object.keys(abc.cardTypes[0])
            // console.log('WHATis this',abc)
            const array7 = abc.cardTypes.map(obj => Object.values(obj))
            //  console.log('Columns', array6)
            array7.unshift(array6)
            result = array7
            setColumnsBox(array6)
            // console.log('DATA..', result)
          } else if (localStorage.getItem('ConnectionId') == 267) {
            const array6 = Object.keys(abc.rows[0])
            const array7 = abc.rows.map(obj => Object.values(obj))
            console.log('Columns%%%', array6, array7)
            array7.unshift(array6)
            result = array7
            setColumnsBox(array6)
            //   console.log('DATA..', result)
          } else {
            console.log('Using Dataset', dataset)
            const array6 = Object.keys(abc[0])
            const array7 = abc.map(obj => Object.values(obj))
            //   console.log('Columns', array6, array7)
            array7.unshift(array6)
            result = array7
            columns = array6
            columns2 = array6
            setColumnsBox(array6)
            if (dataset === 1) {
              dataset1 = result
            }

            if (dataset === 2) {
              dataset2 = result
            }
            console.log('DATA.C.', columns)
          }

          if (localStorage.getItem('ConnectionId') === 91) {
            array6 = def3
            // else array6 = Object.keys(abc[0])
            // columns2 = array6[0]

            const C1 = array6
          }

          return response
        })
        .catch(error => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response)
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log(error.message)
          }
        })
    }

    useEffect(() => {
      flag = 0
      viewAllDatasource()
    }, [])

    useEffect(() => {
      console.log('columns>>', columns2)
    }, [columns2])

    return (
      <>
        <Handle
          type='target'
          position='left'
          id='a'
          isValidConnection={connection => connection.source === '1'}
          onConnect={params => console.log('handle onConnect', params)}
          style={{
            left: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            height: '280px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
        {close2 === 1 && (
          <span
            className='remove'
            style={removeStyle}
            onClick={() => {
              setNode2('')
              setDspNo(true)
              setNodeType('special6')
            }}
          >
            x
          </span>
        )}
        <div
          style={{
            background: configData.NODE_COLORS.BODY,
            color: '#FFF',
            height: '280px',
            width: '240px',
            margin: 10
          }}
        >
          <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
            - Merge
          </h3>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              flexDirection: 'column'
            }}
          >
            <div style={{ alignSelf: 'center', marginLeft: 10 }}>
              Select DataSet 1
            </div>
            <div style={{ alignSelf: 'center' }}>
              <select
                onChange={e => storeDatasourceResult(e, 1, 1)}
                style={{
                  marginTop: 10,
                  background: 'transparent',
                  border: '1px solid #FFF',
                  width: 150,
                  marginLeft: 10
                }}
              >
                {databases &&
                  databases.map(ele => (
                    <option style={{ fontSize: 14 }} value={ele.id}>
                      {ele.name}
                    </option>
                  ))}
              </select>
              {databases.length === 0 && (
                <div style={{ marginTop: 8, fontSize: 12 }}>
                  No datasets or please select a datasource from Import Dataset
                </div>
              )}
            </div>
          </div>

          <div style={{ alignSelf: 'center', marginLeft: 10 }}>
            Select DataSet 2
          </div>
          <div style={{ alignSelf: 'center' }}>
            <select
              onChange={e => storeDatasourceResult(e, 1, 2)}
              style={{
                marginTop: 10,
                background: 'transparent',
                border: '1px solid #FFF',
                width: 150,
                marginLeft: 10
              }}
            >
              {databases &&
                databases.map(ele => (
                  <option style={{ fontSize: 14 }} value={ele.id}>
                    {ele.name}
                  </option>
                ))}
            </select>
            {databases.length === 0 && (
              <div style={{ marginTop: 8, fontSize: 12 }}>
                No datasets or please select a datasource from Import Dataset
              </div>
            )}
          </div>
          <div>
            <button
              style={{ background: '#CCC', marginTop: '5px', padding: '6px' }}
              onClick={handleMerge}
            >
              Merge
            </button>
          </div>
        </div>

        <Handle
          type='source'
          position='right'
          id='a'
          style={{
            right: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: '280px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentSliceBlock = d1 => {
    // return (
    //     <CustomNodeSliceBlock />
    // );
    return (
      <>
        <Handle
          type='target'
          position='left'
          id='a'
          isValidConnection={connection => connection.source === '1'}
          onConnect={params => console.log('handle onConnect', params)}
          style={{
            left: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            height: '180px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
        {close2 === 1 && (
          <span
            style={removeStyle}
            onClick={() => {
              console.log('PRESSED')
              setNode2('')
              setDspNo(true)
              setNodeType('special8')
            }}
          >
            x
          </span>
        )}
        <div
          style={{
            background: configData.NODE_COLORS.BODY,
            color: '#FFF',
            height: '180px',
            width: '220px',
            margin: 10
          }}
        >
          <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>Slice</h3>
          {result || dt ? null : (
            <p style={{ marginLeft: 10, marginBottom: 0 }}>
              {'<- Connect to dataset'}
            </p>
          )}
          <input
            style={{ marginLeft: 10, marginBottom: 2 }}
            type={'text'}
            defaultValue={startIndex}
            onChange={e => {
              s = e.target.value
              setstartIndex(e.target.value)
            }}
          />
          <input
            style={{ marginLeft: 10, marginBottom: 0 }}
            type={'text'}
            defaultValue={lastIndex}
            onChange={e => {
              l = e.target.value
              setlastIndex(e.target.value)
            }}
          />
          <div>
            <button
              style={{ background: '#CCC', marginTop: '4px', padding: '6px' }}
              onClick={handleSlice}
            >
              Slice
            </button>
          </div>
        </div>
        <Handle
          type='source'
          position='right'
          id='a'
          style={{
            right: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: '180px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentDuplicateBlock = d1 => {
    // console.log('In Duplicate', result)
    const [dupCheck, setDupCheck] = useState(0)
    const handleDuplicate = event => {
      console.log('I am in dup check 9293u49589308401048201940299019401400200')
      //   console.log('I am in dup ', exceldata) //before on result variable duplicate performed, changed to datasetData
      // console.log('CHECK0', d1)
      // console.log(result)
      // console.log(dt)

      var duplicateIndex = _.findIndex(
        global.type_id === 1 || orignalFile === ''
          ? result
          : global.type_id === 2
          ? exceldata
          : global.type_id === 3
          ? xmldata
          : global.type_id === 4
          ? jsondata
          : global.type_id === 6
          ? pdfdata
          : global.type_id === 7
          ? parquetdata
          : result,
        function (value, index, collection) {
          var equal = _.isEqual.bind(undefined, value)
          return _.findIndex(collection.slice(0, index), equal) !== -1
        }
      )
      if (global.type_id === 1) {
        if (duplicateIndex != -1) result.splice(duplicateIndex, 1)
        setDt(result)
        console.log('CSV Data', result)
        result.map(e => {
          x.push(e[0])
          y.push(e[1])
          z.push(e[2])
          return e
        })
        xAxis = x
        yAxis = y
        zAxis = z

        xbox = xAxis
        ybox = yAxis
        zbox = zAxis
        xbox.shift()
        ybox.shift()
        zbox.shift()

        xaxisNumeric = !xbox.some(isNaN)

        yaxisNumeric = !ybox.some(isNaN)

        zaxisNumeric = !zbox.some(isNaN)
        console.log('XYZAxesNumeric-', xaxisNumeric, yaxisNumeric, zaxisNumeric)

        // if (IsNumericString == false) setIsNumeric(false)
        // else if (IsNumericString == true) setIsNumeric(true)
      } else if (global.type_id === 2) {
        if (duplicateIndex != -1) exceldata.splice(duplicateIndex, 1)

        let array = exceldata.map(obj => Object.values(obj))
        exceldata = array
        console.log('CHECK1', exceldata)
        setDt(exceldata)
        exceldata.map(e => {
          // console.log('EE', e[0], e[1])
          x.push(e[0])
          y.push(e[1])
          z.push(e[2])
          return e
        })
        xAxis = x
        yAxis = y
        zAxis = z

        xbox = xAxis
        ybox = yAxis
        zbox = zAxis
        xbox.shift()
        ybox.shift()
        zbox.shift()
        xaxisNumeric = !xbox.some(isNaN)

        yaxisNumeric = !ybox.some(isNaN)

        zaxisNumeric = !zbox.some(isNaN)
        console.log('XYZAxesNumeric-', xaxisNumeric, yaxisNumeric, zaxisNumeric)
      } else if (global.type_id === 3) {
        if (duplicateIndex != -1) xmldata.splice(duplicateIndex, 1)
        console.log('CHECK0', xmldata)
        let array = xmldata.map(obj => Object.values(obj))
        xmldata = array
        console.log('CHECK1', xmldata)
        setDt(xmldata)
        xmldata.map(e => {
          x.push(e[0])
          y.push(e[1])
          z.push(e[2])
          return e
        })
        xAxis = x
        yAxis = y
        zAxis = z

        xbox = xAxis
        ybox = yAxis
        zbox = zAxis
        xbox.shift()
        ybox.shift()
        zbox.shift()
        xaxisNumeric = !xbox.some(isNaN)

        yaxisNumeric = !ybox.some(isNaN)

        zaxisNumeric = !zbox.some(isNaN)
        console.log('XYZAxesNumeric-', xaxisNumeric, yaxisNumeric, zaxisNumeric)
        console.log('CHECK1', xAxis, yAxis)
      } else if (typeId === 6) {
        //console.log('beforeDuplicate', pdfdata)
        if (duplicateIndex != -1) pdfdata.splice(duplicateIndex, 1)
        let array = pdfdata.map(obj => Object.values(obj))
        pdfdata = array
        //    console.log('CHECK1', pdfdata)
        setDt(pdfdata)
        pdfdata.map(e => {
          console.log('Echeck', e[0], e)
          x.push(e[0])
          y.push(e[1])
          z.push(e[2])
          return e
        })
        xAxis = x
        yAxis = y
        zAxis = z

        xbox = xAxis
        ybox = yAxis
        zbox = zAxis
        xbox.shift()
        ybox.shift()
        zbox.shift()
        xaxisNumeric = !xbox.some(isNaN)

        yaxisNumeric = !ybox.some(isNaN)

        zaxisNumeric = !zbox.some(isNaN)
        console.log('XYZAxesNumeric-', xaxisNumeric, yaxisNumeric, zaxisNumeric)
        console.log('CHECK1', xAxis, yAxis)
      } else if (global.type_id === 7) {
        if (duplicateIndex != -1) parquetdata.splice(duplicateIndex, 1)
        setDt(parquetdata)
        parquetdata.map(e => {
          x.push(e[0])
          y.push(e[1])
          z.push(e[2])
          return e
        })
        xAxis = x
        yAxis = y
        zAxis = z

        xbox = xAxis
        ybox = yAxis
        zbox = zAxis
        xbox.shift()
        ybox.shift()
        zbox.shift()
        xaxisNumeric = !xbox.some(isNaN)

        yaxisNumeric = !ybox.some(isNaN)

        zaxisNumeric = !zbox.some(isNaN)
        console.log('XYZAxesNumeric-', xaxisNumeric, yaxisNumeric, zaxisNumeric)
      } else if (global.type_id === 4) {
        console.log('beforeDup', jsondata)
        if (duplicateIndex != -1) jsondata.splice(duplicateIndex, 1)
        setDt(jsondata)
        jsondata.map(e => {
          x.push(e[0])
          y.push(e[1])
          z.push(e[2])
          return e
        })
        xAxis = x
        yAxis = y
        zAxis = z

        xbox = xAxis
        ybox = yAxis
        zbox = zAxis
        xbox.shift()
        ybox.shift()
        zbox.shift()
        xaxisNumeric = !xbox.some(isNaN)

        yaxisNumeric = !ybox.some(isNaN)

        zaxisNumeric = !zbox.some(isNaN)
        console.log('XYZAxesNumeric-', xaxisNumeric, yaxisNumeric, zaxisNumeric)
      } else {
        if (global.type_id === 'ExampleData') result = exampleData2

        console.log(
          'checking?',
          global.type_id === 'ExampleData',
          global.type_id
        )
        if (duplicateIndex != -1) result.splice(duplicateIndex, 1)
        setDt(result)
        result.map(e => {
          x.push(e[0])
          y.push(e[1])
          z.push(e[2])
          return e
        })
        xAxis = x
        yAxis = y
        zAxis = z

        xbox = xAxis
        ybox = yAxis
        zbox = zAxis
        xbox.shift()
        ybox.shift()
        zbox.shift()

        xaxisNumeric = !xbox.some(isNaN)

        yaxisNumeric = !ybox.some(isNaN)

        zaxisNumeric = !zbox.some(isNaN)
        console.log('XYZAxesNumeric-', xaxisNumeric, yaxisNumeric, zaxisNumeric)
      }
      prepareData()

      setDupCheck(duplicateIndex)
    }
    return (
      <>
        <Handle
          type='target'
          position='left'
          id='a'
          isValidConnection={connection => connection.source === '1'}
          onConnect={params => console.log('handle onConnect', params)}
          style={{
            left: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            height: '180px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
        <div
          style={{
            background: configData.NODE_COLORS.BODY,
            //'#5e6e8f'
            color: '#FFF',
            height: '180px',
            width: '220px',
            margin: 10
          }}
        >
          {close2 === 1 && (
            <span
              className='remove'
              style={removeStyle}
              onClick={() => {
                console.log('PRESSED')
                setNode2('')
                setDspNo(true)
                setNodeType('special382')
              }}
            >
              x
            </span>
          )}
          <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
            Duplicate Check
          </h3>
          {result || dt ? null : (
            <p style={{ marginLeft: 10, marginBottom: 0 }}>
              {'<- Connect to dataset'}
            </p>
          )}
          <div>
            <button
              style={{ background: '#CCC', marginTop: '4px', padding: '6px' }}
              onClick={handleDuplicate}
            >
              Duplicate Check
            </button>
          </div>

          {dupCheck !== 0 && dupCheck !== -1 ? (
            <p style={{ marginLeft: 10, marginBottom: 0 }}>
              {'Duplicate found at row number - ' +
                (dupCheck + 1) +
                '\n and removed'}
            </p>
          ) : (
            dupCheck === -1 && (
              <p style={{ marginLeft: 10, marginBottom: 0 }}>
                {'No Duplicates found'}
              </p>
            )
          )}
        </div>
        <Handle
          type='source'
          position='right'
          id='a'
          style={{
            right: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: '180px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentFuzzySearchBlock = d1 => {
    // var countFuzzy = 0 ;
    const [fuzzyCount, setFuzzyCount] = useState(0)
    // const [fuzzyInput2, setFuzzyInput2] = useState()

    const handleFuzzySearch = event => {
      console.log('I am in Fuzzy Search 177283892918180', typeId)
      console.log(fuzzyInput)
      result =
        typeId === (1 || orignalFile === '')
          ? result
          : typeId === 2
          ? exceldata
          : typeId === 3
          ? xmldata
          : typeId === 4
          ? jsondata
          : typeId === 6
          ? pdfdata
          : typeId === 7
          ? parquetdata
          : typeId === 'ExampleData'
          ? exampleData2
          : result
      result.shift()
      const searcher = new FuzzySearch(result, [], {
        caseSensitive: false
      })
      const res = searcher.search(fuzzyInput)
      setFuzzyCount(res.length)
      result = res
      //  console.log(res)
      result.unshift(columns)
      setDt(result)
      result.map(e => {
        x.push(e[0])
        y.push(e[1])
        z.push(e[2])
        return e
      })
      xAxis = x
      yAxis = y
      zAxis = z

      xbox = xAxis
      ybox = yAxis
      zbox = zAxis
      xbox.shift()
      ybox.shift()
      zbox.shift()
      xaxisNumeric = !xbox.some(isNaN)

      yaxisNumeric = !ybox.some(isNaN)

      zaxisNumeric = !zbox.some(isNaN)
      prepareData()
    }

    return (
      <>
        <Handle
          type='target'
          position='left'
          id='a'
          isValidConnection={connection => connection.source === '1'}
          onConnect={params => console.log('handle onConnect', params)}
          style={{
            left: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            height: '180px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
        {close2 === 1 && (
          <span
            style={removeStyle}
            onClick={() => {
              console.log('PRESSED')
              setNode2('')
              setDspNo(true)
              setNodeType('special383')
            }}
          >
            x
          </span>
        )}
        <div
          style={{
            background: configData.NODE_COLORS.BODY,
            color: '#FFF',
            height: '180px',
            width: '220px',
            margin: 10
          }}
        >
          <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
            Fuzzy Search Check
          </h3>

          <>
            <input
              defaultValue={fuzzyInput2}
              onChange={e => {
                console.log(e.target.value)
                fuzzyInput = e.target.value
                setFuzzyInput2(e.target.value)
              }}
            ></input>
            <div>
              <button
                style={{
                  background: '#CCC',
                  marginTop: '4px',
                  padding: '6px'
                }}
                onClick={handleFuzzySearch}
              >
                Fuzzy Search
              </button>
            </div>
          </>

          {fuzzyCount === 0 ? null : <p>{fuzzyCount + ' Rows found'}</p>}
        </div>
        <Handle
          type='source'
          position='right'
          id='a'
          style={{
            right: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: '180px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentStandardizationBlock = d1 => {
    const [fuzzyCount, setFuzzyCount] = useState(0)

    const handleStandardization = () => {
      result =
        typeId === (1 || orignalFile === '')
          ? result
          : typeId === 2
          ? exceldata
          : typeId === 3
          ? xmldata
          : typeId === 4
          ? jsondata
          : typeId === 6
          ? pdfdata
          : typeId === 7
          ? parquetdata
          : typeId === 'ExampleData'
          ? exampleData2
          : result

      result.shift()
      const searcher = new FuzzySearch(result, [], {
        caseSensitive: false
      })
      const res = searcher.search(fuzzyInput)
      setFuzzyCount(res.length)
      result = res
      result.unshift(columns)
      //  console.log(res)
      setDt(result)
      result.map(e => {
        x.push(e[0])
        y.push(e[1])
        z.push(e[2])
        return e
      })
      xAxis = x
      yAxis = y
      zAxis = z

      xbox = xAxis
      ybox = yAxis
      zbox = zAxis
      xbox.shift()
      ybox.shift()
      zbox.shift()
      xaxisNumeric = !xbox.some(isNaN)

      yaxisNumeric = !ybox.some(isNaN)

      zaxisNumeric = !zbox.some(isNaN)
      prepareData()
    }

    return (
      <>
        <Handle
          type='target'
          position='left'
          id='a'
          isValidConnection={connection => connection.source === '1'}
          onConnect={params => console.log('handle onConnect', params)}
          style={{
            left: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            height: '230px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
        {close2 === 1 && (
          <span
            style={removeStyle}
            onClick={() => {
              console.log('PRESSED')
              setNode2('')
              setDspNo(true)
              setNodeType('special384')
            }}
          >
            x
          </span>
        )}
        <div
          style={{
            background: configData.NODE_COLORS.BODY,
            color: '#FFF',
            height: '230px',
            width: '220px',
            margin: 10
          }}
        >
          <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
            Standardization
          </h3>
          {result || dt ? (
            <div>
              <p>Create a Regex Below to search in dataset</p>
              <input
                style={{ marginTop: -3 }}
                defaultValue={fuzzyInput2}
                onChange={e => {
                  console.log(e.target.value)
                  fuzzyInput = e.target.value
                  setFuzzyInput2(e.target.value)
                }}
              ></input>
              <button
                style={{ background: '#CCC', marginTop: '5px', padding: '6px' }}
                onClick={handleStandardization}
              >
                Standardization
              </button>

              {fuzzyCount === 0 ? null : (
                <p style={{ marginTop: 3 }}>{fuzzyCount + ' Rows found'}</p>
              )}
            </div>
          ) : (
            <p style={{ marginLeft: 10, marginBottom: 0 }}>
              {'< -  Connect to DataSet First'}
            </p>
          )}
        </div>
        <Handle
          type='source'
          position='right'
          id='a'
          style={{
            right: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: '230px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentReplaceNullBlock = d1 => {
    const [replaceInput, setReplaceInput] = useState('')
    const handleReplaceNull = event => {
      // console.log(result)
      var p =
        typeId === (1 || orignalFile === '')
          ? result
          : typeId === 2
          ? exceldata
          : typeId === 3
          ? xmldata
          : typeId === 4
          ? jsondata
          : typeId === 6
          ? pdfdata
          : typeId === 7
          ? parquetdata
          : typeId === 'ExampleData'
          ? exampleData2
          : result

      var t2 = []
      p.map(e => {
        var t3 = []
        e.map(e2 => {
          if (
            e2 === 'NULL' ||
            e2 === '' ||
            e2 === ' ' ||
            e2 === 'Null' ||
            e2 === undefined ||
            e2 === null
          ) {
            t3.push(replaceInput)
          } else {
            t3.push(e2)
          }
          return e2
        })
        t2.push(t3)
        return e
      })
      console.log(t2)
      console.log('....................')
      setDt(t2)
      result = t2
      result.map(e => {
        x.push(e[0])
        y.push(e[1])
        z.push(e[2])
        return e
      })
      xAxis = x
      yAxis = y
      zAxis = z

      xbox = xAxis
      ybox = yAxis
      zbox = zAxis
      xbox.shift()
      ybox.shift()
      zbox.shift()
      xaxisNumeric = !xbox.some(isNaN)

      yaxisNumeric = !ybox.some(isNaN)

      zaxisNumeric = !zbox.some(isNaN)
      prepareData()
    }

    return (
      <>
        <Handle
          type='target'
          position='left'
          id='a'
          isValidConnection={connection => connection.source === '1'}
          onConnect={params => console.log('handle onConnect', params)}
          style={{
            left: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            height: '230px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
        {close2 === 1 && (
          <span
            style={removeStyle}
            onClick={() => {
              console.log('PRESSED')
              setNode2('')
              setDspNo(true)
              setNodeType('special385')
            }}
          >
            x
          </span>
        )}
        <div
          style={{
            background: configData.NODE_COLORS.BODY,
            color: '#FFF',
            height: '230px',
            width: '220px',
            margin: 10
          }}
        >
          <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
            Replace Null
          </h3>
          {result || dt ? (
            <div>
              <p>What do you want to replace with null values found ?</p>
              <input
                style={{ marginLeft: 10, marginBottom: 0 }}
                onChange={e => setReplaceInput(e.target.value)}
              ></input>
              <button
                style={{ background: '#CCC', marginTop: '4px', padding: '6px' }}
                onClick={handleReplaceNull}
              >
                Replace Null Values
              </button>
            </div>
          ) : (
            <p style={{ marginLeft: 10, marginBottom: 0 }}>
              {' '}
              {'< -  Connect to DataSet First'}
            </p>
          )}
        </div>
        <Handle
          type='source'
          position='right'
          id='a'
          style={{
            right: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: '230px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentInCompleteBlock = d1 => {
    const [inComplete, setInComplete] = useState(false)
    const [checkedColumn, setCheckedColumn] = useState(false)

    useEffect(() => {
      console.log('inComplete>>', inComplete)
    }, [inComplete])

    const checkIncomplete = event => {
      setInComplete(false)
      setCheckedColumn(false)
      scolumn = event.target.value
    }

    const handleCheckIncomplete = mode => {
      var databox2
      setCheckedColumn(true)
      if (typeId === 1) {
        databox2 = result
        console.log('DATA$?', result)
        setDt(result)
        databox2 = databox2.slice(s, l)
        // console.log('Sliced', result.slice(s, l))

        result.map(e => {
          console.log('eee?', scolumn, e[scolumn])
          if (
            e[scolumn] === '' ||
            e[scolumn] === null ||
            e[scolumn] === ' ' ||
            e[scolumn] === undefined
          )
            setInComplete(true)
        })

        result.map(e => {
          //  console.log('EE?', e)
          if (e[0]) x.push(e[0])
          if (e[1]) y.push(e[1])
          if (e[2]) z.push(e[2])
          return e
        })
        //  console.log('checl xaxis', xAxis)

        xAxis = x
        yAxis = y
        zAxis = z
        xbox = xAxis
        ybox = yAxis
        zbox = zAxis
        xbox.shift()
        ybox.shift()
        zbox.shift()

        xaxisNumeric = !xbox.some(isNaN)

        yaxisNumeric = !ybox.some(isNaN)

        zaxisNumeric = !zbox.some(isNaN)
      }

      if (typeId === 2) {
        result = exceldata
        databox2 = exceldata
        setDt(exceldata)

        exceldata.map(e => {
          // console.log('eee?', e[scolumn] === '', e[scolumn])
          if (
            e[scolumn] === '' ||
            e[scolumn] === null ||
            e[scolumn] === ' ' ||
            e[scolumn] === undefined
          )
            setInComplete(true)
        })

        exceldata.map(e => {
          if (e[0]) x.push(e[0])
          if (e[1]) y.push(e[1])
          if (e[2]) z.push(e[2])
          return e
        })
        xAxis = x
        yAxis = y
        zAxis = z

        xbox = xAxis
        ybox = yAxis
        zbox = zAxis
        xbox.shift()
        ybox.shift()
        zbox.shift()

        xaxisNumeric = !xbox.some(isNaN)

        yaxisNumeric = !ybox.some(isNaN)

        zaxisNumeric = !zbox.some(isNaN)
      } else if (typeId === 3) {
        console.log('Xmldata', xmldata)
        result = xmldata
        setDt(xmldata)

        xmldata.map(e => {
          // console.log('eee?', e[scolumn] === '', e[scolumn])
          if (
            e[scolumn] === '' ||
            e[scolumn] === null ||
            e[scolumn] === ' ' ||
            e[scolumn] === undefined
          )
            setInComplete(true)
        })
        xmldata.map(e => {
          if (e[0]) x.push(e[0])
          if (e[1]) y.push(e[1])
          if (e[2]) z.push(e[2])
          return e
        })
        xAxis = x
        yAxis = y
        zAxis = z

        xbox = xAxis
        ybox = yAxis
        zbox = zAxis
        xbox.shift()
        ybox.shift()
        zbox.shift()

        xaxisNumeric = !xbox.some(isNaN)

        yaxisNumeric = !ybox.some(isNaN)

        zaxisNumeric = !zbox.some(isNaN)
      } else if (typeId === 6) {
        console.log('pdfdata>', pdfdata)
        result = pdfdata
        setDt(pdfdata)

        pdfdata.map(e => {
          // console.log('eee?', e[scolumn] === '', e[scolumn])
          if (
            e[scolumn] === '' ||
            e[scolumn] === null ||
            e[scolumn] === ' ' ||
            e[scolumn] === undefined
          )
            setInComplete(true)
        })

        pdfdata.map(e => {
          if (e[0]) x.push(e[0])
          if (e[1]) y.push(e[1])
          if (e[2]) z.push(e[2])
          return e
        })
        xAxis = x
        yAxis = y
        zAxis = z

        xbox = xAxis
        ybox = yAxis
        zbox = zAxis
        xbox.shift()
        ybox.shift()
        zbox.shift()

        xaxisNumeric = !xbox.some(isNaN)

        yaxisNumeric = !ybox.some(isNaN)

        zaxisNumeric = !zbox.some(isNaN)
      } else if (activeStep === 4) {
        setDt(result)

        result.map(e => {
          // console.log('eee?', e[scolumn] === '', e[scolumn])
          if (
            e[scolumn] === '' ||
            e[scolumn] === null ||
            e[scolumn] === ' ' ||
            e[scolumn] === undefined
          )
            setInComplete(true)
        })

        result.map(e => {
          if (e[0]) x.push(e[0])
          if (e[1]) y.push(e[1])
          if (e[2]) z.push(e[2])
          return e
        })
        xAxis = x
        yAxis = y
        zAxis = z

        xbox = xAxis
        ybox = yAxis
        zbox = zAxis
        xbox.shift()
        ybox.shift()
        zbox.shift()

        xaxisNumeric = !xbox.some(isNaN)

        yaxisNumeric = !ybox.some(isNaN)

        zaxisNumeric = !zbox.some(isNaN)
      } else if (typeId === 7) {
        result = parquetdata
        setDt(parquetdata)

        parquetdata.map(e => {
          // console.log('eee?', e[scolumn] === '', e[scolumn])
          if (
            e[scolumn] === '' ||
            e[scolumn] === null ||
            e[scolumn] === ' ' ||
            e[scolumn] === undefined
          )
            setInComplete(true)
        })

        parquetdata.map(e => {
          if (e[0]) x.push(e[0])
          if (e[1]) y.push(e[1])
          if (e[2]) z.push(e[2])
          return e
        })
        xAxis = x
        yAxis = y
        zAxis = z

        xbox = xAxis
        ybox = yAxis
        zbox = zAxis
        xbox.shift()
        ybox.shift()
        zbox.shift()

        xaxisNumeric = !xbox.some(isNaN)

        yaxisNumeric = !ybox.some(isNaN)

        zaxisNumeric = !zbox.some(isNaN)
      } else if (typeId === 4) {
        result = jsondata
        setDt(jsondata)

        jsondata.map(e => {
          // console.log('eee?', e[scolumn] === '', e[scolumn])
          if (
            e[scolumn] === '' ||
            e[scolumn] === null ||
            e[scolumn] === ' ' ||
            e[scolumn] === undefined
          )
            setInComplete(true)
        })

        jsondata.map(e => {
          if (e[0]) x.push(e[0])
          if (e[1]) y.push(e[1])
          if (e[2]) z.push(e[2])
          return e
        })
        xAxis = x
        yAxis = y
        zAxis = z

        xbox = xAxis
        ybox = yAxis
        zbox = zAxis
        xbox.shift()
        ybox.shift()
        zbox.shift()

        xaxisNumeric = !xbox.some(isNaN)

        yaxisNumeric = !ybox.some(isNaN)

        zaxisNumeric = !zbox.some(isNaN)
      } else {
        if (typeId === 'ExampleData') result = exampleData2
        setDt(result)
        // console.log('Sliced', result.slice(s, l))

        result.map(e => {
          // console.log('eee?', e[scolumn] === '', e[scolumn])
          if (
            e[scolumn] === '' ||
            e[scolumn] === null ||
            e[scolumn] === ' ' ||
            e[scolumn] === undefined
          )
            setInComplete(true)
        })

        setDt(result)
        result.map(e => {
          if (e[0]) x.push(e[0])
          if (e[1]) y.push(e[1])
          if (e[2]) z.push(e[2])
          return e
        })
        xAxis = x
        yAxis = y
        zAxis = z

        xbox = xAxis
        ybox = yAxis
        zbox = zAxis
        xbox.shift()
        ybox.shift()
        zbox.shift()

        xaxisNumeric = !xbox.some(isNaN)

        yaxisNumeric = !ybox.some(isNaN)

        zaxisNumeric = !zbox.some(isNaN)
      }

      prepareData()
    }
    return (
      <>
        <Handle
          type='target'
          position='left'
          id='a'
          isValidConnection={connection => connection.source === '1'}
          onConnect={params => console.log('handle onConnect', params)}
          style={{
            left: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            height: '265px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
        {close2 === 1 && (
          <span
            style={removeStyle}
            onClick={() => {
              console.log('PRESSED')
              setNode2('')
              setDspNo(true)
              setNodeType('special386')
            }}
          >
            x
          </span>
        )}
        <div
          style={{
            background: configData.NODE_COLORS.BODY,
            color: '#FFF',
            height: '265px',
            width: '220px',
            margin: 10
          }}
        >
          <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
            In Complete
          </h3>
          {result || dt ? (
            <div>
              <p>Check which Columns are incomplete</p>
              <p style={{ marginLeft: 10, marginBottom: 0 }}>Column Name</p>
              <select
                onChange={checkIncomplete}
                style={{
                  marginTop: -12,
                  background: 'transparent',
                  border: '1px solid #FFF',
                  width: 100,
                  marginLeft: 4
                }}
              >
                {columns &&
                  columns.map((value, index) => {
                    return (
                      <option
                        style={{ fontSize: 14 }}
                        key={index}
                        value={index}
                      >
                        {activeStep === 4 ? value : value}
                      </option>
                    )
                  })}
              </select>
              <button
                style={{ background: '#CCC', marginTop: '4px', padding: '6px' }}
                onClick={handleCheckIncomplete}
              >
                Check InComplete
              </button>
              {inComplete === false && checkedColumn ? (
                <p
                  style={{
                    fontSize: 14,
                    color: '#615f5f',
                    marginTop: 10,
                    marginBottom: 15
                  }}
                >
                  Column is Complete
                </p>
              ) : inComplete === true && checkedColumn ? (
                <p
                  style={{
                    fontSize: 14,
                    color: '#615f5f',
                    marginTop: 10,
                    marginBottom: 15
                  }}
                >
                  Column is InComplete
                </p>
              ) : null}
            </div>
          ) : (
            <p style={{ marginLeft: 10, marginBottom: 0 }}>
              {'< -  Connect to DataSet First'}
            </p>
          )}
        </div>
        <Handle
          type='source'
          position='right'
          id='a'
          style={{
            right: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: '265px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentFormattedBlock = d1 => {
    return (
      <>
        <Handle
          type='target'
          position='left'
          id='a'
          isValidConnection={connection => connection.source === '1'}
          onConnect={params => console.log('handle onConnect', params)}
          style={{
            left: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            height: '180px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
        {close2 === 1 && (
          <span
            style={removeStyle}
            onClick={() => {
              console.log('PRESSED')
              setNode2('')
              setDspNo(true)
              setNodeType('special387')
            }}
          >
            x
          </span>
        )}
        <div
          style={{
            background: configData.NODE_COLORS.BODY,
            color: '#FFF',
            height: '180px',
            width: '220px',
            margin: 10
          }}
        >
          <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
            Formatted
          </h3>
          {result || dt ? null : (
            <p style={{ marginLeft: 10, marginBottom: 0 }}>
              {'<- Connect to dataset'}
            </p>
          )}
          <div>
            <button
              style={{ background: '#CCC', marginTop: '4px', padding: '6px' }}
              onClick={handleSlice}
            >
              Get Formatted
            </button>
          </div>
        </div>
        <Handle
          type='source'
          position='right'
          id='a'
          style={{
            right: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: '180px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentCaseFormatBlock = d1 => {
    const [case1, setCase] = useState(-1)

    const caseFormat = event => {
      var databox2 = []
      var databox =
        typeId === (1 || orignalFile === '')
          ? result
          : typeId === 2
          ? exceldata
          : typeId === 3
          ? xmldata
          : typeId === 4
          ? jsondata
          : typeId === 6
          ? pdfdata
          : typeId === 7
          ? parquetdata
          : typeId === 'ExampleData'
          ? exampleData2
          : result
      var tColumns = databox[0]
      var done = false
      var Regex = /^[a-zA-Z ]+$/

      while (!done) {
        let t = undefined
        done = true
        for (let i = 1; i < databox.length; i += 1) {
          var tempBox = []
          // console.log('C---', databox[i])
          databox[i].forEach(e => {
            if (Regex.test(e)) {
              if (e != null) {
                if (case1 == 0) t = e.toLowerCase()
                else t = e.toUpperCase()
                tempBox.push(t)
              }
            } else {
              tempBox.push(e)
            }
          })
          databox2.push(tempBox)
        }
      }
      databox2.unshift(tColumns)
      result = databox2
      setDt(result)
      console.log('Format', result)

      result.map(e => {
        if (e[0]) x.push(e[0])
        if (e[1]) y.push(e[1])
        if (e[2]) z.push(e[2])
        return e
      })
      xAxis = x
      yAxis = y
      zAxis = z

      xbox = xAxis
      ybox = yAxis
      zbox = zAxis
      xbox.shift()
      ybox.shift()
      zbox.shift()

      xaxisNumeric = !xbox.some(isNaN)

      yaxisNumeric = !ybox.some(isNaN)

      zaxisNumeric = !zbox.some(isNaN)
      prepareData()
    }

    const handleCaseType = event => {
      setCase(event.target.value)
    }
    return (
      <>
        <Handle
          type='target'
          position='left'
          id='a'
          isValidConnection={connection => connection.source === '1'}
          onConnect={params => console.log('handle onConnect', params)}
          style={{
            left: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            height: '250px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
        {close2 === 1 && (
          <span
            style={removeStyle}
            onClick={() => {
              console.log('PRESSED')
              setNode2('')
              setDspNo(true)
              setNodeType('special388')
            }}
          >
            x
          </span>
        )}
        <div
          style={{
            background: configData.NODE_COLORS.BODY,
            color: '#FFF',
            height: '250px',
            width: '220px',
            margin: 10
          }}
        >
          <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
            Case Format
          </h3>
          {result || dt ? null : (
            <p style={{ marginLeft: 10, marginBottom: 0 }}>
              {'<- Connect to dataset'}
            </p>
          )}
          <div>
            <p
              style={{
                fontSize: 14,
                color: 'white',
                marginTop: 10,
                marginBottom: 15
              }}
            >
              Changes Case format of data set
            </p>

            <select
              onChange={handleCaseType}
              value={case1}
              style={{
                marginTop: 10,
                marginBottom: 25,
                //  border: '1px solid #FFF',
                border: '0.5px solid',
                width: 150,
                height: 25,
                backgroundColor: 'white',
                borderRadius: 10,
                fontSize: 12,
                color: '#067AB4'
              }}
            >
              <option
                style={{
                  fontSize: 14,
                  height: 25,
                  marginBottom: 20
                }}
                value={-1}
              >
                {'select case type'}
              </option>
              <option style={{ fontSize: 12 }} value={0}>
                {'To lower case'}
              </option>
              <option style={{ fontSize: 12 }} value={1}>
                {'To upper case'}
              </option>
            </select>
            <button
              style={{ background: '#CCC', marginTop: '4px', padding: '6px' }}
              onClick={caseFormat}
            >
              Get Case Formated
            </button>
          </div>
        </div>
        <Handle
          type='source'
          position='right'
          id='a'
          style={{
            right: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: '250px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentDiscreteRangeBlock = d1 => {
    return (
      <>
        <Handle
          type='target'
          position='left'
          id='a'
          isValidConnection={connection => connection.source === '1'}
          onConnect={params => console.log('handle onConnect', params)}
          style={{
            left: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            height: '180px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
        {close2 === 1 && (
          <span
            style={removeStyle}
            onClick={() => {
              console.log('PRESSED')
              setNode2('')
              setDspNo(true)
              setNodeType('special389')
            }}
          >
            x
          </span>
        )}
        <div
          style={{
            background: configData.NODE_COLORS.BODY,
            color: '#FFF',
            height: '180px',
            width: '220px',
            margin: 10
          }}
        >
          <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
            Discrete Range
          </h3>
          {result || dt ? null : (
            <p style={{ marginLeft: 10, marginBottom: 0 }}>
              {'<- Connect to dataset'}
            </p>
          )}
          <div>
            <input
              style={{ marginLeft: 10, marginBottom: 2 }}
              type={'text'}
              defaultValue={startIndex}
              onChange={e => {
                s = e.target.value
                setstartIndex(e.target.value)
              }}
            />
            <input
              style={{ marginLeft: 10, marginBottom: 0 }}
              type={'text'}
              defaultValue={lastIndex}
              onChange={e => {
                l = e.target.value
                setlastIndex(e.target.value)
              }}
            />
            <button
              style={{ background: '#CCC', marginTop: '4px', padding: '6px' }}
              onClick={handleSlice}
            >
              Discrete Range
            </button>
          </div>
        </div>
        <Handle
          type='source'
          position='right'
          id='a'
          style={{
            right: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: '180px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentRenameBlock = d1 => {
    const [selectedColumn, setSelectedColumn] = useState(0)
    const [columnsBox2, setColumnsBox2] = useState(columns)

    const handleRenameColumn = event => {
      setSelectedColumn(event.target.value)
    }

    const rename = () => {
      const databox =
        global.type_id === (1 || orignalFile === '')
          ? result
          : global.type_id === 2
          ? exceldata
          : global.type_id === 3
          ? xmldata
          : global.type_id === 4
          ? jsondata
          : global.type_id === 6
          ? pdfdata
          : global.type_id === 7
          ? parquetdata
          : global.type_id === 'ExampleData'
          ? exampleData2
          : result

      databox[(0, 0)][selectedColumn] = newColumnName
      setColumnsBox2(databox[0])
      let array5 = databox.map(obj => Object.values(obj))

      result = array5
      setDt(array5)
      console.log('renamed', result)
      result.map(e => {
        if (e[0]) x.push(e[0])
        if (e[1]) y.push(e[1])
        if (e[2]) z.push(e[2])
        return e
      })
      xAxis = x
      yAxis = y
      zAxis = z

      xbox = xAxis
      ybox = yAxis
      zbox = zAxis
      xbox.shift()
      ybox.shift()
      zbox.shift()
      xaxisNumeric = !xbox.some(isNaN)

      yaxisNumeric = !ybox.some(isNaN)

      zaxisNumeric = !zbox.some(isNaN)
      prepareData()
    }
    return (
      // <CustomNodeRenameBlock />
      <>
        <Handle
          type='target'
          position='left'
          id='a'
          isValidConnection={connection => connection.source === '1'}
          onConnect={params => console.log('handle onConnect', params)}
          style={{
            left: '-10px',
            top: '53%',
            borderRadius: 0,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            height: '110px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
        {close2 === 1 && (
          <span
            style={removeStyle}
            onClick={() => {
              console.log('PRESSED')
              setNode2('')
              setDspNo(true)
              setNodeType('special10')
            }}
          >
            x
          </span>
        )}
        <div
          style={{
            background: configData.NODE_COLORS.BODY,
            color: '#FFF',
            height: '110px',
            width: '220px',
            margin: 10
          }}
        >
          <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>
            Rename Column
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <select
              onChange={handleRenameColumn}
              style={{
                marginTop: -4,
                background: 'transparent',
                border: '1px solid #FFF',
                width: 100,
                marginLeft: 4
              }}
            >
              {columnsBox2 &&
                columnsBox2.map((value, index) => {
                  return (
                    <option style={{ fontSize: 14 }} key={index} value={index}>
                      {value}
                    </option>
                  )
                })}
            </select>

            <input
              style={{
                marginTop: -4,
                background: 'transparent',
                border: '1px solid #FFF',
                width: 100,
                marginBottom: 2
              }}
              type={'text'}
              defaultValue={renameColumn}
              onChange={e => {
                newColumnName = e.target.value
                setRenameColumn(e.target.value)
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <button
              style={{
                background: '#CCC',
                marginTop: '4px',
                padding: '0px',
                width: 60,
                alignSelf: 'center'
              }}
              onClick={rename}
            >
              Rename
            </button>
          </div>
        </div>
        <Handle
          type='source'
          position='right'
          id='a'
          style={{
            right: '-10px',
            top: '53%',
            borderRadius: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: '110px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
      </>
    )
  }

  const CustomNodeComponentSortBlock = d1 => {
    const [sortType, setSortType] = useState(-1)
    const [desc, setDesc] = useState()
    const [selectedCol, setSelectedCol] = useState()

    const handleSortAsc = event => {
      setSelectedColumn(event.target.value)
      setSelectedCol(event.target.value)
      var tmpBox
      var Regex = /^[a-zA-Z ]+$/
      var j = event.target.value
      //sort
      const databox =
        global.type_id === (1 || orignalFile === '')
          ? result
          : global.type_id === 2
          ? exceldata
          : global.type_id === 3
          ? xmldata
          : global.type_id === 4
          ? jsondata
          : global.type_id === 6
          ? pdfdata
          : global.type_id === 7
          ? parquetdata
          : global.type_id === 'ExampleData'
          ? exampleData2
          : result
      console.log(event.target.value)
      var sorted
      var tmp
      var done = false

      if (flag == 0) {
        tmpBox = databox
        tmpBox.shift()
      }

      sorted = tmpBox.sort((a, b) => {
        if (Regex.test(a[j]) && Regex.test(b[j])) {
          if (a[j] && b[j]) return a[j].localeCompare(b[j])
        } else {
          return parseInt(a[j]) - parseInt(b[j])
        }
      })

      if (flag == 0) sorted.unshift(columns)
      sorted = databox
      console.log('sorted-', sorted)
      sorted.map(e => {
        if (e[0]) x.push(e[0])
        if (e[1]) y.push(e[1])
        if (e[2]) z.push(e[2])
        return e
      })
      xAxis = x
      yAxis = y
      zAxis = z

      xbox = xAxis
      ybox = yAxis
      zbox = zAxis
      xbox.shift()
      ybox.shift()
      zbox.shift()
      xaxisNumeric = !xbox.some(isNaN)

      yaxisNumeric = !ybox.some(isNaN)

      zaxisNumeric = !zbox.some(isNaN)
      //converted for displaying data
      var temp2 = []
      sorted.map(e => {
        var temp3 = []
        e.map(e2 => {
          temp3.push({ value: e2 })
          return e2
        })
        temp2.push(temp3)
        return e
      })
      console.log(temp2)
      setDt(sorted)
      result = sorted
      prepareData()
      console.log('....')
    }

    const handleSortDesc = event => {
      setSelectedColumn(event.target.value)
      setSelectedCol(event.target.value)

      var tmpBox
      var Regex = /^[a-zA-Z ]+$/
      var j = event.target.value
      setSelectedCol(event.target.value)
      //sort
      const databox =
        global.type_id === (1 || orignalFile === '')
          ? result
          : global.type_id === 2
          ? exceldata
          : global.type_id === 3
          ? xmldata
          : global.type_id === 4
          ? jsondata
          : global.type_id === 6
          ? pdfdata
          : global.type_id === 7
          ? parquetdata
          : global.type_id === 'ExampleData'
          ? exampleData2
          : result
      console.log(event.target.value)
      var tmp
      var sorted
      var done = false

      if (flag == 0) {
        tmpBox = databox
        tmpBox.shift()
      }
      sorted = tmpBox.sort((a, b) => {
        if (Regex.test(b[j]) && Regex.test(a[j])) {
          if (a[j] && b[j]) return b[j].localeCompare(a[j])
        } else {
          return parseInt(b[j]) - parseInt(a[j])
        }
      })

      if (flag == 0) sorted.unshift(columns)

      sorted = databox
      console.log('sortedDSC-', sorted)
      sorted.map(e => {
        if (e[0]) x.push(e[0])
        if (e[1]) y.push(e[1])
        if (e[2]) z.push(e[2])
        return e
      })
      xAxis = x
      yAxis = y
      zAxis = z

      xbox = xAxis
      ybox = yAxis
      zbox = zAxis
      xbox.shift()
      ybox.shift()
      zbox.shift()

      xaxisNumeric = !xbox.some(isNaN)

      yaxisNumeric = !ybox.some(isNaN)

      zaxisNumeric = !zbox.some(isNaN)
      //converted for displaying data
      var temp2 = []
      sorted.map(e => {
        var temp3 = []
        e.map(e2 => {
          temp3.push({ value: e2 })
          return e2
        })
        temp2.push(temp3)
        return e
      })
      //  console.log(temp2)
      setDt(sorted)
      result = sorted
      prepareData()
      console.log('....')
    }

    const handleSortType = event => {
      setSortType(event.target.value)
      setSortType1(event.target.value)

      if (event.target.value == 1) setDesc(true)
      else if (event.target.value == 0) setDesc(false)
      //  sortType = event.target.value
      // console.log('sortt-', sortType)
    }
    return (
      <>
        <Handle
          type='target'
          position='left'
          id='a'
          isValidConnection={connection => connection.source === '1'}
          onConnect={params => console.log('handle onConnect', params)}
          style={{
            left: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            height: '200px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
        {close2 === 1 && (
          <span
            style={removeStyle}
            onClick={() => {
              console.log('PRESSED')
              setNode2('')
              setDspNo(true)
              setNodeType('special9')
            }}
          >
            x
          </span>
        )}
        <div
          style={{
            background: configData.NODE_COLORS.BODY,
            color: '#FFF',
            height: '200px',
            width: '220px',
            margin: 10
          }}
        >
          <h3 style={{ borderBottom: '1px solid #FFF', padding: 10 }}>Sort</h3>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              flexDirection: 'column'
            }}
          >
            <div
              style={{ alignSelf: 'flex-start', marginLeft: 10, marginTop: 2 }}
            >
              Order:
            </div>
            <select
              value={activeStep === 4 ? sortType1 : sortType}
              onChange={handleSortType}
              style={{
                marginTop: 10,
                background: 'transparent',
                border: '1px solid #FFF',
                width: 150,
                marginLeft: 10
              }}
            >
              <option style={{ fontSize: 12 }} value={-1}>
                {'Select sort type'}
              </option>
              <option style={{ fontSize: 12 }} value={0}>
                {'Ascending'}
              </option>
              <option style={{ fontSize: 12 }} value={1}>
                {'Descending'}
              </option>
            </select>

            <div
              style={{ alignSelf: 'flex-start', marginTop: 5, marginLeft: 10 }}
            >
              Column Name:
            </div>
            <select
              value={activeStep === 4 ? selectedColumn : selectedCol}
              onChange={event => {
                // console.log('sortType1?', sortType1, desc)
                setContainNull(0)
                if (desc == 1) handleSortDesc(event)
                else if (desc == 0) handleSortAsc(event)
                else console.log('its undefined', desc)
              }}
              style={{
                marginTop: 10,
                background: 'transparent',
                border: '1px solid #FFF',
                width: 150,
                marginLeft: 10
              }}
            >
              <option style={{ fontSize: 14 }} key={-1} value={-1}>
                {'Select Column'}
              </option>
              {columns &&
                columns.map((value, index) => {
                  return (
                    <option style={{ fontSize: 14 }} key={index} value={index}>
                      {activeStep === 4 ? value : value}
                    </option>
                  )
                })}
            </select>
          </div>
        </div>
        <Handle
          type='source'
          position='right'
          id='a'
          style={{
            right: '-10px',
            top: '52%',
            borderRadius: 0,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            height: '200px',
            width: '20px',
            backgroundColor: configData.NODE_COLORS.HANDLE
          }}
        ></Handle>
      </>
    )
  }

  const LineandScatterPlot = d1 => {
    //  console.log('SEE DATA', pdfdata, xAxis, yAxis, zAxis)
    return (
      <CustomNodeLineandScatterPlot
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special20')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const DataLabelsHover = d1 => {
    return (
      <CustomNodeDataLabelsHover
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special21')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const DataLabelsOnthePlot = d1 => {
    return (
      <CustomNodeDataLabelsOnThePlot
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special22')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const ScatterPlotwithColorDimension = d1 => {
    return (
      <CustomNodeScatterPlotWithColorDimension
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special23')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BasicLinePlot = d1 => {
    return (
      <CustomNodeBasicLinePlot
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special24')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const LineandScatterPlot2 = d1 => {
    //  console.log('SEE DATA', result)
    return (
      <CustomNodeLineandScatterPlot
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special25')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }
  const ScatterPlotwithNames = d1 => {
    return (
      <CustomNodeLineandScatterPlotWithNames
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special26')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const StyledLineandScatter = d1 => {
    return (
      <CustomLineandScatterStyling
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special27')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const StyledLinePlot = d1 => {
    return (
      <CustomNodeStyledLinePlot
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special28')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const ColoredandStyledScatterPlot = d1 => {
    return (
      <CustomNodeColoredandStyledScatterPlot
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special29')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const LineShapeOptions = d1 => {
    return (
      <CustomNodeLineShapeOptionsforInterpolation
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special30')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const GraphandAxesTitles = d1 => {
    return (
      <CustomNodeGraphandAxesTitles
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special31')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const LineDash = d1 => {
    return (
      <CustomNodeLineDash
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special32')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const ConnectGapsBetweenData = d1 => {
    return (
      <CustomNodeConnectGapsBetweenData
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special33')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BasicBarChart = d1 => {
    return (
      <CustomNodeBasicBarChart
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special34')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const GroupedBarChart = d1 => {
    return (
      <CustomNodeGroupedBarChart
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special35')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const StackedBarChart = d1 => {
    return (
      <CustomNodeStackedBarChart
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special36')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BarChartWithHoverText = d1 => {
    return (
      <CustomNodeBarChartwithHoverText
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special37')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BarChartWithDirectLabels = d1 => {
    return (
      <CustomNodeBarChartwithDirectLabels
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special38')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const GroupedBarChartwithDirectLabels = d1 => {
    return (
      <CustomNodeGroupedBarChartwithDirectLabels
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special39')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BarChartwithRotatedLabels = d1 => {
    return (
      <CustomNodeBarChartwithRotatedLabels
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special40')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const individualBarColors = d1 => {
    return (
      <CustomNodeCustomizingIndividualBarColors
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special41')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const individualBarWidths = d1 => {
    return (
      <CustomNodeCustomizingIndividualBarWidths
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special42')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const individualBarBase = d1 => {
    return (
      <CustomNodeCustomizingIndividualBarBase
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special43')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const ColoredandStyledBarChart = d1 => {
    return (
      <CustomNodeColoredandStyledBarChart
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special44')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const WaterfallBarChart = d1 => {
    return (
      <CustomNodeWaterfallBarChart
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special45')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BasicPieChart = d1 => {
    return (
      <CustomNodeBasicPieChart
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special47')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={xaxisNumeric === true ? true : false}
      />
    )
  }
  const BarChartWithRelativeBarMode = d1 => {
    return (
      <CustomNodeBarChartwithRelativeBarmode
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special46')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const PieChartSubPlots = d1 => {
    return (
      <CustomNodePieChartSubplots
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special48')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true &&
          yaxisNumeric === true &&
          zaxisNumeric === true
            ? true
            : false
        }
      />
    )
  }

  const DonutChart = d1 => {
    return (
      <CustomNodeDonutChart
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special49')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const AutomaticallyAdjustMargin = d1 => {
    return (
      <CustomNodeAutomaticallyAdjustMargin
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special50')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const TextOrientationPieChartSectors = d1 => {
    return (
      <ControlTextOrientationInsidePieChartSectors
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special51')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }
  const MarkerSizeonBubbleCharts = d1 => {
    return (
      <CustomNodeBubbleSizeonBubbleChart
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special52')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const MarkerSizeandColoronBubbleCharts = d1 => {
    return (
      <CustomNodeMarkerSizeandColorBubbleChart
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special53')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }
  const HoverTextonBubbleCharts = d1 => {
    return (
      <CustomNodeHoverTextonBubbleChart
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special54')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BubbleSizeScalingonCharts = d1 => {
    return (
      <CustomNodeBubbleSizeonBubbleChart
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special55')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }
  const MarkerSizeColorandSymbolasArray = d1 => {
    return (
      <CustomNodeMarkerSizeColorandSymbolasArray
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special56')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BasicOverlaidAreaChart = d1 => {
    return (
      <CustomNodeBasicOverlaidAreaChart
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special58')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const OverlaidAreaChartWithoutBoundaryLines = d1 => {
    return (
      <CustomNodeOverlaidAreaChartWithoutBoundaryLines
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special59')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const StackedAreaChart = d1 => {
    return (
      <CustomNodeStackedAreaChart
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special60')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const NormalizedStackedAreaChart = d1 => {
    return (
      <CustomNodeNormalizedStackedAreaChart
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special61')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const SelectHoverPoints = d1 => {
    return (
      <CustomNodeSelectHoverPoints
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special62')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BasicHorizontalBarChart = d1 => {
    return (
      <CustomNodeBasicHorizontalBarChart
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special63')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const ColoredBarChart = d1 => {
    return (
      <CustomNodeColoredBarChart
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special64')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BarChartwithLinePlot = d1 => {
    return (
      <CustomNodeBarChartwithLinePlot
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special65')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const CategoricalDotPlot = d1 => {
    return (
      <CustomNodeCategoricalDotPlot
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special57')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BasicPointCloud = d1 => {
    return (
      <CustomNodeBasicPointCloud
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special66')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={xaxisNumeric === true ? true : false}
      />
    )
  }

  const StyledPointCloud = d1 => {
    return (
      <CustomNodeStyledPointCloud
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special67')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const BasicSunBurst = d1 => {
    // console.log('checking', temp9)
    return (
      <BasicSunBurstChart
        block={true}
        close={close3}
        data2={activeStep === 4 ? dt2 : temp9}
        setNodeDsp={() => setNodeDsp3('special68')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }
  const SunBurstBranchValues = d1 => {
    return (
      <BranchValues
        block={true}
        close={close3}
        data2={activeStep === 4 ? dt2 : temp9}
        setNodeDsp={() => setNodeDsp3('special69')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }
  const SunburstRepetedLabels = d1 => {
    return (
      <SunburstWithRepetedLabels
        block={true}
        close={close3}
        data2={activeStep === 4 ? dt2 : temp9}
        setNodeDsp={() => setNodeDsp3('special70')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }
  const SunburstLargeNumberOfSlices = d1 => {
    return (
      <SunburstLargeNumberSlices
        block={true}
        close={close3}
        data2={activeStep === 4 ? dt2 : temp9}
        setNodeDsp={() => setNodeDsp3('special71')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }
  const OrientationInsideSubchartSectors = d1 => {
    return (
      <SunburstTextOrientaion
        block={true}
        close={close3}
        data2={activeStep === 4 ? dt2 : temp9}
        setNodeDsp={() => setNodeDsp3('special72')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }
  const SankeyDiagram = d1 => {
    return (
      <SankeyDiagrams
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special73')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }
  const SankeyCanvas = d1 => {
    return (
      <CreateSankeyCanvas
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special74')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const AddNodes = d1 => {
    return (
      <AddNodesBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special75')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const AddLinks = d1 => {
    return (
      <AddLinksBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special76')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const StyleSankeyDiagram = d1 => {
    return (
      <StyleSankeyDiagramBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special77')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const DefineNodePosition = d1 => {
    return (
      <DefineNodePositionBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special78')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BasicTreemaps = d1 => {
    return (
      <BasicTreemapsBlock
        block={true}
        data2={activeStep === 4 ? dt2 : temp9}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special234')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const SetDifferentAttributesinTreeMap = d1 => {
    return (
      <SetDifferentAttributesinTreeMapBlock
        block={true}
        close={close3}
        data2={activeStep === 4 ? dt2 : temp9}
        setNodeDsp={() => setNodeDsp3('special235')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const SetColorofTreemapSectors = d1 => {
    return (
      <SetColorofTreemapSectorsBlock
        block={true}
        close={close3}
        data2={activeStep === 4 ? dt2 : temp9}
        setNodeDsp={() => setNodeDsp3('special236')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const NestedLayersinTreemap = d1 => {
    return (
      <NestedLayersinTreemapBlock
        block={true}
        close={close3}
        data2={activeStep === 4 ? dt2 : temp9}
        setNodeDsp={() => setNodeDsp3('special237')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const ContourandScatterPlotoftheMethodofSteepestDescent = d1 => {
    return (
      <ContourandScatterPlotoftheMethodofSteepestDescentBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special238')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true &&
          yaxisNumeric === true &&
          zaxisNumeric === true
            ? true
            : false
        }
      />
    )
  }

  const LineChartandBarChart = d1 => {
    return (
      <LineChartandBarChartBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special239')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const WebGLwithOneLakhpoints = d1 => {
    return (
      <WebGLwithOneLakhpointsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special240')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const WebGLwithOneMillionpoints = d1 => {
    return (
      <WebGLwithOneMillionpointsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special241')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const WebGLwithmanytraces = d1 => {
    return (
      <WebGLwithmanytracesBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special242')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }
  const BasicBoxPlot = d1 => {
    return (
      <BasicBoxPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special88')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BoxplothatDisplaysUnderlyingdata = d1 => {
    return (
      <BoxPlotThatDisplayesUnderlyingdataBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special89')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const HorizontalBoxPlot = d1 => {
    return (
      <HorizontalBoxPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special90')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const GroupedBoxPlot = d1 => {
    return (
      <GroupedBoxPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special91')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === false && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const BoxPlotStylingOutliers = d1 => {
    return (
      <BoxPlotStylingOutliersBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special92')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BoxPlotStylingMeanandStandardDeviation = d1 => {
    return (
      <BoxPlotStylingMeanandStandardDeviationBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special93')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const GroupedHorizontalBoxPlot = d1 => {
    return (
      <GroupedHorizontalBoxPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special94')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const ColoredBoxPLot = d1 => {
    return (
      <ColoredBoxPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special95')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const FullyStyledBoxPlot = d1 => {
    return (
      <FullyStyledBoxPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special96')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const RainBowBoxPlot = d1 => {
    return (
      <RainBowBoxPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special97')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BasicHistogram = d1 => {
    return (
      <BasicHistogramBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special98')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const HorizontalHistogram = d1 => {
    return (
      <HorizontalHistogramBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special99')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const OverlaidHistogram = d1 => {
    return (
      <OverlaidHistogramBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special100')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const StackedHistogram = d1 => {
    return (
      <StackedHistogramBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special101')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const ColoredandStyledHistogram = d1 => {
    return (
      <ColoredandStyledHistogramBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special102')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const CumulativeHistogram = d1 => {
    return (
      <CumulativeHistogramBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special103')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const NormalizedHistogram = d1 => {
    return (
      <NormalizedHistogramBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special104')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const SpecifyBinningFunction = d1 => {
    return (
      <SpecifyBinningFunctionBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special105')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const TwoDHistogramContourPlotwithHistogramSubplots = d1 => {
    return (
      <TwoDHistogramContourPlotwithHistogramSubplotsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special106')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const TwoDHistogramContourPlotwithSliderControl = d1 => {
    return (
      <TwoDHistogramContourPlotwithSliderControlBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special107')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const FilledLines = d1 => {
    return (
      <FilledLinesBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special108')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BasicSymmetricErrorBars = d1 => {
    return (
      <BasicSymmetricErrorBarsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special81')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BarChartwithErrorBars = d1 => {
    return (
      <BarChartwithErrorBarsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special82')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const HorizontalErrorBars = d1 => {
    return (
      <HorizontalErrorBarsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special83')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const AsymmetricErrorBars = d1 => {
    return (
      <AsymmetricErrorBarsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special84')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const ColoredandStyledErrorBars = d1 => {
    return (
      <ColoredandStyledErrorBarsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special85')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }
  const ErrorBarsasaPercentageoftheyValue = d1 => {
    return (
      <ErrorBarsasaPercentageoftheyValueBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special86')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const AsymmetricErrorBarswithaConstantOffset = d1 => {
    return (
      <AsymmetricErrorBarswithaConstantOffsetBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special87')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const AsymmetricErrorBarswithaConstantOffset2 = d1 => {
    return (
      <AsymmetricErrorBarswithaConstantOffsetBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special109')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const SimpleContourPlot = d1 => {
    return (
      <SimpleContourPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special110')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const BasicContourPlot = d1 => {
    return (
      <BasicContourPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special111')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
        dashboard
      />
    )
  }

  const SettingXandYCoordinatesinaContourPlot = d1 => {
    return (
      <SettingXandYCoordinatesinaContourPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special112')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xbox}
        y={ybox}
        z={zbox}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const ColorscaleforContourPlot = d1 => {
    return (
      <ColorscaleforContourPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special113')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const CustomizingSizeandRangeofaContourPlotContours = d1 => {
    return (
      <CustomizingSizeandRangeofaContourPlotContoursBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special114')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const CustomizingSpacingBetweenXandYTicks = d1 => {
    return (
      <CustomizingSpacingBetweenXandYTicksBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special115')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const ConnecttheGapsbetweenNullValuesintheZMatrix = d1 => {
    return (
      <ConnecttheGapsbetweenNullValuesintheZMatrixBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special116')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const SmoothingContourLines = d1 => {
    return (
      <SmoothingContourLinesBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special120')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const SmoothContourColoring = d1 => {
    return (
      <SmoothContourColoringBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special121')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const ContourLines = d1 => {
    return (
      <ContourLinesBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special122')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const ContourLinesLabels = d1 => {
    return (
      <ContourLineLabelsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special123')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }
  const CustomColorscaleforContourPlot = d1 => {
    return (
      <CustomColorscaleforContourPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special124')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const ColorBarTitle = d1 => {
    return (
      <ColorBarTitleBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special125')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const ColorBarSize = d1 => {
    return (
      <ColorBarSizeBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special126')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const StylingColorBarTicksforContourPlots = d1 => {
    return (
      <StylingColorBarTicksforContourPlotsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special127')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const BasicHeatmap = d1 => {
    return (
      <BasicHeatmapBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special128')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
        dashboard={false}
      />
    )
  }

  const HeatmapwithCategoricalAxisLabels = d1 => {
    return (
      <HeatmapwithCategoricalAxisLabelsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special129')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true &&
          yaxisNumeric === true &&
          zaxisNumeric === true
            ? true
            : false
        }
      />
    )
  }

  const AnnotatedHeatmap = d1 => {
    return (
      <AnnotatedHeatmapBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special130')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true &&
          yaxisNumeric === true &&
          zaxisNumeric === true
            ? true
            : false
        }
      />
    )
  }

  const HeatmapwithUnequalBlockSizes = d1 => {
    return (
      <HeatmapwithUnequalBlockSizesBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special131')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true &&
          yaxisNumeric === true &&
          zaxisNumeric === true
            ? true
            : false
        }
      />
    )
  }

  const BasicTernaryPlotwithMarkers = d1 => {
    return (
      <BasicTernaryPlotwithMarkersBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special32')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const SoilTypesTernaryPlot = d1 => {
    return (
      <SoilTypesTernaryPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special133')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const AddingDimensions = d1 => {
    return (
      <AddingDimensionsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special134')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true &&
          yaxisNumeric === true &&
          zaxisNumeric === true
            ? true
            : false
        }
      />
    )
  }

  const BasicParallelCoordinatesPlot = d1 => {
    return (
      <BasicParallelCoordinatesPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special135')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true &&
          yaxisNumeric === true &&
          zaxisNumeric === true
            ? true
            : false
        }
      />
    )
  }

  const AnnotatedParallelCoordinatesPlot = d1 => {
    return (
      <AnnotatedParallelCoordinatesPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special136')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true &&
          yaxisNumeric === true &&
          zaxisNumeric === true
            ? true
            : false
        }
      />
    )
  }

  const AdvancedParallelCoordinatesPlot = d1 => {
    return (
      <AdvancedParallelCoordinatesPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special137')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true &&
          yaxisNumeric === true &&
          zaxisNumeric === true
            ? true
            : false
        }
      />
    )
  }

  const LogarithmicAxes = d1 => {
    return (
      <LogarithmicAxesBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special138')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }
  const BasicWaterfallChart = d1 => {
    return (
      <BasicWaterfallChartBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special139')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const MultiCategoryWaterfallChart = d1 => {
    return (
      <MultiCategoryWaterfallChartBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special140')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const HorizontalWaterfallChart = d1 => {
    return (
      <HorizontalWaterfallChartBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special141')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const StyleWaterfallChart = d1 => {
    return (
      <StyleWaterfallChartBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special142')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const SimpleCandleStickChart = d1 => {
    return (
      <SimpleCandleStickChartBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special147')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const CandlestickChartwithoutRangeslider = d1 => {
    return (
      <CandlestickChartwithoutRangesliderBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special148')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const CustomiseCandlestickChartwithShapesandAnnotations = d1 => {
    return (
      <CustomiseCandlestickChartwithShapesandAnnotationsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special149')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={xaxisNumeric === true ? true : false}
      />
    )
  }

  const CustomizingCandlestickChartColors = d1 => {
    return (
      <CustomizingCandlestickChartColorsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special150')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const AddRangeselector = d1 => {
    return (
      <AddRangeselectorBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special151')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }
  const BasicFunnelPlot = d1 => {
    return (
      <BasicFunnelPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special152')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const SettingMarkerSizeandColor = d1 => {
    return (
      <SettingMarkerSizeandColorBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special153')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const StackedFunnel = d1 => {
    return (
      <StackedFunnelBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special154')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const FunnelareaPlot = d1 => {
    return (
      <FunnelareaPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special155')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={xaxisNumeric === true ? true : false}
      />
    )
  }

  const MultiFunnelarea = d1 => {
    return (
      <MultiFunnelareaBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special156')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }
  const DateStrings = d1 => {
    return (
      <DateStringsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special157')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BasicTimeSeries = d1 => {
    return (
      <BasicTimeSeriesBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special158')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const ManuallySetRange = d1 => {
    return (
      <ManuallySetRangeBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special159')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const TimeSerieswithRangeslider = d1 => {
    return (
      <TimeSerieswithRangesliderBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special160')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const ThreeDScatterPlot = d1 => {
    return (
      <ThreeDScatterPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special161')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BasicRibbonPlot = d1 => {
    return (
      <BasicRibbonPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special162')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const Topographical3DSurfacePlot = d1 => {
    return (
      <Topographical3DSurfacePlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special163')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const SurfacePlotWithContours = d1 => {
    return (
      <SurfacePlotWithContoursBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special164')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const Multiple3DSurfacePlots = d1 => {
    return (
      <Multiple3DSurfacePlotsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special165')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const Simple3DMeshPlot = d1 => {
    return (
      <Simple3DMeshPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special166')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xbox}
        y={ybox}
        z={zbox}
        IsDataNumeric={
          xaxisNumeric === true &&
          yaxisNumeric === true &&
          zaxisNumeric === true
            ? true
            : false
        }
      />
    )
  }

  const ThreeDMeshPlotwithAlphahull = d1 => {
    return (
      <ThreeDMeshPlotwithAlphahullBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special167')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true &&
          yaxisNumeric === true &&
          zaxisNumeric === true
            ? true
            : false
        }
        xbox={xbox}
        ybox={ybox}
        zbox={zbox}
      />
    )
  }

  const ThreeDMeshTetrahedron = d1 => {
    return (
      <ThreeDMeshTetrahedronBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special168')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
      />
    )
  }

  const ThreeDMeshCube = d1 => {
    return (
      <ThreeDMeshCubeBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special169')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const ThreeDLinePlot = d1 => {
    return (
      <ThreeDLinePlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special170')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const ThreeDLinewithMarkersPlot = d1 => {
    return (
      <ThreeDLinewithMarkersPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special171')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const ThreeDLineSpiralPlot = d1 => {
    return (
      <ThreeDLineSpiralPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special172')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const ThreeDRandomWalkPlot = d1 => {
    return (
      <ThreeDRandomWalkPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special173')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const SimpleSubplot = d1 => {
    return (
      <SimpleSubplotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special174')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const CustomSizedSubplot = d1 => {
    return (
      <CustomSizedSubplotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special175')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const MultipleSubplots = d1 => {
    return (
      <MultipleSubplotsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special176')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const SubplotswithSharedAxes = d1 => {
    return (
      <SubplotswithSharedAxesBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special177')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const StackedSubplots = d1 => {
    return (
      <StackedSubplotsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special179')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const StackedSubplotswithaSharedXAxis = d1 => {
    return (
      <StackedSubplotswithaSharedXAxisBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special178')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const MultipleCustomSizedSubplots = d1 => {
    return (
      <MultipleCustomSizedSubplotsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special180')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const SimpleInsetGraph = d1 => {
    return (
      <SimpleInsetGraphBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special181')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const Multiple3DSubplots = d1 => {
    return (
      <Multiple3DSubplotsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special182')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true &&
          yaxisNumeric === true &&
          zaxisNumeric === true
            ? true
            : false
        }
      />
    )
  }

  const MixedSubPlots = d1 => {
    return (
      <MixedSubPlotsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special183')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const TableandChartSubplot = d1 => {
    return (
      <TableandChartSubplotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special184')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        columns={columns}
      />
    )
  }

  const ClickEventData = d1 => {
    return (
      <ClickEventDataBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special185')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BindingToClickEvent = d1 => {
    return (
      <BindingToClickEventBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special186')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const Createannotationonclickevent = d1 => {
    return (
      <CreateannotationonclickeventBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special187')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const HoverEventData = d1 => {
    return (
      <HoverEventDataBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special188')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const CapturingHoverEventsData = d1 => {
    return (
      <CapturingHoverEventsDataBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special189')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const CapturingHoverEventsPixels = d1 => {
    return (
      <CapturingHoverEventsPixelsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special190')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const TriggeringHoverEvents = d1 => {
    return (
      <TriggeringHoverEventsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special191')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const CoupledHoverEvents = d1 => {
    return (
      <CoupledHoverEventsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special192')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const CombinedClickandHoverEvents = d1 => {
    return (
      <CombinedClickandHoverEventsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special193')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BindingtoZoomEvents = d1 => {
    return (
      <BindingtoZoomEventsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special194')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const DisablingZoomEventsforXAxis = d1 => {
    return (
      <DisablingZoomEventsforXAxisBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special195')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const DisablingZoomEventsforXandYAxis = d1 => {
    return (
      <DisablingZoomEventsforXandYAxisBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special196')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const FilterBlock1 = d1 => {
    return (
      <FilterBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special197')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
        columns={columns}
      />
    )
  }

  const GroupByBlock1 = d1 => {
    return (
      <GroupByBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special198')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const Aggregations = d1 => {
    return (
      <AggregationsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special199')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const AggregateFunctions = d1 => {
    return (
      <AggregateFunctionsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special200')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const HistogramBinning = d1 => {
    return (
      <HistogramBinningBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special201')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const MappingWithAggregates = d1 => {
    return (
      <MappingWithAggregatesBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special202')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const FilterAndGroupby = d1 => {
    return (
      <FilterAndGroupbyBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special203')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const FilterAndAggregates = d1 => {
    return (
      <FilterAndAggregatesBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special204')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const AllTransforms = d1 => {
    return (
      <AllTransformsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special205')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }
  const AddTwoDropdownMenustoaChart = d1 => {
    return (
      <AddTwoDropdownMenustoaChartBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special208')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const Binddropdowneventstocharts = d1 => {
    return (
      <BinddropdowneventstochartsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special209')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const RestyleButtonSingleAttribute = d1 => {
    return (
      <RestyleButtonSingleAttributeBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special210')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const RestyleButtonMultipleAttributes = d1 => {
    return (
      <RestyleButtonMultipleAttributesBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special211')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const RelayoutButton = d1 => {
    return (
      <RelayoutButtonBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special212')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const UpdateButton = d1 => {
    return (
      <UpdateButtonBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special213')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const AnimateButton = d1 => {
    return (
      <AnimateButtonBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special214')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const Stylethebuttons = d1 => {
    return (
      <StylethebuttonsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special215')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
        IsDataNumeric={
          xaxisNumeric === true && yaxisNumeric === true ? true : false
        }
      />
    )
  }

  const BasicSlider = d1 => {
    return (
      <BasicSliderBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special216')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BindComponentstotheAppearanceofaPlot = d1 => {
    return (
      <BindComponentstotheAppearanceofaPlotBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special219')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const AddaPlayButtontoControlaSlider = d1 => {
    return (
      <AddaPlayButtontoControlaSliderBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special220')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const LassoSelection = d1 => {
    return (
      <LassoSelectionBlock
        close={close3}
        block={true}
        setNodeDsp={() => setNodeDsp3('special221')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const BasicRangeSlideronTimeSeries = d1 => {
    return (
      <BasicRangeSlideronTimeSeriesBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special222')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const AnimatingtheData = d1 => {
    return (
      <AnimatingtheDataBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special223')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const AnimatingtheLayout = d1 => {
    return (
      <AnimatingtheLayoutBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special224')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const DefiningNamedFramesaddFrames = d1 => {
    return (
      <DefiningNamedFramesaddFramesBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special225')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const AnimatingSequencesofFrames = d1 => {
    return (
      <AnimatingSequencesofFramesBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special226')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const AnimatingManyFramesQuickly = d1 => {
    return (
      <AnimatingManyFramesQuicklyBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special227')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const ObjectConstancy = d1 => {
    return (
      <ObjectConstancyBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special228')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const FrameGroupsandAnimationModes = d1 => {
    return (
      <FrameGroupsandAnimationModesBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special229')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const AnimatingwithaSlider = d1 => {
    return (
      <AnimatingwithaSliderBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special230')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const AnimatingwithaSlider2 = d1 => {
    return (
      <AnimatingwithaSliderBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special243')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const FilledAreaAnimation = d1 => {
    return (
      <FilledAreaAnimationBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special231')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const MultipleTraceFilledArea = d1 => {
    return (
      <MultipleTraceFilledAreaBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special232')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const MapAnimations = d1 => {
    return (
      <MapAnimationsBlock
        block={true}
        close={close3}
        setNodeDsp={() => setNodeDsp3('special233')}
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : typeId === 4
            ? jsondata
            : typeId === 6
            ? pdfdata
            : typeId === 7
            ? parquetdata
            : activeStep === 4
            ? dt
            : result
        }
        x={xAxis}
        y={yAxis}
        z={zAxis}
      />
    )
  }

  const CustomNodeComponentStatsBlock = d1 => {
    const [selectedColumn, setSelectedColumn] = useState(0)

    const handleChange = event => {
      setSelectedColumn(event.target.value)
      sc = event.target.value
      tempArray =
        global.type_id === (1 || orignalFile === '')
          ? result
          : global.type_id === 2
          ? exceldata
          : global.type_id === 3
          ? xmldata
          : global.type_id === 4
          ? jsondata
          : global.type_id === 6
          ? pdfdata
          : global.type_id === 7
          ? parquetdata
          : result
      if (sc === 1) {
        min = tempArray[1][1]
        for (let i = 1; i < tempArray.length; i++) {
          if (tempArray[i][1] < min) {
            min = tempArray[i][1]
          }
        }
      } else if (sc === 2) {
        min = tempArray[1][2]
        for (let i = 1; i < tempArray.length; i++) {
          if (tempArray[i][2] < min) {
            min = tempArray[i][2]
          }
        }
      }

      if (sc === 1) {
        max = tempArray[1][1]
        for (let i = 1; i < tempArray.length; i++) {
          if (tempArray[i][1] > max) {
            max = tempArray[i][1]
          }
        }
      } else if (sc === 2) {
        max = tempArray[1][2]
        for (let i = 1; i < tempArray.length; i++) {
          if (tempArray[i][2] > max) {
            max = tempArray[i][2]
          }
        }
      }

      if (sc === 3) {
        min = tempArray[1][3]
        for (let i = 1; i < tempArray.length; i++) {
          if (tempArray[i][3] < min) {
            min = tempArray[i][3]
          }
        }
      } else if (sc === 4) {
        min = tempArray[1][4]
        for (let i = 1; i < tempArray.length; i++) {
          if (tempArray[i][4] < min) {
            min = tempArray[i][4]
          }
        }
      }

      if (sc === 3) {
        max = tempArray[1][3]
        for (let i = 1; i < tempArray.length; i++) {
          if (tempArray[i][3] > max) {
            max = tempArray[i][3]
          }
        }
      } else if (sc === 4) {
        max = tempArray[1][4]
        for (let i = 1; i < tempArray.length; i++) {
          if (tempArray[i][4] > max) {
            max = tempArray[i][4]
          }
        }
      }
      sum = 0
      var count = 0
      var j = sc
      var num

      for (let i = 1; i < tempArray.length; i++) {
        num = parseInt(tempArray[i][j])
        sum = sum + num
        count++
      }
      avg = sum / count
      console.log(sc)
    }
    return (
      <CustomNodeStatsBlock
        close={close4}
        data={dt}
        setNodeDsp={() => setNodeDsp4('special15')}
        onChange={handleChange}
        selected={selectedColumn}
        columns={activeStep === 4 ? columnsBox : columns}
        min={min}
        max={max}
        sum={sum}
        avg={avg}
      />
    )
  }

  const CustomNodeComponentExportBlock = d1 => {
    return (
      <CustomNodeExportBlock
        data={
          typeId === 2
            ? exceldata
            : typeId === 3
            ? xmldata
            : activeStep === 4
            ? dt
            : result
        }
        close={close3}
        setNodeDsp={() => setNodeDsp4('special16')}
      />
    )
  }

  const nodeTypes = {
    selectorNode: ColorSelectorNode,
    special: CustomNodeComponentInputFile,
    special2: CustomNodeComponentPaste,
    special3: CustomNodeComponentSelectDataSourceBlock,
    // special3: CustomNodeComponentSheets,
    special4: CustomNodeComponentHttpReq,
    special5: CustomNodeComponentFilterBlock,
    special6: CustomNodeComponentMergeBlock2,
    special7: CustomNodeComponentGroupBlock,
    special8: CustomNodeComponentSliceBlock,
    special9: CustomNodeComponentSortBlock,
    special10: CustomNodeComponentRenameBlock,
    special11: CustomNodeComponentExampleDataBlock,
    //special11: CustomNodeComponentBarchartBlock,
    // special12: CustomNodeComponentHistogramBlock,
    // special13: CustomNodeComponentScatterplotBlock,
    // special14: CustomNodeComponentTimeseriesBlock,
    special15: CustomNodeComponentStatsBlock,
    special16: CustomNodeComponentExportBlock,
    special20: LineandScatterPlot,
    special21: DataLabelsHover,
    special22: DataLabelsOnthePlot,
    special23: ScatterPlotwithColorDimension,
    special24: BasicLinePlot,
    special25: LineandScatterPlot2,
    special26: ScatterPlotwithNames,
    special27: StyledLineandScatter,
    special28: StyledLinePlot,
    special29: ColoredandStyledScatterPlot,
    special30: LineShapeOptions,
    special31: GraphandAxesTitles,
    special32: LineDash,
    special33: ConnectGapsBetweenData,
    special34: BasicBarChart,
    special35: GroupedBarChart,
    special36: StackedBarChart,
    special37: BarChartWithHoverText,
    special38: BarChartWithDirectLabels,
    special39: GroupedBarChartwithDirectLabels,
    special40: BarChartwithRotatedLabels,
    special41: individualBarColors,
    special42: individualBarWidths,
    special43: individualBarBase,
    special44: ColoredandStyledBarChart,
    special45: WaterfallBarChart,
    special46: BarChartWithRelativeBarMode,
    special47: BasicPieChart,
    special48: PieChartSubPlots,
    special49: DonutChart,
    special50: AutomaticallyAdjustMargin,
    special51: TextOrientationPieChartSectors,
    special52: MarkerSizeonBubbleCharts,
    special53: MarkerSizeandColoronBubbleCharts,
    special54: HoverTextonBubbleCharts,
    special55: BubbleSizeScalingonCharts,
    special56: MarkerSizeColorandSymbolasArray,
    special57: CategoricalDotPlot,
    special58: BasicOverlaidAreaChart,
    special59: OverlaidAreaChartWithoutBoundaryLines,
    special60: StackedAreaChart,
    special61: NormalizedStackedAreaChart,
    special62: SelectHoverPoints,
    special63: BasicHorizontalBarChart,
    special64: ColoredBarChart,
    special65: BarChartwithLinePlot,
    special66: BasicPointCloud,
    special67: StyledPointCloud,

    special68: BasicSunBurst,
    special69: SunBurstBranchValues,
    special70: SunburstRepetedLabels,
    special71: SunburstLargeNumberOfSlices,
    special72: OrientationInsideSubchartSectors,

    special73: SankeyDiagram,
    special74: SankeyCanvas,
    special75: AddNodes,
    special76: AddLinks,
    special77: StyleSankeyDiagram,
    special78: DefineNodePosition,

    special234: BasicTreemaps,
    special235: SetDifferentAttributesinTreeMap,
    special236: SetColorofTreemapSectors,
    special237: NestedLayersinTreemap,

    special238: ContourandScatterPlotoftheMethodofSteepestDescent,
    special239: LineChartandBarChart,
    special240: WebGLwithOneLakhpoints,
    special241: WebGLwithOneMillionpoints,
    special242: WebGLwithmanytraces,

    special381: CustomNodeComponentMergeBlock2,
    special382: CustomNodeComponentDuplicateBlock,
    special383: CustomNodeComponentFuzzySearchBlock,
    special384: CustomNodeComponentStandardizationBlock,
    special385: CustomNodeComponentReplaceNullBlock,
    special386: CustomNodeComponentInCompleteBlock,
    special387: CustomNodeComponentFormattedBlock,
    special388: CustomNodeComponentCaseFormatBlock,
    special389: CustomNodeComponentDiscreteRangeBlock,
    special390: CustomNodeComponentMergeBlock2,

    special81: BasicSymmetricErrorBars,
    special82: BarChartwithErrorBars,
    special83: HorizontalErrorBars,
    special84: AsymmetricErrorBars,
    special85: ColoredandStyledErrorBars,
    special86: ErrorBarsasaPercentageoftheyValue,
    special87: AsymmetricErrorBarswithaConstantOffset,

    special88: BasicBoxPlot,
    special89: BoxplothatDisplaysUnderlyingdata,
    special90: HorizontalBoxPlot,
    special91: GroupedBoxPlot,
    special92: BoxPlotStylingOutliers,
    special93: BoxPlotStylingMeanandStandardDeviation,
    special94: GroupedHorizontalBoxPlot,
    special95: ColoredBoxPLot,
    special96: FullyStyledBoxPlot,
    special97: RainBowBoxPlot,
    special98: BasicHistogram,
    special99: HorizontalHistogram,
    special100: OverlaidHistogram,
    special101: StackedHistogram,
    special102: ColoredandStyledHistogram,
    special103: CumulativeHistogram,
    special104: NormalizedHistogram,
    special105: SpecifyBinningFunction,
    special106: TwoDHistogramContourPlotwithHistogramSubplots,
    special107: TwoDHistogramContourPlotwithSliderControl,
    special108: FilledLines,
    special109: AsymmetricErrorBarswithaConstantOffset2,
    special110: SimpleContourPlot,
    special111: BasicContourPlot,
    special112: SettingXandYCoordinatesinaContourPlot,
    special113: ColorscaleforContourPlot,
    special114: CustomizingSizeandRangeofaContourPlotContours,
    special115: CustomizingSpacingBetweenXandYTicks,
    special116: ConnecttheGapsbetweenNullValuesintheZMatrix,
    special120: SmoothingContourLines,
    special121: SmoothContourColoring,
    special122: ContourLines,
    special123: ContourLinesLabels,
    special124: CustomColorscaleforContourPlot,
    special125: ColorBarTitle,
    special126: ColorBarSize,
    special127: StylingColorBarTicksforContourPlots,
    special128: BasicHeatmap,
    special129: HeatmapwithCategoricalAxisLabels,
    special130: AnnotatedHeatmap,
    special131: HeatmapwithUnequalBlockSizes,
    special132: BasicTernaryPlotwithMarkers,
    special133: SoilTypesTernaryPlot,
    special134: AddingDimensions,
    special135: BasicParallelCoordinatesPlot,
    special136: AnnotatedParallelCoordinatesPlot,
    special137: AdvancedParallelCoordinatesPlot,
    special138: LogarithmicAxes,
    special139: BasicWaterfallChart,
    special140: MultiCategoryWaterfallChart,
    special141: HorizontalWaterfallChart,
    special142: StyleWaterfallChart,
    special143: StyleWaterfallChart,
    special144: StyleWaterfallChart,
    special145: StyleWaterfallChart,
    special146: StyleWaterfallChart,
    special147: SimpleCandleStickChart,
    special148: CandlestickChartwithoutRangeslider,
    special149: CustomiseCandlestickChartwithShapesandAnnotations,
    special150: CustomizingCandlestickChartColors,
    special151: AddRangeselector,
    special152: BasicFunnelPlot,
    special153: SettingMarkerSizeandColor,
    special154: StackedFunnel,
    special155: FunnelareaPlot,
    special156: MultiFunnelarea,
    special157: DateStrings,
    special158: BasicTimeSeries,
    special159: ManuallySetRange,
    special160: TimeSerieswithRangeslider,
    special161: ThreeDScatterPlot,
    special162: BasicRibbonPlot,
    special163: Topographical3DSurfacePlot,
    special164: SurfacePlotWithContours,
    special165: Multiple3DSurfacePlots,
    special166: Simple3DMeshPlot,
    special167: ThreeDMeshPlotwithAlphahull,
    special168: ThreeDMeshTetrahedron,
    special169: ThreeDMeshCube,
    special170: ThreeDLinePlot,
    special171: ThreeDLinewithMarkersPlot,
    special172: ThreeDLineSpiralPlot,
    special173: ThreeDRandomWalkPlot,
    special174: SimpleSubplot,
    special175: CustomSizedSubplot,
    special176: MultipleSubplots,
    special177: SubplotswithSharedAxes,
    special178: StackedSubplots,
    special179: StackedSubplotswithaSharedXAxis,
    special180: MultipleCustomSizedSubplots,
    special181: SimpleInsetGraph,
    special182: Multiple3DSubplots,
    special183: MixedSubPlots,
    special184: TableandChartSubplot,
    special185: ClickEventData,
    special186: BindingToClickEvent,
    special187: Createannotationonclickevent,
    special188: HoverEventData,
    special189: CapturingHoverEventsData,
    special190: CapturingHoverEventsPixels,
    special191: TriggeringHoverEvents,
    special192: CoupledHoverEvents,
    special193: CombinedClickandHoverEvents,
    special194: BindingtoZoomEvents,
    special195: DisablingZoomEventsforXAxis,
    special196: DisablingZoomEventsforXandYAxis,
    special197: FilterBlock1,
    special198: GroupByBlock1,
    special199: Aggregations,
    special200: AggregateFunctions,
    special201: HistogramBinning,
    special202: MappingWithAggregates,
    special203: FilterAndGroupby,
    special204: FilterAndAggregates,
    special205: AllTransforms,
    special208: AddTwoDropdownMenustoaChart,
    special209: Binddropdowneventstocharts,
    special210: RestyleButtonSingleAttribute,
    special211: RestyleButtonMultipleAttributes,
    special212: RelayoutButton,
    special213: UpdateButton,
    special214: AnimateButton,
    special215: Stylethebuttons,

    special216: BasicSlider,
    special219: BindComponentstotheAppearanceofaPlot,
    special220: AddaPlayButtontoControlaSlider,
    special221: LassoSelection,
    special222: BasicRangeSlideronTimeSeries,
    special223: AnimatingtheData,
    special224: AnimatingtheLayout,
    special225: DefiningNamedFramesaddFrames,
    special226: AnimatingSequencesofFrames,
    special227: AnimatingManyFramesQuickly,
    special228: ObjectConstancy,
    special229: FrameGroupsandAnimationModes,
    special230: AnimatingwithaSlider,
    special231: FilledAreaAnimation,
    special232: MultipleTraceFilledArea,
    special233: MapAnimations,
    special243: AnimatingwithaSlider2
  }

  // const cpTextFunc2 = e => {
  //   setCpText2(e.target.value)
  // }

  const cpTextFunc = e => {
    selCpText === 'JSON'
      ? setCpText(JSON.parse(e.target.value))
      : selCpText === 'CSV'
      ? setCpText(readString(e.target.value))
      : setCpText(e.target.value)
  }

  const selCpChange = e => {
    setSelCpText(e.target.value)
    console.log(e.target.value)
  }
  function applyExpData () {
    typeId = 'ExampleData'
    global.type_id = 'ExampleData'
    closeModal()
    // setExpData(true)
    let def = [],
      ghm = []
    exampleData2.map(e => {
      def = []
      e.map(f => {
        if (f != null && typeof f != 'object') def.push({ value: f })
        else if (f != null && typeof f == 'object')
          def.push({ value: Object.values(f) })
      })
      ghm.push(def)
    })
    console.log('ghm??', ghm)
    setDt(ghm)
    setisExampleData(true)
  }
  function openModal () {
    setIsOpen(true)
  }
  function afterOpenModal () {
    subtitle.style.color = '#FFF'
  }
  function closeModal () {
    setIsOpen(false)
  }

  let onAdd = () => {
    setNode1('special')
    setNodeType('special')
    console.log('n1', node1)
    setIsSelected(true)
    closeModal()
    setDsp('2')
    setDspNo(false)
    setStateElements(elementsCustom)
  }
  let onAdd2 = () => {
    setNode1('special2')
    setNodeType('special2')
    console.log('n1', node1)
    setIsSelected(true)
    closeModal()
    setDsp('3')
    setDspNo(false)
    setStateElements(elementsCustom)
  }
  let onAdd3 = () => {
    setNode1('special3')
    setNodeType('special3')
    console.log('n1', node1)
    setIsSelected(true)
    closeModal()
    setDsp('4')
    setDspNo(false)
    setStateElements(elementsCustom)
  }
  let onAdd11 = () => {
    setNode1('special11')
    setNodeType('special11')
    console.log('n1', node1)
    setIsSelected(true)
    closeModal()
    setDsp('12')
    setDspNo(false)
    setStateElements(elementsCustom)
  }

  let onAdd5 = () => {
    setNode2('special5')
    setNodeType('special5')
    console.log('n2', node2)
    setIsSelected(true)
    closeModal()
    setDsp('6')
    setDspNo(false)
    setStateElements(elementsCustom)
  }
  let onAdd6 = () => {
    setNode2('special6')
    setNodeType('special6')
    console.log('n2', node2)
    setIsSelected(true)
    closeModal()
    setDsp('7')
    setDspNo(false)
    setStateElements(elementsCustom)
  }
  let onAdd7 = () => {
    setNode2('special7')
    setNodeType('special7')
    console.log('n2', node2)
    setIsSelected(true)
    closeModal()
    setDsp('8')
    setDspNo(false)
    setStateElements(elementsCustom)
  }
  let onAdd8 = () => {
    setNode2('special8')
    setNodeType('special8')
    console.log('n2', node2)
    setIsSelected(true)
    closeModal()
    setDsp('9')
    setDspNo(false)
    setStateElements(elementsCustom)
  }
  let onAdd9 = () => {
    setNode2('special9')
    setNodeType('special9')
    console.log('n2', node2)
    setIsSelected(true)
    closeModal()
    setDsp('10')
    setDspNo(false)
    setStateElements(elementsCustom)
  }
  let onAdd10 = () => {
    setNode2('special10')
    setNodeType('special0')
    console.log('n2', node2)
    setIsSelected(true)
    closeModal()
    setDsp('11')
    setDspNo(false)
    setStateElements(elementsCustom)
  }

  let onAdd14 = () => {
    nodeBox.push('special14')
    setNode3('special14')
    setNodeType('special14')
    // console.log('n3', node3, vnodes, nodeBox)
    setIsSelected(true)
    closeModal()
    setDsp('15')
    setDspNo(false)
    setStateElements(elementsCustom)
  }
  let onAdd15 = () => {
    setNode4('special15')
    setNodeType('special15')
    console.log('n4', node4)
    setIsSelected3(true)
    closeModal()
    setDsp('16')
    setDspNo(false)
    setStateElements(elementsCustom)
  }
  let onAdd16 = () => {
    setNode4('special16')
    setNodeType('special16')
    console.log('n4', node4)
    setIsSelected3(true)
    closeModal()
    setDsp('17')
    setDspNo(false)
    setStateElements(elementsCustom)
  }

  let onAddNode = (node_type, nodeId, nodeTitle) => {
    // console.log('NodeBox2 Length', nodeBox.length)
    // if (IsNumericString == true) {
    if (nodeBox2.length < 6) {
      if (nodeBox.includes(node_type) === true) {
        setGraphAlreadySelected(true)
        //  console.log('came here',validationMessageRef.current)
        setTimeout(
          () =>
            validationMessageRef.current?.scrollIntoView({ block: 'start' }),
          800
        )

        setTimeout(() => setGraphAlreadySelected(false), 3500)
        return
      }
      if (nodeBox.includes(node_type) !== true) {
        nodeBox.push(node_type)
        nodeBox2.push({
          id: nodeId,
          type: node_type,
          title: nodeTitle && nodeTitle
        })
        setNode3(node_type)
        setNodeType(node_type)
        setIsSelected2(true)
      }
      closeModal()
      setDsp(nodeId)
      setDspNo(false)
      setStateElements(elementsCustom)
    } else {
      window.alert('Cannot add more graphs!')
      closeModal()
    }
  }

  let onAdd81 = () => {
    setNode2('special381')
    setNodeType('special381')
    console.log('n2', node2)
    setIsSelected(true)
    closeModal()
    setDsp('381')
    setDspNo(false)
    setStateElements(elementsCustom)
  }
  let onAdd82 = () => {
    setNode2('special382')
    setNodeType('special382')
    console.log('n2', node2)
    setIsSelected(true)
    closeModal()
    setDsp('382')
    setDspNo(false)
    setStateElements(elementsCustom)
  }
  let onAdd83 = () => {
    setNode2('special383')
    setNodeType('special383')
    console.log('n2', node2)
    setIsSelected(true)
    closeModal()
    setDsp('383')
    setDspNo(false)
    setStateElements(elementsCustom)
  }
  let onAdd84 = () => {
    setNode2('special384')
    setNodeType('special384')
    console.log('n2', node2)
    setIsSelected(true)
    closeModal()
    setDsp('384')
    setDspNo(false)
    setStateElements(elementsCustom)
  }
  let onAdd85 = () => {
    setNode2('special385')
    setNodeType('special385')
    console.log('n2', node2)
    setIsSelected(true)
    closeModal()
    setDsp('385')
    setDspNo(false)
    setStateElements(elementsCustom)
  }
  let onAdd86 = () => {
    setNode2('special386')
    setNodeType('special386')
    console.log('n2', node2)
    setIsSelected(true)
    closeModal()
    setDsp('386')
    setDspNo(false)
    setStateElements(elementsCustom)
  }
  let onAdd87 = () => {
    setNode2('special387')
    setNodeType('special387')
    console.log('n2', node2)
    setIsSelected(true)
    closeModal()
    setDsp('387')
    setDspNo(false)
    setStateElements(elementsCustom)
  }
  let onAdd88 = () => {
    setNode2('special388')
    setNodeType('special388')
    console.log('n2', node2)
    setIsSelected(true)
    closeModal()
    setDsp('388')
    setDspNo(false)
    setStateElements(elementsCustom)
  }
  let onAdd89 = () => {
    setNode2('special389')
    setNodeType('special389')
    console.log('n2', node2)
    setIsSelected(true)
    closeModal()
    setDsp('389')
    setDspNo(false)
    setStateElements(elementsCustom)
  }

  let onAdd51 = () => {
    setNode2('special390')
    setNodeType('special390')
    console.log('n2', node2)
    setIsSelected(true)
    closeModal()
    setDsp('390')
    setDspNo(false)
    setStateElements(elementsCustom)
  }
  return (
    <>
      {authContext.isLoggedIn ? (
        <>
          <MiniDrawer />
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel='Example Modal'
          >
            <div style={{ display: 'flex' }}>
              {activeStep === 0 ? (
                <div ref={_subtitle => (subtitle = _subtitle)}>
                  <h2
                    style={{
                      color: '#0c0c0c',
                      marginLeft: 7,
                      fontFamily: 'Trebuchet MS'
                    }}
                  >
                    Block Library - Input
                  </h2>
                </div>
              ) : activeStep === 1 ? (
                <div ref={_subtitle => (subtitle = _subtitle)}>
                  <h2 style={{ color: '#0c0c0c', fontFamily: 'Trebuchet MS' }}>
                    Block Library - Transform
                  </h2>
                </div>
              ) : activeStep === 2 ? (
                <div ref={_subtitle => (subtitle = _subtitle)}>
                  <h2 style={{ color: '#0c0c0c', fontFamily: 'Trebuchet MS' }}>
                    Block Library - Visualizations
                  </h2>
                </div>
              ) : (
                <div ref={_subtitle => (subtitle = _subtitle)}>
                  <h2
                    ref={_subtitle => (subtitle = _subtitle)}
                    style={{ color: '#0c0c0c', fontFamily: 'Trebuchet MS' }}
                  >
                    Block Library - Statistics & Export
                  </h2>
                </div>
              )}
              <button
                onClick={closeModal}
                style={{
                  height: 28,
                  position: 'absolute',
                  left: '95%',
                  marginTop: 28
                }}
              >
                X
              </button>
            </div>

            <div
              style={{
                width: '100%',
                display: 'inline-block',
                color: '#FFF',
                verticalAlign: 'top',
                overflow: 'scroll'
              }}
            >
              {activeStep === 2 && (
                <h2 style={{ color: '#0c0c0c', fontFamily: 'Trebuchet MS' }}>
                  Basic Charts
                </h2>
              )}
              {graphAlreadySelected && (
                <div ref={validationMessageRef}>
                  <Alert
                    style={{
                      margin: 10,
                      height: 40,
                      alignItems: 'center',
                      fontFamily: 'Trebuchet MS'
                    }}
                    severity={'error'}
                  >
                    Chart Already Selected
                  </Alert>
                </div>
              )}
              {activeStep === 2 && (
                <h3
                  style={{
                    marginLeft: 45,
                    color: '#0c0c0c',
                    fontFamily: 'Trebuchet MS'
                  }}
                >
                  - Scatter Plots
                </h3>
              )}
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {activeStep === 0
                  ? inputOptionsBox &&
                    inputOptionsBox.map((row, index) => (
                      <div
                        onClick={row.onpress}
                        style={{
                          padding: '10px',
                          width: '47%',
                          height: 125,
                          background: '#A9A9A9',
                          display: 'inline-block',
                          marginRight: 10,
                          margin: 10,
                          borderRadius: 5,
                          boxShadow: '2px 3px 3px #707070',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex' }}>
                          <img
                            src={row.img}
                            style={{
                              display: 'block',
                              marginLeft: 10,
                              marginRight: 12
                            }}
                            height={95}
                            width={'auto'}
                            alt={''}
                          />

                          <div>
                            <div
                              style={{
                                marginTop: -5,
                                color: '#ecda8e',
                                fontFamily: 'Trebuchet MS',
                                fontSize: 45
                                // fontWeight: 'bold'
                              }}
                            >
                              {row.title}
                            </div>

                            <p
                              style={{
                                marginTop: 1,
                                color: '#FFF',
                                fontSize: 12,
                                flexWrap: 'wrap',
                                height: 30
                              }}
                            >
                              {row.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  : activeStep === 1
                  ? transformOptions.section1.map((row, index) => (
                      <div
                        onClick={row.onpress}
                        style={{
                          padding: '10px',
                          width: '47%',
                          height: 125,
                          background: '#A9A9A9',
                          display: 'inline-block',
                          marginRight: 10,
                          margin: 10,
                          borderRadius: 5,
                          boxShadow: '2px 3px 3px #707070',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex' }}>
                          <img
                            src={row.img}
                            style={{
                              display: 'block',
                              marginLeft: 10,
                              marginRight: 12
                            }}
                            height={95}
                            width={'auto'}
                            alt={''}
                          />

                          <div>
                            <div
                              style={{
                                marginTop: -5,
                                color: '#ecda8e',
                                fontFamily: 'Trebuchet MS',
                                fontSize: 45
                                // fontWeight: 'bold'
                              }}
                            >
                              {row.title}
                            </div>

                            <p
                              style={{
                                marginTop: 1,
                                color: '#FFF',
                                fontSize: 12,
                                flexWrap: 'wrap',
                                height: 30
                              }}
                            >
                              {row.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  : activeStep === 2
                  ? visualizationOptions.section1.map((row, index) => (
                      <div
                        onClick={row.onpress}
                        style={{
                          padding: '10px',
                          width: '31%',
                          height: 220,
                          background: '#A9A9A9',
                          display: 'inline-block',
                          //marginRight: 10,
                          margin: 5,
                          position: 'relative',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ position: 'absolute' }}>
                          <text
                            style={{
                              color: '#ecda8e',
                              fontWeight: 'bold',
                              fontFamily: 'Trebuchet MS'
                            }}
                          >
                            {row.title}
                          </text>
                        </div>
                        <div
                          style={{
                            height: 110,
                            width: '100%',
                            backgroundColor: '#FFF'
                          }}
                        >
                          <div
                            style={{
                              marginTop: 80,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <img
                              src={row.img}
                              style={{ resizeMode: 'stretch' }}
                              height={110}
                              width={'70%'}
                              alt={''}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  : activeStep === 3
                  ? miscOptions.section1.map((row, index) => (
                      <div
                        onClick={row.onpress}
                        style={{
                          padding: '10px',
                          width: '47%',
                          height: 125,
                          background: '#A9A9A9',
                          display: 'inline-block',
                          marginRight: 10,
                          margin: 10,
                          borderRadius: 5,
                          boxShadow: '2px 3px 3px #707070',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex' }}>
                          <img
                            src={row.img}
                            style={{
                              display: 'block',
                              marginLeft: 10,
                              marginRight: 12
                            }}
                            height={95}
                            width={'auto'}
                            alt={''}
                          />

                          <div>
                            <div
                              style={{
                                marginTop: -5,
                                color: '#ecda8e',
                                fontFamily: 'Trebuchet MS',
                                fontSize: 45
                                // fontWeight: 'bold'
                              }}
                            >
                              {row.title}
                            </div>

                            <p
                              style={{
                                marginTop: 1,
                                color: '#FFF',
                                fontSize: 12,
                                flexWrap: 'wrap',
                                height: 30
                              }}
                            >
                              {row.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
              <div
                style={{
                  width: '100%',
                  marginTop: '10px',
                  display: 'flex',
                  flexWrap: 'wrap'
                }}
              >
                {activeStep === 0
                  ? null
                  : activeStep === 1
                  ? transformOptions.section2.map((row, index) => (
                      <div
                        onClick={row.onpress}
                        style={{
                          padding: '10px',
                          width: '47%',
                          height: 125,
                          background: '#A9A9A9',
                          display: 'inline-block',
                          marginRight: 10,
                          margin: 10,
                          borderRadius: 5,
                          boxShadow: '2px 3px 3px #707070',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex' }}>
                          <img
                            src={row.img}
                            style={{
                              display: 'block',
                              marginLeft: 10,
                              marginRight: 12
                            }}
                            height={95}
                            width={'auto'}
                            alt={''}
                          />

                          <div>
                            <div
                              style={{
                                marginTop: -5,
                                color: '#ecda8e',
                                fontFamily: 'Trebuchet MS',
                                fontSize: 45
                                // fontWeight: 'bold'
                              }}
                            >
                              {row.title}
                            </div>

                            <p
                              style={{
                                marginTop: 1,
                                color: '#FFF',
                                fontSize: 12,
                                flexWrap: 'wrap',
                                height: 30
                              }}
                            >
                              {row.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
              {activeStep === 2 && (
                <h3
                  style={{
                    marginLeft: 45,
                    color: '#0c0c0c',
                    fontFamily: 'Trebuchet MS'
                  }}
                >
                  - Line Charts
                </h3>
              )}
              <div
                style={{
                  width: '100%',
                  marginTop: '10px',
                  display: 'flex',
                  flexWrap: 'wrap'
                }}
              >
                {activeStep === 1
                  ? transformOptions.section3.map((row, index) => (
                      <div
                        onClick={row.onpress}
                        style={{
                          padding: '10px',
                          width: '47%',
                          height: 125,
                          background: '#A9A9A9',
                          display: 'inline-block',
                          marginRight: 10,
                          margin: 10,
                          borderRadius: 5,
                          boxShadow: '2px 3px 3px #707070',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex' }}>
                          <img
                            src={row.img}
                            style={{
                              display: 'block',
                              marginLeft: 10,
                              marginRight: 12
                            }}
                            height={95}
                            width={'auto'}
                            alt={''}
                          />

                          <div>
                            <div
                              style={{
                                marginTop: -5,
                                color: '#ecda8e',
                                fontFamily: 'Trebuchet MS',
                                fontSize: 45
                                // fontWeight: 'bold'
                              }}
                            >
                              {row.title}
                            </div>

                            <p
                              style={{
                                marginTop: 1,
                                color: '#FFF',
                                fontSize: 12,
                                flexWrap: 'wrap',
                                height: 30
                              }}
                            >
                              {row.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  : activeStep === 2
                  ? visualizationOptions.section3.map((row, index) => (
                      <div
                        onClick={row.onpress}
                        style={{
                          padding: '10px',
                          width: '30%',
                          height: 215,
                          background: '#A9A9A9',
                          display: 'inline-block',
                          marginRight: 10,
                          margin: 5,
                          position: 'relative'
                        }}
                      >
                        <div style={{ position: 'absolute' }}>
                          <text
                            style={{
                              color: '#ecda8e',
                              fontWeight: 'bold',
                              fontFamily: 'Trebuchet MS'
                            }}
                          >
                            {row.title}
                          </text>
                        </div>
                        <div
                          style={{
                            height: 110,
                            width: '100%',
                            backgroundColor: '#FFF'
                          }}
                        >
                          <div
                            style={{
                              marginTop: 80,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <img
                              src={row.img}
                              style={{ resizeMode: 'stretch' }}
                              height={110}
                              width={'70%'}
                              alt={''}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
              <div
                style={{
                  width: '100%',
                  marginTop: '10px',
                  display: 'flex',
                  flexWrap: 'wrap'
                }}
              >
                {activeStep === 1
                  ? transformOptions.section4.map((row, index) => (
                      <div
                        onClick={row.onpress}
                        style={{
                          padding: '10px',
                          width: '47%',
                          height: 125,
                          background: '#A9A9A9',
                          display: 'inline-block',
                          marginRight: 10,
                          margin: 10,
                          borderRadius: 5,
                          boxShadow: '2px 3px 3px #707070',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex' }}>
                          <img
                            src={row.img}
                            style={{
                              display: 'block',
                              marginLeft: 10,
                              marginRight: 12
                            }}
                            height={95}
                            width={'auto'}
                            alt={''}
                          />

                          <div>
                            <div
                              style={{
                                marginTop: -5,
                                color: '#ecda8e',
                                fontFamily: 'Trebuchet MS',
                                fontSize: 45
                                // fontWeight: 'bold'
                              }}
                            >
                              {row.title}
                            </div>

                            <p
                              style={{
                                marginTop: 1,
                                color: '#FFF',
                                fontSize: 12,
                                flexWrap: 'wrap',
                                height: 30
                              }}
                            >
                              {row.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
              <div
                style={{
                  width: '100%',
                  marginTop: '10px',
                  display: 'flex',
                  flexWrap: 'wrap'
                }}
              >
                {activeStep === 1
                  ? transformOptions.section5.map((row, index) => (
                      <div
                        onClick={row.onpress}
                        style={{
                          padding: '10px',
                          width: '47%',
                          height: 125,
                          background: '#A9A9A9',
                          display: 'inline-block',
                          marginRight: 10,
                          margin: 10,
                          borderRadius: 5,
                          boxShadow: '2px 3px 3px #707070',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex' }}>
                          <img
                            src={row.img}
                            style={{
                              display: 'block',
                              marginLeft: 10,
                              marginRight: 12
                            }}
                            height={95}
                            width={'auto'}
                            alt={''}
                          />

                          <div>
                            <div
                              style={{
                                marginTop: -5,
                                color: '#ecda8e',
                                fontFamily: 'Trebuchet MS',
                                fontSize: 45
                                // fontWeight: 'bold'
                              }}
                            >
                              {row.title}
                            </div>

                            <p
                              style={{
                                marginTop: 1,
                                color: '#FFF',
                                fontSize: 12,
                                flexWrap: 'wrap',
                                height: 30
                              }}
                            >
                              {row.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </div>

              <div
                style={{
                  width: '100%',
                  marginTop: '10px',
                  display: 'flex',
                  flexWrap: 'wrap'
                }}
              >
                {activeStep === 1
                  ? transformOptions.section6.map((row, index) => (
                      <div
                        onClick={row.onpress}
                        style={{
                          padding: '10px',
                          width: '47%',
                          height: 125,
                          background: '#A9A9A9',
                          display: 'inline-block',
                          marginRight: 10,
                          margin: 10,
                          borderRadius: 5,
                          boxShadow: '2px 3px 3px #707070',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex' }}>
                          <img
                            src={row.img}
                            style={{
                              display: 'block',
                              marginLeft: 10,
                              marginRight: 12
                            }}
                            height={95}
                            width={'auto'}
                            alt={''}
                          />

                          <div>
                            <div
                              style={{
                                marginTop: -5,
                                color: '#ecda8e',
                                fontFamily: 'Trebuchet MS',
                                fontSize: 45
                                // fontWeight: 'bold'
                              }}
                            >
                              {row.title}
                            </div>

                            <p
                              style={{
                                marginTop: 1,
                                color: '#FFF',
                                fontSize: 12,
                                flexWrap: 'wrap',
                                height: 30
                              }}
                            >
                              {row.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </div>

              <div
                style={{
                  width: '100%',
                  marginTop: '10px',
                  display: 'flex',
                  flexWrap: 'wrap'
                }}
              >
                {activeStep === 1
                  ? transformOptions.section7.map((row, index) => (
                      <div
                        onClick={row.onpress}
                        style={{
                          padding: '10px',
                          width: '47%',
                          height: 125,
                          background: '#A9A9A9',
                          display: 'inline-block',
                          marginRight: 10,
                          margin: 10,
                          borderRadius: 5,
                          boxShadow: '2px 3px 3px #707070',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex' }}>
                          <img
                            src={row.img}
                            style={{
                              display: 'block',
                              marginLeft: 10,
                              marginRight: 12
                            }}
                            height={95}
                            width={'auto'}
                            alt={''}
                          />

                          <div>
                            <div
                              style={{
                                marginTop: -5,
                                color: '#ecda8e',
                                fontFamily: 'Trebuchet MS',
                                fontSize: 45
                                // fontWeight: 'bold'
                              }}
                            >
                              {row.title}
                            </div>

                            <p
                              style={{
                                marginTop: 1,
                                color: '#FFF',
                                fontSize: 12,
                                flexWrap: 'wrap',
                                height: 30
                              }}
                            >
                              {row.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
              {activeStep === 2 && (
                <h3
                  style={{
                    marginLeft: 45,
                    color: '#0c0c0c',
                    fontFamily: 'Trebuchet MS'
                  }}
                >
                  - Bar Charts
                </h3>
              )}
              <div>
                <div>
                  {activeStep === 2
                    ? visualizationOptions.section5.map((row, index) => (
                        <div
                          onClick={row.onpress}
                          style={{
                            padding: '10px',
                            width: '30%',
                            height: 215,
                            background: '#A9A9A9',
                            display: 'inline-block',
                            marginRight: 10,
                            margin: 5,
                            position: 'relative'
                          }}
                        >
                          <div style={{ position: 'absolute' }}>
                            <text
                              style={{
                                color: '#ecda8e',
                                fontWeight: 'bold',
                                fontFamily: 'Trebuchet MS'
                              }}
                            >
                              {row.title}
                            </text>
                          </div>
                          <div
                            style={{
                              height: 110,
                              width: '100%',
                              backgroundColor: '#FFF'
                            }}
                          >
                            <div
                              style={{
                                marginTop: 80,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                              }}
                            >
                              <img
                                src={row.img}
                                style={{ resizeMode: 'stretch' }}
                                height={110}
                                width={'70%'}
                                alt={''}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    : null}
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Pie Charts
                    </h3>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section6.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Bubble Charts
                    </h3>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section7.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Dot Plots
                    </h3>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section8.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Filled Area Plots
                    </h3>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section9.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Horizontal Bar Charts
                    </h3>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section10.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Sunburst Charts
                    </h3>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section11.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Sankey Diagrams
                    </h3>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section12.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Point Cloud
                    </h3>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section13.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - TreeMaps
                    </h3>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section14.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Multiple Chart Types
                    </h3>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section15.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - WebGL vs SVG
                    </h3>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section16.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h2
                      style={{ color: '#0c0c0c', fontFamily: 'Trebuchet MS' }}
                    >
                      Statistical Charts
                    </h2>
                  )}
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Error Bars
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section17.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Box Plots
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section18.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Histogram
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section19.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - 2d Density Plots
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section20.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Continuous Error Bars
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section21.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h2
                      style={{ color: '#0c0c0c', fontFamily: 'Trebuchet MS' }}
                    >
                      Scientific Charts
                    </h2>
                  )}
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Contour Plots
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section22.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Heat Maps
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section23.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>

                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Parallel Coordinates Plot
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section25.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>

                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Log Plots
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section26.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>

                  {activeStep === 2 && (
                    <h2
                      style={{ color: '#0c0c0c', fontFamily: 'Trebuchet MS' }}
                    >
                      Financial Charts
                    </h2>
                  )}
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Waterfall Charts
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section27.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>

                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Candlestick Charts
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section29.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Funnel and Funnel Area Charts
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section30.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Time Series
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section31.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - 3D Charts
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section32.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - 3D Surface Plots
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.sectionSub3D.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - 3D Mesh Plots
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section33.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - 3D Line Plot
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section34.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h2
                      style={{ color: '#0c0c0c', fontFamily: 'Trebuchet MS' }}
                    >
                      Subplots
                    </h2>
                  )}
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Subplots
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section35a.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Inset Plots
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section35.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - 3D Subplots
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section36.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Mixed Subplots
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section37.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Table Subplots
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section38.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h2
                      style={{ color: '#0c0c0c', fontFamily: 'Trebuchet MS' }}
                    >
                      Custom Chart Events
                    </h2>
                  )}
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Click Events
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section39.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Hover Events
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section40.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Zoom Events
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section41.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Disable Zoom Events
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section42.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h2
                      style={{ color: '#0c0c0c', fontFamily: 'Trebuchet MS' }}
                    >
                      Transform
                    </h2>
                  )}
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Filter
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section43.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Aggregations
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section44.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Multiple Transforms
                    </h3>
                  )}

                  {activeStep === 2 && (
                    <h2
                      style={{ color: '#0c0c0c', fontFamily: 'Trebuchet MS' }}
                    >
                      Custom Controls
                    </h2>
                  )}
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Dropdown Events
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section46.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Button Events
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section48.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Slider Events
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section49.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Lasso Selection
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section50a.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Range Slider and Selector
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section50.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h2
                      style={{ color: '#0c0c0c', fontFamily: 'Trebuchet MS' }}
                    >
                      Animations
                    </h2>
                  )}
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Animations
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section51.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>

                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Filled-Area Animation
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section53.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                  {activeStep === 2 && (
                    <h3
                      style={{
                        marginLeft: 45,
                        color: '#0c0c0c',
                        fontFamily: 'Trebuchet MS'
                      }}
                    >
                      - Map Animation
                    </h3>
                  )}

                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {activeStep === 2
                      ? visualizationOptions.section54.map((row, index) => (
                          <div
                            onClick={row.onpress}
                            style={{
                              padding: '10px',
                              width: '31%',
                              height: 220,
                              background: '#A9A9A9',
                              display: 'inline-block',
                              marginRight: 10,
                              margin: 5,
                              position: 'relative'
                            }}
                          >
                            <div style={{ position: 'absolute' }}>
                              <text
                                style={{
                                  color: '#ecda8e',
                                  fontWeight: 'bold',
                                  fontFamily: 'Trebuchet MS'
                                }}
                              >
                                {row.title}
                              </text>
                            </div>
                            <div
                              style={{
                                height: 110,
                                width: '100%',
                                backgroundColor: '#FFF'
                              }}
                            >
                              <div
                                style={{
                                  marginTop: 80,
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                                <img
                                  src={row.img}
                                  style={{ resizeMode: 'stretch' }}
                                  height={110}
                                  width={'70%'}
                                  alt={''}
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                marginTop: -50,
                justifyContent: 'left',
                marginLeft: '120px',
                justifyContent: 'left'
              }}
            >
              <h2
                style={{
                  fontWeight: 'bold',
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  fontFamily: 'Trebuchet MS'
                }}
              >
                CREATE A FLOW
              </h2>
              <p
                style={{
                  display: 'block',
                  width: '100%',
                  justifyContent: 'left',
                  textAlign: 'left',
                  fontFamily: 'Trebuchet MS'
                }}
              >
                Create a flow to Ingest, transform and visualize your data with
                250+ visualizations to derive valuable insights with no code
                development.
              </p>
            </div>
            <div
              style={{
                marginTop: -15,
                marginLeft: 0,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {activeStep !== 4 && (
                <div
                  style={{
                    marginTop: 20,
                    alignSelf: 'center',
                    verticalAlign: 'top'
                  }}
                >
                  <Box>
                    <Stepper
                      style={{ width: width - 150, marginLeft: 80, height: 90 }}
                      // alternativeLabel
                      activeStep={activeStep}
                      connector={<ColorlibConnector />}
                    >
                      {steps.map((step, index) => (
                        <Step
                          style={{
                            // backgroundColor: '#e3cf96',
                            borderRadius: '10px'
                          }}
                          key={step.label}
                        >
                          <StepLabel
                            StepIconComponent={ColorlibStepIcon}
                            optional={
                              index === 4 ? (
                                <Typography
                                  style={{ color: '#c76118' }}
                                  variant='caption'
                                >
                                  Final Step
                                </Typography>
                              ) : index === 0 ? (
                                <Typography
                                  style={{ color: '#c76118' }}
                                  variant='caption'
                                >
                                  Ingest your data sources
                                </Typography>
                              ) : index === 1 ? (
                                <Typography
                                  style={{ color: '#c76118' }}
                                  variant='caption'
                                >
                                  Transform your dataset <br />
                                  into valuable asset
                                </Typography>
                              ) : index === 2 ? (
                                <Typography
                                  style={{ color: '#c76118' }}
                                  variant='caption'
                                >
                                  Visualize your data
                                </Typography>
                              ) : index === 3 ? (
                                <Typography
                                  style={{ color: '#c76118' }}
                                  variant='caption'
                                >
                                  Analyse the data
                                  <br />
                                  and implement the
                                  <br />
                                  statistical view on it
                                </Typography>
                              ) : null
                            }
                          >
                            <Typography
                              variant='caption'
                              sx={{
                                fontWeight:
                                  activeStep === index ? 'bold' : 'light'
                              }}
                            >
                              {step.label}
                            </Typography>
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>
                </div>
              )}

              <div style={{ display: 'flex', marginTop: 10 }}>
                <div
                  style={{
                    marginLeft: 100,
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {activeStep === 0 ? (
                    <>
                      <Card
                        sx={{
                          minWidth: 220,
                          maxWidth: 225,
                          backgroundColor: 'white',
                          border: '1px solid #cccccc',
                          overflowY: 'auto'
                        }}
                      >
                        <>
                          <div
                            style={{
                              width: '100%',
                              height: 500,
                              display: 'inline-block',
                              verticalAlign: 'top',
                              //overflow: 'scroll',
                              marginTop: 2
                            }}
                          >
                            <div style={{ width: '80%', margin: 20 }}>
                              <TextField
                                required
                                id='outlined-required'
                                label='Flow Name'
                                InputLabelProps={{
                                  shrink: true
                                }}
                                style={{
                                  width: '100%',
                                  float: 'left'
                                }}
                                value={flowName}
                                onChange={e => {
                                  setFlowName(e.target.value)
                                  setNoFlowName(false)
                                }}
                                size='small'
                              />
                              <p
                                style={{
                                  marginTop: '12px',
                                  postion: 'relative',
                                  fontSize: '0.7rem',
                                  fontWeight: '300',
                                  textAlign: 'left'
                                }}
                              >
                                The name must have 1-128 characters. Valid
                                characters: A-Z, a-z, 0-9, - (hyphen), and _
                                (underscore).
                              </p>
                            </div>
                            <div style={{ width: '80%', margin: 20 }}>
                              <TextField
                                id='standard-textarea'
                                label='Description - (optional)'
                                //  placeholder='Description - (optional)'
                                value={flowDescription}
                                InputLabelProps={{
                                  shrink: true
                                }}
                                multiline
                                rows={6}
                                style={{
                                  width: '100%',
                                  float: 'left'
                                }}
                                disabled={activeStep !== 0 ? true : false}
                                onChange={e => {
                                  setFlowDescription(e.target.value)
                                }}
                                size='small'
                              />
                              <p
                                style={{
                                  marginTop: '12px',
                                  postion: 'relative',
                                  fontSize: '0.7rem',
                                  fontWeight: '300',
                                  textAlign: 'left'
                                }}
                              >
                                The description can have 1-256 characters.
                              </p>
                            </div>
                            <div
                              style={{
                                width: '80%',
                                marginTop: -10,
                                marginLeft: 30
                              }}
                            >
                              <p
                                style={{
                                  postion: 'relative',
                                  fontSize: '0.9rem',
                                  fontWeight: '300',
                                  textAlign: 'left',
                                  fontStyle: 'italic'
                                }}
                              >
                                The first step involves data selection of data
                                set from pre-defined datablocks available on the
                                right side.
                              </p>
                            </div>
                          </div>
                        </>
                      </Card>
                    </>
                  ) : null}

                  {activeStep === 1 ? (
                    <>
                      <Card
                        sx={{
                          minWidth: 220,
                          maxWidth: 225,
                          backgroundColor: 'white',
                          border: '1px solid #cccccc',
                          overflowY: 'auto'
                        }}
                      >
                        <div
                          style={{
                            width: '100%',
                            height: 500,
                            display: 'inline-block',
                            verticalAlign: 'top',
                            //overflow: 'scroll',
                            marginTop: 2
                          }}
                        >
                          <div style={{ width: '80%', margin: 20 }}>
                            <TextField
                              required
                              id='outlined-required'
                              label='Flow Name'
                              InputLabelProps={{
                                shrink: true
                              }}
                              style={{
                                width: '100%',
                                float: 'left'
                              }}
                              value={flowName}
                              onChange={e => {
                                setFlowName(e.target.value)
                                setNoFlowName(false)
                              }}
                              size='small'
                              disabled={true}
                            />
                            <p
                              style={{
                                marginTop: '12px',
                                postion: 'relative',
                                fontSize: '0.7rem',
                                fontWeight: '300',
                                textAlign: 'left'
                              }}
                            >
                              The name must have 1-128 characters. Valid
                              characters: A-Z, a-z, 0-9, - (hyphen), and _
                              (underscore).
                            </p>
                          </div>
                          <div style={{ width: '80%', margin: 20 }}>
                            <TextField
                              id='outlined-multiline-flexible'
                              label='Description - (optional)'
                              //  placeholder='Description - (optional)'
                              value={flowDescription}
                              multiline
                              rows={6}
                              style={{
                                width: '100%',
                                float: 'left'
                              }}
                              disabled={activeStep !== 0 ? true : false}
                              onChange={e => {
                                setFlowDescription(e.target.value)
                              }}
                              size='small'
                            />
                            <p
                              style={{
                                marginTop: '12px',
                                postion: 'relative',
                                fontSize: '0.7rem',
                                fontWeight: '300',
                                textAlign: 'left'
                              }}
                            >
                              The description can have 1-256 characters.
                            </p>
                          </div>
                          <div
                            style={{
                              width: '80%',
                              marginTop: -10,
                              marginLeft: 30
                            }}
                          >
                            <p
                              style={{
                                postion: 'relative',
                                fontSize: '0.9rem',
                                fontWeight: '300',
                                textAlign: 'left',
                                fontStyle: 'italic'
                              }}
                            >
                              The first step involves data selection of data set
                              from pre-defined datablocks available on the right
                              side.
                            </p>
                          </div>
                        </div>
                      </Card>
                    </>
                  ) : null}

                  {activeStep === 2 ? (
                    <>
                      <Card
                        sx={{
                          minWidth: 220,
                          maxWidth: 225,
                          backgroundColor: 'white',
                          border: '1px solid #cccccc',
                          overflowY: 'auto'
                        }}
                      >
                        <div
                          style={{
                            width: '100%',
                            height: 500,
                            display: 'inline-block',
                            verticalAlign: 'top',
                            marginTop: 2
                          }}
                        >
                          <div style={{ width: '80%', margin: 20 }}>
                            <TextField
                              required
                              id='outlined-required'
                              label='Flow Name'
                              InputLabelProps={{
                                shrink: true
                              }}
                              style={{
                                width: '100%',
                                float: 'left'
                              }}
                              value={flowName}
                              onChange={e => {
                                setFlowName(e.target.value)
                                setNoFlowName(false)
                              }}
                              size='small'
                              disabled={true}
                            />
                            <p
                              style={{
                                marginTop: '12px',
                                postion: 'relative',
                                fontSize: '0.7rem',
                                fontWeight: '300',
                                textAlign: 'left'
                              }}
                            >
                              The name must have 1-128 characters. Valid
                              characters: A-Z, a-z, 0-9, - (hyphen), and _
                              (underscore).
                            </p>
                          </div>
                          <div style={{ width: '80%', margin: 20 }}>
                            <TextField
                              id='outlined-multiline-flexible'
                              label='Description - (optional)'
                              //  placeholder='Description - (optional)'
                              value={flowDescription}
                              multiline
                              rows={6}
                              style={{
                                width: '100%',
                                float: 'left'
                              }}
                              disabled={activeStep !== 0 ? true : false}
                              onChange={e => {
                                setFlowDescription(e.target.value)
                              }}
                              size='small'
                            />
                            <p
                              style={{
                                marginTop: '12px',
                                postion: 'relative',
                                fontSize: '0.7rem',
                                fontWeight: '300',
                                textAlign: 'left'
                              }}
                            >
                              The description can have 1-256 characters.
                            </p>
                          </div>
                          <div
                            style={{
                              width: '80%',
                              marginTop: -10,
                              marginLeft: 30
                            }}
                          >
                            <p
                              style={{
                                postion: 'relative',
                                fontSize: '0.9rem',
                                fontWeight: '300',
                                textAlign: 'left',
                                fontStyle: 'italic'
                              }}
                            >
                              The first step involves data selection of data set
                              from pre-defined datablocks available on the right
                              side.
                            </p>
                          </div>
                        </div>
                      </Card>
                    </>
                  ) : null}

                  {activeStep === 3 ? (
                    <>
                      <Card
                        sx={{
                          minWidth: 220,
                          maxWidth: 225,
                          backgroundColor: 'white',
                          border: '1px solid #cccccc',
                          overflowY: 'auto'
                        }}
                      >
                        <div
                          style={{
                            width: '100%',
                            height: 500,
                            display: 'inline-block',
                            verticalAlign: 'top',
                            //overflow: 'scroll',
                            marginTop: 2
                          }}
                        >
                          <div style={{ width: '80%', margin: 20 }}>
                            <TextField
                              required
                              id='outlined-required'
                              label='Flow Name'
                              InputLabelProps={{
                                shrink: true
                              }}
                              style={{
                                width: '100%',
                                float: 'left'
                              }}
                              value={flowName}
                              onChange={e => {
                                setFlowName(e.target.value)
                                setNoFlowName(false)
                              }}
                              size='small'
                              disabled={true}
                            />
                            <p
                              style={{
                                marginTop: '12px',
                                postion: 'relative',
                                fontSize: '0.7rem',
                                fontWeight: '300',
                                textAlign: 'left'
                              }}
                            >
                              The name must have 1-128 characters. Valid
                              characters: A-Z, a-z, 0-9, - (hyphen), and _
                              (underscore).
                            </p>
                          </div>
                          <div style={{ width: '80%', margin: 20 }}>
                            <TextField
                              id='outlined-multiline-flexible'
                              label='Description - (optional)'
                              //  placeholder='Description - (optional)'
                              multiline
                              rows={6}
                              style={{
                                width: '100%',
                                float: 'left'
                              }}
                              value={flowDescription}
                              disabled={activeStep !== 0 ? true : false}
                              onChange={e => {
                                setFlowDescription(e.target.value)
                              }}
                              size='small'
                            />
                            <p
                              style={{
                                marginTop: '12px',
                                postion: 'relative',
                                fontSize: '0.7rem',
                                fontWeight: '300',
                                textAlign: 'left'
                              }}
                            >
                              The description can have 1-256 characters.
                            </p>
                          </div>
                          <div
                            style={{
                              width: '80%',
                              marginTop: -10,
                              marginLeft: 30
                            }}
                          >
                            <p
                              style={{
                                postion: 'relative',
                                fontSize: '0.9rem',
                                fontWeight: '300',
                                textAlign: 'left',
                                fontStyle: 'italic'
                              }}
                            >
                              The first step involves data selection of data set
                              from pre-defined datablocks available on the right
                              side.
                            </p>
                          </div>
                        </div>
                      </Card>
                    </>
                  ) : null}
                </div>
                <Card
                  sx={{
                    marginLeft: 2,
                    marginRight: 20,
                    minWidth:
                      activeStep === 4 ? width - 150 : width - width / 3.4,
                    backgroundColor: 'white',
                    border: '1px solid #cccccc',
                    marginTop: '10px'
                  }}
                >
                  <div
                    style={{
                      width:
                        activeStep === 4 ? width - 150 : width - width / 3.4,
                      height: 500,
                      display: 'inline-block',
                      verticalAlign: 'top'
                    }}
                  >
                    {activeStep === 4 ? (
                      <div className='dndflow'>
                        <ReactFlowProvider>
                          <div
                            className='reactflow-wrapper'
                            ref={reactFlowWrapper}
                          >
                            <ReactFlow
                              elements={stateElements2}
                              style={{
                                height: 500,
                                width: '100%',
                                padding: '0'
                              }}
                              nodeTypes={nodeTypes}
                              onConnect={onConnect2}
                              defaultZoom={0}
                            >
                              <MiniMap
                                nodeStrokeColor={n => {
                                  if (n.type === node1) return '#0041d0'
                                  if (n.type === node2) return '#0041d0'
                                  if (n.type === node3) return '#0041d0'
                                  if (n.type === node4) return '#ff0072'
                                }}
                                nodeColor={n => {
                                  // if (n.type === 'selectorNode') return bgColor;
                                  return '#fff'
                                }}
                              />
                              <Controls />
                            </ReactFlow>
                          </div>
                        </ReactFlowProvider>
                      </div>
                    ) : (
                      <div className='dndflow'>
                        <ReactFlowProvider>
                          {activeStep !== 4 && (
                            <button
                              onClick={openModal}
                              style={{
                                marginLeft: 20,
                                borderRadius: '15px',
                                background: '#0c0c0c',
                                color: '#ffe55d',
                                position: 'absolute',
                                marginTop: '20px',
                                padding: 7,
                                zIndex: 6,
                                cursor: 'pointer',
                                fontFamily: 'Trebuchet MS'
                              }}
                            >
                              {activeStep === 0
                                ? '+ Ingest data'
                                : activeStep === 1
                                ? '+ Transform data'
                                : activeStep === 2
                                ? '+ Choose visualizations'
                                : activeStep === 3
                                ? '+ Get data analysis'
                                : '+ Get data flow'}
                            </button>
                          )}
                          <div
                            className='reactflow-wrapper'
                            ref={reactFlowWrapper}
                          >
                            <ReactFlow
                              elements={stateElements}
                              style={{
                                height: 500,
                                width: '100%',
                                padding: '0'
                              }}
                              nodeTypes={nodeTypes}
                              onConnect={onConnect}
                            >
                              <Controls />
                            </ReactFlow>
                          </div>
                        </ReactFlowProvider>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                verticalAlign: 'top',
                marginBottom: 20
              }}
            >
              <Box sx={{ marginTop: 2, marginLeft: 10 }}>
                <div>
                  <Button
                    variant='contained'
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={
                      activeStep === 0
                        ? !isSelected
                        : activeStep === 1
                        ? xAxis === undefined && yAxis === undefined
                        : activeStep === 2
                        ? !isSelected2
                        : activeStep === 3
                        ? !isSelected3
                        : false
                    }
                    style={{
                      backgroundColor:
                        activeStep === 0
                          ? isSelected
                            ? '#438639'
                            : '#CCC'
                          : activeStep === 1
                          ? xAxis && yAxis
                            ? '#438639'
                            : '#CCC'
                          : activeStep === 2
                          ? isSelected2
                            ? '#438639'
                            : '#CCC'
                          : activeStep === 3
                          ? isSelected3
                            ? '#438639'
                            : '#CCC'
                          : '#438639'
                    }}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                    style={{ color: activeStep === 0 ? '#CCC' : '#7cc2ae' }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </div>
            <div>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby='alert-dialog-slide-description'
              >
                <Alert
                  style={{
                    margin: 10,
                    height: 40,
                    alignItems: 'center',
                    fontFamily: 'Trebuchet MS'
                  }}
                  severity={'error'}
                >
                  {alertType === 1
                    ? 'Please enter widget title'
                    : alertType === 2
                    ? 'Flow name must not contain special characters except hyphen and underscore'
                    : alertType === 3
                    ? 'Flow name must be less than 128 characters'
                    : alertType === 4
                    ? 'Description must be less than 256 characters'
                    : ''}
                </Alert>

                <DialogActions>
                  <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>

          {isExampleData && (
            <Modal2
              style={{ zIndex: 7 }}
              open={isExampleData}
              onClose={() => setisExampleData(false)}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={exportModalstyle}>
                <>
                  <CloseIcon
                    onClick={() => {
                      setisExampleData(false)
                    }}
                    style={{
                      position: 'absolute',
                      left: '95%',
                      top: '1%',
                      cursor: 'pointer'
                    }}
                  />
                  <div style={{ alignSelf: 'center' }}>
                    <button
                      style={{
                        borderRadius: '15px',
                        background: '#0c0c0c',
                        color: '#ecda8e',
                        marginTop: '5px',
                        padding: '6px',
                        cursor: 'pointer',
                        fontFamily: 'Trebuchet MS'
                      }}
                      onClick={() => {
                        onAdd11()
                        useExampleData()
                      }}
                    >
                      Use Example Data
                    </button>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <Spreadsheet data={dt} />
                  </div>
                </>
              </Box>
            </Modal2>
          )}
        </>
      ) : (
        history.push('/login')
      )}
    </>
  )
}
