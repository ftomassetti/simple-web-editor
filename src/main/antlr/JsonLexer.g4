lexer grammar JsonLexer;

channels { WHITESPACE }

WS : [ \t\n\r]+ -> channel(WHITESPACE) ;
LBRACKET : '{' ;
RBRACKET : '}' ;
COMMA    : ',' ;
COLON    : ':' ;
LSQUARE : '[' ;
RSQUARE : ']' ;
TRUE    : 'true' ;
FALSE    : 'false' ;
NULL    : 'null' ;
STRING
   : '"' (ESC | ~ ["\\])* '"'
   ;
fragment ESC
   : '\\' (["\\/bfnrt] | UNICODE)
   ;
fragment UNICODE
   : 'u' HEX HEX HEX HEX
   ;
fragment HEX
   : [0-9a-fA-F]
   ;
NUMBER
   : '-'? INT '.' [0-9] + EXP? | '-'? INT EXP | '-'? INT
   ;
fragment INT
   : '0' | [1-9] [0-9]*
   ;
// no leading zeros
fragment EXP
   : [Ee] [+\-]? INT
   ;

