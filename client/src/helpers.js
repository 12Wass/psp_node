Array.prototype.findAndReplace = function(findFunction, data) {

    const itemIndex = this.findIndex(findFunction);

    if (itemIndex >= 0) {
        this[itemIndex] = data;
    }

    return this;
}