/*
 * $Id: ELDataModelBinding.java,v 1.3 2008/01/31 04:12:24 daniel Exp $
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

package org.operamasks.faces.binding.impl;

import javax.faces.context.FacesContext;
import javax.faces.component.UIComponent;
import javax.faces.component.UIData;
import javax.el.ValueExpression;

import elite.lang.Closure;
import org.operamasks.faces.binding.ModelBindingContext;

class ELDataModelBinding extends Binding
{
    private Closure closure;
    private String id;
    private Class<?> itemType;
    private Closure init;

    ELDataModelBinding(Closure closure, String id, Class<?> itemType, Closure init) {
        super(null);
        this.closure = closure;
        this.id = id;
        this.itemType = itemType;
        this.init = init;
    }

    public void apply(FacesContext ctx, ModelBindingContext mbc) {
        UIComponent comp = mbc.getComponent(id);
        if ((comp == null) || !(comp instanceof UIData)) {
            return;
        }

        UIData data = (UIData)comp;

        // Bind the value attribute of UIData component
        if (data.getValueExpression("value") == null) {
            ValueExpression binding = new ClosureValueAdapter(closure, init);
            comp.setValueExpression("value", binding);
        }

        // apply data item bindings
        mbc.applyDataModel(ctx, data, this.itemType);
    }
}
