import React, { useEffect, useState } from "react";
import { Handle } from "react-flow-renderer";
import { BarChart } from "react-chartkick";
import Plot from "react-plotly.js";
import configData from "../../config.json";

var annotations2 = [];
export default function CustomNodeLineChart(props) {
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

  return (
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
        {props.nodeType === "special26" ? (
          <div>
            <h3 style={{ borderBottom: "1px solid #FFF", padding: 10 }}>
              Basic Line Plot
            </h3>
            {props.data ? null : (
              <p style={{ marginLeft: 10, marginBottom: 0 }}>
                {"<- Connect to dataset"}
              </p>
            )}
            <div style={{ marginTop: -10 }}>
              <div style={{ overflow: "hidden", height: 300 }}>
                <Plot
                  style={{ marginTop: -75 }}
                  data={[
                    {
                      x: props.x,
                      y: props.y,
                      type: "scatter",
                      name: "Color1",
                    },
                    {
                      x: props.x,
                      y: props.y,
                      type: "scatter",
                      name: "Color2",
                    },
                  ]}
                  layout={{ width: 350, height: 310 }}
                  config={{
                    displaylogo: false,
                    displayModeBar: true,
                  }}
                />
              </div>
            </div>
          </div>
        ) : props.nodeType === "special27" ? (
          <div>
            <h3 style={{ borderBottom: "1px solid #FFF", padding: 10 }}>
              Line and ScatterPlot
            </h3>
            {props.data ? null : (
              <p style={{ marginLeft: 10, marginBottom: 0 }}>
                {"<- Connect to dataset"}
              </p>
            )}
            <div style={{ marginTop: -10 }}>
              <div style={{ overflow: "hidden", height: 300 }}>
                <Plot
                  style={{ marginTop: -75 }}
                  data={[
                    {
                      x: props.x,
                      y: props.y,
                      mode: "lines+markers",
                      name: "Color1",
                      marker: {
                        color: props.color1,
                      },
                    },
                    {
                      x: props.x,
                      y: props.y,
                      mode: "lines+markers",
                      name: "Color2",
                      marker: {
                        color: props.color2,
                      },
                    },
                  ]}
                  layout={{ width: 350, height: 310 }}
                  config={{
                    displaylogo: false,
                    displayModeBar: true,
                  }}
                />
              </div>
            </div>
          </div>
        ) : props.nodeType === "special28" ? (
          <div>
            <h3 style={{ borderBottom: "1px solid #FFF", padding: 10 }}>
              Adding Names To Line and ScatterPlot
            </h3>
            {props.data ? null : (
              <p style={{ marginLeft: 10, marginBottom: 0 }}>
                {"<- Connect to dataset"}
              </p>
            )}
            <div style={{ marginTop: -10 }}>
              <div style={{ overflow: "hidden", height: 300 }}>
                <Plot
                  style={{ marginTop: -75 }}
                  data={[
                    {
                      x: props.data,
                      y: props.data,
                      mode: "lines+markers",
                      name: "Scatter + Lines",
                    },
                    {
                      x: props.data,
                      y: props.data,
                      mode: "lines+markers",
                    },
                  ]}
                  layout={{ width: 350, height: 310 }}
                  config={{
                    displaylogo: false,
                  }}
                />
              </div>
            </div>
          </div>
        ) : props.nodeType === "special29" ? (
          <div>
            <h3 style={{ borderBottom: "1px solid #FFF", padding: 10 }}>
              Colored and Styled ScatterPlot
            </h3>
            {props.data ? null : (
              <p style={{ marginLeft: 10, marginBottom: 0 }}>
                {"<- Connect to dataset"}
              </p>
            )}
            <div style={{ marginTop: -10 }}>
              <div style={{ overflow: "hidden", height: 300 }}>
                <Plot
                  style={{ marginTop: -75 }}
                  data={[
                    {
                      x: props.data,
                      y: props.data,
                      type: "scatter",
                      marker: {
                        color: "rgb(234, 153, 153)",
                        size: 12,
                      },
                    },
                    {
                      x: props.data,
                      y: props.data,
                      type: "scatter",
                      marker: {
                        color: "rgb(234, 153, 153)",
                        size: 12,
                      },
                    },
                  ]}
                  layout={{ width: 350, height: 310 }}
                  config={{
                    displaylogo: false,
                  }}
                />
              </div>
            </div>
          </div>
        ) : props.nodeType === "special30" ? (
          <div>
            <h3 style={{ borderBottom: "1px solid #FFF", padding: 10 }}>
              Line Shape Options for Interpolation
            </h3>
            {props.data ? null : (
              <p style={{ marginLeft: 10, marginBottom: 0 }}>
                {"<- Connect to dataset"}
              </p>
            )}
            <div style={{ marginTop: -10 }}>
              <div style={{ overflow: "hidden", height: 290 }}>
                <Plot
                  style={{ marginTop: -75 }}
                  data={[
                    {
                      x: props.data,
                      y: props.data,
                      type: "scatter",
                      mode: "lines+markers",
                      line: { shape: "spline" },
                    },
                    {
                      x: props.data,
                      y: props.data,
                      type: "scatter",
                      mode: "lines+markers",
                      line: { shape: "spline" },
                    },
                  ]}
                  layout={{ width: 350, height: 290 }}
                  config={{
                    displaylogo: false,
                  }}
                />
              </div>
            </div>
          </div>
        ) : props.nodeType === "special31" ? (
          <div>
            <h3 style={{ borderBottom: "1px solid #FFF", padding: 10 }}>
              Graph and Axes Titles
            </h3>
            {props.data ? null : (
              <p style={{ marginLeft: 10, marginBottom: 0 }}>
                {"<- Connect to dataset"}
              </p>
            )}
            <div style={{ marginTop: -10 }}>
              <div style={{ overflow: "hidden", height: 300 }}>
                <Plot
                  style={{ marginTop: -75 }}
                  data={[
                    {
                      x: props.data,
                      y: props.data,
                      type: "scatter",
                      mode: "lines+markers",
                    },
                    {
                      x: props.data,
                      y: props.data,
                      type: "scatter",
                      mode: "lines+markers",
                    },
                  ]}
                  layout={{
                    width: 350,
                    height: 310,
                    xaxis: {
                      title: "x-axis title",
                    },
                    yaxis: {
                      title: "y-axis title",
                    },
                  }}
                  config={{
                    displaylogo: false,
                  }}
                />
              </div>
            </div>
          </div>
        ) : props.nodeType === "special32" ? (
          <div>
            <h3 style={{ borderBottom: "1px solid #FFF", padding: 10 }}>
              Line Dash
            </h3>
            {props.data ? null : (
              <p style={{ marginLeft: 10, marginBottom: 0 }}>
                {"<- Connect to dataset"}
              </p>
            )}
            <div style={{ marginTop: -10 }}>
              <div style={{ overflow: "hidden", height: 300 }}>
                <Plot
                  style={{ marginTop: -75 }}
                  data={[
                    {
                      x: props.data,
                      y: props.data,
                      mode: "lines",
                      line: {
                        dash: "solid",
                        width: 4,
                      },
                    },
                    {
                      x: props.data,
                      y: props.data,
                      mode: "lines",
                      line: {
                        dash: "solid",
                        width: 4,
                      },
                    },
                  ]}
                  config={{
                    displaylogo: false,
                  }}
                />
              </div>
            </div>
          </div>
        ) : props.nodeType === "special32" ? (
          <div>
            <h3 style={{ borderBottom: "1px solid #FFF", padding: 10 }}>
              Connect Gaps Between Data
            </h3>
            {props.data ? null : (
              <p style={{ marginLeft: 10, marginBottom: 0 }}>
                {"<- Connect to dataset"}
              </p>
            )}
            <div style={{ marginTop: -10 }}>
              <div style={{ overflow: "hidden", height: 300 }}>
                <Plot
                  onClick={annotate}
                  style={
                    props.main === true
                      ? { marginTop: 80, marginLeft: -50 }
                      : { marginTop: -65, marginLeft: -150 }
                  }
                  data={[
                    {
                      x: props.data,
                      y: props.data,
                      mode: "lines+markers",
                      connectgaps: true,
                    },
                    {
                      x: props.data,
                      y: props.data,
                      mode: "lines+markers",
                      connectgaps: true,
                    },
                  ]}
                  layout={
                    props.main === true
                      ? { width: 900, height: 600, margin: { l: 300 } }
                      : {
                          width: 540,
                          height: 350,
                          margin: { l: 300 },
                          xaxis: {
                            title: props.xName,
                          },
                          yaxis: {
                            title: props.yName,
                          },
                        }
                  }
                  config={{
                    displaylogo: false,
                    displayModeBar: true,
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}
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
  );
}
