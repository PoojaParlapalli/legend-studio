/**
 * Copyright (c) 2020-present, Goldman Sachs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createRoot } from 'react-dom/client';
import {
  type LegendApplicationConfig,
  ApplicationStoreProvider,
  LegendApplication,
  setupLegendApplicationUILibrary,
  WebApplicationNavigatorProvider,
  type LegendApplicationConfigurationInput,
} from '@finos/legend-application';
import { configure as configureReactHotkeys } from 'react-hotkeys';
import { BrowserRouter } from 'react-router-dom';
import { LegendQueryApplication } from '../components/LegendQueryApplication.js';
import { LegendQueryPluginManager } from './LegendQueryPluginManager.js';
import { getRootElement } from '@finos/legend-art';
import { Core_PureGraphManagerPlugin } from '@finos/legend-graph';
import {
  type LegendQueryApplicationConfigurationData,
  LegendQueryApplicationConfig,
} from './LegendQueryApplicationConfig.js';
import {
  QueryBuilder_GraphManagerPreset,
  setupQueryBuilderUILibrary,
} from '@finos/legend-query-builder';

export const setupLegendQueryUILibrary = async (): Promise<void> => {
  await setupQueryBuilderUILibrary();
  configureReactHotkeys({
    // By default, `react-hotkeys` will avoid capturing keys from input tags like <input>, <textarea>, <select>
    // We want to listen to hotkey from every where in the app so we disable that
    // See https://github.com/greena13/react-hotkeys#ignoring-events
    ignoreTags: [],
  });
};

export class LegendQuery extends LegendApplication {
  declare config: LegendQueryApplicationConfig;
  declare pluginManager: LegendQueryPluginManager;

  static create(): LegendQuery {
    const application = new LegendQuery(LegendQueryPluginManager.create());
    application.withBasePlugins([new Core_PureGraphManagerPlugin()]);
    application.withBasePresets([new QueryBuilder_GraphManagerPreset()]);
    return application;
  }

  async configureApplication(
    input: LegendApplicationConfigurationInput<LegendQueryApplicationConfigurationData>,
  ): Promise<LegendApplicationConfig> {
    return new LegendQueryApplicationConfig(input);
  }

  async loadApplication(): Promise<void> {
    // Setup React application libraries
    await setupLegendApplicationUILibrary(this.pluginManager, this.logger);
    await setupLegendQueryUILibrary();

    // Render React application
    const rootElement = createRoot(getRootElement());
    rootElement.render(
      <BrowserRouter basename={this.baseUrl}>
        <WebApplicationNavigatorProvider>
          <ApplicationStoreProvider
            config={this.config}
            pluginManager={this.pluginManager}
          >
            <LegendQueryApplication config={this.config} />
          </ApplicationStoreProvider>
        </WebApplicationNavigatorProvider>
      </BrowserRouter>,
    );
  }
}
