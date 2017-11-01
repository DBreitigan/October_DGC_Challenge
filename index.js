/************************************************
 ****** Boolean Gate Truth Table Generator ******
 ************************************************/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.put('/', function (req, res) {

  var stringChecker = StringChecker(req.body.expr);
  var Evaluation = stringEvaluator(stringChecker.finalString, stringChecker.conditionCounter);
  res.send(({"formula" : stringChecker.finalString,
              "evaluation": Evaluation}));
});

function StringChecker(input) {
  spaceCount = (input.split(" ").length - 1);
  var stringArray = input.split(" ");
  var finalString = "";
  var conditionCounter = 0;
  for(i = 0; i < stringArray.length; i++) {
    if(stringArray[i] == "AND")
    {
      stringArray[i] = "&";
      conditionCounter++;
    }
    if(stringArray[i] == "OR")
    {
      stringArray[i] = "|";
      conditionCounter++;
    }
    var finalString = finalString + stringArray[i] + " ";
  }
  return { "finalString": finalString, "conditionCounter": conditionCounter }
}

function stringEvaluator(finalString, conditionCounter)
{
  var numOfBooleans = conditionCounter + 1;
  var numOfUniqueCombinations = Math.pow(2, numOfBooleans);
  
  var finalStringArray = EvaluatableString(finalString.split(""), "stringArray");

  finalString = finalStringArray.join("") 

  var evaluation = []
  for(i = 0; i < numOfUniqueCombinations; i++)
  {
    var booleanArray = createBooleanArray(numOfBooleans);
    var result = false; 
    var boolValue = Number(i).toString(2);
    var stringArray = boolValue.split("");
    stringArray.reverse();
    for(j = 0; j < stringArray.length; j++)
    {
      if(stringArray[j] == "1")
      {
        booleanArray[j] = true;
      }
    }

    if(eval(finalString))
    {
      result = true;
    }

    evaluation.push({
      "values": booleanArray.toString(),
      "result": result
    })

  }
  return evaluation;
}

function EvaluatableString(stringArray, arrayName) {
  var arrayCounter = 0;
  
  for(i = 0; i < stringArray.length; i++){
    if(!(stringArray[i] == "&" ||
        stringArray[i] == "|" ||
        stringArray[i] == "(" ||
        stringArray[i] == ")" ||
        stringArray[i] == " "))
    {
      stringArray[i] = " " + arrayName + "[" + arrayCounter + "] ";
      arrayCounter++;
    }
  }

  return stringArray;
}

function createBooleanArray(arraySize) {
  var array = []
  for(k = 0; k < arraySize; k++)
  {
    array.push(false);
  }
  return array;
}

app.listen(3000, function () {
  console.log("Listening to port 3000!");
});
