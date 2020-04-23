function List() {
    this.listSize = 0;//列表中元素的个数
    this.dataStore = [];//初始化一个空数组来保存数据
    this.clear = clear;//清空列表中的所有元素
    this.find = find;//在列表中查找某一元素
    this.toString = toString;//显示列表中的元素
    this.insert = insert;//向列表中插入一个元素
    this.append = append;//给列表添加元素
    this.remove = remove;//从列表中删除元素
    this.contains = contains;//判断列表中是否存在某一元素
    this.length = length;//列表中有多少个元素
    this.pos = 0;//列表当前元素所在位置
    this.front = front;//将列表当前位置移到第一个位置
    this.end = end;//将列表当前位置移到最后一个位置
    this.prev = prev; //将列表当前位置向前移动一个位置
    this.next = next;//将列表当前位置向后移动一个位置
    this.currPos = currPos;//列表的当前位置
    this.moveTo = moveTo;//将列表当前位置移动到某个位置
    this.getElement = getElement;//获取当前位置的元素
}
function clear(){
    delete this.dataStore;
    this.dataStore = [];
    this.listSize = 0;
    this.pos = 0;
}

function find(element) {
    for (var i = 0; i < this.dataStore.length; ++i) {
        if (this.dataStore[i] == element) {
            return i;
        }
    }
    return -1;
}

function toString(){
    return this.dataStore;
}

function insert(element,after){
    var insertPos = this.find(after);
    if(insertPos > -1){
        this.dataSore.splice(insertPos+1,0,element);
        this.listSize++;
        return true;
    }
    return false;
}

function append(element) {
    this.dataStore[this.listSize++] = element;
}

function remove(element) {
    var foundAt = this.find(element);
    if (foundAt > -1) {
        this.dataStore.splice(foundAt,1);
        this.listSize--;
        return true;
    }
    return false;
}

function contains(){
    for(var i= 0; i < this.dataStore.length;i++){
        if(this.dataStore[i] == element){
            return true;
        }
    }
    return false;
}

function length(){
    return this.listSize;
}

function front(){
    this.pos = 0;
}

function end(){
    this.pos = this.listSize-1;
}

function prev(){
    if(this.pos > 0){
        this.pos--;
    }
}

function next(){
   if(this.pos < this.listSize-1){
       this.pos++;
   }
}

function currPos(){
    return this.pos;
}

function moveTo(position){
    this.pos = position;
}

function getElement(){
    return this.dataStore[this.pos];
}
var names = new List();
names.append("Cynthia");
names.append("Raymond");
names.append("Barbara");
names.append("amrbara");
names.append("zmrbara");
names.append("wmrbara");
console.log(names.toString());//[ 'Cynthia', 'Raymond', 'Barbara', 'amrbara', 'zmrbara', 'wmrbara' ]
names.remove("Raymond");
console.log(names.toString());//[ 'Cynthia', 'Barbara', 'amrbara', 'zmrbara', 'wmrbara' ]
names.clear();
console.log(names.toString());
/*使用迭代器访问列表*/
for(names.front();names.currPos() <= names.length();names.next()){
    console.log(names.getElement());
    if(names.pos == names.length()-1){
        return false;
    }
}

var movies=read(films.txt).split("\n");
function createArr(file){
    var arr=read(file).splice("\n");
    for (var i=0;i<arr.length;++i){
        arr[i]=arr[i].trim();
    }
    return arr;
}
var movieList=new List();
for (var i=0;i<moives.length;i++){
    movieList.append(moives[i]);
}
function displayList(list){
    for(list.front();list.currPos()<list.length;list.next()){
        if(list.getElement() instanceof Customer){
            print(list.getElement()["name"]+", "+
                list.getElement()["movie"]);
            
        }
        else{
            print(list.getElement());
        }
    }
}
var customers =new List();
function Customer(name,moive){
    this.name=name;
    this.moive=moive;
}
function checkOut(name,movie){
    this.name=
}