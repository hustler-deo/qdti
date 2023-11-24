import React, { useEffect, useState } from "react";
import { Handle } from "react-flow-renderer";
import Plot from "react-plotly.js";
import Plotly from "plotly.js";
import configData from "../../../config.json";

var annotations2 = [];
export default function CombinedClickandHoverEventsBlock(props) {
  const removeStyle = {
    position: "absolute",
    top: 20,
    right: 20,
    cursor: "pointer",
    color: "white",
  };

  const [text, setText] = useState(false);
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    annotations2 = [];
    setAnnotations([]);
  }, [props.chartSubType]);

  useEffect(() => {
    // console.log('www?',props.existingWidget,props.addedAnnotations)
    if (props.annotedChartType === props.chartSubType) {
      annotations2 = props.addedAnnotations;
      setAnnotations(props.addedAnnotations);
    }
  }, [props.existingWidget]);

  const annotate = (e) => {
    if (props.operationIndex2 != 18) return;

    var annote = {};
    annote.x = e.points[0].x;
    annote.y = e.points[0].y;
    annote.xref = "x";
    annote.yref = "y";
    annote.text = props.annotation;
    annote.showarrow = true;
    annote.arrowhead = 7;
    annote.ax = 0;
    annote.ay = -40;

    annotations2.push({ ...annote });
    setAnnotations(annotations2);
    setText(!text);
  };

  const onHover3 = (eventdata) => {
    var points = eventdata.points[0],
      pointNum = points.pointNumber;

    Plotly.Fx.hover("graph15", [
      { curveNumber: 0, pointNumber: pointNum },
      { curveNumber: 1, pointNumber: pointNum },
      { curveNumber: 2, pointNumber: pointNum },
    ]);
  };
  // const layout = {
  //   hovermode: 'closest',
  //   title: 'Display Hover Info for Related Points',
  //   xaxis: { zeroline: false, hoverformat: '.2r' },
  //   yaxis: { zeroline: false, hoverformat: '.2r' }
  // }
  // const data = [
  //   {
  //     x: props.data[0],
  //     y: props.data[0],
  //     text: '',
  //     type: 'scatter',
  //     name: '2014',
  //     hoverinfo: 'text+x+y',
  //     mode: 'markers',
  //     marker: { color: 'rgba(200, 50, 100, .7)', size: 16 }
  //   },
  //   {
  //     x: props.data[1],
  //     y: props.data[1],
  //     text: '',
  //     type: 'scatter',
  //     name: '2015',
  //     hoverinfo: 'text+x+y',
  //     mode: 'markers',
  //     marker: { color: 'rgba(120, 20, 130, .7)', size: 16 }
  //   },
  //   {
  //     x: props.data[2],
  //     y: props.data[2],
  //     text: '',
  //     type: 'scatter',
  //     name: '2016',
  //     hoverinfo: 'text+x+y',
  //     mode: 'markers',
  //     marker: { color: 'rgba(10, 180, 180, .8)', size: 16 }
  //   }
  // ]
  // useEffect(() => {
  //   var myPlot = document.getElementById('graph14'),
  //     months = [
  //       'January',
  //       'February',
  //       'March',
  //       'April',
  //       'May',
  //       'June',
  //       'July',
  //       'August',
  //       'September',
  //       'October',
  //       'November',
  //       'December'
  //     ]

  //   Plotly.newPlot('graph14', data, layout)

  //   myPlot.on('plotly_hover', function (eventdata) {
  //     var points = eventdata.points[0],
  //       pointNum = points.pointNumber

  //     Plotly.Fx.hover('graph14', [
  //       { curveNumber: 0, pointNumber: pointNum },
  //       { curveNumber: 1, pointNumber: pointNum },
  //       { curveNumber: 2, pointNumber: pointNum }
  //     ])
  //   })
  // }, [])

  useEffect(() => {
    //  console.log('added??', annotations)
    if (props.getAnnotations) props.getAnnotations(annotations);
  }, [text]);

  return props.block ? (
    <>
      <Handle
        type="target"
        position="left"
        id="a"
        isValidConnection={(connection) => connection.source === "1"}
        onConnect={(params) => console.log("handle onConnect", params)}
        style={
          props.data
            ? {
                left: "-10px",
                top: "51%",
                borderRadius: 0,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                height: "300px",
                width: "20px",
                backgroundColor: configData.NODE_COLORS.HANDLE,
              }
            : {
                left: "-10px",
                top: "53%",
                borderRadius: 0,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                height: "112px",
                width: "20px",
                backgroundColor: configData.NODE_COLORS.HANDLE,
              }
        }
      ></Handle>
      {props.close == 1 && (
        <span className="remove" style={removeStyle} onClick={props.setNodeDsp}>
          x
        </span>
      )}
      <div
        style={
          props.data
            ? {
                background: configData.NODE_COLORS.BODY,
                color: "#FFF",
                height: "300px",
                width: "300px",
                margin: 10,
              }
            : {
                background: "#e8aa7c",
                color: "#FFF",
                height: "110px",
                width: "220px",
                margin: 10,
              }
        }
      >
        <h3 style={{ borderBottom: "1px solid #FFF", padding: 10 }}>
          Combined Click and Hover Events
        </h3>
        {props.data ? null : (
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {"<- Connect to dataset"}
          </p>
        )}
        <div style={{ overflow: "hidden", height: 300 }}>
          <div style={{ marginTop: -65 }}>
            <div style={{ marginTop: -50, height: 240 }}>
              <Plot
                divId="graph15"
                onHover={onHover3}
                style={{ marginTop: -75 }}
                data={[
                  {
                    x: props.x,
                    y: props.y,
                    text: "",
                    type: "scatter",
                    name: "Color1",
                    hoverinfo: "text+x+y",
                    mode: "markers",
                    marker: { color: "rgba(200, 50, 100, .7)", size: 16 },
                  },
                  {
                    x: props.x,
                    y: props.y,
                    text: "",
                    type: "scatter",
                    name: "Color2",
                    hoverinfo: "text+x+y",
                    mode: "markers",
                    marker: { color: "rgba(120, 20, 130, .7)", size: 16 },
                  },
                  {
                    x: props.x,
                    y: props.y,
                    text: "",
                    type: "scatter",
                    name: "Color3",
                    hoverinfo: "text+x+y",
                    mode: "markers",
                    marker: { color: "rgba(10, 180, 180, .8)", size: 16 },
                  },
                ]}
                layout={{
                  width: 300,
                  height: 290,
                  hovermode: "closest",
                  //title: 'Display Hover Info for Related Points',
                  xaxis: { zeroline: false, hoverformat: ".2r" },
                  yaxis: { zeroline: false, hoverformat: ".2r" },
                }}
                config={{
                  displaylogo: false,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position="right"
        id="a"
        style={
          props.data
            ? {
                right: "-10px",
                top: "51%",
                borderRadius: 0,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                height: "300px",
                width: "20px",
                backgroundColor: configData.NODE_COLORS.HANDLE,
              }
            : {
                right: "-10px",
                top: "53%",
                borderRadius: 0,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                height: "112px",
                width: "20px",
                backgroundColor: configData.NODE_COLORS.HANDLE,
              }
        }
      ></Handle>
    </>
  ) : (
    <Plot
      divId="graph15"
      onHover={onHover3}
      style={
        props.main === true
          ? { marginTop: 80, marginLeft: -50 }
          : { marginTop: -65, marginLeft: -165 }
      }
      data={[
        {
          x: props.x,
          y: props.y,
          text: "",
          type: "scatter",
          name: "Color1",
          hoverinfo: "text+x+y",
          mode: "markers",
          marker: { color: props.color1, size: 16 },
        },
        {
          x: props.x,
          y: props.y,
          text: "",
          type: "scatter",
          name: "Color2",
          hoverinfo: "text+x+y",
          mode: "markers",
          marker: { color: props.color2, size: 16 },
        },
        {
          x: props.x,
          y: props.y,
          text: "",
          type: "scatter",
          name: "Color3",
          hoverinfo: "text+x+y",
          mode: "markers",
          marker: { color: props.color3, size: 16 },
        },
      ]}
      layout={{
        width: props.main === true ? 900 : 540,
        height: props.main === true ? 570 : 350,
        margin: { l: 300 },
        hovermode: "closest",
        //title: 'Display Hover Info for Related Points',
        xaxis: { zeroline: false, hoverformat: ".2r" },
        yaxis: { zeroline: false, hoverformat: ".2r" },
      }}
      config={{
        displaylogo: false,
        displayModeBar: true,
      }}
    />
  );
}
