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
import {
  type PropertyMappingVisitor,
  PropertyMapping,
} from '../../../mapping/PropertyMapping.js';

export class FlatDataAssociationPropertyMapping
  extends PropertyMapping
  implements Hashable
{
  flatData!: string;
  sectionName!: string;

  accept_PropertyMappingVisitor<T>(visitor: PropertyMappingVisitor<T>): T {
    return visitor.visit_FlatDataAssociationPropertyMapping(this);
  }

  override get hashCode(): string {
    return hashArray([
      CORE_HASH_STRUCTURE.FLAT_DATA_ASSOCIATION_PROPERTY_MAPPING,
      super.hashCode,
      this.flatData,
      this.sectionName,
    ]);
  }
}
