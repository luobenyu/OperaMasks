/**
 * UIField.java
 * DO NOT EDIT THIS FILE
 * This file was automatically generated by org.operamasks.faces.tools.apt.ComponentAnnotationProcessorFactory
 * at Sat Nov 03 15:46:26 CST 2012
 */

package org.operamasks.faces.component.form.impl;

import org.operamasks.faces.component.form.base.UIFieldBase;

@javax.annotation.Generated(value="org.operamasks.faces.tools.apt.ComponentAnnotationProcessorFactory", date="2012-11-03T15:46:26Z")
public class UIField extends UIFieldBase {
    public static final String COMPONENT_TYPE = "org.operamasks.faces.component.form.impl.UIField";

    public UIField() {
	super.setRendererType("org.operamasks.faces.component.form.impl.UIField");
    }

    public java.lang.String getAutoCreate() {
	if (this.autoCreate != null) {
	    return this.autoCreate;
	}
	javax.el.ValueExpression ve = this.getValueExpression("autoCreate");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setAutoCreate(java.lang.String value) {
	this.autoCreate = value;
    }

    public java.lang.String getClearCls() {
	if (this.clearCls != null) {
	    return this.clearCls;
	}
	javax.el.ValueExpression ve = this.getValueExpression("clearCls");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setClearCls(java.lang.String value) {
	this.clearCls = value;
    }

    public java.lang.String getCls() {
	if (this.cls != null) {
	    return this.cls;
	}
	javax.el.ValueExpression ve = this.getValueExpression("cls");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setCls(java.lang.String value) {
	this.cls = value;
    }

    public java.lang.String getFieldClass() {
	if (this.fieldClass != null) {
	    return this.fieldClass;
	}
	javax.el.ValueExpression ve = this.getValueExpression("fieldClass");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setFieldClass(java.lang.String value) {
	this.fieldClass = value;
    }

    public java.lang.String getFieldLabel() {
	if (this.fieldLabel != null) {
	    return this.fieldLabel;
	}
	javax.el.ValueExpression ve = this.getValueExpression("fieldLabel");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setFieldLabel(java.lang.String value) {
	this.fieldLabel = value;
    }

    public java.lang.String getFocusClass() {
	if (this.focusClass != null) {
	    return this.focusClass;
	}
	javax.el.ValueExpression ve = this.getValueExpression("focusClass");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setFocusClass(java.lang.String value) {
	this.focusClass = value;
    }

    public java.lang.Boolean getHideLabel() {
	if (this.hideLabel != null) {
	    return this.hideLabel;
	}
	javax.el.ValueExpression ve = this.getValueExpression("hideLabel");
	if (ve != null) {
	    try {
		return (java.lang.Boolean)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setHideLabel(java.lang.Boolean value) {
	this.hideLabel = value;
    }

    public java.lang.String getInputType() {
	if (this.inputType != null) {
	    return this.inputType;
	}
	javax.el.ValueExpression ve = this.getValueExpression("inputType");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setInputType(java.lang.String value) {
	this.inputType = value;
    }

    public java.lang.String getInvalidClass() {
	if (this.invalidClass != null) {
	    return this.invalidClass;
	}
	javax.el.ValueExpression ve = this.getValueExpression("invalidClass");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setInvalidClass(java.lang.String value) {
	this.invalidClass = value;
    }

    public java.lang.String getInvalidText() {
	if (this.invalidText != null) {
	    return this.invalidText;
	}
	javax.el.ValueExpression ve = this.getValueExpression("invalidText");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setInvalidText(java.lang.String value) {
	this.invalidText = value;
    }

    public java.lang.String getItemCls() {
	if (this.itemCls != null) {
	    return this.itemCls;
	}
	javax.el.ValueExpression ve = this.getValueExpression("itemCls");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setItemCls(java.lang.String value) {
	this.itemCls = value;
    }

    public java.lang.String getLabelSeparator() {
	if (this.labelSeparator != null) {
	    return this.labelSeparator;
	}
	javax.el.ValueExpression ve = this.getValueExpression("labelSeparator");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setLabelSeparator(java.lang.String value) {
	this.labelSeparator = value;
    }

    public java.lang.String getLabelStyle() {
	if (this.labelStyle != null) {
	    return this.labelStyle;
	}
	javax.el.ValueExpression ve = this.getValueExpression("labelStyle");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setLabelStyle(java.lang.String value) {
	this.labelStyle = value;
    }

    public java.lang.String getMsgFx() {
	if (this.msgFx != null) {
	    return this.msgFx;
	}
	javax.el.ValueExpression ve = this.getValueExpression("msgFx");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setMsgFx(java.lang.String value) {
	this.msgFx = value;
    }

    public java.lang.String getMsgTarget() {
	if (this.msgTarget != null) {
	    return this.msgTarget;
	}
	javax.el.ValueExpression ve = this.getValueExpression("msgTarget");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setMsgTarget(java.lang.String value) {
	this.msgTarget = value;
    }

    public java.lang.String getName() {
	if (this.name != null) {
	    return this.name;
	}
	javax.el.ValueExpression ve = this.getValueExpression("name");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setName(java.lang.String value) {
	this.name = value;
    }

    public java.lang.Boolean getReadOnly() {
	if (this.readOnly != null) {
	    return this.readOnly;
	}
	javax.el.ValueExpression ve = this.getValueExpression("readOnly");
	if (ve != null) {
	    try {
		return (java.lang.Boolean)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setReadOnly(java.lang.Boolean value) {
	this.readOnly = value;
    }

    public java.lang.Integer getTabIndex() {
	if (this.tabIndex != null) {
	    return this.tabIndex;
	}
	javax.el.ValueExpression ve = this.getValueExpression("tabIndex");
	if (ve != null) {
	    try {
		return (java.lang.Integer)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setTabIndex(java.lang.Integer value) {
	this.tabIndex = value;
    }

    public java.lang.Boolean getValidateOnBlur() {
	if (this.validateOnBlur != null) {
	    return this.validateOnBlur;
	}
	javax.el.ValueExpression ve = this.getValueExpression("validateOnBlur");
	if (ve != null) {
	    try {
		return (java.lang.Boolean)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setValidateOnBlur(java.lang.Boolean value) {
	this.validateOnBlur = value;
    }

    public java.lang.Boolean getValidationDelay() {
	if (this.validationDelay != null) {
	    return this.validationDelay;
	}
	javax.el.ValueExpression ve = this.getValueExpression("validationDelay");
	if (ve != null) {
	    try {
		return (java.lang.Boolean)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setValidationDelay(java.lang.Boolean value) {
	this.validationDelay = value;
    }

    public java.lang.String getValidationEvent() {
	if (this.validationEvent != null) {
	    return this.validationEvent;
	}
	javax.el.ValueExpression ve = this.getValueExpression("validationEvent");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setValidationEvent(java.lang.String value) {
	this.validationEvent = value;
    }

    public java.lang.Boolean getAutoWidth() {
	if (this.autoWidth != null) {
	    return this.autoWidth;
	}
	javax.el.ValueExpression ve = this.getValueExpression("autoWidth");
	if (ve != null) {
	    try {
		return (java.lang.Boolean)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setAutoWidth(java.lang.Boolean value) {
	this.autoWidth = value;
    }

    public java.lang.Boolean getAutoHeight() {
	if (this.autoHeight != null) {
	    return this.autoHeight;
	}
	javax.el.ValueExpression ve = this.getValueExpression("autoHeight");
	if (ve != null) {
	    try {
		return (java.lang.Boolean)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setAutoHeight(java.lang.Boolean value) {
	this.autoHeight = value;
    }

    public java.lang.Integer getHeight() {
	if (this.height != null) {
	    return this.height;
	}
	javax.el.ValueExpression ve = this.getValueExpression("height");
	if (ve != null) {
	    try {
		return (java.lang.Integer)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setHeight(java.lang.Integer value) {
	this.height = value;
    }

    public java.lang.Integer getWidth() {
	if (this.width != null) {
	    return this.width;
	}
	javax.el.ValueExpression ve = this.getValueExpression("width");
	if (ve != null) {
	    try {
		return (java.lang.Integer)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setWidth(java.lang.Integer value) {
	this.width = value;
    }

    public java.lang.String getOnfocus() {
	if (this.onfocus != null) {
	    return this.onfocus;
	}
	javax.el.ValueExpression ve = this.getValueExpression("onfocus");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setOnfocus(java.lang.String value) {
	this.onfocus = value;
    }

    public java.lang.String getOnblur() {
	if (this.onblur != null) {
	    return this.onblur;
	}
	javax.el.ValueExpression ve = this.getValueExpression("onblur");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setOnblur(java.lang.String value) {
	this.onblur = value;
    }

    public java.lang.String getOnchange() {
	if (this.onchange != null) {
	    return this.onchange;
	}
	javax.el.ValueExpression ve = this.getValueExpression("onchange");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setOnchange(java.lang.String value) {
	this.onchange = value;
    }

    public java.lang.String getOndisable() {
	if (this.ondisable != null) {
	    return this.ondisable;
	}
	javax.el.ValueExpression ve = this.getValueExpression("ondisable");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setOndisable(java.lang.String value) {
	this.ondisable = value;
    }

    public java.lang.String getOnenable() {
	if (this.onenable != null) {
	    return this.onenable;
	}
	javax.el.ValueExpression ve = this.getValueExpression("onenable");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setOnenable(java.lang.String value) {
	this.onenable = value;
    }

    public java.lang.String getOnshow() {
	if (this.onshow != null) {
	    return this.onshow;
	}
	javax.el.ValueExpression ve = this.getValueExpression("onshow");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setOnshow(java.lang.String value) {
	this.onshow = value;
    }

    public java.lang.String getOnhide() {
	if (this.onhide != null) {
	    return this.onhide;
	}
	javax.el.ValueExpression ve = this.getValueExpression("onhide");
	if (ve != null) {
	    try {
		return (java.lang.String)ve.getValue(this.getFacesContext().getELContext());
	    } catch (javax.el.ELException e) {
		throw new javax.faces.FacesException(e);
	    }
	}
	return null;
    }

    public void setOnhide(java.lang.String value) {
	this.onhide = value;
    }

    public Object saveState(javax.faces.context.FacesContext context) {
	return new Object[] {
	    super.saveState(context),
	    this.autoCreate,
	    this.clearCls,
	    this.cls,
	    this.disabled,
	    this.fieldClass,
	    this.fieldLabel,
	    this.focusClass,
	    this.hideLabel,
	    this.inputType,
	    this.invalidClass,
	    this.invalidText,
	    this.itemCls,
	    this.labelSeparator,
	    this.labelStyle,
	    this.msgFx,
	    this.msgTarget,
	    this.name,
	    this.readOnly,
	    this.tabIndex,
	    this.validateOnBlur,
	    this.validationDelay,
	    this.validationEvent,
	    this.autoWidth,
	    this.autoHeight,
	    this.height,
	    this.width,
	    this.onfocus,
	    this.onblur,
	    this.onchange,
	    this.ondisable,
	    this.onenable,
	    this.onshow,
	    this.onhide,
	};
    }

    public void restoreState(javax.faces.context.FacesContext context, Object state) {
	Object[] values = (Object[])state;
	super.restoreState(context, values[0]);
	this.autoCreate = (java.lang.String)values[1];
	this.clearCls = (java.lang.String)values[2];
	this.cls = (java.lang.String)values[3];
	this.disabled = (java.lang.Boolean)values[4];
	this.fieldClass = (java.lang.String)values[5];
	this.fieldLabel = (java.lang.String)values[6];
	this.focusClass = (java.lang.String)values[7];
	this.hideLabel = (java.lang.Boolean)values[8];
	this.inputType = (java.lang.String)values[9];
	this.invalidClass = (java.lang.String)values[10];
	this.invalidText = (java.lang.String)values[11];
	this.itemCls = (java.lang.String)values[12];
	this.labelSeparator = (java.lang.String)values[13];
	this.labelStyle = (java.lang.String)values[14];
	this.msgFx = (java.lang.String)values[15];
	this.msgTarget = (java.lang.String)values[16];
	this.name = (java.lang.String)values[17];
	this.readOnly = (java.lang.Boolean)values[18];
	this.tabIndex = (java.lang.Integer)values[19];
	this.validateOnBlur = (java.lang.Boolean)values[20];
	this.validationDelay = (java.lang.Boolean)values[21];
	this.validationEvent = (java.lang.String)values[22];
	this.autoWidth = (java.lang.Boolean)values[23];
	this.autoHeight = (java.lang.Boolean)values[24];
	this.height = (java.lang.Integer)values[25];
	this.width = (java.lang.Integer)values[26];
	this.onfocus = (java.lang.String)values[27];
	this.onblur = (java.lang.String)values[28];
	this.onchange = (java.lang.String)values[29];
	this.ondisable = (java.lang.String)values[30];
	this.onenable = (java.lang.String)values[31];
	this.onshow = (java.lang.String)values[32];
	this.onhide = (java.lang.String)values[33];
    }

}