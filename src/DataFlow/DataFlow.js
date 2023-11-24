/***
*
*   HELP
*   Information for user to get help and support
*
**********/

import React, { Fragment } from 'react';
//import { Card, Form, Message, Loader, useAPI, Button } from 'components/lib';
import { Button, Card } from '../Components/lib';
import ReactFlow, {
} from 'react-flow-renderer';

import MiniDrawer from '../MiniDrawer';

export default class DataFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toGGle: false,
      labelWidth: 0
    };

    // this.inputLabel = createRef();
  }


  render() {
    let { toGGle } = this.state;
    let elements = [
      {
        id: 'horizontal-1',
        sourcePosition: 'right',
        type: 'input',
        className: 'dark-node',
        data: { label: 'Data Set' },
        position: { x: 200, y: 80 },
      },
      {
        id: 'horizontal-2',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: { label: 'Data Clean' },
        position: { x: 450, y: 0 },
      },
      {
        id: 'horizontal-3',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: { label: 'Data Prep' },
        position: { x: 450, y: 160 },
      },
      {
        id: 'horizontal-4',
        sourcePosition: 'right',
        targetPosition: 'left',
        data: { label: 'Output' },
        position: { x: 700, y: 80 },
      },
      {
        id: 'horizontal-e1-2',
        source: 'horizontal-1',
        type: 'smoothstep',
        target: 'horizontal-2',
        animated: toGGle,
      },
      {
        id: 'horizontal-e1-3',
        source: 'horizontal-1',
        type: 'smoothstep',
        target: 'horizontal-3',
        animated: toGGle,
      },
      {
        id: 'horizontal-e1-4',
        source: 'horizontal-2',
        type: 'smoothstep',
        target: 'horizontal-4',
        animated: toGGle,
      },
      {
        id: 'horizontal-e3-5',
        source: 'horizontal-3',
        type: 'smoothstep',
        target: 'horizontal-4',
        animated: toGGle,
      },
    ]
    const BasicFlow = () => <ReactFlow style={{ height: 600 }} elements={elements} />;

    return (
      <Fragment>
        <MiniDrawer />
        <div style={{ marginLeft: 48 }}>
        <Button
              text='Start Flow'
              color='green'
              icon='github'
              iconColor='white'
              rounded iconButton small
              //style={{marginLeft:"100", float:"left"}}
              action={() => { this.setState({ toGGle: true }) }}
            />
            <Button
              text='Stop Flow'
              color='red'
              icon='shield'
              iconColor='white'
              rounded iconButton small
              action={() => { this.setState({ toGGle: false }) }}
            />
          <Card>
            
            <BasicFlow />
            
          </Card>
          <Card>

          </Card>
        </div>
      </Fragment>
    )
  }
}

