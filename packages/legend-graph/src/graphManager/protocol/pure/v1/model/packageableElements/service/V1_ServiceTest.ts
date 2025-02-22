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

import { hashArray, type Hashable } from '@finos/legend-shared';
import { CORE_HASH_STRUCTURE } from '../../../../../../../graph/Core_HashUtils.js';
import { V1_AtomicTest } from '../../test/V1_AtomicTest.js';
import type { V1_ParameterValue } from './V1_ParameterValue.js';

export class V1_ServiceTest extends V1_AtomicTest implements Hashable {
  serializationFormat: string | undefined;
  parameters: V1_ParameterValue[] = [];

  get hashCode(): string {
    return hashArray([
      CORE_HASH_STRUCTURE.SERVICE_TEST,
      this.id,
      hashArray(this.assertions),
      hashArray(this.parameters),
      this.serializationFormat ?? '',
    ]);
  }
}
