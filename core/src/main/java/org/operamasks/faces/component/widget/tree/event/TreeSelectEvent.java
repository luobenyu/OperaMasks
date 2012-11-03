/*
 * $Id: TreeSelectEvent.java,v 1.2 2007/12/11 04:20:12 jacky Exp $
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
 *
 */

package org.operamasks.faces.component.widget.tree.event;

import org.operamasks.faces.component.widget.UITree;
import org.operamasks.faces.component.widget.UITreeNode;

public class TreeSelectEvent extends TreeEvent {
	private static final long serialVersionUID = 4357672189451850108L;

	public TreeSelectEvent(UITree source, UITreeNode affectedNode) {
		super(source, affectedNode);
	}

	@Override
	public TreeEventType getEventType() {
		return UITreeNode.SELECT;
	}

}
