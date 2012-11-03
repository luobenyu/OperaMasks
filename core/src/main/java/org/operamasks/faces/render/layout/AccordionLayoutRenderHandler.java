/*
 * $Id 
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
package org.operamasks.faces.render.layout;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;

import org.operamasks.faces.annotation.component.ext.ExtClass;
import org.operamasks.faces.component.layout.impl.UIAccordionLayout;
import org.operamasks.faces.component.widget.ExtConfig;

@ExtClass("Ext.Panel")
public class AccordionLayoutRenderHandler extends LayoutRenderHandler
{
    @Override
    protected void processExtConfig(FacesContext context,
            UIComponent component, ExtConfig config) {
        UIAccordionLayout accordionLayout = (UIAccordionLayout)component;
        config.set("layout", "accordion");
        config.remove("activeOnTop");
        config.remove("animate");
        config.remove("titleCollapse");
        ExtConfig layoutConfig = new ExtConfig();
        layoutConfig.set("activeOnTop", accordionLayout.getActiveOnTop());
        layoutConfig.set("animate", accordionLayout.getAnimate());
        layoutConfig.set("titleCollapse", accordionLayout.getTitleCollapse());
        config.set("layoutConfig", "{" + layoutConfig.toScript() + "}", true);
    }
}
