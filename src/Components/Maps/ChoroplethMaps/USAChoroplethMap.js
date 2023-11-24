import React, { useEffect, useState } from "react";
import { Handle } from "react-flow-renderer";
import Plot from "react-plotly.js";
import configData from "../../../config.json";

var annotations2 = [];
export default function USAChoroplethMap(props) {
  // console.log('Branch values', props.data)
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

  var data = [
    {
      type: "choropleth",
      locationmode: "USA-states",
      locations: props.z,
      z: props.y,
      text: props.z,
      // zmin: 0,
      // zmax: 17000,
      colorscale: [
        [0, "rgb(242,240,247)"],
        [0.2, "rgb(218,218,235)"],
        [0.4, "rgb(188,189,220)"],
        [0.6, "rgb(158,154,200)"],
        [0.8, "rgb(117,107,177)"],
        [1, "rgb(84,39,143)"],
      ],
      colorbar: {
        title: "Sales",
        thickness: 0.2,
      },
      marker: {
        line: {
          color: "rgb(255,255,255)",
          width: 2,
        },
      },
    },
  ];

  useEffect(() => {
    //  console.log('added??', annotations)
    if (props.getAnnotations) props.getAnnotations(annotations);
  }, [text]);

  useEffect(() => {
    onTrigger();
  }, []);

  const onTrigger = (event) => {
    if (props.parentCallback) props.parentCallback(data);
  };

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
          Europe Choropleth Map
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
                  z: props.z,
                  x: props.x,
                  y: props.y,
                  ncontours: 30,
                  showscale: false,
                  type: "contour",
                  name: "Color1",
                },
                {
                  x: props.x,
                  y: props.y,
                  mode: "markers+lines",
                  name: "steepest",
                  line: { color: "black" },
                  type: "scatter",
                  name: "Color2",
                },
              ]}
              layout={{
                width: 540,
                height: 350,
                margin: { l: 300 },
                geo: {
                  scope: "usa",
                  showlakes: true,
                  lakecolor: "rgb(255,255,255)",
                },
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
                height: 570,
                xaxis: {
                  title: props.xName,
                },
                yaxis: {
                  title: props.yName,
                },
                margin: { l: 130 },
                geo: {
                  scope: "usa",
                  showlakes: true,
                  lakecolor: "rgb(255,255,255)",
                },
              }
            : {
                width: 540,
                height: 350,
                //   geo: {
                //     projection: {
                //         type: 'robinson'
                //     }
                // }
                geo: {
                  scope: "usa",
                  showlakes: true,
                  lakecolor: "rgb(255,255,255)",
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
