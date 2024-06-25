// Inside the tests folder, tests will be written
// .spec refers to SPEC file
// What is a spec file?
// A SPEC file provides necessary information to the build system by defining instructions in a series of sections.

// before writing a test, we have to import a annotation from playwright module - require ('@playwright/test'), all the annotations are placed inside node_modules as a JARs file

const {test} = require ('@playwright/test')

//test() take two parameters 1. test case name 2. function() of test, inside of it we write the actual code

//test annotations will only come when we import the package require ('@playwright/test')
test('First playwright test', async function(){

// JS is Asynchronous, we have to tell to the runner explicitely by wait before completion of step 1 don't execute step 2 --> to handle it we add keyword await before every step
// when we write await inside a function(), that means function() is asynchronous --> before function() we add keyword async, it works a combination of async function with await steps.
// if we miss writing the async function(), then await carries no meaning inside the function() steps

// test('First playwright test', async function(){  
// as this function don't have any name, these type of functions are called anonymous function
// instead of writing async function(), we can write as async ()=> (we can use fat pipe symbol => to make the code as lite weight)


}); //it must end with ; 

// below is the outer structure of the writing tests
test('second playwright test', async ()=>{

});