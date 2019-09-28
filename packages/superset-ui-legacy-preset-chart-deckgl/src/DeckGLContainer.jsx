/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable sort-keys */
/* eslint-disable react/forbid-prop-types */
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { StaticMap } from 'react-map-gl';
import DeckGL, { MapController } from 'deck.gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { isEqual } from 'lodash';
import './css/deckgl.css';

const TICK = 250; // milliseconds

const propTypes = {
  viewport: PropTypes.object.isRequired,
  layers: PropTypes.array.isRequired,
  setControlValue: PropTypes.func,
  mapStyle: PropTypes.string,
  mapboxApiAccessToken: PropTypes.string.isRequired,
  onViewportChange: PropTypes.func,
};
const defaultProps = {
  mapStyle: 'light',
  onViewportChange: () => {},
  setControlValue: () => {},
};

export default class DeckGLContainer extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.onViewStateChange = this.onViewStateChange.bind(this);
    // This has to be placed after this.tick is bound to this
    this.state = {
      previousViewport: props.viewport,
      timer: setInterval(this.tick, TICK),
      viewState: props.viewport,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.viewport !== prevState.viewport) {
      return {
        viewport: { ...nextProps.viewport },
        previousViewport: prevState.viewport,
      };
    }

    return null;
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  onViewStateChange({ oldViewState, viewState }) {
    this.setState({ viewState, lastUpdate: Date.now() });
  }

  tick() {
    // Rate limiting updating viewport controls as it triggers lotsa renders
    const { lastUpdate } = this.state;
    if (lastUpdate && Date.now() - lastUpdate > TICK) {
      const setCV = this.props.setControlValue;
      if (setCV) {
        setCV('viewport', this.state.viewState);
      }
      this.setState({ lastUpdate: null });
    }
  }

  layers() {
    // Support for layer factory
    if (this.props.layers.some(l => typeof l === 'function')) {
      return this.props.layers.map(l => (typeof l === 'function' ? l() : l));
    }

    return this.props.layers;
  }

  render() {
    const { viewport, width, height } = this.props;
    const { viewState } = this.state;
    const layers = this.layers();
    return (
      <DeckGL
        width={width}
        height={height}
        layers={layers}
        controller={true}
        viewState={viewState}
        onViewStateChange={this.onViewStateChange}
        initWebGLParameters
      >
        <StaticMap
          mapStyle={this.props.mapStyle}
          mapboxApiAccessToken={this.props.mapboxApiAccessToken}
        />
      </DeckGL>
    );
  }
}

DeckGLContainer.propTypes = propTypes;
DeckGLContainer.defaultProps = defaultProps;
