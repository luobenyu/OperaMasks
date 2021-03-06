/*
 * $Id: HtmlBasicRenderer.java,v 1.2 2008/01/23 05:33:07 yangdong Exp $
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

package org.operamasks.faces.render;

import java.io.IOException;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;

import org.operamasks.faces.render.html.HtmlResponseWriter;

public interface HtmlBasicRenderer {
    public void encodeBegin(FacesContext context, UIComponent component,
    		HtmlResponseWriter out) throws IOException;
    public void encodeChildren(FacesContext context, UIComponent component,
    		HtmlResponseWriter out) throws IOException;
    public void encodeEnd(FacesContext context, UIComponent component,
    		HtmlResponseWriter out) throws IOException;
}
