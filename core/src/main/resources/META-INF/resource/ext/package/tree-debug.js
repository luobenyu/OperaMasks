/*
 * Ext JS Library 2.0 RC 1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */




Ext.data.Tree = function(root){
   this.nodeHash = {};
   
   this.root = null;
   if(root){
       this.setRootNode(root);
   }
   this.addEvents(
       
       "append",
       
       "remove",
       
       "move",
       
       "insert",
       
       "beforeappend",
       
       "beforeremove",
       
       "beforemove",
       
       "beforeinsert"
   );

    Ext.data.Tree.superclass.constructor.call(this);
};

Ext.extend(Ext.data.Tree, Ext.util.Observable, {
    
    pathSeparator: "/",

    // private
    proxyNodeEvent : function(){
        return this.fireEvent.apply(this, arguments);
    },

    
    getRootNode : function(){
        return this.root;
    },

    
    setRootNode : function(node){
        this.root = node;
        node.ownerTree = this;
        node.isRoot = true;
        this.registerNode(node);
        return node;
    },

    
    getNodeById : function(id){
        return this.nodeHash[id];
    },

    // private
    registerNode : function(node){
        this.nodeHash[node.id] = node;
    },

    // private
    unregisterNode : function(node){
        delete this.nodeHash[node.id];
    },

    toString : function(){
        return "[Tree"+(this.id?" "+this.id:"")+"]";
    }
});


Ext.data.Node = function(attributes){
    
    this.attributes = attributes || {};
    this.leaf = this.attributes.leaf;
    
    this.id = this.attributes.id;
    if(!this.id){
        this.id = Ext.id(null, "ynode-");
        this.attributes.id = this.id;
    }
    
    this.childNodes = [];
    if(!this.childNodes.indexOf){ // indexOf is a must
        this.childNodes.indexOf = function(o){
            for(var i = 0, len = this.length; i < len; i++){
                if(this[i] == o) return i;
            }
            return -1;
        };
    }
    
    this.parentNode = null;
    
    this.firstChild = null;
    
    this.lastChild = null;
    
    this.previousSibling = null;
    
    this.nextSibling = null;

    this.addEvents({
       
       "append" : true,
       
       "remove" : true,
       
       "move" : true,
       
       "insert" : true,
       
       "beforeappend" : true,
       
       "beforeremove" : true,
       
       "beforemove" : true,
       
       "beforeinsert" : true
   });
    this.listeners = this.attributes.listeners;
    Ext.data.Node.superclass.constructor.call(this);
};

Ext.extend(Ext.data.Node, Ext.util.Observable, {
    // private
    fireEvent : function(evtName){
        // first do standard event for this node
        if(Ext.data.Node.superclass.fireEvent.apply(this, arguments) === false){
            return false;
        }
        // then bubble it up to the tree if the event wasn't cancelled
        var ot = this.getOwnerTree();
        if(ot){
            if(ot.proxyNodeEvent.apply(ot, arguments) === false){
                return false;
            }
        }
        return true;
    },

    
    isLeaf : function(){
        return this.leaf === true;
    },

    // private
    setFirstChild : function(node){
        this.firstChild = node;
    },

    //private
    setLastChild : function(node){
        this.lastChild = node;
    },


    
    isLast : function(){
       return (!this.parentNode ? true : this.parentNode.lastChild == this);
    },

    
    isFirst : function(){
       return (!this.parentNode ? true : this.parentNode.firstChild == this);
    },

    hasChildNodes : function(){
        return !this.isLeaf() && this.childNodes.length > 0;
    },

    
    appendChild : function(node){
        var multi = false;
        if(node instanceof Array){
            multi = node;
        }else if(arguments.length > 1){
            multi = arguments;
        }
        // if passed an array or multiple args do them one by one
        if(multi){
            for(var i = 0, len = multi.length; i < len; i++) {
            	this.appendChild(multi[i]);
            }
        }else{
            if(this.fireEvent("beforeappend", this.ownerTree, this, node) === false){
                return false;
            }
            var index = this.childNodes.length;
            var oldParent = node.parentNode;
            // it's a move, make sure we move it cleanly
            if(oldParent){
                if(node.fireEvent("beforemove", node.getOwnerTree(), node, oldParent, this, index) === false){
                    return false;
                }
                oldParent.removeChild(node);
            }
            index = this.childNodes.length;
            if(index == 0){
                this.setFirstChild(node);
            }
            this.childNodes.push(node);
            node.parentNode = this;
            var ps = this.childNodes[index-1];
            if(ps){
                node.previousSibling = ps;
                ps.nextSibling = node;
            }else{
                node.previousSibling = null;
            }
            node.nextSibling = null;
            this.setLastChild(node);
            node.setOwnerTree(this.getOwnerTree());
            this.fireEvent("append", this.ownerTree, this, node, index);
            if(oldParent){
                node.fireEvent("move", this.ownerTree, node, oldParent, this, index);
            }
            return node;
        }
    },

    
    removeChild : function(node){
        var index = this.childNodes.indexOf(node);
        if(index == -1){
            return false;
        }
        if(this.fireEvent("beforeremove", this.ownerTree, this, node) === false){
            return false;
        }

        // remove it from childNodes collection
        this.childNodes.splice(index, 1);

        // update siblings
        if(node.previousSibling){
            node.previousSibling.nextSibling = node.nextSibling;
        }
        if(node.nextSibling){
            node.nextSibling.previousSibling = node.previousSibling;
        }

        // update child refs
        if(this.firstChild == node){
            this.setFirstChild(node.nextSibling);
        }
        if(this.lastChild == node){
            this.setLastChild(node.previousSibling);
        }

        node.setOwnerTree(null);
        // clear any references from the node
        node.parentNode = null;
        node.previousSibling = null;
        node.nextSibling = null;
        this.fireEvent("remove", this.ownerTree, this, node);
        return node;
    },

    
    insertBefore : function(node, refNode){
        if(!refNode){ // like standard Dom, refNode can be null for append
            return this.appendChild(node);
        }
        // nothing to do
        if(node == refNode){
            return false;
        }

        if(this.fireEvent("beforeinsert", this.ownerTree, this, node, refNode) === false){
            return false;
        }
        var index = this.childNodes.indexOf(refNode);
        var oldParent = node.parentNode;
        var refIndex = index;

        // when moving internally, indexes will change after remove
        if(oldParent == this && this.childNodes.indexOf(node) < index){
            refIndex--;
        }

        // it's a move, make sure we move it cleanly
        if(oldParent){
            if(node.fireEvent("beforemove", node.getOwnerTree(), node, oldParent, this, index, refNode) === false){
                return false;
            }
            oldParent.removeChild(node);
        }
        if(refIndex == 0){
            this.setFirstChild(node);
        }
        this.childNodes.splice(refIndex, 0, node);
        node.parentNode = this;
        var ps = this.childNodes[refIndex-1];
        if(ps){
            node.previousSibling = ps;
            ps.nextSibling = node;
        }else{
            node.previousSibling = null;
        }
        node.nextSibling = refNode;
        refNode.previousSibling = node;
        node.setOwnerTree(this.getOwnerTree());
        this.fireEvent("insert", this.ownerTree, this, node, refNode);
        if(oldParent){
            node.fireEvent("move", this.ownerTree, node, oldParent, this, refIndex, refNode);
        }
        return node;
    },

    
    remove : function(){
        this.parentNode.removeChild(this);
        return this;
    },

    
    item : function(index){
        return this.childNodes[index];
    },

    
    replaceChild : function(newChild, oldChild){
        this.insertBefore(newChild, oldChild);
        this.removeChild(oldChild);
        return oldChild;
    },

    
    indexOf : function(child){
        return this.childNodes.indexOf(child);
    },

    
    getOwnerTree : function(){
        // if it doesn't have one, look for one
        if(!this.ownerTree){
            var p = this;
            while(p){
                if(p.ownerTree){
                    this.ownerTree = p.ownerTree;
                    break;
                }
                p = p.parentNode;
            }
        }
        return this.ownerTree;
    },

    
    getDepth : function(){
        var depth = 0;
        var p = this;
        while(p.parentNode){
            ++depth;
            p = p.parentNode;
        }
        return depth;
    },

    // private
    setOwnerTree : function(tree){
        // if it's move, we need to update everyone
        if(tree != this.ownerTree){
            if(this.ownerTree){
                this.ownerTree.unregisterNode(this);
            }
            this.ownerTree = tree;
            var cs = this.childNodes;
            for(var i = 0, len = cs.length; i < len; i++) {
            	cs[i].setOwnerTree(tree);
            }
            if(tree){
                tree.registerNode(this);
            }
        }
    },

    
    getPath : function(attr){
        attr = attr || "id";
        var p = this.parentNode;
        var b = [this.attributes[attr]];
        while(p){
            b.unshift(p.attributes[attr]);
            p = p.parentNode;
        }
        var sep = this.getOwnerTree().pathSeparator;
        return sep + b.join(sep);
    },

    
    bubble : function(fn, scope, args){
        var p = this;
        while(p){
            if(fn.apply(scope || p, args || [p]) === false){
                break;
            }
            p = p.parentNode;
        }
    },

    
    cascade : function(fn, scope, args){
        if(fn.apply(scope || this, args || [this]) !== false){
            var cs = this.childNodes;
            for(var i = 0, len = cs.length; i < len; i++) {
            	cs[i].cascade(fn, scope, args);
            }
        }
    },

    
    eachChild : function(fn, scope, args){
        var cs = this.childNodes;
        for(var i = 0, len = cs.length; i < len; i++) {
        	if(fn.apply(scope || this, args || [cs[i]]) === false){
        	    break;
        	}
        }
    },

    
    findChild : function(attribute, value){
        var cs = this.childNodes;
        for(var i = 0, len = cs.length; i < len; i++) {
        	if(cs[i].attributes[attribute] == value){
        	    return cs[i];
        	}
        }
        return null;
    },

    
    findChildBy : function(fn, scope){
        var cs = this.childNodes;
        for(var i = 0, len = cs.length; i < len; i++) {
        	if(fn.call(scope||cs[i], cs[i]) === true){
        	    return cs[i];
        	}
        }
        return null;
    },

    
    sort : function(fn, scope){
        var cs = this.childNodes;
        var len = cs.length;
        if(len > 0){
            var sortFn = scope ? function(){fn.apply(scope, arguments);} : fn;
            cs.sort(sortFn);
            for(var i = 0; i < len; i++){
                var n = cs[i];
                n.previousSibling = cs[i-1];
                n.nextSibling = cs[i+1];
                if(i == 0){
                    this.setFirstChild(n);
                }
                if(i == len-1){
                    this.setLastChild(n);
                }
            }
        }
    },

    
    contains : function(node){
        return node.isAncestor(this);
    },

    
    isAncestor : function(node){
        var p = this.parentNode;
        while(p){
            if(p == node){
                return true;
            }
            p = p.parentNode;
        }
        return false;
    },

    toString : function(){
        return "[Node"+(this.id?" "+this.id:"")+"]";
    }
});


