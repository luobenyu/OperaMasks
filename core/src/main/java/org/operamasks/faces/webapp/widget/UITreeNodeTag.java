/**
 * UITreeNode.java
 * DO NOT EDIT THIS FILE
 * This file was automatically generated by org.operamasks.faces.tools.apt.ComponentAnnotationProcessorFactory
 * at Sat Nov 03 15:46:27 CST 2012
 */

package org.operamasks.faces.webapp.widget;

/**
* @jsp.tag name="myTreeNode" body-content="JSP"
*/
public class UITreeNodeTag extends org.operamasks.faces.webapp.html.HtmlBasicELTag {
    public String getComponentType() {
	return "org.operamasks.faces.component.tree.impl.UITreeNode";
    }

    public String getRendererType() {
	return "org.operamasks.faces.component.tree.impl.UITreeNode";
    }

    private javax.el.ValueExpression text;
    /**
    * @jsp.attribute type="java.lang.String"
    */
    public void setText(javax.el.ValueExpression value) {
	this.text = value;
    }
    private javax.el.ValueExpression icon;
    /**
    * @jsp.attribute type="java.lang.String"
    */
    public void setIcon(javax.el.ValueExpression value) {
	this.icon = value;
    }
    private javax.el.ValueExpression id;
    /**
    * @jsp.attribute type="java.lang.String"
    */
    public void setId(javax.el.ValueExpression value) {
	this.id = value;
    }
    private javax.el.ValueExpression checked;
    /**
    * @jsp.attribute type="java.lang.Boolean"
    */
    public void setChecked(javax.el.ValueExpression value) {
	this.checked = value;
    }
    private javax.el.ValueExpression allowChildren;
    /**
    * @jsp.attribute type="java.lang.Boolean"
    */
    public void setAllowChildren(javax.el.ValueExpression value) {
	this.allowChildren = value;
    }
    private javax.el.ValueExpression disabled;
    /**
    * @jsp.attribute type="java.lang.Boolean"
    */
    public void setDisabled(javax.el.ValueExpression value) {
	this.disabled = value;
    }
    private javax.el.ValueExpression expandable;
    /**
    * @jsp.attribute type="java.lang.Boolean"
    */
    public void setExpandable(javax.el.ValueExpression value) {
	this.expandable = value;
    }
    private javax.el.ValueExpression expanded;
    /**
    * @jsp.attribute type="java.lang.Boolean"
    */
    public void setExpanded(javax.el.ValueExpression value) {
	this.expanded = value;
    }
    private javax.el.ValueExpression href;
    /**
    * @jsp.attribute type="java.lang.String"
    */
    public void setHref(javax.el.ValueExpression value) {
	this.href = value;
    }
    private javax.el.ValueExpression hrefTarget;
    /**
    * @jsp.attribute type="java.lang.String"
    */
    public void setHrefTarget(javax.el.ValueExpression value) {
	this.hrefTarget = value;
    }
    private javax.el.ValueExpression leaf;
    /**
    * @jsp.attribute type="java.lang.Boolean"
    */
    public void setLeaf(javax.el.ValueExpression value) {
	this.leaf = value;
    }
    private javax.el.ValueExpression qtip;
    /**
    * @jsp.attribute type="java.lang.String"
    */
    public void setQtip(javax.el.ValueExpression value) {
	this.qtip = value;
    }
    private javax.el.ValueExpression singleClickExpand;
    /**
    * @jsp.attribute type="java.lang.Boolean"
    */
    public void setSingleClickExpand(javax.el.ValueExpression value) {
	this.singleClickExpand = value;
    }
    private javax.el.ValueExpression cls;
    /**
    * @jsp.attribute type="java.lang.String"
    */
    public void setCls(javax.el.ValueExpression value) {
	this.cls = value;
    }
    private javax.el.ValueExpression iconCls;
    /**
    * @jsp.attribute type="java.lang.String"
    */
    public void setIconCls(javax.el.ValueExpression value) {
	this.iconCls = value;
    }
    private javax.el.ValueExpression cascade;
    /**
    * @jsp.attribute type="java.lang.Boolean"
    */
    public void setCascade(javax.el.ValueExpression value) {
	this.cascade = value;
    }
    private javax.el.ValueExpression userData;
    /**
    * @jsp.attribute type="java.lang.Object"
    */
    public void setUserData(javax.el.ValueExpression value) {
	this.userData = value;
    }
    private javax.el.ValueExpression updateAble;
    /**
    * @jsp.attribute type="boolean"
    */
    public void setUpdateAble(javax.el.ValueExpression value) {
	this.updateAble = value;
    }
    protected void setProperties(javax.faces.component.UIComponent c) {
	super.setProperties(c);
	c.setValueExpression("text", this.text);
	c.setValueExpression("icon", this.icon);
	c.setValueExpression("id", this.id);
	c.setValueExpression("checked", this.checked);
	c.setValueExpression("allowChildren", this.allowChildren);
	c.setValueExpression("disabled", this.disabled);
	c.setValueExpression("expandable", this.expandable);
	c.setValueExpression("expanded", this.expanded);
	c.setValueExpression("href", this.href);
	c.setValueExpression("hrefTarget", this.hrefTarget);
	c.setValueExpression("leaf", this.leaf);
	c.setValueExpression("qtip", this.qtip);
	c.setValueExpression("singleClickExpand", this.singleClickExpand);
	c.setValueExpression("cls", this.cls);
	c.setValueExpression("iconCls", this.iconCls);
	c.setValueExpression("cascade", this.cascade);
	c.setValueExpression("userData", this.userData);
	c.setValueExpression("updateAble", this.updateAble);
    }

    public void release() {
	super.release();
	this.text = null;
	this.icon = null;
	this.id = null;
	this.checked = null;
	this.allowChildren = null;
	this.disabled = null;
	this.expandable = null;
	this.expanded = null;
	this.href = null;
	this.hrefTarget = null;
	this.leaf = null;
	this.qtip = null;
	this.singleClickExpand = null;
	this.cls = null;
	this.iconCls = null;
	this.cascade = null;
	this.userData = null;
	this.updateAble = null;
    }

}