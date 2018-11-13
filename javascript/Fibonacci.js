
/*
//  ----
//  Fib Recursion Programming
//  ----
var fibRecursion = function(n)
{
    
    if (n <= 1) return n;
    
    return fibRecursion(n-1) + fibRecursion(n-2);
}

for ( var i = 0; i < 10; i++)
{
  console.log(""+(i+1)+": "+fibRecursion(i));   
}
*/
/*
//  ----
//  Fib Dynamic Programming
//  ----
var fibDynamic = function(n)
{
    var f[n+1];
    var i;
    
    f[0] = 0;
    f[1] = 1;
    
    for (var i = 2; i <= n; i++)
    {
     	f[i] = f[i-1] + f[i-2];   
    }
    return f[n];
}

for ( var i = 0; i < 6; i++)
{
  console.log(""+(i+1)+": "+fibDynamic(i));   
}
*/
// ----
// space optimised fib
// ----
var fibSpace = function(n){
    if (n < 2) return n;
    var a,b;
    a = 0;
    b = 1;
    var tmp;
    for (var i = 2; i <= n; i++){
        tmp  = a + b;
        a = b;
        b = tmp;
    }
    return b; //this could also be tmp.
}

for ( var i = 0; i < 10; i++)
{
  console.log(""+(i+1)+": "+fibSpace(i));   
}

/*
// ----
// fib even further, matrices approach. 
// ----
var fibMore = function(n){
    if ( n == 0 ) return n;
    this.dataset = [[1,1], [1,0]];
    
    this.multiply = function( A, B )
    {
     // both A and B are 2x2 matrices.   
     	var x = A[0][0]*B[0][0] + A[0][1]*B[1][0];
     	var y = A[0][0]*B[0][1] + A[0][1]*B[1][1];
        var z = A[1][0]*B[0][0] + A[1][1]*B[1][0];
        var w = A[1][0]*B[0][1] + A[1][1]*B[1][1];
        
        A[0][0] = x;
        A[0][1] = y;
        A[1][0] = z;
        A[1][1] = w;
        
        this.dataset = A;
    }
    this.power = function( A, n ){
     //A is a 2x2 matrix, n is an int.   
        if (n < 2) return;
        
        var grid = [[1,1],[1,0]];
        
        this.power(this.dataset, n/2);
        this.multiply(this.dataset, this.dataset);
        
        if ( n%2 != 0 ){
         	this.multiply(this.dataset, grid);
        }
    }
    
    this.power(this.dataset, n-1);
    console.log("dataset: " + this.dataset);
    return this.dataset[0][0];
    
}
*/

//this should equate to 8. is = 21.
//console.log("Done: 7 = " + fibMore(6));
/*
console.log("FibMore Output");
for (var i = 0; i < 10; i++){
    console.log(""+(i+1)+": "+fibMore(i));
}*/



//using fibSpace sa the algor of choice, how would i find the sum of fib numbers between the ranges A and B.

var findWithinRange = function(a, b){
	if (b<a){
        //swaps numbers if they are backwards.
     	var t = b;
        b = a;
        a = t;
    }
    
    var result = 0;
    for ( var i = a; i <= b; i++){
        result += fibSpace(i);
    }
    return result;
}

var findWithinRangeImproved = function(a,b){
 	if (b<a){
        var t = b;
        b = a;
        a = t;
    }
    if (a == b) 
        return fibSpace(a);
    if ((a+1) == b)
        return fibSpace(a) + fibSpace(a+1); 
    
    var itemA = fibSpace(a);
    var itemB = fibSpace(a+1);
    var result = itemA + itemB;
    for ( var i = a+1; i < b; i++){
        var tmp = itemA + itemB;
        itemA = itemB;
        itemB = tmp;
        
     	result += itemB;
    }
    
    return result;
    
}
/*
var start = performance.now();
console.log("Sum of the first 10: "+ findWithinRange(10, 17));
var end = performance.now();
var r = end-start;
console.log("Time: "+r);
start = performance.now();
console.log("Improved: "+ findWithinRangeImproved(10,17));
end = performance.now();
var ir = end-start;
console.log("Time:"+ir);

console.log("Difference: ",(ir<r?r-ir:ir-r));
console.log(r);
console.log(ir);
*/