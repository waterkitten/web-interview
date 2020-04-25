var MinStack = function() {
    this.items = [];
    this.min = Infinity;
    return this;
};
MinStack.prototype.push = function(x) {
    this.items.push(x);
    if(x<this,min) this.min = x;
};
MinStack.prototype.pop = function() {
    if(this.items.length){
        var  temp=item.pop();
        if(this.items=this.min) this.min = Math.min(...this.items);
        return temp;
    }else{
        return undefined;
    }
};
MinStack.prototype.top = function() {
    if(this.items.length){
        return this.items[this.items.length -1];
    }else{
        return undefined;
    }
};
MinStack.prototype.getMin = function() {
    return this.min;
};