Ext.tree.TreeEventModel = function(tree){
    this.tree = tree;
    this.tree.on('render', this.initEvents, this);
}

Ext.tree.TreeEventModel.prototype = {
    initEvents : function(){
        var el = this.tree.getTreeEl();
        el.on('click', this.delegateClick, this);
        el.on('mouseover', this.delegateOver, this);
        el.on('mouseout', this.delegateOut, this);
        el.on('dblclick', this.delegateDblClick, this);
        el.on('contextmenu', this.delegateContextMenu, this);
    },

    getNode : function(e){
        var t;
        if(t = e.getTarget('.x-tree-node-el', 10)){
            var id = Ext.fly(t, '_treeEvents').getAttributeNS('ext', 'tree-node-id');
            if(id){
                return this.tree.getNodeById(id);
            }
        }
        return null;
    },

    getNodeTarget : function(e){
        var t = e.getTarget('.x-tree-node-icon', 1);
        if(!t){
            t = e.getTarget('.x-tree-node-el', 6);
        }
        return t;
    },

    delegateOut : function(e, t){
        if(!this.beforeEvent(e)){
            return;
        }
        t = this.getNodeTarget(e);
        if(t && !e.within(t, true)){
            this.onNodeOut(e, this.getNode(e));
        }
    },

    delegateOver : function(e, t){
        if(!this.beforeEvent(e)){
            return;
        }
        t = this.getNodeTarget(e);
        if(t){
            this.onNodeOver(e, this.getNode(e));
        }
    },

    delegateClick : function(e, t){
        if(!this.beforeEvent(e)){
            return;
        }

        if(e.getTarget('input[type=checkbox]', 1)){
            this.onCheckboxClick(e, this.getNode(e));
        }
        else if(e.getTarget('.x-tree-ec-icon', 1)){
            this.onIconClick(e, this.getNode(e));
        }
        else if(this.getNodeTarget(e)){
            this.onNodeClick(e, this.getNode(e));
        }
    },

    delegateDblClick : function(e, t){
        if(this.beforeEvent(e) && this.getNodeTarget(e)){
            this.onNodeDblClick(e, this.getNode(e));
        }
    },

    delegateContextMenu : function(e, t){
        if(this.beforeEvent(e) && this.getNodeTarget(e)){
            this.onNodeContextMenu(e, this.getNode(e));
        }
    },

    onNodeClick : function(e, node){
        node.ui.onClick(e);
    },

    onNodeOver : function(e, node){
        node.ui.onOver(e);
    },

    onNodeOut : function(e, node){
        node.ui.onOut(e);
    },

    onIconClick : function(e, node){
        node.ui.ecClick(e);
    },

    onCheckboxClick : function(e, node){
        node.ui.onCheckChange(e);
    },

    onNodeDblClick : function(e, node){
        node.ui.onDblClick(e);
    },

    onNodeContextMenu : function(e, node){
        node.ui.onContextMenu(e);
    },

    beforeEvent : function(e){
        if(this.disabled){
            e.stopEvent();
            return false;
        }
        return true;
    },

    disable: function(){
        this.disabled = true;
    },

    enable: function(){
        this.disabled = false;
    }
};



