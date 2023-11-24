import React, { useEffect, useState } from "react";
import { Handle } from "react-flow-renderer";
import Plot from "react-plotly.js";
import configData from "../../../config.json";

var annotations2 = [];
export default function WorldBubbleMap(props) {
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
    onTrigger();
  }, []);

  const onTrigger = (event) => {
    if (props.parentCallback) props.parentCallback(data);
  };

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

  const [values, setValues] = useState([]);
  const [size, setSize] = useState(false);
  const [flag, setFlag] = useState(0);

  var t1 = [],
    max,
    min;

  useEffect(() => {
    max = props.z.reduce(function (a, b) {
      return Math.max(a, b);
    });

    min = props.z.reduce(function (a, b) {
      return Math.min(a, b);
    });
    // console.log('max', max)
    let r1 = max / 4;
    let r2 = r1 * 2;
    let r3 = r2 * 2 - r1;

    props.z.map((e) => {
      if (e < r1) t1.push(10);
      if (e > r1 && e < r2) t1.push(20);
      if (e > r2 && e < r3) t1.push(30);
      if (e > r3 && e < max) t1.push(40);
    });

    //  console.log('t1>', t1)
    setSize(true);
    setValues(t1);
  }, [props.z]);

  useEffect(() => {}, [size === true]);

  useEffect(() => {}, [values]);

  var data = [
    {
      type: "scattergeo",
      mode: "markers",
      //locations: ['FRA', 'DEU', 'RUS', 'ESP'],
      lat: props.x,
      lon: props.y,
      marker: {
        size: values,
        color: values,
        // cmin: 0,
        // cmax: 50,
        colorscale: "Greens",
        colorbar: {
          title: props.zName,
          ticksuffix: "%",
          showticksuffix: "last",
        },
        line: {
          color: "black",
        },
      },
      //name: 'europe data'
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
          Europe Bubble Map
        </h3>
        {props.data ? null : (
          <p style={{ marginLeft: 10, marginBottom: 0 }}>
            {"<- Connect to dataset"}
          </p>
        )}
        <div style={{ marginTop: -10 }}>
          <div style={{ overflow: "hidden", height: 300 }}>
            <div>
              <Plot
                style={
                  props.main === true
                    ? { marginTop: 80, marginLeft: -50 }
                    : { marginTop: -65, marginLeft: -150 }
                }
                data={data}
                layout={
                  props.main === true
                    ? {
                        width: 900,
                        height: 600,

                        geo: {
                          scope: "europe",
                          resolution: 50,
                        },
                      }
                    : {
                        width: 540,
                        height: 350,
                        margin: { l: 300 },
                        geo: {
                          scope: "europe",
                          resolution: 50,
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
      <Plot
        style={
          props.main === true
            ? { marginTop: 80, marginLeft: -50 }
            : { marginTop: -65, marginLeft: -150 }
        }
        data={data}
        layout={
          props.main === true
            ? {
                annotations: annotations ? annotations : null,
                width: 900,
                height: 650,
                margin: { l: 300 },
                geo: {
                  projection: {
                    type: "robinson",
                  },
                },
              }
            : {
                width: 540,
                height: 350,
                margin: { l: 300 },
                geo: {
                  scope: "world",
                  resolution: 50,
                },
              }
        }
        config={{
          displaylogo: false,
          displayModeBar: true,
        }}
      />
    </div>
  );
}
