/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
/* eslint-disable camelcase */
/* eslint-disable react/no-unsafe */
/* eslint-disable sort-keys */
/* eslint-disable react/no-unused-prop-types */
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

import SingleLayerDeckGLContainer from './SingleLayerDeckGLContainer';
import CategoricalDeckGLContainer from './CategoricalDeckGLContainer';

const propTypes = {
  formData: PropTypes.object.isRequired,
  payload: PropTypes.object.isRequired,
  setControlValue: PropTypes.func.isRequired,
  setTooltip: PropTypes.func,
  initialViewState: PropTypes.object,
};
const defaultProps = {
  setTooltip() {},
  initialViewState: null,
};

export function createDeckGLComponent(getLayer, getPoints) {
  // Higher order component
  class Component extends React.PureComponent {
    render() {
      const { formData, payload } = this.props;

      return (
        <SingleLayerDeckGLContainer
          {...this.props}
          initialViewState={this.props.initialViewState}
          mapboxApiAccessToken={payload.data.mapboxApiKey}
          getLayer={getLayer}
          getPoints={getPoints}
          mapStyle={formData.mapbox_style}
        />
      );
    }
  }
  Component.propTypes = propTypes;
  Component.defaultProps = defaultProps;

  return Component;
}

export function createCategoricalDeckGLComponent(getLayer, getPoints) {
  class Component extends React.PureComponent {
    render() {
      return (
        <CategoricalDeckGLContainer
          {...this.props}
          initialViewState={this.props.initialViewState}
          mapboxApiKey={this.props.payload.data.mapboxApiKey}
          getLayer={getLayer}
          getPoints={getPoints}
        />
      );
    }
  }

  Component.propTypes = propTypes;
  Component.defaultProps = defaultProps;

  return Component;
}