Ext.tree.TreePanel = Ext.extend(Ext.Panel, {
    rootVisible : true,
    animate: Ext.enableFx,
    lines : true,
    enableDD : false,
    hlDrop : Ext.enableFx,
    pathSeparator: "/",

    initComponent : function(){
        Ext.tree.TreePanel.superclass.initComponent.call(this);

        if(!this.eventModel){
            this.eventModel = new Ext.tree.TreeEventModel(this);
        }
        
        this.nodeHash = {};

        
        if(this.root){
           this.setRootNode(this.root);
        }

        this.addEvents(

            
           "append",
           
           "remove",
           
           "movenode",
           
           "insert",
           
           "beforeappend",
           
           "beforeremove",
           
           "beforemovenode",
           
            "beforeinsert",

            
            "beforeload",
            
            "load",
            
            "textchange",
            
            "beforeexpandnode",
            
            "beforecollapsenode",
            
            "expandnode",
            
            "disabledchange",
            
            "collapsenode",
            
            "beforeclick",
            
            "click",
            
            "checkchange",
            
            "dblclick",
            
            "contextmenu",
            
            "beforechildrenrendered",
           
            "startdrag",
            
            "enddrag",
            
            "dragdrop",
            
            "beforenodedrop",
            
            "nodedrop",
             
            "nodedragover"
        );
        if(this.singleExpand){
            this.on("beforeexpandnode", this.restrictExpand, this);
        }
    },

    // private
    proxyNodeEvent : function(ename, a1, a2, a3, a4, a5, a6){
        if(ename == 'collapse' || ename == 'expand' || ename == 'beforecollapse' || ename == 'beforeexpand' || ename == 'move' || ename == 'beforemove'){
            ename = ename+'node';
        }
        // args inline for performance while bubbling events
        return this.fireEvent(ename, a1, a2, a3, a4, a5, a6);
    },


    
    getRootNode : function(){
        return this.root;
    },

    
    setRootNode : function(node){
        this.root = node;
        node.ownerTree = this;
        node.isRoot = true;
        this.registerNode(node);
        if(!this.rootVisible){
        	var uiP = node.attributes.uiProvider;
        	node.ui = uiP ? new uiP(node) : new Ext.tree.RootTreeNodeUI(node); 
        }
        return node;
    },

    
    getNodeById : function(id){
        return this.nodeHash[id];
    },

    // private
    registerNode : function(node){
        this.nodeHash[node.id] = node;
    },

    // private
    unregisterNode : function(node){
        delete this.nodeHash[node.id];
    },

    // private
    toString : function(){
        return "[Tree"+(this.id?" "+this.id:"")+"]";
    },

    // private
    restrictExpand : function(node){
        var p = node.parentNode;
        if(p){
            if(p.expandedChild && p.expandedChild.parentNode == p){
                p.expandedChild.collapse();
            }
            p.expandedChild = node;
        }
    },

    
    getChecked : function(a, startNode){
        startNode = startNode || this.root;
        var r = [];
        var f = function(){
            if(this.attributes.checked){
                r.push(!a ? this : (a == 'id' ? this.id : this.attributes[a]));
            }
        }
        startNode.cascade(f);
        return r;
    },

    
    getEl : function(){
        return this.el;
    },

    
    getLoader : function(){
        return this.loader;
    },

    
    expandAll : function(){
        this.root.expand(true);
    },

    
    collapseAll : function(){
        this.root.collapse(true);
    },

    
    getSelectionModel : function(){
        if(!this.selModel){
            this.selModel = new Ext.tree.DefaultSelectionModel();
        }
        return this.selModel;
    },

    
    expandPath : function(path, attr, callback){
        attr = attr || "id";
        var keys = path.split(this.pathSeparator);
        var curNode = this.root;
        if(curNode.attributes[attr] != keys[1]){ // invalid root
            if(callback){
                callback(false, null);
            }
            return;
        }
        var index = 1;
        var f = function(){
            if(++index == keys.length){
                if(callback){
                    callback(true, curNode);
                }
                return;
            }
            var c = curNode.findChild(attr, keys[index]);
            if(!c){
                if(callback){
                    callback(false, curNode);
                }
                return;
            }
            curNode = c;
            c.expand(false, false, f);
        };
        curNode.expand(false, false, f);
    },

    
    selectPath : function(path, attr, callback){
        attr = attr || "id";
        var keys = path.split(this.pathSeparator);
        var v = keys.pop();
        if(keys.length > 0){
            var f = function(success, node){
                if(success && node){
                    var n = node.findChild(attr, v);
                    if(n){
                        n.select();
                        if(callback){
                            callback(true, n);
                        }
                    }else if(callback){
                        callback(false, n);
                    }
                }else{
                    if(callback){
                        callback(false, n);
                    }
                }
            };
            this.expandPath(keys.join(this.pathSeparator), attr, f);
        }else{
            this.root.select();
            if(callback){
                callback(true, this.root);
            }
        }
    },

    
    getTreeEl : function(){
        return this.body;
    },

    // private
    onRender : function(ct, position){
        Ext.tree.TreePanel.superclass.onRender.call(this, ct, position);
        this.el.addClass('x-tree');
        this.innerCt = this.body.createChild({tag:"ul",
               cls:"x-tree-root-ct " +
               (this.lines ? "x-tree-lines" : "x-tree-no-lines")});
    },

    // private
    initEvents : function(){
        Ext.tree.TreePanel.superclass.initEvents.call(this);

        if(this.containerScroll){
            Ext.dd.ScrollManager.register(this.body);
        }
        if((this.enableDD || this.enableDrop) && !this.dropZone){
           
             this.dropZone = new Ext.tree.TreeDropZone(this, this.dropConfig || {
               ddGroup: this.ddGroup || "TreeDD", appendOnly: this.ddAppendOnly === true
           });
        }
        if((this.enableDD || this.enableDrag) && !this.dragZone){
           
            this.dragZone = new Ext.tree.TreeDragZone(this, this.dragConfig || {
               ddGroup: this.ddGroup || "TreeDD",
               scroll: this.ddScroll
           });
        }
        this.getSelectionModel().init(this);
    },

    // private
    afterRender : function(){
        Ext.tree.TreePanel.superclass.afterRender.call(this);
        this.root.render();
        if(!this.rootVisible){
            this.root.renderChildren();
        }
    },

    onDestroy : function(){
        if(this.rendered){
            this.body.removeAllListeners();
            Ext.dd.ScrollManager.unregister(this.body);
            if(this.dropZone){
                this.dropZone.unreg();
            }
            if(this.dragZone){
               this.dragZone.unreg();
            }
        }
        this.root.destroy();
        this.nodeHash = null;
        Ext.tree.TreePanel.superclass.onDestroy.call(this);
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});
Ext.reg('treepanel', Ext.tree.TreePanel);



Ext.tree.DefaultSelectionModel = function(config){
   this.selNode = null;
   
   this.addEvents(
       
       "selectionchange",

       
       "beforeselect"
   );

    Ext.apply(this, config);
    Ext.tree.DefaultSelectionModel.superclass.constructor.call(this);
};

Ext.extend(Ext.tree.DefaultSelectionModel, Ext.util.Observable, {
    init : function(tree){
        this.tree = tree;
        tree.getTreeEl().on("keydown", this.onKeyDown, this);
        tree.on("click", this.onNodeClick, this);
    },
    
    onNodeClick : function(node, e){
        this.select(node);
    },
    
    
    select : function(node){
        var last = this.selNode;
        if(last != node && this.fireEvent('beforeselect', this, node, last) !== false){
            if(last){
                last.ui.onSelectedChange(false);
            }
            this.selNode = node;
            node.ui.onSelectedChange(true);
            this.fireEvent("selectionchange", this, node, last);
        }
        return node;
    },
    
    
    unselect : function(node){
        if(this.selNode == node){
            this.clearSelections();
        }    
    },
    
    
    clearSelections : function(){
        var n = this.selNode;
        if(n){
            n.ui.onSelectedChange(false);
            this.selNode = null;
            this.fireEvent("selectionchange", this, null);
        }
        return n;
    },
    
    
    getSelectedNode : function(){
        return this.selNode;    
    },
    
    
    isSelected : function(node){
        return this.selNode == node;  
    },

    
    selectPrevious : function(){
        var s = this.selNode || this.lastSelNode;
        if(!s){
            return null;
        }
        var ps = s.previousSibling;
        if(ps){
            if(!ps.isExpanded() || ps.childNodes.length < 1){
                return this.select(ps);
            } else{
                var lc = ps.lastChild;
                while(lc && lc.isExpanded() && lc.childNodes.length > 0){
                    lc = lc.lastChild;
                }
                return this.select(lc);
            }
        } else if(s.parentNode && (this.tree.rootVisible || !s.parentNode.isRoot)){
            return this.select(s.parentNode);
        }
        return null;
    },

    
    selectNext : function(){
        var s = this.selNode || this.lastSelNode;
        if(!s){
            return null;
        }
        if(s.firstChild && s.isExpanded()){
             return this.select(s.firstChild);
         }else if(s.nextSibling){
             return this.select(s.nextSibling);
         }else if(s.parentNode){
            var newS = null;
            s.parentNode.bubble(function(){
                if(this.nextSibling){
                    newS = this.getOwnerTree().selModel.select(this.nextSibling);
                    return false;
                }
            });
            return newS;
         }
        return null;
    },

    onKeyDown : function(e){
        var s = this.selNode || this.lastSelNode;
        // undesirable, but required
        var sm = this;
        if(!s){
            return;
        }
        var k = e.getKey();
        switch(k){
             case e.DOWN:
                 e.stopEvent();
                 this.selectNext();
             break;
             case e.UP:
                 e.stopEvent();
                 this.selectPrevious();
             break;
             case e.RIGHT:
                 e.preventDefault();
                 if(s.hasChildNodes()){
                     if(!s.isExpanded()){
                         s.expand();
                     }else if(s.firstChild){
                         this.select(s.firstChild, e);
                     }
                 }
             break;
             case e.LEFT:
                 e.preventDefault();
                 if(s.hasChildNodes() && s.isExpanded()){
                     s.collapse();
                 }else if(s.parentNode && (this.tree.rootVisible || s.parentNode != this.tree.getRootNode())){
                     this.select(s.parentNode, e);
                 }
             break;
        };
    }
});


Ext.tree.MultiSelectionModel = function(config){
   this.selNodes = [];
   this.selMap = {};
   this.addEvents(
       
       "selectionchange"
   );
    Ext.apply(this, config);
    Ext.tree.MultiSelectionModel.superclass.constructor.call(this);
};

Ext.extend(Ext.tree.MultiSelectionModel, Ext.util.Observable, {
    init : function(tree){
        this.tree = tree;
        tree.getTreeEl().on("keydown", this.onKeyDown, this);
        tree.on("click", this.onNodeClick, this);
    },
    
    onNodeClick : function(node, e){
        this.select(node, e, e.ctrlKey);
    },
    
    
    select : function(node, e, keepExisting){
        if(keepExisting !== true){
            this.clearSelections(true);
        }
        if(this.isSelected(node)){
            this.lastSelNode = node;
            return node;
        }
        this.selNodes.push(node);
        this.selMap[node.id] = node;
        this.lastSelNode = node;
        node.ui.onSelectedChange(true);
        this.fireEvent("selectionchange", this, this.selNodes);
        return node;
    },
    
    
    unselect : function(node){
        if(this.selMap[node.id]){
            node.ui.onSelectedChange(false);
            var sn = this.selNodes;
            var index = sn.indexOf(node);
            if(index != -1){
                this.selNodes.splice(index, 1);
            }
            delete this.selMap[node.id];
            this.fireEvent("selectionchange", this, this.selNodes);
        }
    },
    
    
    clearSelections : function(suppressEvent){
        var sn = this.selNodes;
        if(sn.length > 0){
            for(var i = 0, len = sn.length; i < len; i++){
                sn[i].ui.onSelectedChange(false);
            }
            this.selNodes = [];
            this.selMap = {};
            if(suppressEvent !== true){
                this.fireEvent("selectionchange", this, this.selNodes);
            }
        }
    },
    
    
    isSelected : function(node){
        return this.selMap[node.id] ? true : false;  
    },
    
    
    getSelectedNodes : function(){
        return this.selNodes;    
    },

    onKeyDown : Ext.tree.DefaultSelectionModel.prototype.onKeyDown,

    selectNext : Ext.tree.DefaultSelectionModel.prototype.selectNext,

    selectPrevious : Ext.tree.DefaultSelectionModel.prototype.selectPrevious
});



Ext.tree.TreeNode = function(attributes){
    attributes = attributes || {};
    if(typeof attributes == "string"){
        attributes = {text: attributes};
    }
    this.childrenRendered = false;
    this.rendered = false;
    Ext.tree.TreeNode.superclass.constructor.call(this, attributes);
    this.expanded = attributes.expanded === true;
    this.isTarget = attributes.isTarget !== false;
    this.draggable = attributes.draggable !== false && attributes.allowDrag !== false;
    this.allowChildren = attributes.allowChildren !== false && attributes.allowDrop !== false;

    
    this.text = attributes.text;
    
    this.disabled = attributes.disabled === true;

    this.addEvents(
        
        "textchange",
        
        "beforeexpand",
        
        "beforecollapse",
        
        "expand",
        
        "disabledchange",
        
        "collapse",
        
        "beforeclick",
        
        "click",
        
        "checkchange",
        
        "dblclick",
        
        "contextmenu",
        
        "beforechildrenrendered"
    );

    var uiClass = this.attributes.uiProvider || this.defaultUI || Ext.tree.TreeNodeUI;

    
    this.ui = new uiClass(this);
};
Ext.extend(Ext.tree.TreeNode, Ext.data.Node, {
    preventHScroll: true,
    
    isExpanded : function(){
        return this.expanded;
    },


    getUI : function(){
        return this.ui;
    },

    // private override
    setFirstChild : function(node){
        var of = this.firstChild;
        Ext.tree.TreeNode.superclass.setFirstChild.call(this, node);
        if(this.childrenRendered && of && node != of){
            of.renderIndent(true, true);
        }
        if(this.rendered){
            this.renderIndent(true, true);
        }
    },

    // private override
    setLastChild : function(node){
        var ol = this.lastChild;
        Ext.tree.TreeNode.superclass.setLastChild.call(this, node);
        if(this.childrenRendered && ol && node != ol){
            ol.renderIndent(true, true);
        }
        if(this.rendered){
            this.renderIndent(true, true);
        }
    },

    // these methods are overridden to provide lazy rendering support
    // private override
    appendChild : function(){
        var node = Ext.tree.TreeNode.superclass.appendChild.apply(this, arguments);
        if(node && this.childrenRendered){
            node.render();
        }
        this.ui.updateExpandIcon();
        return node;
    },

    // private override
    removeChild : function(node){
        this.ownerTree.getSelectionModel().unselect(node);
        Ext.tree.TreeNode.superclass.removeChild.apply(this, arguments);
        // if it's been rendered remove dom node
        if(this.childrenRendered){
            node.ui.remove();
        }
        if(this.childNodes.length < 1){
            this.collapse(false, false);
        }else{
            this.ui.updateExpandIcon();
        }
        if(!this.firstChild && !this.isHiddenRoot()) {
            this.childrenRendered = false;
        }
        return node;
    },

    // private override
    insertBefore : function(node, refNode){
        var newNode = Ext.tree.TreeNode.superclass.insertBefore.apply(this, arguments);
        if(newNode && refNode && this.childrenRendered){
            node.render();
        }
        this.ui.updateExpandIcon();
        return newNode;
    },

    
    setText : function(text){
        var oldText = this.text;
        this.text = text;
        this.attributes.text = text;
        if(this.rendered){ // event without subscribing
            this.ui.onTextChange(this, text, oldText);
        }
        this.fireEvent("textchange", this, text, oldText);
    },

    
    select : function(){
        this.getOwnerTree().getSelectionModel().select(this);
    },

    
    unselect : function(){
        this.getOwnerTree().getSelectionModel().unselect(this);
    },

    
    isSelected : function(){
        return this.getOwnerTree().getSelectionModel().isSelected(this);
    },

    
    expand : function(deep, anim, callback){
        if(!this.expanded){
            if(this.fireEvent("beforeexpand", this, deep, anim) === false){
                return;
            }
            if(!this.childrenRendered){
                this.renderChildren();
            }
            this.expanded = true;
            if(!this.isHiddenRoot() && (this.getOwnerTree().animate && anim !== false) || anim){
                this.ui.animExpand(function(){
                    this.fireEvent("expand", this);
                    if(typeof callback == "function"){
                        callback(this);
                    }
                    if(deep === true){
                        this.expandChildNodes(true);
                    }
                }.createDelegate(this));
                return;
            }else{
                this.ui.expand();
                this.fireEvent("expand", this);
                if(typeof callback == "function"){
                    callback(this);
                }
            }
        }else{
           if(typeof callback == "function"){
               callback(this);
           }
        }
        if(deep === true){
            this.expandChildNodes(true);
        }
    },

    isHiddenRoot : function(){
        return this.isRoot && !this.getOwnerTree().rootVisible;
    },

    
    collapse : function(deep, anim){
        if(this.expanded && !this.isHiddenRoot()){
            if(this.fireEvent("beforecollapse", this, deep, anim) === false){
                return;
            }
            this.expanded = false;
            if((this.getOwnerTree().animate && anim !== false) || anim){
                this.ui.animCollapse(function(){
                    this.fireEvent("collapse", this);
                    if(deep === true){
                        this.collapseChildNodes(true);
                    }
                }.createDelegate(this));
                return;
            }else{
                this.ui.collapse();
                this.fireEvent("collapse", this);
            }
        }
        if(deep === true){
            var cs = this.childNodes;
            for(var i = 0, len = cs.length; i < len; i++) {
            	cs[i].collapse(true, false);
            }
        }
    },

    // private
    delayedExpand : function(delay){
        if(!this.expandProcId){
            this.expandProcId = this.expand.defer(delay, this);
        }
    },

    // private
    cancelExpand : function(){
        if(this.expandProcId){
            clearTimeout(this.expandProcId);
        }
        this.expandProcId = false;
    },

    
    toggle : function(){
        if(this.expanded){
            this.collapse();
        }else{
            this.expand();
        }
    },

    
    ensureVisible : function(callback){
        var tree = this.getOwnerTree();
        tree.expandPath(this.parentNode.getPath(), false, function(){
            tree.getTreeEl().scrollChildIntoView(this.ui.anchor);
            Ext.callback(callback);
        }.createDelegate(this));
    },

    
    expandChildNodes : function(deep){
        var cs = this.childNodes;
        for(var i = 0, len = cs.length; i < len; i++) {
        	cs[i].expand(deep);
        }
    },

    
    collapseChildNodes : function(deep){
        var cs = this.childNodes;
        for(var i = 0, len = cs.length; i < len; i++) {
        	cs[i].collapse(deep);
        }
    },

    
    disable : function(){
        this.disabled = true;
        this.unselect();
        if(this.rendered && this.ui.onDisableChange){ // event without subscribing
            this.ui.onDisableChange(this, true);
        }
        this.fireEvent("disabledchange", this, true);
    },

    
    enable : function(){
        this.disabled = false;
        if(this.rendered && this.ui.onDisableChange){ // event without subscribing
            this.ui.onDisableChange(this, false);
        }
        this.fireEvent("disabledchange", this, false);
    },

    // private
    renderChildren : function(suppressEvent){
        if(suppressEvent !== false){
            this.fireEvent("beforechildrenrendered", this);
        }
        var cs = this.childNodes;
        for(var i = 0, len = cs.length; i < len; i++){
            cs[i].render(true);
        }
        this.childrenRendered = true;
    },

    // private
    sort : function(fn, scope){
        Ext.tree.TreeNode.superclass.sort.apply(this, arguments);
        if(this.childrenRendered){
            var cs = this.childNodes;
            for(var i = 0, len = cs.length; i < len; i++){
                cs[i].render(true);
            }
        }
    },

    // private
    render : function(bulkRender){
        this.ui.render(bulkRender);
        if(!this.rendered){
            // make sure it is registered
            this.getOwnerTree().registerNode(this);
            this.rendered = true;
            if(this.expanded){
                this.expanded = false;
                this.expand(false, false);
            }
        }
    },

    // private
    renderIndent : function(deep, refresh){
        if(refresh){
            this.ui.childIndent = null;
        }
        this.ui.renderIndent();
        if(deep === true && this.childrenRendered){
            var cs = this.childNodes;
            for(var i = 0, len = cs.length; i < len; i++){
                cs[i].renderIndent(true, refresh);
            }
        }
    },

    beginUpdate : function(){
        this.childrenRendered = false;
    },

    endUpdate : function(){
        if(this.expanded){
            this.renderChildren();
        }
    },

    destroy : function(){
        for(var i = 0,l = this.childNodes.length; i < l; i++){
            this.childNodes[i].destroy();
        }
        this.childNodes = null;
        if(this.ui.destroy){
            this.ui.destroy();
        }
    }
});



 Ext.tree.AsyncTreeNode = function(config){
    this.loaded = false;
    this.loading = false;
    Ext.tree.AsyncTreeNode.superclass.constructor.apply(this, arguments);
    
    this.addEvents('beforeload', 'load');
    
    
};
Ext.extend(Ext.tree.AsyncTreeNode, Ext.tree.TreeNode, {
    expand : function(deep, anim, callback){
        if(this.loading){ // if an async load is already running, waiting til it's done
            var timer;
            var f = function(){
                if(!this.loading){ // done loading
                    clearInterval(timer);
                    this.expand(deep, anim, callback);
                }
            }.createDelegate(this);
            timer = setInterval(f, 200);
            return;
        }
        if(!this.loaded){
            if(this.fireEvent("beforeload", this) === false){
                return;
            }
            this.loading = true;
            this.ui.beforeLoad(this);
            var loader = this.loader || this.attributes.loader || this.getOwnerTree().getLoader();
            if(loader){
                loader.load(this, this.loadComplete.createDelegate(this, [deep, anim, callback]));
                return;
            }
        }
        Ext.tree.AsyncTreeNode.superclass.expand.call(this, deep, anim, callback);
    },
    
    
    isLoading : function(){
        return this.loading;  
    },
    
    loadComplete : function(deep, anim, callback){
        this.loading = false;
        this.loaded = true;
        this.ui.afterLoad(this);
        this.fireEvent("load", this);
        this.expand(deep, anim, callback);
    },
    
    
    isLoaded : function(){
        return this.loaded;
    },
    
    hasChildNodes : function(){
        if(!this.isLeaf() && !this.loaded){
            return true;
        }else{
            return Ext.tree.AsyncTreeNode.superclass.hasChildNodes.call(this);
        }
    },

    
    reload : function(callback){
        this.collapse(false, false);
        while(this.firstChild){
            this.removeChild(this.firstChild);
        }
        this.childrenRendered = false;
        this.loaded = false;
        if(this.isHiddenRoot()){
            this.expanded = false;
        }
        this.expand(false, false, callback);
    }
});



Ext.tree.TreeNodeUI = function(node){
    this.node = node;
    this.rendered = false;
    this.animating = false;
    this.wasLeaf = true;
    this.ecc = 'x-tree-ec-icon x-tree-elbow';
    this.emptyIcon = Ext.BLANK_IMAGE_URL;
};

Ext.tree.TreeNodeUI.prototype = {
    // private
    removeChild : function(node){
        if(this.rendered){
            this.ctNode.removeChild(node.ui.getEl());
        } 
    },

    // private
    beforeLoad : function(){
         this.addClass("x-tree-node-loading");
    },

    // private
    afterLoad : function(){
         this.removeClass("x-tree-node-loading");
    },

    // private
    onTextChange : function(node, text, oldText){
        if(this.rendered){
            this.textNode.innerHTML = text;
        }
    },

    // private
    onDisableChange : function(node, state){
        this.disabled = state;
        if(state){
            this.addClass("x-tree-node-disabled");
        }else{
            this.removeClass("x-tree-node-disabled");
        } 
    },

    // private
    onSelectedChange : function(state){
        if(state){
            this.focus();
            this.addClass("x-tree-selected");
        }else{
            //this.blur();
            this.removeClass("x-tree-selected");
        }
    },

    // private
    onMove : function(tree, node, oldParent, newParent, index, refNode){
        this.childIndent = null;
        if(this.rendered){
            var targetNode = newParent.ui.getContainer();
            if(!targetNode){//target not rendered
                this.holder = document.createElement("div");
                this.holder.appendChild(this.wrap);
                return;
            }
            var insertBefore = refNode ? refNode.ui.getEl() : null;
            if(insertBefore){
                targetNode.insertBefore(this.wrap, insertBefore);
            }else{
                targetNode.appendChild(this.wrap);
            }
            this.node.renderIndent(true);
        }
    },


    addClass : function(cls){
        if(this.elNode){
            Ext.fly(this.elNode).addClass(cls);
        }
    },


    removeClass : function(cls){
        if(this.elNode){
            Ext.fly(this.elNode).removeClass(cls);  
        }
    },

    // private
    remove : function(){
        if(this.rendered){
            this.holder = document.createElement("div");
            this.holder.appendChild(this.wrap);
        }  
    },

    // private
    fireEvent : function(){
        return this.node.fireEvent.apply(this.node, arguments);  
    },

    // private
    initEvents : function(){
        this.node.on("move", this.onMove, this);

        if(this.node.disabled){
            this.addClass("x-tree-node-disabled");
        }
        if(this.node.hidden){
            this.hide();
        }
        var ot = this.node.getOwnerTree();
        var dd = ot.enableDD || ot.enableDrag || ot.enableDrop;
        if(dd && (!this.node.isRoot || ot.rootVisible)){
            Ext.dd.Registry.register(this.elNode, {
                node: this.node,
                handles: this.getDDHandles(),
                isHandle: false
            });
        }
    },

    // private
    getDDHandles : function(){
        return [this.iconNode, this.textNode, this.elNode];
    },


    hide : function(){
        this.node.hidden = true;
        if(this.wrap){
            this.wrap.style.display = "none";
        }
    },


    show : function(){
        this.node.hidden = false;
        if(this.wrap){
            this.wrap.style.display = "";
        } 
    },

    // private
    onContextMenu : function(e){
        if (this.node.hasListener("contextmenu") || this.node.getOwnerTree().hasListener("contextmenu")) {
            e.preventDefault();
            this.focus();
            this.fireEvent("contextmenu", this.node, e);
        }
    },

    // private
    onClick : function(e){
        if(this.dropping){
            e.stopEvent();
            return;
        }
        if(this.fireEvent("beforeclick", this.node, e) !== false){
            var a = e.getTarget('a');
            if(!this.disabled && this.node.attributes.href && a){
                this.fireEvent("click", this.node, e);
                return;
            }else if(a && e.ctrlKey){
                e.stopEvent();
            }
            e.preventDefault();
            if(this.disabled){
                return;
            }

            if(this.node.attributes.singleClickExpand && !this.animating && this.node.hasChildNodes()){
                this.node.toggle();
            }

            this.fireEvent("click", this.node, e);
        }else{
            e.stopEvent();
        }
    },

    // private
    onDblClick : function(e){
        e.preventDefault();
        if(this.disabled){
            return;
        }
        if(this.checkbox){
            this.toggleCheck();
        }
        if(!this.animating && this.node.hasChildNodes()){
            this.node.toggle();
        }
        this.fireEvent("dblclick", this.node, e);
    },

    onOver : function(e){
        this.addClass('x-tree-node-over');
    },

    onOut : function(e){
        this.removeClass('x-tree-node-over');
    },

    // private
    onCheckChange : function(){
        var checked = this.checkbox.checked;
        this.node.attributes.checked = checked;
        this.fireEvent('checkchange', this.node, checked);
    },

    // private
    ecClick : function(e){
        if(!this.animating && (this.node.hasChildNodes() || this.node.attributes.expandable)){
            this.node.toggle();
        }
    },

    // private
    startDrop : function(){
        this.dropping = true;
    },
    
    // delayed drop so the click event doesn't get fired on a drop
    endDrop : function(){ 
       setTimeout(function(){
           this.dropping = false;
       }.createDelegate(this), 50); 
    },

    // private
    expand : function(){
        this.updateExpandIcon();
        this.ctNode.style.display = "";
    },

    // private
    focus : function(){
        if(!this.node.preventHScroll){
            try{this.anchor.focus();
            }catch(e){}
        }else if(!Ext.isIE){
            try{
                var noscroll = this.node.getOwnerTree().getTreeEl().dom;
                var l = noscroll.scrollLeft;
                this.anchor.focus();
                noscroll.scrollLeft = l;
            }catch(e){}
        }
    },


    toggleCheck : function(value){
        var cb = this.checkbox;
        if(cb){
            cb.checked = (value === undefined ? !cb.checked : value);
        }
    },

    // private
    blur : function(){
        try{
            this.anchor.blur();
        }catch(e){} 
    },

    // private
    animExpand : function(callback){
        var ct = Ext.get(this.ctNode);
        ct.stopFx();
        if(!this.node.hasChildNodes()){
            this.updateExpandIcon();
            this.ctNode.style.display = "";
            Ext.callback(callback);
            return;
        }
        this.animating = true;
        this.updateExpandIcon();
        
        ct.slideIn('t', {
           callback : function(){
               this.animating = false;
               Ext.callback(callback);
            },
            scope: this,
            duration: this.node.ownerTree.duration || .25
        });
    },

    // private
    highlight : function(){
        var tree = this.node.getOwnerTree();
        Ext.fly(this.wrap).highlight(
            tree.hlColor || "C3DAF9",
            {endColor: tree.hlBaseColor}
        );
    },

    // private
    collapse : function(){
        this.updateExpandIcon();
        this.ctNode.style.display = "none";
    },

    // private
    animCollapse : function(callback){
        var ct = Ext.get(this.ctNode);
        ct.enableDisplayMode('block');
        ct.stopFx();

        this.animating = true;
        this.updateExpandIcon();

        ct.slideOut('t', {
            callback : function(){
               this.animating = false;
               Ext.callback(callback);
            },
            scope: this,
            duration: this.node.ownerTree.duration || .25
        });
    },

    // private
    getContainer : function(){
        return this.ctNode;  
    },

    // private
    getEl : function(){
        return this.wrap;  
    },

    // private
    appendDDGhost : function(ghostNode){
        ghostNode.appendChild(this.elNode.cloneNode(true));
    },

    // private
    getDDRepairXY : function(){
        return Ext.lib.Dom.getXY(this.iconNode);
    },

    // private
    onRender : function(){
        this.render();    
    },

    // private
    render : function(bulkRender){
        var n = this.node, a = n.attributes;
        var targetNode = n.parentNode ? 
              n.parentNode.ui.getContainer() : n.ownerTree.innerCt.dom;
        
        if(!this.rendered){
            this.rendered = true;

            this.renderElements(n, a, targetNode, bulkRender);

            if(a.qtip){
               if(this.textNode.setAttributeNS){
                   this.textNode.setAttributeNS("ext", "qtip", a.qtip);
                   if(a.qtipTitle){
                       this.textNode.setAttributeNS("ext", "qtitle", a.qtipTitle);
                   }
               }else{
                   this.textNode.setAttribute("ext:qtip", a.qtip);
                   if(a.qtipTitle){
                       this.textNode.setAttribute("ext:qtitle", a.qtipTitle);
                   }
               } 
            }else if(a.qtipCfg){
                a.qtipCfg.target = Ext.id(this.textNode);
                Ext.QuickTips.register(a.qtipCfg);
            }
            this.initEvents();
            if(!this.node.expanded){
                this.updateExpandIcon(true);
            }
        }else{
            if(bulkRender === true) {
                targetNode.appendChild(this.wrap);
            }
        }
    },

    // private
    renderElements : function(n, a, targetNode, bulkRender){
        // add some indent caching, this helps performance when rendering a large tree
        this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';

        var cb = typeof a.checked == 'boolean';

        var href = a.href ? a.href : Ext.isGecko ? "" : "#";
        var buf = ['<li class="x-tree-node"><div ext:tree-node-id="',n.id,'" class="x-tree-node-el x-tree-node-leaf x-unselectable ', a.cls,'" unselectable="on">',
            '<span class="x-tree-node-indent">',this.indentMarkup,"</span>",
            '<img src="', this.emptyIcon, '" class="x-tree-ec-icon x-tree-elbow" />',
            '<img src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon',(a.icon ? " x-tree-node-inline-icon" : ""),(a.iconCls ? " "+a.iconCls : ""),'" unselectable="on" />',
            cb ? ('<input class="x-tree-node-cb" type="checkbox" ' + (a.checked ? 'checked="checked" />' : '/>')) : '',
            '<a hidefocus="on" class="x-tree-node-anchor" href="',href,'" tabIndex="1" ',
             a.hrefTarget ? ' target="'+a.hrefTarget+'"' : "", '><span unselectable="on">',n.text,"</span></a></div>",
            '<ul class="x-tree-node-ct" style="display:none;"></ul>',
            "</li>"].join('');

        var nel;
        if(bulkRender !== true && n.nextSibling && (nel = n.nextSibling.ui.getEl())){
            this.wrap = Ext.DomHelper.insertHtml("beforeBegin", nel, buf);
        }else{
            this.wrap = Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf);
        }
        
        this.elNode = this.wrap.childNodes[0];
        this.ctNode = this.wrap.childNodes[1];
        var cs = this.elNode.childNodes;
        this.indentNode = cs[0];
        this.ecNode = cs[1];
        this.iconNode = cs[2];
        var index = 3;
        if(cb){
            this.checkbox = cs[3];
            index++;
        }
        this.anchor = cs[index];
        this.textNode = cs[index].firstChild;
    },


    getAnchor : function(){
        return this.anchor;
    },
    

    getTextEl : function(){
        return this.textNode;
    },
    

    getIconEl : function(){
        return this.iconNode;
    },


    isChecked : function(){
        return this.checkbox ? this.checkbox.checked : false; 
    },

    // private
    updateExpandIcon : function(){
        if(this.rendered){
            var n = this.node, c1, c2;
            var cls = n.isLast() ? "x-tree-elbow-end" : "x-tree-elbow";
            var hasChild = n.hasChildNodes();
            if(hasChild || n.attributes.expandable){
                if(n.expanded){
                    cls += "-minus";
                    c1 = "x-tree-node-collapsed";
                    c2 = "x-tree-node-expanded";
                }else{
                    cls += "-plus";
                    c1 = "x-tree-node-expanded";
                    c2 = "x-tree-node-collapsed";
                }
                if(this.wasLeaf){
                    this.removeClass("x-tree-node-leaf");
                    this.wasLeaf = false;
                }
                if(this.c1 != c1 || this.c2 != c2){
                    Ext.fly(this.elNode).replaceClass(c1, c2);
                    this.c1 = c1; this.c2 = c2;
                }
            }else{
                if(!this.wasLeaf){
                    Ext.fly(this.elNode).replaceClass("x-tree-node-expanded", "x-tree-node-leaf");
                    delete this.c1;
                    delete this.c2;
                    this.wasLeaf = true;
                }
            }
            var ecc = "x-tree-ec-icon "+cls;
            if(this.ecc != ecc){
                this.ecNode.className = ecc;
                this.ecc = ecc;
            }
        }
    },

    // private
    getChildIndent : function(){
        if(!this.childIndent){
            var buf = [];
            var p = this.node;
            while(p){
                if(!p.isRoot || (p.isRoot && p.ownerTree.rootVisible)){
                    if(!p.isLast()) {
                        buf.unshift('<img src="'+this.emptyIcon+'" class="x-tree-elbow-line" />');
                    } else {
                        buf.unshift('<img src="'+this.emptyIcon+'" class="x-tree-icon" />');
                    }
                }
                p = p.parentNode;
            }
            this.childIndent = buf.join("");
        }
        return this.childIndent;
    },

    // private
    renderIndent : function(){
        if(this.rendered){
            var indent = "";
            var p = this.node.parentNode;
            if(p){
                indent = p.ui.getChildIndent();
            }
            if(this.indentMarkup != indent){ // don't rerender if not required
                this.indentNode.innerHTML = indent;
                this.indentMarkup = indent;
            }
            this.updateExpandIcon();
        }
    },

    destroy : function(){
        if(this.elNode){
            Ext.dd.Registry.unregister(this.elNode.id);
        }
        delete this.elNode;
        delete this.ctNode;
        delete this.indentNode;
        delete this.ecNode;
        delete this.iconNode;
        delete this.checkbox;
        delete this.anchor;
        delete this.textNode;
        Ext.removeNode(this.ctNode);
    }
};


