/*
 * $Id: ValidateLongRange.java,v 1.7 2007/10/28 08:03:16 daniel Exp $
 *
 * Copyright (C) 2006 Operamasks Community.
 * Copyright (C) 2000-2006 Apusic Systems, Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses.
 */
package org.operamasks.faces.annotation;

import java.lang.annotation.*;
import javax.faces.validator.LongRangeValidator;

@Documented
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Validator(id=LongRangeValidator.VALIDATOR_ID)
public @interface ValidateLongRange
{
    long minimum() default Long.MIN_VALUE;
    long maximum() default Long.MAX_VALUE;
    String message() default "";
}
