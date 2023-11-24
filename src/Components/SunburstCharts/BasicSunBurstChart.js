import React, { useEffect, useState } from "react";
import { Handle } from "react-flow-renderer";
import Plot from "react-plotly.js";
import configData from "../../config.json";

var annotations2 = [];
export default function BasicSunBurstChart(props) {
  const removeStyle = {
    position: "absolute",
    top: 20,
    right: 20,
    cursor: "pointer",
    color: "white",
  };

  const [text, setText] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  const [parents, setParents] = React.useState([]);

  var data = {
    type: "sunburst",
    labels: props?.data2,
    parents: [],
    values: [10, 14, 12, 10, 2, 6, 6, 4, 4],
    outsidetextfont: { size: 20, color: "#377eb8" },
    leaf: { opacity: 0.4 },
    marker: { line: { width: 2 } },
  };
  useEffect(() => {
    annotations2 = [];
    setAnnotations([]);
  }, [props.chartSubType]);

  useEffect(() => {
    // Generate the "parents" array based on the hierarchy
    if (props?.data2) {
      for (let i = 0; i < props.data2.length; i++) {
        if (i === 0) {
          data.parents.push(""); // Root node
        } else {
          data.parents.push(props.data2[i - 1]);
        }
      }
    }

    // Update the state with the new "parents" array
    setParents(data);

    // console.log("DATA%%%", props?.data2, data);
  }, [props?.data2]);

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

  var traceBox = [
    {
      type: "sunburst",
      labels: props.data[0],
      parents: props.data2,
      values: [10, 14, 12, 10, 2, 6, 6, 4, 4],
      outsidetextfont: { size: 20, color: "#377eb8" },
      leaf: { opacity: 0.4 },
      marker: { line: { width: 2 } },
    },
  ];

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
          Basic Sunburst Chart
        </h3>
        {props.data ? null : (
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {"<- Connect to dataset"}
          </p>
        )}
        <div style={{ marginTop: -10 }}>
          <div style={{ overflow: "hidden", height: 300 }}>
            <Plot
              style={{ marginTop: -40 }}
              data={[
                {
                  type: "sunburst",
                  labels: props.data[0],
                  parents: parents,
                  values: [10, 14, 12, 10, 2, 6, 6, 4, 4],
                  outsidetextfont: { size: 20, color: "#377eb8" },
                  leaf: { opacity: 0.4 },
                  marker: { line: { width: 2 } },
                },
              ]}
              layout={{
                margin: { l: 0, r: 0, b: 0, t: 0 },
                width: 300,
                height: 260,
              }}
              config={{
                displaylogo: false,
                displayModeBar: true,
              }}
            />
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
      style={
        props.main === true
          ? { marginTop: 120, marginLeft: -50 }
          : { marginTop: 2, marginLeft: 25 }
      }
      data={[parents]}
      layout={{
        margin: { l: 0, r: 0, b: 0, t: 0 },
        width: props.main === true ? 900 : 300,
        height: props.main === true ? 570 : 250,
      }}
      config={{
        displaylogo: false,
        displayModeBar: true,
      }}
    />
  );
}