Ext.tree.RootTreeNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
    // private
    render : function(){
        if(!this.rendered){
            var targetNode = this.node.ownerTree.innerCt.dom;
            this.node.expanded = true;
            targetNode.innerHTML = '<div class="x-tree-root-node"></div>';
            this.wrap = this.ctNode = targetNode.firstChild;
        }
    },
    collapse : Ext.emptyFn,
    expand : Ext.emptyFn
});



Ext.tree.TreeLoader = function(config){
    this.baseParams = {};
    this.requestMethod = "POST";
    Ext.apply(this, config);

    this.addEvents(
        
        "beforeload",
        
        "load",
        
        "loadexception"
    );

    Ext.tree.TreeLoader.superclass.constructor.call(this);
};

Ext.extend(Ext.tree.TreeLoader, Ext.util.Observable, {
    
    
    
    
    
    
    
    uiProviders : {},

    
    clearOnLoad : true,

    
    load : function(node, callback){
        if(this.clearOnLoad){
            while(node.firstChild){
                node.removeChild(node.firstChild);
            }
        }
        if(this.doPreload(node)){ // preloaded json children
            if(typeof callback == "function"){
                callback();
            }
        }else if(this.dataUrl||this.url){
            this.requestData(node, callback);
        }
    },

    doPreload : function(node){
        if(node.attributes.children){
            if(node.childNodes.length < 1){ // preloaded?
                var cs = node.attributes.children;
                node.beginUpdate();
                for(var i = 0, len = cs.length; i < len; i++){
                    var cn = node.appendChild(this.createNode(cs[i]));
                    if(this.preloadChildren){
                        this.doPreload(cn);
                    }
                }
                node.endUpdate();
            }
            return true;
        }else {
            return false;
        }
    },

    getParams: function(node){
        var buf = [], bp = this.baseParams;
        for(var key in bp){
            if(typeof bp[key] != "function"){
                buf.push(encodeURIComponent(key), "=", encodeURIComponent(bp[key]), "&");
            }
        }
        buf.push("node=", encodeURIComponent(node.id));
        return buf.join("");
    },

    requestData : function(node, callback){
        if(this.fireEvent("beforeload", this, node, callback) !== false){
            this.transId = Ext.Ajax.request({
                method:this.requestMethod,
                url: this.dataUrl||this.url,
                success: this.handleResponse,
                failure: this.handleFailure,
                scope: this,
                argument: {callback: callback, node: node},
                params: this.getParams(node)
            });
        }else{
            // if the load is cancelled, make sure we notify
            // the node that we are done
            if(typeof callback == "function"){
                callback();
            }
        }
    },

    isLoading : function(){
        return this.transId ? true : false;
    },

    abort : function(){
        if(this.isLoading()){
            Ext.Ajax.abort(this.transId);
        }
    },

    
    createNode : function(attr){
        // apply baseAttrs, nice idea Corey!
        if(this.baseAttrs){
            Ext.applyIf(attr, this.baseAttrs);
        }
        if(this.applyLoader !== false){
            attr.loader = this;
        }
        if(typeof attr.uiProvider == 'string'){
           attr.uiProvider = this.uiProviders[attr.uiProvider] || eval(attr.uiProvider);
        }
        return(attr.leaf ?
                        new Ext.tree.TreeNode(attr) :
                        new Ext.tree.AsyncTreeNode(attr));
    },

    processResponse : function(response, node, callback){
        var json = response.responseText;
        try {
            var o = eval("("+json+")");
            node.beginUpdate();
            for(var i = 0, len = o.length; i < len; i++){
                var n = this.createNode(o[i]);
                if(n){
                    node.appendChild(n);
                }
            }
            node.endUpdate();
            if(typeof callback == "function"){
                callback(this, node);
            }
        }catch(e){
            this.handleFailure(response);
        }
    },

    handleResponse : function(response){
        this.transId = false;
        var a = response.argument;
        this.processResponse(response, a.node, a.callback);
        this.fireEvent("load", this, a.node, response);
    },

    handleFailure : function(response){
        this.transId = false;
        var a = response.argument;
        this.fireEvent("loadexception", this, a.node, response);
        if(typeof a.callback == "function"){
            a.callback(this, a.node);
        }
    }
});



