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

import { createContext, useContext } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { QuerySetupStore } from '../stores/QuerySetupStore.js';
import { guaranteeNonNullable } from '@finos/legend-shared';
import { useDepotServerClient } from '@finos/legend-server-depot';
import { useLegendQueryApplicationStore } from './LegendQueryBaseStoreProvider.js';

const QuerySetupStoreContext = createContext<QuerySetupStore | undefined>(
  undefined,
);

export const QuerySetupStoreProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const applicationStore = useLegendQueryApplicationStore();
  const depotServerClient = useDepotServerClient();
  const store = useLocalObservable(
    () => new QuerySetupStore(applicationStore, depotServerClient),
  );
  return (
    <QuerySetupStoreContext.Provider value={store}>
      {children}
    </QuerySetupStoreContext.Provider>
  );
};

export const useQuerySetupStore = (): QuerySetupStore =>
  guaranteeNonNullable(
    useContext(QuerySetupStoreContext),
    `Can't find query setup store in context`,
  );

export const withQuerySetupStore = (WrappedComponent: React.FC): React.FC =>
  function WithQuerySetupStore() {
    return (
      <QuerySetupStoreProvider>
        <WrappedComponent />
      </QuerySetupStoreProvider>
    );
  };
