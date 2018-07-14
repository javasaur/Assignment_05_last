export function ChatTree(wrapper) {
    // For left-right navigation
    let fullElemList = [];

    // For up-down navigation
    let elemList = [];
    let currIndex = 0;

    let areEventListenersAttached = false; // For mouse and keyboard events
    let paddingPerLevel = 0.3; // em, for indendation
    let switchCurrentElementCallback; // passed by react

    let element = createDomElement('ul', '');

    return {
        clear,
        element,
        load,
        subscribeToElementSwitch
    };

    // API functions
    function clear() {
        wrapper.innerHTML = "";
        fullElemList.length = 0;
        elemList.length = 0;
        currIndex = 0;
    }

    function load(items) {
        clear();

        addClassesToElement(element, ['left-nav-tree']);
        element.setAttribute('tabIndex', 0);
        wrapper.appendChild(element);

        fullElemList = items;
        decompose(items, element);

        if(!areEventListenersAttached) {
            element.addEventListener("keydown", handleKeyEvent)
            element.addEventListener("click", handleMouseEvent)
            element.addEventListener("dblclick", handleMouseEvent)
            areEventListenersAttached = true;
        }

        // if(getActiveElem()) {
        //     switchCurrenElementTo(0);
        // }
    }

    // Internal functions
    function addClassesToElement(elem, classnames) {
        if(!!elem) {
            elem.classList.add(...classnames);
        }
    }

    function addToElemPath(elem, parentElem, addition) {
        let path = parentElem.getAttribute("path");
        let newPath;
        if(!!path) {
            newPath = path + "," + addition;
        } else {
            newPath = "" + addition;
        }
        elem.setAttribute("path", newPath);
        return newPath;
    }

    function canTraverseDownOrRight() {
        return currIndex < elemList.length - 1;
    }

    function createDomElement(type, str) {
        let elem = document.createElement(type);
        elem.innerText = str;
        return elem;
    }

    function decompose(items, elem) {
        // Non-root elements go under separate ul
        let ul = createDomElement("ul", "");

        for(let [index, item] of items.entries()) {
            // Create and configure the li and div elements
            let li = createDomElement("li", "");
            let div = createDomElement(`div`, item.name);
            let icon = createDomElement("i", "");
            addClassesToElement(icon, ["icon", "fas"])
            if(item.type === 'user') {
                addClassesToElement(icon, ["fa-user"]);
            } else if(item.type === 'group') {
                addClassesToElement(icon, ["fa-angle-right"])
            }
            div.insertAdjacentElement('afterbegin', icon);
            div.classList.add("left-tree-div"); // for mouse-event filtering

            // Added for REACT
            li.setAttribute('type', item.type);
            li.setAttribute('id', item.id);

            // Add indentation depending on depth
            let path = addToElemPath(li, elem, index);
            let pathLength = path.split(",").length;
            div.setAttribute("style", "padding-left: " + pathLength * paddingPerLevel + "em;");
            li.appendChild(div);
            addClassesToElement(div, [item.type]);

            // Add li directly to the "root" ul or new ul
            if(elem === element) {
                elem.appendChild(li);
            } else {
                ul.appendChild(li);
            }

            // Add elements to the flat hierarchy
            if(currIndex >= 0) {
                elemList.splice(currIndex + index + 1, 0, li);
            } else {
                elemList.push(li);
            }
        }

        // For non-root elements append the created ul
        if(elem !== element) {
            elem.appendChild(ul);
        }
    }

    function expand(elem) {
        let children = getChildrenForElem(elem);
        if(children.length > 0) {
            decompose(children, elem);
            setExpandedIcon(elem);
        }
    }

    function fold(elem) {
        // Each li represents an item, so querySelectorAll
        // enables to fold the tree at any level without
        // messing the flat hierarchy
        let closedCount = elem.querySelectorAll("li").length;
        let elemUl = elem.querySelector("ul");
        elemList.splice(currIndex + 1, closedCount);
        elemUl.remove();
        setNonExpandedIcon(elem);
    }

    function getActiveElem() {
        return elemList[currIndex];
    }

    function getChildrenForElem(elem) {
        let path = elem.getAttribute("path").split(",");

        // Top-level items
        if(path.length === 1) {
            return fullElemList[path].items;
        }

        // Top-level item as entry point
        let children = fullElemList[path[0]].items;
        for(let i = 1; i < path.length; i++) {
            children = children[path[i]].items;
        }
        return !!children ? children : [];
    }

    function handleEnterKey() {
        let currElem = getActiveElem();
        if(isExpandable(currElem)) {
            isExpanded(currElem) ? fold(currElem) : expand(currElem);
        }
    }

    function handleKeyEvent(e) {
        switch(e.keyCode) {
            // Enter
            case 13:
                handleEnterKey();
                break;
            // Arrow up
            case 38:
                traverseUp();
                break;
            // Arrow down
            case 40:
                traverseDown();
                break;
            // Arrow right
            case 39:
                traverseRight();
                break;
            // Arrow left
            case 37:
                traverseLeft();
                break;
        }
    }

    function handleMouseEvent(e) {
        // Filter clicks by predefined classname
        if(!e.target.classList.contains("left-tree-div")) {
            return;
        }
        let elem = e.target.parentNode;

        if(e.type === "click") {
            mouseClick(elem);
            return;
        }

        if(e.type === "dblclick") {
            mouseDblClick(elem);
            return;
        }
    }

    function isExpandable(elem) {
        return elem.querySelector("div").classList.contains("group");
    }

    function isExpanded(elem) {
        let childrenLi = elem.querySelectorAll("li");
        return childrenLi.length > 0;
    }

    function mouseClick(elem) {
        let newIndex = elemList.indexOf(elem);
        switchCurrenElementTo(newIndex);
    }

    function mouseDblClick(elem) {
        if(isExpandable(elem)) {
            isExpanded(elem) ? fold(elem) : expand(elem);
        }
    }
    
    function removeClassFromElement(elem, classname) {
        if(!!elem) {
            elem.classList.remove(classname);
        }
    }

    function setNonExpandedIcon(elem) {
        const icon = elem.querySelector("i");
        icon.className = '';
        addClassesToElement(icon, ["icon", "fas", "fa-angle-right"]);
    }

    function setExpandedIcon(elem) {
        const icon = elem.querySelector("i");
        icon.className = '';
        addClassesToElement(icon, ["icon", "fas", "fa-angle-down"]);
    }

    function subscribeToElementSwitch(callback) {
        switchCurrentElementCallback = callback;
    }

    function switchCurrenElementTo(elemIndex) {
        let prevElem = getActiveElem();
        currIndex = elemIndex;
        toggleClasses(prevElem, getActiveElem(), "selected");

        // Provide the parent with new element details
        const id = getActiveElem().getAttribute('id');
        const type = getActiveElem().getAttribute('type');
        const name = getActiveElem().innerText
        if(switchCurrentElementCallback) {
            switchCurrentElementCallback.apply(null, [id, type, name]);
        }
    }

    function toggleClasses(oldElem, newElem, className) {
        removeClassFromElement(oldElem, className);
        addClassesToElement(newElem, [className]);
    }

    function traverseDown() {
        traverseUpOrDown(1);
    }

    function traverseLeft() {
        let currElem = getActiveElem();
        let path = currElem.getAttribute("path").split(',');

        if(!currElem) {
            return;
        }

        if(isExpanded(currElem)) {
            fold(currElem);
            return;
        }

        // If it's not top-level, switch to parent
        if(path.length > 1) {
            let parentLi = currElem.parentNode.parentNode;
            let newIndex = elemList.indexOf(parentLi);
            switchCurrenElementTo(newIndex);
            return;
        }
    }

    function traverseRight() {
        let currElem = getActiveElem();

        if(!currElem) {
            return;
        }

        // If already expanded, go to first child
        if(isExpanded(currElem)) {
            switchCurrenElementTo(currIndex + 1);
            return;
        }

        if(isExpandable(currElem) && canTraverseDownOrRight()) {
            expand(currElem);
            switchCurrenElementTo(currIndex + 1);
            return;
        }

        // Non-expandable items, right means down
        traverseDown();
    }

    function traverseUp() {
        traverseUpOrDown(-1);
    }

    function traverseUpOrDown(n) {
        let newIndex = currIndex + n;
        // No action if reached top/bottom borders
        if(newIndex < 0 || newIndex > elemList.length - 1) {
            return;
        }

        switchCurrenElementTo(newIndex);
    }
}