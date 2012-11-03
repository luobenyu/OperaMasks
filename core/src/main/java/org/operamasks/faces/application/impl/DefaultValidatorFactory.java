/*
 * $Id: DefaultValidatorFactory.java,v 1.2 2007/10/26 16:30:11 daniel Exp $
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

package org.operamasks.faces.application.impl;

import javax.faces.validator.Validator;
import org.operamasks.faces.application.ValidatorFactory;
import org.operamasks.faces.application.TargetCreator;

public class DefaultValidatorFactory implements ValidatorFactory
{
    private TargetCreator creator;

    public DefaultValidatorFactory(TargetCreator creator) {
        this.creator = creator;
    }

    public DefaultValidatorFactory(Class<?> validatorClass) {
        this.creator = new DefaultTargetCreator(validatorClass);
    }

    public Validator createValidator() {
        return (Validator)this.creator.createTarget(null);
    }
}