Ext.tree.TreeFilter = function(tree, config){
    this.tree = tree;
    this.filtered = {};
    Ext.apply(this, config);
};

Ext.tree.TreeFilter.prototype = {
    clearBlank:false,
    reverse:false,
    autoClear:false,
    remove:false,

     
    filter : function(value, attr, startNode){
        attr = attr || "text";
        var f;
        if(typeof value == "string"){
            var vlen = value.length;
            // auto clear empty filter
            if(vlen == 0 && this.clearBlank){
                this.clear();
                return;
            }
            value = value.toLowerCase();
            f = function(n){
                return n.attributes[attr].substr(0, vlen).toLowerCase() == value;
            };
        }else if(value.exec){ // regex?
            f = function(n){
                return value.test(n.attributes[attr]);
            };
        }else{
            throw 'Illegal filter type, must be string or regex';
        }
        this.filterBy(f, null, startNode);
	},
    
    
    filterBy : function(fn, scope, startNode){
        startNode = startNode || this.tree.root;
        if(this.autoClear){
            this.clear();
        }
        var af = this.filtered, rv = this.reverse;
        var f = function(n){
            if(n == startNode){
                return true;
            }
            if(af[n.id]){
                return false;
            }
            var m = fn.call(scope || n, n);
            if(!m || rv){
                af[n.id] = n;
                n.ui.hide();
                return false;
            }
            return true;
        };
        startNode.cascade(f);
        if(this.remove){
           for(var id in af){
               if(typeof id != "function"){
                   var n = af[id];
                   if(n && n.parentNode){
                       n.parentNode.removeChild(n);
                   }
               }
           } 
        }
    },
    
    
    clear : function(){
        var t = this.tree;
        var af = this.filtered;
        for(var id in af){
            if(typeof id != "function"){
                var n = af[id];
                if(n){
                    n.ui.show();
                }
            }
        }
        this.filtered = {}; 
    }
};




