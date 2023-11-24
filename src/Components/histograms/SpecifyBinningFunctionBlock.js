import React, { useEffect, useState } from "react";
import { Handle } from "react-flow-renderer";
import Plot from "react-plotly.js";
import Plotly from "plotly.js";
import configData from "../../config.json";

var annotations2 = [];
export default function SpecifyBinningFunctionBlock(props) {
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
  var x = props.x;
  var y = props.y;
  var data = [
    {
      histfunc: "count",
      y: y,
      x: x,
      type: "histogram",
      name: "count",
      marker: {
        color: props.color1,
      },
    },
    {
      histfunc: "sum",
      y: y,
      x: x,
      type: "histogram",
      name: "sum",
      marker: {
        color: props.color2,
      },
    },
  ];

  useEffect(() => {
    onTrigger();
  }, [props.color1 || props.color2]);

  const onTrigger = (event) => {
    if (props.parentCallback) props.parentCallback(data);
  };

  useEffect(() => {
    //  console.log('added??', annotations)
    if (props.getAnnotations) props.getAnnotations(annotations);
  }, [text]);

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
          Specify Binning Function
        </h3>
        {props.data ? null : (
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {"<- Connect to dataset"}
          </p>
        )}
        <div style={{ marginTop: -10 }}>
          <div style={{ overflow: "hidden", height: 300 }}>
            {props.IsDataNumeric === true ? (
              <div id="myDiv" style={{ marginTop: -50, height: 300 }}>
                <Plot
                  style={{ marginTop: -75 }}
                  data={data}
                  layout={{
                    width: 300,
                    height: 290,
                    xaxis: {
                      autorange: true,
                    },
                    yaaxis: {
                      autorange: true,
                    },
                  }}
                  config={{
                    displaylogo: false,
                    displayModeBar: true,
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  overflow: "hidden",
                  height: 300,
                }}
              >
                <div style={{ marginTop: 90 }}>
                  This Graph requires x and y axis data containing numbers only
                </div>
              </div>
            )}
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
    <div>
      {props.IsDataNumeric === true ? (
        <Plot
          onClick={annotate}
          style={
            props.main === true
              ? { marginTop: 80, marginLeft: -50 }
              : { marginTop: -75, marginLeft: -150 }
          }
          data={data}
          layout={{
            width: props.main === true ? 900 : 540,
            height: props.main === true ? 570 : 350,
            xaxis: {
              autorange: true,
              title: props.xName,
            },
            yaxis: {
              autorange: true,
              title: props.yName,
            },
            margin: { l: 300 },
            annotations: annotations ? annotations : null,
          }}
          config={{
            displaylogo: false,
            displayModeBar: true,
          }}
        />
      ) : (
        <div
          style={{
            overflow: "hidden",
            height: 300,
            marginTop: 360,
          }}
        >
          <div style={{}}>
            This Graph requires x and y axis data containing numbers only
          </div>
        </div>
      )}
    </div>
  );
}
