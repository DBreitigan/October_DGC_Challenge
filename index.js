//Type node index.js to run
//Use nodemon index.js to auto-reload when changes are made
// if nodemon isnt installed: npm install -g nodemon
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//use bodyParser() to let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.put('/', function (req, res) {
  var newString = stringChecker(req.body.expr);
  var Evaluation = booleanLogic(newString);
  res.send(({"formaula" : req.body.expr,
              "evaluation": Evaluation}));
});

function stringChecker(input) {
  spaceCount = (input.split(" ").length - 1);
  console.log(spaceCount.toString());
  console.log(Number(1).toString(2));
  var stringArray = input.split(" ");
  var newString = ""
  for(i = 0; i < stringArray.length; i++) {
    if(stringArray[i] == "AND")
    {
      stringArray[i] = "&&"
    }
    if(stringArray[i] == "OR")
    {
      stringArray[i] = "||"
    }
    var newString = newString + stringArray[i] + " "
  }
  return newString;
}

function booleanLogic(input) {
  var spaceCount = (input.split(" ").length - 1);
  var evaluation = []
  if(spaceCount == 3)
  {
    var stringArray = input.split(" ");
    console.log(stringArray);
    if(stringArray[1] == ("&&")){
    
      for(i = 0; i <= 3; i++)
      {
        truthTable = [false, false]
        var result = false; 
        var boolValue = Number(i).toString(2);
        var stringArray = boolValue.split("");
        stringArray.reverse();
        for(j = 0; j < stringArray.length; j++)
        {
          if(stringArray[j] == "1")
          {
            truthTable[j] = true;
          }
        }

        if(truthTable[0] && truthTable[1])
        {
          result = true;
        }

        evaluation.push({
          "values": truthTable.toString(),
          "result": result
        })
        console.log(truthTable.toString());
      }
      console.log(evaluation);
    }
    else {
      for(i = 0; i <= 3; i++)
      {
        truthTable = [false, false]
        var result = false; 
        var boolValue = Number(i).toString(2);
        var stringArray = boolValue.split("");
        stringArray.reverse();
        for(j = 0; j < stringArray.length; j++)
        {
          if(stringArray[j] == "1")
          {
            truthTable[j] = true;
          }
        }

        if(truthTable[0] || truthTable[1])
        {
          result = true;
        }

        evaluation.push({
          "values": truthTable.toString(),
          "result": result
        })
        console.log(truthTable.toString());
      }
      console.log(evaluation);

    }
  } else {
    var stringArray = input.split(" ");
    if(stringArray[1] == ("&&"))
    {

      for(i = 0; i <= 7; i++)
      {
        truthTable = [false, false, false]
        var result = false; 
        var boolValue = Number(i).toString(2);
        var stringArray = boolValue.split("");
        stringArray.reverse();
        for(j = 0; j < stringArray.length; j++)
        {
          if(stringArray[j] == "1")
          {
            truthTable[j] = true;
          }
        }

        if(truthTable[0] && (truthTable[1] || truthTable[2]))
        {
          result = true;
        }

        evaluation.push({
          "values": truthTable.toString(),
          "result": result
        })
        console.log(truthTable.toString());
      }
      console.log(evaluation);
    } else {
      for(i = 0; i <= 7; i++)
      {
        truthTable = [false, false, false]
        var result = false; 
        var boolValue = Number(i).toString(2);
        var stringArray = boolValue.split("");
        stringArray.reverse();
        for(j = 0; j < stringArray.length; j++)
        {
          if(stringArray[j] == "1")
          {
            truthTable[j] = true;
          }
        }

        if(truthTable[0] || (truthTable[1] && truthTable[2]))
        {
          result = true;
        }

        evaluation.push({
          "values": truthTable.toString(),
          "result": result
        })
        console.log(truthTable.toString());
      }
      console.log(evaluation);
    }



  }
  return evaluation;
}

app.listen(3000, function () {
  console.log("Listening to port 3000!");
});


(function(){

    var ConvertBase = function (num) {
        return {
            from : function (baseFrom) {
                return {
                    to : function (baseTo) {
                        return parseInt(num, baseFrom).toString(baseTo);
                    }
                };
            }
        };
    };
        
    // binary to decimal
    ConvertBase.bin2dec = function (num) {
        return ConvertBase(num).from(2).to(10);
    };
    
    // binary to hexadecimal
    ConvertBase.bin2hex = function (num) {
        return ConvertBase(num).from(2).to(16);
    };
    
    // decimal to binary
    ConvertBase.dec2bin = function (num) {
        return ConvertBase(num).from(10).to(2);
    };
    
    // decimal to hexadecimal
    ConvertBase.dec2hex = function (num) {
        return ConvertBase(num).from(10).to(16);
    };
    
    // hexadecimal to binary
    ConvertBase.hex2bin = function (num) {
        return ConvertBase(num).from(16).to(2);
    };
    
    // hexadecimal to decimal
    ConvertBase.hex2dec = function (num) {
        return ConvertBase(num).from(16).to(10);
    };
    
    this.ConvertBase = ConvertBase;
    
})(this);