Ext.tree.TreeSorter = function(tree, config){
    Ext.apply(this, config);
    tree.on("beforechildrenrendered", this.doSort, this);
    tree.on("append", this.updateSort, this);
    tree.on("insert", this.updateSort, this);
    
    var dsc = this.dir && this.dir.toLowerCase() == "desc";
    var p = this.property || "text";
    var sortType = this.sortType;
    var fs = this.folderSort;
    var cs = this.caseSensitive === true;
    var leafAttr = this.leafAttr || 'leaf';

    this.sortFn = function(n1, n2){
        if(fs){
            if(n1.attributes[leafAttr] && !n2.attributes[leafAttr]){
                return 1;
            }
            if(!n1.attributes[leafAttr] && n2.attributes[leafAttr]){
                return -1;
            }
        }
    	var v1 = sortType ? sortType(n1) : (cs ? n1.attributes[p] : n1.attributes[p].toUpperCase());
    	var v2 = sortType ? sortType(n2) : (cs ? n2.attributes[p] : n2.attributes[p].toUpperCase());
    	if(v1 < v2){
			return dsc ? +1 : -1;
		}else if(v1 > v2){
			return dsc ? -1 : +1;
        }else{
	    	return 0;
        }
    };
};

Ext.tree.TreeSorter.prototype = {
    doSort : function(node){
        node.sort(this.sortFn);
    },
    
    compareNodes : function(n1, n2){
        
        return (n1.text.toUpperCase() > n2.text.toUpperCase() ? 1 : -1);
    },
    
    updateSort : function(tree, node){
        if(node.childrenRendered){
            this.doSort.defer(1, this, [node]);
        }
    }
};



