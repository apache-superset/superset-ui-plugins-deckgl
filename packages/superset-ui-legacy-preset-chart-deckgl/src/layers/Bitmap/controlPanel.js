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
import { sections } from '@superset-ui/chart-controls';
import { t } from '@superset-ui/core';
import { viewport, mapboxStyle, imageUrl, coordinateBounds } from '../../utilities/Shared_DeckGL';

export default {
  controlPanelSections: [
    sections.legacyRegularTime,
    {
      label: t('Map'),
      controlSetRows: [
        [mapboxStyle, viewport],
        // TODO [autozoom, null], // import { autozoom } from './Shared_DeckGL'
        [imageUrl],
        [
          coordinateBounds('top_left_latitude_bound', 'Top left latitude bound'),
          coordinateBounds('top_left_longitude_bound', 'Top left longitude bound'),
        ],
        [
          coordinateBounds('bottom_right_latitude_bound', 'Bottom right latitude bound'),
          coordinateBounds('bottom_right_longitude_bound', 'Bottom right longitude bound'),
        ],
      ],
    },
  ],
};
