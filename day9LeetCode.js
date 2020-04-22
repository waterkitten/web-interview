//关于列表的实现
function List() {
    this.listSize = 0;
    //this.pos = 0;
    this.dataStore = [];
    // this.clear = clear;
    this.find = find;
    this.toString = toString;
   // this.insert = insert;
    this.append = append;
    this.remove = remove;
    //this.front = front;
   // this.end = end;
   // this.prev = prev;
  //  this.next = next;
   
   // this.currPos = currPos;
  //  this.moveTo = moveTo;
    //this.getElement = getElement;
    this.length = length;
 }
 function append(e){
     this.dataStore[this.listSize++]=e;
 }
 function find(e){
     for(var i=0;i<this.dataStore.length;++i)
         if(this.dataStore[i]==e){
             console.log(i);
            return i;
        }
            return -1;
 }
 function remove(element) {
  var foundAt = this.find(element);
//     if (foundAt > -1)
//     for(let i=foundAt;i<this.listSize+1;i++){
//         this.dataStore[i]=this.dataStore[i+1];
//     }
//     else return false;
//     --this.listSize;
    
    if (foundAt > -1) {
       this.dataStore.splice(foundAt,1);
       --this.listSize;
       return true;
    }
    return false;
 }


function length(){
    return this.listSize;
}
function toString(){
    return this.dataStore;
}
function insert(element,after){
    var position=this.find(after);
    // ++this.listSize;
    // for(var i=position;i<=this.dataStore.length;i++){
    //     this.dataStore[i+1]=dataStore[i];

    // }
    // this.dataStore[position]=e;
    // this.listSize--;
    if(position>-1){
        this.dataStore.splice(position+1,0,element);
        ++this.listSize;
        return true;
    }
    return false;
}
var names = new List();
names.append("Cynthia");
names.append("Raymond");
names.append("Barbara");
console.log(names.toString());
names.remove("Raymond");
console.log(names.toString());
names.insert("cy","Barbara");
console.log(names.toString());