if(Ext.dd.DropZone){
    
Ext.tree.TreeDropZone = function(tree, config){
    
    this.allowParentInsert = false;
    
    this.allowContainerDrop = false;
    
    this.appendOnly = false;
    Ext.tree.TreeDropZone.superclass.constructor.call(this, tree.innerCt, config);
    
    this.tree = tree;
    
    this.dragOverData = {};
    // private
    this.lastInsertClass = "x-tree-no-status";
};

Ext.extend(Ext.tree.TreeDropZone, Ext.dd.DropZone, {
    
    ddGroup : "TreeDD",

    
    expandDelay : 1000,

    // private
    expandNode : function(node){
        if(node.hasChildNodes() && !node.isExpanded()){
            node.expand(false, null, this.triggerCacheRefresh.createDelegate(this));
        }
    },

    // private
    queueExpand : function(node){
        this.expandProcId = this.expandNode.defer(this.expandDelay, this, [node]);
    },

    // private
    cancelExpand : function(){
        if(this.expandProcId){
            clearTimeout(this.expandProcId);
            this.expandProcId = false;
        }
    },

    // private
    isValidDropPoint : function(n, pt, dd, e, data){
        if(!n || !data){ return false; }
        var targetNode = n.node;
        var dropNode = data.node;
        // default drop rules
        if(!(targetNode && targetNode.isTarget && pt)){
            return false;
        }
        if(pt == "append" && targetNode.allowChildren === false){
            return false;
        }
        if((pt == "above" || pt == "below") && (targetNode.parentNode && targetNode.parentNode.allowChildren === false)){
            return false;
        }
        if(dropNode && (targetNode == dropNode || dropNode.contains(targetNode))){
            return false;
        }
        // reuse the object
        var overEvent = this.dragOverData;
        overEvent.tree = this.tree;
        overEvent.target = targetNode;
        overEvent.data = data;
        overEvent.point = pt;
        overEvent.source = dd;
        overEvent.rawEvent = e;
        overEvent.dropNode = dropNode;
        overEvent.cancel = false;  
        var result = this.tree.fireEvent("nodedragover", overEvent);
        return overEvent.cancel === false && result !== false;
    },

    // private
    getDropPoint : function(e, n, dd){
        var tn = n.node;
        if(tn.isRoot){
            return tn.allowChildren !== false ? "append" : false; // always append for root
        }
        var dragEl = n.ddel;
        var t = Ext.lib.Dom.getY(dragEl), b = t + dragEl.offsetHeight;
        var y = Ext.lib.Event.getPageY(e);
        var noAppend = tn.allowChildren === false || tn.isLeaf();
        if(this.appendOnly || tn.parentNode.allowChildren === false){
            return noAppend ? false : "append";
        }
        var noBelow = false;
        if(!this.allowParentInsert){
            noBelow = tn.hasChildNodes() && tn.isExpanded();
        }
        var q = (b - t) / (noAppend ? 2 : 3);
        if(y >= t && y < (t + q)){
            return "above";
        }else if(!noBelow && (noAppend || y >= b-q && y <= b)){
            return "below";
        }else{
            return "append";
        }
    },

    // private
    onNodeEnter : function(n, dd, e, data){
        this.cancelExpand();
    },

    // private
    onNodeOver : function(n, dd, e, data){
        var pt = this.getDropPoint(e, n, dd);
        var node = n.node;
        
        // auto node expand check
        if(!this.expandProcId && pt == "append" && node.hasChildNodes() && !n.node.isExpanded()){
            this.queueExpand(node);
        }else if(pt != "append"){
            this.cancelExpand();
        }
        
        // set the insert point style on the target node
        var returnCls = this.dropNotAllowed;
        if(this.isValidDropPoint(n, pt, dd, e, data)){
           if(pt){
               var el = n.ddel;
               var cls;
               if(pt == "above"){
                   returnCls = n.node.isFirst() ? "x-tree-drop-ok-above" : "x-tree-drop-ok-between";
                   cls = "x-tree-drag-insert-above";
               }else if(pt == "below"){
                   returnCls = n.node.isLast() ? "x-tree-drop-ok-below" : "x-tree-drop-ok-between";
                   cls = "x-tree-drag-insert-below";
               }else{
                   returnCls = "x-tree-drop-ok-append";
                   cls = "x-tree-drag-append";
               }
               if(this.lastInsertClass != cls){
                   Ext.fly(el).replaceClass(this.lastInsertClass, cls);
                   this.lastInsertClass = cls;
               }
           }
       }
       return returnCls;
    },

    // private
    onNodeOut : function(n, dd, e, data){
        this.cancelExpand();
        this.removeDropIndicators(n);
    },

    // private
    onNodeDrop : function(n, dd, e, data){
        var point = this.getDropPoint(e, n, dd);
        var targetNode = n.node;
        targetNode.ui.startDrop();
        if(!this.isValidDropPoint(n, point, dd, e, data)){
            targetNode.ui.endDrop();
            return false;
        }
        // first try to find the drop node
        var dropNode = data.node || (dd.getTreeNode ? dd.getTreeNode(data, targetNode, point, e) : null);
        var dropEvent = {
            tree : this.tree,
            target: targetNode,
            data: data,
            point: point,
            source: dd,
            rawEvent: e,
            dropNode: dropNode,
            cancel: !dropNode   
        };
        var retval = this.tree.fireEvent("beforenodedrop", dropEvent);
        if(retval === false || dropEvent.cancel === true || !dropEvent.dropNode){
            targetNode.ui.endDrop();
            return false;
        }
        // allow target changing
        targetNode = dropEvent.target;
        if(point == "append" && !targetNode.isExpanded()){
            targetNode.expand(false, null, function(){
                this.completeDrop(dropEvent);
            }.createDelegate(this));
        }else{
            this.completeDrop(dropEvent);
        }
        return true;
    },

    // private
    completeDrop : function(de){
        var ns = de.dropNode, p = de.point, t = de.target;
        if(!(ns instanceof Array)){
            ns = [ns];
        }
        var n;
        for(var i = 0, len = ns.length; i < len; i++){
            n = ns[i];
            if(p == "above"){
                t.parentNode.insertBefore(n, t);
            }else if(p == "below"){
                t.parentNode.insertBefore(n, t.nextSibling);
            }else{
                t.appendChild(n);
            }
        }
        n.ui.focus();
        if(this.tree.hlDrop){
            n.ui.highlight();
        }
        t.ui.endDrop();
        this.tree.fireEvent("nodedrop", de);
    },

    // private
    afterNodeMoved : function(dd, data, e, targetNode, dropNode){
        if(this.tree.hlDrop){
            dropNode.ui.focus();
            dropNode.ui.highlight();
        }
        this.tree.fireEvent("nodedrop", this.tree, targetNode, data, dd, e);
    },

    // private
    getTree : function(){
        return this.tree;
    },

    // private
    removeDropIndicators : function(n){
        if(n && n.ddel){
            var el = n.ddel;
            Ext.fly(el).removeClass([
                    "x-tree-drag-insert-above",
                    "x-tree-drag-insert-below",
                    "x-tree-drag-append"]);
            this.lastInsertClass = "_noclass";
        }
    },

    // private
    beforeDragDrop : function(target, e, id){
        this.cancelExpand();
        return true;
    },

    // private
    afterRepair : function(data){
        if(data && Ext.enableFx){
            data.node.ui.highlight();
        }
        this.hideProxy();
    }    
});

}



