# styled-xl

JS library to create XSLX files with styles and conditional formatting.

A 18KB JS library which helps to create a native xlsx document which will open without any warning or issue in office apps.

It has mainly four functions

- createFromObjectArray - to convert object arrays directly to XLSX
- createFromArray - to convert 2D arrays directly to XLSX

# Codepen sample

[Sample 1 - createFromObjectArray](https://codepen.io/anish-antony/pen/zYpwpRv)
[Sample 2 - createFromArray](https://codepen.io/anish-antony/pen/zYpwpRv)

# Installation and Setup Instructions

`npm install styled-xl jszip --save`

# Creating XLSX file from object array

We will see how we can create a XLSX file as below from an object array of shape [{"key1":"value1","key2":"value2"}]

Final output of [Codepen sample](https://codepen.io/anish-antony/pen/zYpwpRv) will look as below

![alt text](https://i.ibb.co/ccTBHnt/styled-xls-sample1.jpg?raw=true)

## creating a simple XLSX file from object array

To create a simple xlsx from object array , just pass sheet name and data to createFromObjectArray. A promise will be returned which can be resolved to get the blob.

Default styles will be applied to the sheet and keys will come as header. It can be modified , which is shown later in the document.

```
import { createFromObjectArray } from "styled-xl";
import { saveAs } from "file-saver";

var objData = [
        { firstName: "Tom", lastName: "Antony", mat: 30, phy: 90, che: 76 },
        { firstName: "Harry", lastName: "Varghese", mat: 75, phy: 70, che: 89 },
        {firstName: "Sumesh",lastName: "Narayanan",mat: 62,phy: 79,che: 70,},
        {firstName: "Ramesh",lastName: "Venkataraman",mat: 82,phy: 34,che: 95,},
      ];

var sheetName = "sampleSheet";

//createFromObjectArray takes 8 parameters
var filePromise = createFromObjectArray(
        sheetName,//Sheet name
        objData, // array of objects to be converted to xlsx
      );
filePromise.then((blob) => {
    saveAs(blob, "sample-file.xlsx");
  });

```

## Adding header and content styles

Styles can be created using an object of below shape

```
{
  format, // string with format eg "0.00"
  fontName, // fontName eg "Calibri"
  fontWeight, // "bold" if bold has to be applied
  fontSize, // size number
  fontColor,// rgb value of the color
  fontStyle,// "italic" if italic style has to be applied
  horizontalAlignment,
  verticalAlignment, // values  - "top","bottom","middle"
  horizontalAlignment, // values  - "left","center","right"
  wrapText, // bool value  -  true if wrap has to be applied,
  backgroundColor,// rgb value of color
  patternStyle,// fill pattern string eg : "solid"
  borderStyle,// borderStyle string eg : "thick"
  borderColor,// rgb value of color
  height,
}
```

Create content and header styles using the above format and pass it as 3 and 4 th parameter

```//create a constant headerStyle with required styles for header
      const headerStyle = {
        horizontalAlignment: "center",
        backgroundColor: "#1167b1",
        fontColor: "#FFFFFF",
        fontName: "Arial",
      };

      //create a constant contentStyle with default styles for the all the rows
      const contentStyle = {
        backgroundColor: "#aabecc",
        fontColor: "#000000",
      };

      //pass contentStyle and headerStyle as the third and fourth parameter
      var filePromise = createFromObjectArray(
        sheetName,
        objData,
        contentStyle,
        headerStyle
      );

```

## Changing column properties like style, width,header value and creating columns based on formula

Create an object array with object of shape {key, displayName, width, style,conditionalFormatRules,applyConditionalFormatToCols}.
Pass it as the fifth parameter of createFromObjectArray function

```
      var subjectsStyle = {
        backgroundColor: "#a4aed2",
        fontColor: "#000000",
      };

      var columnConfig = [
        { key: "firstName", displayName: "First Name", width: 15},
        { key: "lastName", displayName: "Last Name", width: 15 },
        { key: "mat", displayName: "Maths", type: "number", width: 10 ,style:subjectsStyle},
        { key: "phy", displayName: "Physics", type: "number", width: 10,style:subjectsStyle },
        { key: "che", displayName: "Chemistry", type: "number", width: 10,style:subjectsStyle },
        {
          key: "total",
          displayName: "Total",
          width: 20,
          type: "formula",
          formula: "[mat]+[phy]+[che]",//formula to be applied to calculate the value in column.
                                       //[mat] represents column with key:"mat"
        }];
      //pass columnConfig fifth parameter
      var filePromise = createFromObjectArray(
        sheetName,
        objData,
        contentStyle,
        headerStyle,
        columnConfig
      );


```

## Adding footer

Footer can be added by passing an array of cell values [val1,val2] or by passing an object of shape {elements,style}.
Pass the footer as sixth parameter of createFromObjectArray

```
      var footerRowStyle={ backgroundColor: "#B09D76", fontColor: "#FFFFFF",format:"0.00" };
      var averageCellStyle = {horizontalAlignment:"center", backgroundColor: "#8E8166", fontColor: "#FFFFFF" };


      var footer ={
        style:footerRowStyle,
        elements:[{type:"string",element:"Average",style:averageCellStyle},
        "",//passing empty cell
        { type: "formula", element: `AVERAGE(C1:C${objData.length})` },
        { type: "formula", element: `AVERAGE(D1:D${objData.length})`},
        { type: "formula", element: `AVERAGE(E1:E${objData.length})` },
        { type: "formula", element: `AVERAGE(F1:F${objData.length})` },
      ]};
      //pass footer as sixth parameter
      var filePromise = createFromObjectArray(
        sheetName,
        objData,
        contentStyle,
        headerStyle,
        columnConfig,
        footer
      );

```

## Adding autofilter

Auto filter can be enabled by passing boolean true value as seventh parameter

```
      var autoFilter = true;

      //pass autoFilter as seventh parameter
      var filePromise = createFromObjectArray(
        sheetName,
        objData,
        contentStyle,
        headerStyle,
        columnConfig,
        footer,
        autoFilter
      );

```

## Adding conditional format

### Rule

Conditional rules can be created using the object of shape { type, style, value,secondValue }

```
//sample rules
var sampleRule = { type: "expression", style: greenStyle, value: "[total]>230" }
var sampleRule2 = { type: "lessThan",style: redStyle,  value: 35 };
var sampleRule3 = { type: "between",style: orangeStyle,  value: 35, secondValue:70 };
//[columnKey] can be used in formulas
```

Following values can be passed as type to the rule
"expression","equal","between","lessThan","greaterThan","notContainsText","containsText","beginsWith","endsWith","aboveAverage"

secondValue can be used when we are using the type "between"

### Adding conditional formating to columns using column config parameter

Conditional formatting to be applied on columns by adding column config object with key "conditionalFormatRules" and value as an array of rules
Columns to which the range of rule will be applied depends on config object key "applyConditionalFormatToCols",it takes an array of columns keys eg: ["key1","key2"] , default value will be the current column.
If we need the formating to be applied on entire row "applyConditionalFormatToCols" can be set as ["all"]

```
      var greenStyle = { backgroundColor: "#238823", fontColor: "#ffffff" };

//    Creating rule which will apply green fill when total is greater than 230
      var totalGt230 = [
        { type: "expression", style: greenStyle, value: "[total]>230" },
      ];

      var columnConfigConditionalFormat = [
        { key: "firstName", displayName: "First Name", width: 15},
        { key: "lastName", displayName: "Last Name", width: 15 },
        { key: "mat", displayName: "Maths", type: "number", width: 10 ,style:subjectsStyle},
        { key: "phy", displayName: "Physics", type: "number", width: 10,style:subjectsStyle },
        { key: "che", displayName: "Chemistry", type: "number", width: 10,style:subjectsStyle },
        {
          key: "total",
          displayName: "Total",
          width: 20,
          type: "formula",
          formula: "[mat]+[phy]+[che]",
          conditionalFormatRules: totalGt230,
          applyConditionalFormatToCols: ["all"],//"all" will add all columns to the formatting range,
                                                //we can specify columns like ["firstName","mat"],
                                                //if it is not defined range will be the column in which rule is given
        }];
        var filePromise = createFromObjectArray(
        sheetName,
        objData,
        contentStyle,
        headerStyle,
        columnConfigConditionalFormat);


```

### Adding conditional formating to sheets

Sheet conditional rules can be created using an object of shape {rules,range}

rules shoule dbe an array of rules
range is string of format "CellAddress1:CellAddress2"

```

      var redStyle = { backgroundColor: "#D2222D", fontColor: "#FFFFFF" };

      var scoreLessThan35 = [{ style: redStyle, type: "lessThan", value: 35 }];

      var scoreRange = "C2:E5";

      var sheetConditionalFormatRules = [{ rules: scoreLessThan35, range: scoreRange }];

      // sheet conditional rules should be passed as 8th parameter
      var filePromise = createFromObjectArray(
        sheetName,
        objData,
        contentStyle,
        headerStyle,
        columnConfigConditionalFormat,
        footer,
        autoFilter,
        sheetConditionalFormatRules
      );
```

## Merging cells

Merging cells can be done by passing an array of cell address ranges as 9th parameter

```
      var mergedCells = ["A6:B6"];
      //Pass merged cells as 9th parameter
      var filePromise = createFromObjectArray(
        sheetName,
        objData,
        contentStyle,
        headerStyle,
        columnConfigConditionalFormat,
        footer,
        autoFilter,
        sheetConditionalFormatRules,
        mergedCells
      );
```

# Creating XLSX file from two dimensional array

XLSX file can be created from a two dimensional array using createFromArray.

![alt text](https://github.com/anish6777/styled-xl/blob/images/images/createBook.JPG?raw=true)

## create a simple XLSX file download

XLSX file can be created by passing sheetname and 2 D array to createFromArray

```
import { createFromArray } from "styled-xl";
import { saveAs } from "file-saver";

//create a 2D array with required data
var data = [
  ["Yellow","Blue","Green"],
  ["This","is","red"],
  ["Default","Color","here"]
]

var sheetName = "colorbook";

var filePromise = createFromArray(sheetName,data);
filePromise.then((blob) => {
    saveAs(blob, "sample-file.xlsx");
  });

```

## Adding default style to contents

Style object can be created and passed as 3rd argument to add default styles.
\*create style object in the shape of style object explained in createFromObjectArray.

```

// Add a  default style for table

      var contentStyle = {
        backgroundColor: "#aabecc",
        fontColor: "#000000",
      };

      var filePromise = createFromArray(sheetName,data,contentStyle);
```

## Adding style to a row

Styles can be passed to row by passing and object of shape {style,elements} instead of passing array provide row values .

\*create style object in the shape of style object explained in createFromObjectArray.

```
    //Create a style to be passed to row
     const redStyle= {backgroundColor: "#ff0000"}

     //Use the created row in data

      const redRow = {elements:["This", "is", "red"],style:redStyle}

      var rowStyleddata = [
        ["Yellow", "Blue", "Green"],
        {elements:["This", "is", "red"],style:redStyle},
        ["Default", "Color", "here"],
      ];
      var filePromise = createFromArray(sheetName,rowStyleddata);

 //Rest of the code same as in step 2
```

## Adding style to a cell

cells can be styled by passing {type,element,style} instead of directly passing value

```
 //Rest of the code same as in step 3

//Create style for different colors
const blueStyle= {backgroundColor: "#0000FF",fontColor:"#FFFFFF"}
const yellowStyle= {backgroundColor: "#FFFF00"}
const greenStyle= {backgroundColor: "#00FF00"}

//Create cells with style as below
const yellowCell = {element:"Yellow",style:yellowStyle}
const blueCell = {element:"Blue",style:blueStyle,columnSpan:3}
const greenCell = {element:"Green",style:greenStyle}

const data = [
  [yellowCell,blueCell,greenCell],
  redRow,
  ["Default","Color","here"]
]

var filePromise = createFromArray(sheetName,data)

```

## Adding column config to configure columns

Create an object array in the format [{columnIndex:"number",style:"object",width:"number",conditionalFormatRules:"ObjectArray"}] to configure for each column in the sheet

\*create style object in the shape of rule object explained in createFromObjectArray.

```

      var redStyle = { backgroundColor: "#D2222D", fontColor: "#FFFFFF" };

      var conditionalFormattingRules = [
        { type: "containsText", style: greenStyle, text: "Green" },
        { type: "containsText", style: redStyle, text: "red" },
      ];

      var columnConfig2D = [
        { columnIndex: 1, width: 10 },
        {columnIndex: 2,width: 20,style: blueStyle},
        { columnIndex: 3, width: 10, conditionalFormatRules: conditionalFormattingRules },
      ];

      var filePromise = createFromArray(sheetName,data,contentStyle,columnConfig2D);


```

## Adding auto filter

Auto Filter can be created by passing boolean true as fifth parameter

```
      var autoFilter = true;

      var filePromise = createFromArray(sheetName,data,contentStyle,columnConfig2D,autoFilter);

```

## Adding conditional formatting to sheets

Array of conditional formats of shape { rules, range } can be passed as parameter to add conditional formatting anywhere in sheet

\*create style object in the shape of rule object explained in createFromObjectArray.

```
      var creamStyle = { backgroundColor: "#F1E3B5", fontColor: "#FFFFFF" };

      var checkForIs = [{ style: creamStyle, type: "containsText", text: "is" }];

      var contentRange = "A1:C3";

      var sheetConditionalFormatRules = [{ rules: checkForIs, range: contentRange }];

      var filePromise = createFromArray(sheetName,data,contentStyle,columnConfig2D,autoFilter,sheetConditionalFormatRules);

```
