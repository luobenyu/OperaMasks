/**
 * UIBorderLayout.java
 * DO NOT EDIT THIS FILE
 * This file was automatically generated by org.operamasks.faces.tools.apt.ComponentAnnotationProcessorFactory
 * at Sat Nov 03 15:46:26 CST 2012
 */

package org.operamasks.faces.webapp.layout;

/**
* @jsp.tag name="borderLayout" body-content="JSP"
*/
public class UIBorderLayoutTag extends org.operamasks.faces.webapp.html.HtmlBasicELTag {
    public String getComponentType() {
	return "org.operamasks.faces.component.layout.impl.UIBorderLayout";
    }

    public String getRendererType() {
	return "org.operamasks.faces.component.layout.impl.UIBorderLayout";
    }

    private javax.el.ValueExpression fitToBody;
    /**
    * @jsp.attribute type="java.lang.Boolean"
    */
    public void setFitToBody(javax.el.ValueExpression value) {
	this.fitToBody = value;
    }
    protected void setProperties(javax.faces.component.UIComponent c) {
	super.setProperties(c);
	c.setValueExpression("fitToBody", this.fitToBody);
    }

    public void release() {
	super.release();
	this.fitToBody = null;
    }

}