if(Ext.dd.DragZone){
Ext.tree.TreeDragZone = function(tree, config){
    Ext.tree.TreeDragZone.superclass.constructor.call(this, tree.getTreeEl(), config);
    
    this.tree = tree;
};

Ext.extend(Ext.tree.TreeDragZone, Ext.dd.DragZone, {
    
    ddGroup : "TreeDD",

    // private
    onBeforeDrag : function(data, e){
        var n = data.node;
        return n && n.draggable && !n.disabled;
    },

    // private
    onInitDrag : function(e){
        var data = this.dragData;
        this.tree.getSelectionModel().select(data.node);
        this.tree.eventModel.disable();
        this.proxy.update("");
        data.node.ui.appendDDGhost(this.proxy.ghost.dom);
        this.tree.fireEvent("startdrag", this.tree, data.node, e);
    },

    // private
    getRepairXY : function(e, data){
        return data.node.ui.getDDRepairXY();
    },

    // private
    onEndDrag : function(data, e){
        this.tree.eventModel.enable.defer(100, this.tree.eventModel);
        this.tree.fireEvent("enddrag", this.tree, data.node, e);
    },

    // private
    onValidDrop : function(dd, e, id){
        this.tree.fireEvent("dragdrop", this.tree, this.dragData.node, dd, e);
        this.hideProxy();
    },

    // private
    beforeInvalidDrop : function(e, id){
        // this scrolls the original position back into view
        var sm = this.tree.getSelectionModel();
        sm.clearSelections();
        sm.select(this.dragData.node);
    }
});
}



Ext.tree.TreeEditor = function(tree, config){
    config = config || {};
    var field = config.events ? config : new Ext.form.TextField(config);
    Ext.tree.TreeEditor.superclass.constructor.call(this, field);

    this.tree = tree;

    if(!tree.rendered){
        tree.on('render', this.initEditor, this);
    }else{
        this.initEditor(tree);
    }
};

Ext.extend(Ext.tree.TreeEditor, Ext.Editor, {
    
    alignment: "l-l",
    // inherit
    autoSize: false,
    
    hideEl : false,
    
    cls: "x-small-editor x-tree-editor",
    
    shim:false,
    // inherit
    shadow:"frame",
    
    maxWidth: 250,
    
    editDelay : 350,

    initEditor : function(tree){
        tree.on('beforeclick', this.beforeNodeClick, this);
        this.on('complete', this.updateNode, this);
        this.on('beforestartedit', this.fitToTree, this);
        this.on('startedit', this.bindScroll, this, {delay:10});
        this.on('specialkey', this.onSpecialKey, this);
    },

    // private
    fitToTree : function(ed, el){
        var td = this.tree.getTreeEl().dom, nd = el.dom;
        if(td.scrollLeft >  nd.offsetLeft){ // ensure the node left point is visible
            td.scrollLeft = nd.offsetLeft;
        }
        var w = Math.min(
                this.maxWidth,
                (td.clientWidth > 20 ? td.clientWidth : td.offsetWidth) - Math.max(0, nd.offsetLeft-td.scrollLeft) - 5);
        this.setSize(w, '');
    },

    // private
    triggerEdit : function(node){
        this.completeEdit();
        this.editNode = node;
        this.startEdit(node.ui.textNode, node.text);
    },

    // private
    bindScroll : function(){
        this.tree.getTreeEl().on('scroll', this.cancelEdit, this);
    },

    // private
    beforeNodeClick : function(node, e){
        var sinceLast = (this.lastClick ? this.lastClick.getElapsed() : 0);
        this.lastClick = new Date();
        if(sinceLast > this.editDelay && this.tree.getSelectionModel().isSelected(node)){
            e.stopEvent();
            this.triggerEdit(node);
            return false;
        }
    },

    // private
    updateNode : function(ed, value){
        this.tree.getTreeEl().un('scroll', this.cancelEdit, this);
        this.editNode.setText(value);
    },

    // private
    onHide : function(){
        Ext.tree.TreeEditor.superclass.onHide.call(this);
        if(this.editNode){
            this.editNode.ui.focus();
        }
    },

    // private
    onSpecialKey : function(field, e){
        var k = e.getKey();
        if(k == e.ESC){
            e.stopEvent();
            this.cancelEdit();
        }else if(k == e.ENTER && !e.hasModifier()){
            e.stopEvent();
            this.completeEdit();
        }
    }
});
