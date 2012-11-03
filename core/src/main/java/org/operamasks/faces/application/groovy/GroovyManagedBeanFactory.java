/*
 * $Id: GroovyManagedBeanFactory.java,v 1.5 2007/12/10 06:55:33 jacky Exp $
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

package org.operamasks.faces.application.groovy;

import javax.faces.context.FacesContext;
import org.operamasks.faces.config.ManagedBeanConfig;
import org.operamasks.faces.application.impl.AbstractManagedBeanFactory;

class GroovyManagedBeanFactory extends AbstractManagedBeanFactory
{
    private GroovyScript script;

    public GroovyManagedBeanFactory(ManagedBeanConfig config, GroovyScript script) {
        super(config);
        this.script = script;
        this.loader = script.getClassLoader();
    }

    @Override
    protected Object instantiateBean(FacesContext context) throws Exception {
        return this.script.getScriptClass().newInstance();
    }
    
}
