'use strict'


/*******************
 *      MODULE     *
 *******************/

class Module {
    tabs = []
    name
    selectedTab
    tabSelector

    width
    height
    x
    y
    constructor(moduleObject) {
        for (let tabObject of moduleObject.tabs) {
            let tab = new Tab(tabObject)
            this.tabs.push(tab)
        }
        for (let tab of this.tabs) {
            if (tab.name === moduleObject.selectedTab) {
                this.selectedTab = tab
                break
            }
        }
        this.tabSelector = moduleObject.tabSelector
        this.width = moduleObject.width
        this.height = moduleObject.height
    }

    clicked(p5) {
        for (let tab of this.tabs) {
            if (tab.clicked(p5) === true) {
                this.selectedTab = tab
                this.tabSelector(tab.name)
            }
        }
    }

    display(p5) {
        // Module display
        p5.background(255)
        p5.rectMode(p5.CENTER)
        p5.noFill();
        p5.strokeWeight(2);
        p5.rect(p5.windowWidth/2, p5.windowHeight/2, this.width, this.height, 20, 20, 0, 0);

        redFill(p5)
        p5.rect(p5.windowWidth/2, p5.windowHeight/2 - this.height/2 + 10, this.width, 20, 20, 20, 0, 0);

        let i = 1
        for (let tab of this.tabs) {
            if (tab !== this.selectedTab)
                tab.displayUnselected(p5, p5.windowWidth / 2 - this.width / 2 + tab.width / 2 + 10 * i + tab.width * (i - 1), p5.windowHeight / 2 - this.height / 2 - tab.height / 2)
            else
                this.selectedTab.displaySelected(p5, p5.windowWidth / 2 - this.width / 2 + tab.width / 2 + 10 * i + tab.width * (i - 1), p5.windowHeight / 2 - this.height / 2 - tab.height / 2)
            i++
        }
    }
}

/*******************
 *       TAB       *
 *******************/

function tabTitleText(p5) {
    p5.textSize(20)
    p5.textAlign(p5.CENTER)
}

// Apart from tab, also displays analysis box
class Tab {
    subtabs = []
    name
    selectedSubtab
    subtabSelector

    // Representation
    width
    height

    constructor(tabObject) {
        this.name = tabObject.name
        for (let subtabObject of tabObject.subtabs) {
            let subtab = new Subtab(subtabObject)
            this.subtabs.push(subtab)
        }

        if (this.subtabs.length === 1)
            this.selectedSubtab = this.subtabs[0]
        else {
            for (let subtab of this.subtabs) {
                if (subtab.name === tabObject.selectedSubtab) {
                    this.selectedSubtab = subtab
                    break
                }
            }
        }
        this.subtabSelector = tabObject.subtabSelector
        this.width = tabObject.width
        this.height = tabObject.height
    }

    hasNoSubtabs() {
        return this.subtabs.length === 1
    }

    clicked(p5) {
        for (let subtab of this.subtabs)
            if (!this.hasNoSubtabs() && subtab.clicked(p5) === true) {
                this.selectedSubtab = subtab
                this.subtabSelector(subtab.name)
            }
        return p5.mouseX > this.x - this.width/2 && p5.mouseX < this.x + this.width/2 && p5.mouseY > this.y - this.height/2 && p5.mouseY < this.y + this.height/2;
    }

    titleDisplay(p5, x, y) {
        tabTitleText(p5)
        redFill(p5)

        // Need to find a better way
        p5.text(this.name, x, y + 2);
    }

    titleDisplaySelected(p5, x, y) {
        tabTitleText(p5)
        p5.fill(255)

        p5.text(this.name, x, y + 2);
    }

    displayUnselected(p5, x, y) {
        this.x = x
        this.y = y

        // Tab display
        p5.rectMode(p5.CENTER)
        p5.noFill()
        p5.rect(x, y, this.width, this.height);

        this.titleDisplay(p5, x, y)
    }

    displaySelected(p5, x, y) {
        this.x = x
        this.y = y

        // Tab display
        redFill(p5)
        p5.rect(x, y, this.width, this.height);
        this.titleDisplaySelected(p5, x, y)

        let i = 1
        if (!this.hasNoSubtabs()) {
            for (let subtab of this.subtabs) {
                if (subtab !== this.selectedSubtab)
                    subtab.displayUnselected(p5, x + 50 + this.selectedSubtab.width * (i - 1), y + 100);
                else {
                    this.selectedSubtab.displaySelected(p5, x + 50 + this.selectedSubtab.width * (i - 1), y + 100)
                }
                i++
            }
        } else {
            this.selectedSubtab.displaySelected(p5, x + 50, y + 100, !this.hasNoSubtabs())
        }
    }
}

/****************
 *    SUBTAB    *
 ****************/

class Subtab {
    name

    x
    y
    width
    height

    constructor(subtabObject) {
        this.name = subtabObject.name
        this.x = subtabObject.x
        this.y = subtabObject.y
        this.width = subtabObject.width
        this.height = subtabObject.height
    }

    clicked(p5) {
        return p5.mouseX > this.x - this.width/2 && p5.mouseX < this.x + this.width/2 && p5.mouseY > this.y - this.height/2 && p5.mouseY < this.y + this.height/2;
    }

    titleDisplay(p5, x, y) {
        tabTitleText(p5)
        redFill(p5)

        p5.text(this.name, x, y + 17, this.width, this.height);
    }

    titleDisplaySelected(p5, x, y) {
        tabTitleText(p5)
        p5.fill(255)

        p5.text(this.name, x, y + 17, this.width, this.height);
    }

    displaySelected(p5, x, y, displayOtherSubtabs=true) {
        this.x = x
        this.y = y

        // Tab display
        if (displayOtherSubtabs) {
            redFill(p5)
            p5.rect(x, y, this.width, this.height);
            this.titleDisplaySelected(p5,x,y)
        }
    }

    displayUnselected(p5, x, y) {
        this.x = x
        this.y = y

        // Tab display
        this.titleDisplay(p5,x,y)
        p5.rectMode(p5.CENTER)
        p5.noFill()
        p5.rect(x, y, this.width, this.height);
    }

}

/*****************
 *   INTERFACE   *
 *****************/

function centerSketch() {
    const main_canvas = document.querySelector("#mainCanvas");
    main_canvas.style.position = "absolute";
    main_canvas.style.left = "50%";
    main_canvas.style.top = "50%";
    main_canvas.style.transform = "translate(-50%, -50%)";
}


