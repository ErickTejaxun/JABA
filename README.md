
# Compiler of Jaba

This project consist in the develop of IDE to developers and one compiler of a lenguaje 95% same of java. 
The object project is a IR in three address form. This is a one stack [machine](https://en.wikipedia.org/wiki/Stack_machine).

'''
...
h = h + 1;
t3 = p + 2; // simulación de cambio de ambito
t4 = t3 + 1; // Direccion paso parametro cadena 1
stack[t4] = t0 ;// Pasando cadena 1
t5 = t3 + 2; // Direccion paso parametro cadena 2
stack[t5] = t1 ;// Pasando cadena 1
p = p + 2; // Cambio real de ambito
...
'''

This IR using two structure to execute.
1. Stack: This structure is using to save the values of all values that need a method and function. 
2. Heap: Auxiliar structure that is using how pool of memory. Save the text information and all information of all variable becouse in the heap only can save numerics values and the pointers of objects and matrix. 


## IDE
Integrate devoloper enviarement, that is a program developed in java that allow to the users to develop and run programs writed in the java lenguage. 

Characteristics:
  - Open files and projects
  - Navegate througth files using a three of directory. 
  - Multiple edition thanks to multitab with text code highlight. 
  - Create new projects.
  - Output console.  
  - Reports of symbol table (Report until the last breakpoint setting)  
  - Search and replace of text.
  - Set of breakpoints to debug mode. 
  - Set to the speed of executing.   


## Characteristics of lenguage of programation Java
To see the specific of desing of lenguage see the carpet enunciado. 

  - Analysis and execution complete of lenguage of programations java. 
  - Support of class and all characteristics of POO.  
  - Lexical, syntactic and semantics analisys complete. 
  - Report of errors. 
  - Report of symbol table by graphics using graphviz. 
  - Report of AST generated. 
  - AST generated using the pattern of desing interpeter. 
  - Using singlenton pattern. 
  - Develped using Jison using javascript. 

# Autor
  Erick Tejaxún
  erickteja@gmail.com

# Licencia 
  MIT 


## Licencia
[MIT](https://choosealicense.com/licenses/mit/)
