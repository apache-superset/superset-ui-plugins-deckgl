/* eslint-disable react/no-array-index-key */
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
import { BitmapLayer } from 'deck.gl';
// TODO import geojsonExtent from 'geojson-extent';

import DeckGLContainer from '../../DeckGLContainer';
import { commonLayerProps } from '../common';
import TooltipRow from '../../TooltipRow';

function setTooltipContent(o) {
  return (
    o.object.extraProps && (
      <div className="deckgl-tooltip">
        {Object.keys(o.object.extraProps).map((prop, index) => (
          <TooltipRow
            key={`prop-${index}`}
            label={`${prop}: `}
            value={`${o.object.extraProps[prop]}`}
          />
        ))}
      </div>
    )
  );
}

export function getLayer(formData, setTooltip) {
  const fd = formData;
  return new BitmapLayer({
    id: `bitmap-layer-${fd.slice_id}`,
    bounds: [
      fd.top_left_longitude_bound,
      fd.top_left_latitude_bound,
      bottom_right_longitude_bound,
      fd.bottom_right_latitude_bound,
    ],
    image: fd.image_url,
    ...commonLayerProps(fd, setTooltip, setTooltipContent),
  });
}

const propTypes = {
  formData: PropTypes.object.isRequired,
  payload: PropTypes.object.isRequired,
  setControlValue: PropTypes.func.isRequired,
  viewport: PropTypes.object.isRequired,
  onAddFilter: PropTypes.func,
};
const defaultProps = {
  onAddFilter() {},
};

class DeckGLGeoJson extends React.Component {
  containerRef = React.createRef();

  setTooltip = tooltip => {
    const { current } = this.containerRef;
    if (current) {
      current.setTooltip(tooltip);
    }
  };

  render() {
    const { formData, payload, setControlValue, viewport } = this.props;

    // TODO get this to work
    // if (formData.autozoom) {
    //   viewport = common.fitViewport(viewport, geojsonExtent(payload.data.features));
    // }

    const layer = getLayer(formData, this.setTooltip);

    return (
      <DeckGLContainer
        ref={this.containerRef}
        mapboxApiAccessToken={payload.data.mapboxApiKey}
        viewport={viewport}
        layers={[layer]}
        mapStyle={formData.mapbox_style}
        setControlValue={setControlValue}
      />
    );
  }
}

DeckGLGeoJson.propTypes = propTypes;
DeckGLGeoJson.defaultProps = defaultProps;

export default DeckGLGeoJson;
