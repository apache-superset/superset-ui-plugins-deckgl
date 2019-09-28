/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable sort-keys */
/* eslint-disable react/require-default-props */
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
import PlaySlider from './components/PlaySlider';

const PLAYSLIDER_HEIGHT = 20; // px

const propTypes = {
  getLayer: PropTypes.func.isRequired,
  getPoints: PropTypes.func.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  getStep: PropTypes.func,
  values: PropTypes.array.isRequired,
  aggregation: PropTypes.bool,
  disabled: PropTypes.bool,
  initialViewState: PropTypes.object.isRequired,
  children: PropTypes.node,
  mapStyle: PropTypes.string,
  mapboxApiAccessToken: PropTypes.string.isRequired,
  setControlValue: PropTypes.func,
  oninitialViewStateChange: PropTypes.func,
  onValuesChange: PropTypes.func,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

const defaultProps = {
  aggregation: false,
  disabled: false,
  mapStyle: 'light',
  setControlValue: () => {},
  oninitialViewStateChange: () => {},
  onValuesChange: () => {},
};

export default class AnimatableDeckGLContainer extends React.Component {
  constructor(props) {
    super(props);
    this.oninitialViewStateChange = this.oninitialViewStateChange.bind(this);
  }

  oninitialViewStateChange(initialViewState) {
    this.props.oninitialViewStateChange(initialViewState);
  }

  render() {
    const {
      aggregation,
      children,
      disabled,
      end,
      formData,
      getLayer,
      getPoints,
      getStep,
      height,
      initialViewState,
      mapStyle,
      mapboxApiAccessToken,
      onValuesChange,
      payload,
      setControlValue,
      start,
      values,
      width,
    } = this.props;

    return (
      <div>
        <SingleLayerDeckGLContainer
          initialViewState={initialViewState}
          getLayer={getLayer}
          getPoints={getPoints}
          payload={payload}
          formData={formData}
          setControlValue={setControlValue}
          mapStyle={mapStyle}
          mapboxApiAccessToken={mapboxApiAccessToken}
          oninitialViewStateChange={this.oninitialViewStateChange}
          // leave space for the play slider
          height={disabled ? height : height - PLAYSLIDER_HEIGHT}
          width={width}
        >
          {children}
        </SingleLayerDeckGLContainer>
        {!disabled && (
          <PlaySlider
            start={start}
            end={end}
            step={getStep(start)}
            values={values}
            range={!aggregation}
            onChange={onValuesChange}
          />
        )}
      </div>
    );
  }
}

AnimatableDeckGLContainer.propTypes = propTypes;
AnimatableDeckGLContainer.defaultProps = defaultProps;
