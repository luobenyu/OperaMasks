/*
 * $Id: ConverterTag.java,v 1.4 2007/07/02 07:38:09 jacky Exp $
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

package org.operamasks.faces.webapp.core;

import javax.faces.webapp.ConverterELTag;
import javax.faces.convert.Converter;
import javax.faces.context.FacesContext;
import javax.el.ValueExpression;
import javax.servlet.jsp.JspException;

public class ConverterTag extends ConverterELTag
{
    private ValueExpression converterId;
    private ValueExpression binding;

    public void setConverterId(ValueExpression converterId) {
        this.converterId = converterId;
    }

    public void setBinding(ValueExpression binding) {
        this.binding = binding;
    }

    protected Converter createConverter()
        throws JspException
    {
        FacesContext context = FacesContext.getCurrentInstance();
        Converter converter = null;

        if (binding != null) {
            converter = (Converter)binding.getValue(context.getELContext());
            if (converter != null) return converter;
        }

        if (converterId != null) {
            String convId = (String)converterId.getValue(context.getELContext());
            converter = context.getApplication().createConverter(convId);
            if (converter != null && binding != null) {
                binding.setValue(context.getELContext(), converter);
            }
        }
        return converter;
    }

    public void release() {
        super.release();
        converterId = null;
        binding = null;
    }
}
