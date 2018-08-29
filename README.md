# pandora.box

A simple database library.

## how to use it

Firstly craete new object:
```javascript
var pandora = new Pandora();
```
Create a new `box` (literally a tables storage)
```javascript
pandora.box("animals", ['name', 'species', 'weigth']);
```

Inderting
```javascript
animals.insert([true, "druppy", "dog", "10kg"]);
// there are 'true' means auto-increment id
```

Finding (returns id):
```javascript
animals.find("druppy","name");
```

Reading:
```javascript
animals.read("druppy","name");
```

Updating:
```javascript
animals.update(1, ["rex", "wolf"], ["name", "species"] );
```

Deleting:
```javascript
animals.delete("druppy","name");
```