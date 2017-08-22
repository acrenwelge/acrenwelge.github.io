---
layout: post
title:  "Book Review: You Don't Know JS"
date:   2017-08-21 08:00:00 -0600
categories: Books
tags: JavaScript
---
I just finished [this book series](https://github.com/getify/You-Dont-Know-JS)
about JavaScript, and it gave me a lot of great information and a fresh perspective
on topics in JS that I already kinda-sorta knew, but not really in-depth.
<!--end excerpt-->

I want to take some time to jot down some notes to help clarify (just for my own sake)
the major concepts I learned from reading the books. In simple one-sentence definitions
and some examples, I think the most important and relevant concepts I learned are:

### Pre-ES6

#### Syntax
* `try...catch`: marks a block of statements to try, and specifies a response, should an exception be thrown
  * There are three possible forms, including the optional `finally` block which will execute directly after `try` and `catch` but before any subsequent statements. `finally` executes whether or not an exception was thrown or caught.
    * `try...catch`
    * `try...catch...finally`
    * `try...finally`

#### Objects
* `Object.create(proto[, propertiesObject])`: creates a new object with the specified prototype object (1st argument) and properties (optional second argument)
* `Object.keys()`: returns an array of all enumerable properties
* `Object.getOwnPropertyNames(..)`: returns an array of *all* properties, enumerable or not.

#### Arrays
* Each of the following methods accepts a function callback but handles the return values differently:
  * `Array.forEach()`: iterates over all values in the array, and ignores any callback return values
  * `Array.every()`: keeps going until the end or the callback returns a `false` (or "falsy") value
  * `Array.some()`: keeps going until the end or the callback returns a `true` (or "truthy") value

#### Keywords
* `throw` keyword: stops execution of current function and transfers control to nearest `catch` block in the call stack (and terminates if there is no `catch` block)
* `this` keyword: refers to the *dynamic scope* (where the function was called from), following
four rules, in order of precedence:
  * **New binding**: Is the function called with `new`? If so, `this` is the newly constructed object
  `var bar = new foo()`
  * **Explicit binding**: Is the function called with `call` or `apply`, even hidden inside a `bind` hard binding? If so, `this` is the explicitly specified object
  `var bar = foo.call( obj2 )`
  * **Implicit binding**: Is the function called with a context (implicit binding), otherwise known as an owning or containing object? If so, this is that context object
  `var bar = obj1.foo()`
  * **Default binding**: If in strict mode, `undefined`; otherwise the global object
  `var bar = foo()`

#### Concepts
* **Closure**: when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope
  * When functions are passed around as values, they are most likely exercising closure
* **Lexical Scope**: a set of rules for variable look-ups based on **write-time nesting of scopes**
  * Depends on where a function was **declared**
* **Dynamic Scope**: looks up variables based on the **run-time call-stack**
  * Depends on where a function was **called from**
  * `this` exhibits dynamic scope behavior
* **Module**: a small unit of independent, reusable code that can be accessed through a **public API**
  * Can be implemented with an IIFE
  * A "singleton" module can be declared: `var foo = (function myModule(){..})();`
  * In the "Revealing Module" pattern, public functions/methods/properties are `returned` but private variables/functions are not directly accessible
  {% highlight js %}
    function CoolModule() {
    	var something = [1, 2, 3];
    	function doSomething() {
    		console.log( something.join( " ! " ) );
    	}
    	return {
    		doSomething: doSomething
    	};
    }
    var foo = CoolModule();

    foo.doSomething(); // cool
    foo.doAnother(); // 1 ! 2 ! 3
  {% endhighlight %}

### New with ES6

#### New Keywords
* `let` declarations: create block-scoped variables (not "hoisted")
  * When used in the head of `for` loops, the variables declared with `let` will be declared **for each iteration** and be initialized with the value from the end of the previous iteration
  * `let` helps resolve closure and block-scoping issues in `for` loops like below
  {% highlight js %}
  for (var i=1; i<=5; i++) {
    setTimeout( function timer(){
      console.log( i );
    }, i*1000 );
  } // "6" is printed 5 times at 1-second intervals -- probably NOT what was intended
  // this occurs because all 5 functions reference the same global "i"
  for (let j=1; j<=5; j++) {
    setTimeout( function timer(){
      console.log( j );
    }, j*1000 );
  } // "1" through "5" is printed out in 1-second intervals -- SUCCESS :)
  // this occurs because "j" (via let) is declared for each iteration and thus
  // each function captures its own unique value of "j"
  {% endhighlight %}
* `const` declarations: create constants that are set once and cannot be changed
* `class` keyword:
* `yield` keyword: used inside generators to signal a pause point, sends out a value
when pausing the generator, and receives (is replaced by) the eventual resumption value
  * `yield` is essentially asking: "What value should I use here? I'll wait to hear back."
  * `yield *`: Called *yield delegation*, requires an iterable whose iterator it invokes
  and then delegates its own host generator's control to that iterator until it's exhausted

#### New Syntax and Operators
* `Object.assign(..)`: *Shallow* copies a target object (the first parameter) into one or more source objects (subsequent parameters). It iterates over all the enumerable, owned keys (immediately present) on the source object(s) and copies them (via `=` assignment only) to target. It also, helpfully, returns target
{% highlight js %}
  function anotherFunction() { .. }
  var anotherObject = {
  	c: true
  };
  var anotherArray = [];
  var myObject = {
  	a: 2,
  	b: anotherObject,	// reference, not a copy!
  	c: anotherArray,	// another reference!
  	d: anotherFunction
  };
  anotherArray.push( anotherObject, myObject );

  // ES6 method:
  var newObj = Object.assign( {}, myObject );
  newObj.a;						// 2
  newObj.b === anotherObject;		// true
  newObj.c === anotherArray;		// true
  newObj.d === anotherFunction;	// true

  // Old way to copy (for JSON-safe objects):
  var newObj = JSON.parse( JSON.stringify( someObj ) );
{% endhighlight %}
* `...` (Spread/rest operator): gathers together or spreads out
  {% highlight js %}
    var a = [1,2,3,4,5];
    var b = [ 0, ...a, 6 ];
    b;	// [0,1,2,3,4,5,6]
  {% endhighlight %}
* **Array/Object Destructuring**: decompose object/array values into variables with pattern matching
  {% highlight js %}
    var [ a, b, c, ...d ] = foo();
    var { x, y, z } = bar();
  {% endhighlight %}
  * **Nested Destructuring**: `var { x: { y: { z: w } } } = foo;`
  * **Destructuring Parameters**
  {% highlight js %}
  function foo( [ x, y ], {a: foo, b: bar} ) {
	   console.log( x, y );
  }
  {% endhighlight %}
* **Default Parameter Values**: set defaults to function parameters
  {% highlight js %}
  function foo(x = 11, y = foo(x)) {
  	console.log( x + y );
  }
  {% endhighlight %}
* **Concise Methods**: use shorter syntax for methods
  {% highlight js %}
    var foo = {
      bar() { console.log("hello world!") }
    }
  {% endhighlight %}
* **Computed Property Names**: use expressions to compute object property names
  {% highlight js %}
    var prefix = "user_";
    var o = {
    	a: something
    };
    o[ prefix + "foo" ] = function(..){ .. };
  {% endhighlight %}
* `for .. of` loops: loops over a set of values produced by an *iterator*
  * Loops over the **values** in an iterable, not the keys
  {% highlight js %}
    var a = ["a","b","c","d","e"];
    for (var idx in a) { // iterates over indices/keys (need to use [] or . to access values)
      console.log( idx ); // 0 1 2 3 4
      console.log( a[idx] ); // "a" "b" "c" "d" "e"
    }
    for (var val of a) { // iterates over values
      console.log( val ); // "a" "b" "c" "d" "e"
    }
  {% endhighlight %}
* **Template Literals** (String Interpolation): use backticks to enable string interpolation
  {% highlight js %}
    var name = "Kyle";
    var greeting = `Hello ${name}!`;
    console.log( greeting );	// "Hello Kyle!"
  {% endhighlight %}
  * **Interpolated Expressions**: you can also put any valid expression inside `${..}`, and you can nest the interpolated expressions like so:
  {% highlight js %}
    function upper(s) {
  	   return s.toUpperCase();
    }
    var who = "reader";
    var text =
      `A very ${upper( "warm" )} welcome
      to all of you ${upper( `${who}s` )}!`;
    console.log( text ); // A very WARM welcome to all of you READERS!
  {% endhighlight %}
  * **Tagged Template (String) Literals**: send an interpolated string to a function which receives an array of all the plain strings (not interpolated) as the first argument, and all the results of the evaluated expressions as subsequent arguments:
  {% highlight js %}
    function foo(strings, ...values) {
    	console.log( strings );
    	console.log( values );
    }
    var desc = "awesome";
    foo`Everything is ${desc}!`;
    // [ "Everything is ", "!"]
    // [ "awesome" ]
  {% endhighlight %}
* **Arrow Functions** (`(x) => {..}`): Anonymous function expressions that resolves `this`-binding to be lexical (instead of dynamic)
  * Most helpful with shorter functions
  * Removes the need for `var self = this` hack (but can mess you up if replacing a function already using dynamically-scoped `this`)
  * In fact, `this`, `arguments`, and `super` are all lexically-bound with arrow functions
  {% highlight js %}
    var controller = {
    	makeRequest: function(..){
    		btn.addEventListener( "click", () => {
    			// ..
    			this.makeRequest(..);
    		}, false );
    	}
    };
  {% endhighlight %}
* Syntax-level **module** support: file-based modules (one module per file) using new keywords `import` and `export` that bind a reference to that thing (variable, function, etc) like a pointer
  * You can name a `default` which sets a particular exported binding to be the default when importing the module

#### New Concepts / Implementations
* **Tail Call Optimization (TCO)**: Proper tail calls (like `return foo(x+1)` instead of `return 1 + foo(x)`) are optimized in ES6 so that the extra stack frame allocation is unnecessary, which means there's practically no limit to how deep the call stack can be
  * Especially useful for recursion
* Promises: a promise of a future value
  * Resolves the "inversion of control" and "callback hell" problems of callbacks
  * `Promise.resolve(..)`: creates a promise that is resolved to the value passed in
  * `Promise.reject(..)`: creates an immediately rejected promise
  * `Promise.all(..)`: accepts an array of one or more values (immediate values, promises, thenables) and returns a promise that will be fulfilled if all the values fulfill, or reject immediately once the first of any of them rejects
  * `Promise.race(..)`: accepts an array of one or more values and waits only for either the first fulfillment or rejection
* **Thenable**: any object (or function) with a `.then()` method on it
* **Iterator**: a structured pattern for pulling information from a source in one-at-a-time fashion
  * **Iterable**: any data structure that can produce an **iterator** (arrays, strings, generator functions, and collections)
  {% highlight js %}
    var arr = [1,2,3];
    var it = arr[Symbol.iterator]();
    it.next();		// { value: 1, done: false }
    it.next();		// { value: 2, done: false }
    it.next();		// { value: 3, done: false }
    it.next();		// { value: undefined, done: true }
  {% endhighlight %}
* **Generator**: a function that does *not* necessarily run-to-completion, instead
producing an iterator that will control the generator to execute its code
  * Useful for two major patterns:
    * *Producing a series of values*: This usage can be simple (e.g., random strings or incremented numbers), or it can represent more structured data access (e.g., iterating over rows returned from a database query).
    * *Queue of tasks to perform serially*: This usage often represents flow control for the steps in an algorithm, where each step requires retrieval of data from some external source. The fulfillment of each piece of data may be immediate, or may be asynchronously delayed.
