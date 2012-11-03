/**
 * UIFormLayout.java
 * DO NOT EDIT THIS FILE
 * This file was automatically generated by org.operamasks.faces.tools.apt.ComponentAnnotationProcessorFactory
 * at Sat Nov 03 15:46:26 CST 2012
 */

package org.operamasks.faces.webapp.layout;

/**
* @jsp.tag name="formLayout" body-content="JSP"
*/
public class UIFormLayoutTag extends org.operamasks.faces.webapp.html.HtmlBasicELTag {
    public String getComponentType() {
	return "org.operamasks.faces.component.layout.impl.UIFormLayout";
    }

    public String getRendererType() {
	return "org.operamasks.faces.component.layout.impl.UIFormLayout";
    }

    private javax.el.ValueExpression hideLabels;
    /**
    * @jsp.attribute type="java.lang.Boolean"
    */
    public void setHideLabels(javax.el.ValueExpression value) {
	this.hideLabels = value;
    }
    private javax.el.ValueExpression itemCls;
    /**
    * @jsp.attribute type="java.lang.String"
    */
    public void setItemCls(javax.el.ValueExpression value) {
	this.itemCls = value;
    }
    private javax.el.ValueExpression labelAlign;
    /**
    * @jsp.attribute type="java.lang.String"
    */
    public void setLabelAlign(javax.el.ValueExpression value) {
	this.labelAlign = value;
    }
    private javax.el.ValueExpression labelPad;
    /**
    * @jsp.attribute type="java.lang.Integer"
    */
    public void setLabelPad(javax.el.ValueExpression value) {
	this.labelPad = value;
    }
    private javax.el.ValueExpression labelWidth;
    /**
    * @jsp.attribute type="java.lang.Integer"
    */
    public void setLabelWidth(javax.el.ValueExpression value) {
	this.labelWidth = value;
    }
    private javax.el.ValueExpression clearCls;
    /**
    * @jsp.attribute type="java.lang.String"
    */
    public void setClearCls(javax.el.ValueExpression value) {
	this.clearCls = value;
    }
    private javax.el.ValueExpression fieldLabel;
    /**
    * @jsp.attribute type="java.lang.String"
    */
    public void setFieldLabel(javax.el.ValueExpression value) {
	this.fieldLabel = value;
    }
    private javax.el.ValueExpression hideLabel;
    /**
    * @jsp.attribute type="java.lang.Boolean"
    */
    public void setHideLabel(javax.el.ValueExpression value) {
	this.hideLabel = value;
    }
    private javax.el.ValueExpression labelSeparator;
    /**
    * @jsp.attribute type="java.lang.String"
    */
    public void setLabelSeparator(javax.el.ValueExpression value) {
	this.labelSeparator = value;
    }
    private javax.el.ValueExpression labelStyle;
    /**
    * @jsp.attribute type="java.lang.String"
    */
    public void setLabelStyle(javax.el.ValueExpression value) {
	this.labelStyle = value;
    }
    protected void setProperties(javax.faces.component.UIComponent c) {
	super.setProperties(c);
	c.setValueExpression("hideLabels", this.hideLabels);
	c.setValueExpression("itemCls", this.itemCls);
	c.setValueExpression("labelAlign", this.labelAlign);
	c.setValueExpression("labelPad", this.labelPad);
	c.setValueExpression("labelWidth", this.labelWidth);
	c.setValueExpression("clearCls", this.clearCls);
	c.setValueExpression("fieldLabel", this.fieldLabel);
	c.setValueExpression("hideLabel", this.hideLabel);
	c.setValueExpression("labelSeparator", this.labelSeparator);
	c.setValueExpression("labelStyle", this.labelStyle);
    }

    public void release() {
	super.release();
	this.hideLabels = null;
	this.itemCls = null;
	this.labelAlign = null;
	this.labelPad = null;
	this.labelWidth = null;
	this.clearCls = null;
	this.fieldLabel = null;
	this.hideLabel = null;
	this.labelSeparator = null;
	this.labelStyle = null;
    }

}
