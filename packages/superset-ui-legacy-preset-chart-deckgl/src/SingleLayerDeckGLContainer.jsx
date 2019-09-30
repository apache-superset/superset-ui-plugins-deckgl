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
import { isEqual } from 'lodash';
import DeckGLContainer from './DeckGLContainer';
import { fitViewport } from './layers/common';

const propTypes = {
  getLayer: PropTypes.func.isRequired,
  getPoints: PropTypes.func.isRequired,
  payload: PropTypes.object,
  filters: PropTypes.arrayOf(PropTypes.func),
};
const defaultProps = {
  features: [],
};

export default class SingleLayerDeckGLContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layer: this.computeLayer(props),
      initialViewState: this.getAutoZoomViewState(),
    };
  }
  getAutoZoomViewState() {
    const { initialViewState, width, height, payload, formData, getPoints } = this.props;
    const { autozoom } = formData;
    const sizedViewState = { ...initialViewState, width, height };
    const data = payload.data;
    const features = data.features ? data.features : data;
    const points = getPoints(features);

    return autozoom ? fitViewport(sizedViewState, points) : initialViewState;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // Only recompute the layer if anything BUT the viewport has changed
    const nextFdNoVP = { ...nextProps.formData, viewport: null };
    const currFdNoVP = { ...this.props.formData, viewport: null };
    if (!isEqual(nextFdNoVP, currFdNoVP) || nextProps.payload !== this.props.payload) {
      this.setState({ layer: this.computeLayer(nextProps) });
    }
  }

  computeLayer(props) {
    const { formData, payload, onAddFilter, setTooltip, getLayer } = props;
    return getLayer(formData, payload, onAddFilter, setTooltip);
  }

  render() {
    return (
      <DeckGLContainer
        {...this.props}
        layers={[this.state.layer]}
        initialViewState={this.state.initialViewState}
      >
        {this.props.children}
      </DeckGLContainer>
    );
  }
}

SingleLayerDeckGLContainer.propTypes = propTypes;
SingleLayerDeckGLContainer.defaultProps = defaultProps;
