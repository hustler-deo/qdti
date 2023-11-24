import React, { useEffect, useState } from "react";
import { Handle } from "react-flow-renderer";
import Plot from "react-plotly.js";
import configData from "../../../config.json";
import Plotly from "plotly.js";

var annotations2 = [];
export default function TriggeringHoverEventsBlock(props) {
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
  const [updated, setUpdated] = useState(false);
  const onBeforeHover = () => {
    return false;
  };

  useEffect(() => {
    setTimeout(() => {
      setUpdated(true);
    }, 2000);
  }, []);

  useEffect(() => {
    var hoverButton = document.getElementById("hoverbutton");
    hoverButton.addEventListener("click", function () {
      var curve1 = Math.floor(Math.random() * 2),
        curve2 = Math.floor(Math.random() * 2),
        point1 = Math.floor(Math.random() * 14),
        point2 = Math.floor(Math.random() * 14);
      Plotly.Fx.hover("graph16", [
        { curveNumber: curve1, pointNumber: point1 },
        { curveNumber: curve2, pointNumber: point2 },
      ]);
    });
  }, [updated == true]);
  // const layout = {
  //   hovermode: 'closest',
  //   title: 'Click "Go" button to trigger hover'
  // }
  // useEffect(() => {
  //   var myPlot = document.getElementById('graph16'),
  //     hoverButton = document.getElementById('hoverbutton'),
  //     data = [
  //       {
  //         x: props.data,
  //         y: props.data[1],
  //         type: 'scatter',
  //         name: 'Trial 1',
  //         mode: 'markers',
  //         marker: { size: 16 }
  //       },
  //       {
  //         x: props.data,
  //         y: props.data[2],
  //         type: 'scatter',
  //         name: 'Trial 2',
  //         mode: 'markers',
  //         marker: { size: 16 }
  //       }
  //     ]

  //   Plotly.newPlot('graph16', data, layout)

  //   myPlot.on('plotly_beforehover', function () {
  //     return false
  //   })

  //   hoverButton.addEventListener('click', function () {
  //     var curve1 = Math.floor(Math.random() * 2),
  //       curve2 = Math.floor(Math.random() * 2),
  //       point1 = Math.floor(Math.random() * 14),
  //       point2 = Math.floor(Math.random() * 14)
  //     Plotly.Fx.hover('graph16', [
  //       { curveNumber: curve1, pointNumber: point1 },
  //       { curveNumber: curve2, pointNumber: point2 }
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
          Triggering Hover Events
        </h3>
        <div style={{ marginTop: -5 }}>
          <button id="hoverbutton">Go!</button>
        </div>
        {props.data ? null : (
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {"<- Connect to dataset"}
          </p>
        )}
        <div style={{ overflow: "hidden", height: 300 }}>
          <div style={{ marginTop: -65 }}>
            <div style={{ marginTop: -50, height: 240 }}>
              <Plot
                onBeforeHover={onBeforeHover}
                divId="graph16"
                style={{ marginTop: -75 }}
                data={[
                  {
                    x: props.x,
                    y: props.y,
                    type: "scatter",
                    name: "Color1",
                    mode: "markers",
                    marker: { size: 16 },
                  },
                  {
                    x: props.x,
                    y: props.y,
                    type: "scatter",
                    name: "Color2",
                    mode: "markers",
                    marker: { size: 16 },
                  },
                ]}
                layout={{ width: 300, height: 280, hovermode: "closest" }}
                config={{
                  displaylogo: false,
                  displayModeBar: true,
                }}
              />
              {/* <button id='hoverbutton' style={{ marginTop: -5 }}></button> */}
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
    <>
      <Plot
        onBeforeHover={onBeforeHover}
        divId="graph16"
        style={
          props.main === true
            ? { marginTop: 80, marginLeft: -50 }
            : { marginTop: -65, marginLeft: -165 }
        }
        data={[
          {
            x: props.x,
            y: props.y,
            type: "scatter",
            name: "Color1",
            mode: "markers",
            marker: { size: 16, color: props.color1 },
          },
          {
            x: props.x,
            y: props.y,
            type: "scatter",
            name: "Color2",
            mode: "markers",
            marker: { size: 16, color: props.color2 },
          },
        ]}
        layout={{
          width: props.main === true ? 900 : 540,
          height: props.main === true ? 500 : 350,
          margin: { l: 300 },
          hovermode: "closest",
        }}
        config={{
          displaylogo: false,
          displayModeBar: true,
        }}
      />
      <div style={{ marginLeft: 0, marginTop: 5 }}>
        <button
          id="hoverbutton"
          style={{
            alignSelf: "center",
          }}
        >
          <div style={{ color: "black" }}> Go!</div>
        </button>
      </div>
    </>
  );
}
