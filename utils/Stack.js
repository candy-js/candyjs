"use strict";
const ArrayList = require("./ArrayList");
module.exports = class Stack extends ArrayList {
    /**
     * Push an item onto the top of this stack
     *
     * @param {any} item
     */
    push(item) {
        this.add(item);
    }
    /**
     * Removes the object at the top of this stack and returns it
     *
     * @throws {Error}
     */
    pop() {
        let len = this.size();
        return this.removeAt(len - 1);
    }
    /**
     * Tests if this stack is empty
     */
    empty() {
        return 0 === this.size();
    }
};
