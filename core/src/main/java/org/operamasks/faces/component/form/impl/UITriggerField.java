/**
 * UITriggerField.java
 * DO NOT EDIT THIS FILE
 * This file was automatically generated by org.operamasks.faces.tools.apt.ComponentAnnotationProcessorFactory
 * at Sat Nov 03 15:46:26 CST 2012
 */

package org.operamasks.faces.component.form.impl;

import org.operamasks.faces.component.form.base.UITriggerFieldBase;

@javax.annotation.Generated(value="org.operamasks.faces.tools.apt.ComponentAnnotationProcessorFactory", date="2012-11-03T15:46:26Z")
public class UITriggerField extends UITriggerFieldBase {
    public static final String COMPONENT_FAMILY = "org.operamasks.faces.component.form.impl.UITriggerField";
    public static final String COMPONENT_TYPE = "org.operamasks.faces.component.form.impl.UITriggerField";

    public UITriggerField() {
	super.setRendererType("org.operamasks.faces.component.form.impl.UITriggerField");
    }

    public String getFamily() {
	return COMPONENT_FAMILY;
    }

    public java.lang.Boolean getHideTrigger() {
	if (this.hideTrigger != null) {
	    return this.hideTrigger;
	}
	javax.el.ValueExpression ve = this.getValueExpression("hideTrigger");
	if (ve != null) {
	    try {
		return (java.lang.Boolean)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setHideTrigger(java.lang.Boolean value) {
	this.hideTrigger = value;
    }

    public java.lang.String getTriggerClass() {
	if (this.triggerClass != null) {
	    return this.triggerClass;
	}
	javax.el.ValueExpression ve = this.getValueExpression("triggerClass");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setTriggerClass(java.lang.String value) {
	this.triggerClass = value;
    }

    public Object saveState(javax.faces.context.FacesContext context) {
	return new Object[] {
	    super.saveState(context),
	    this.hideTrigger,
	    this.triggerClass,
	};
    }

    public void restoreState(javax.faces.context.FacesContext context, Object state) {
	Object[] values = (Object[])state;
	super.restoreState(context, values[0]);
	this.hideTrigger = (java.lang.Boolean)values[1];
	this.triggerClass = (java.lang.String)values[2];
    }

}
