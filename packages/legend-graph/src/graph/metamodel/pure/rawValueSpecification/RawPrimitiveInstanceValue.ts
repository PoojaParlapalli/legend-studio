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
import type { Multiplicity } from '../packageableElements/domain/Multiplicity.js';
import type { PackageableElementReference } from '../packageableElements/PackageableElementReference.js';
import type { Type } from '../packageableElements/domain/Type.js';
import {
  type RawValueSpecificationVisitor,
  RawValueSpecification,
} from './RawValueSpecification.js';
import { CORE_HASH_STRUCTURE } from '../../../../graph/Core_HashUtils.js';

export class RawPrimitiveInstanceValue
  extends RawValueSpecification
  implements Hashable
{
  type: PackageableElementReference<Type>;
  multiplicity: Multiplicity;
  values?: (string | number)[] | undefined;

  constructor(
    type: PackageableElementReference<Type>,
    multiplicity: Multiplicity,
    values: (string | number)[] | undefined,
  ) {
    super();
    this.type = type;
    this.multiplicity = multiplicity;
    this.values = values;
  }

  get hashCode(): string {
    return hashArray([
      CORE_HASH_STRUCTURE.RAW_INSTANCE_VALUE,
      this.type.valueForSerialization ?? '',
      this.multiplicity,
      this.values
        ? hashArray(this.values.map((value) => value.toString()))
        : '',
    ]);
  }

  accept_RawValueSpecificationVisitor<T>(
    visitor: RawValueSpecificationVisitor<T>,
  ): T {
    return visitor.visit_RawPrimitiveInstanceValue(this);
  }
}
