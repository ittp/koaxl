const xlsx = require('xlsx')
const fs = require('fs-extra')

const read = (file) => {

	console.log('file: ', file)

	const wb = xlsx.readFile(file)

	const wbs = wb.SheetNames

	console.log(wbs)
	return wbsJSON(wb)
}

const JSheet = (wb, n) => {
	let sheet = xlsx.utils.sheet_to_json(wb.Sheets[ wb.SheetNames[n] ], { header: "A", raw: false })
	return sheet
}

const wbsJSON = (workbook) => {
	let result = {};
	
	workbook.SheetNames.map( (sheetName) => {

		let sheets = JSheet(workbook, sheetName)
		if (sheets.length) result[sheetName] = sheets[sheetName];
			//fs.writeJSON('./json/' + sheetName + '.json', sheets[sheetName])
		//let roa = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: "A", raw: false });
		
	});

	return result

	// return JSON.stringify(result, 2, 2);
}




// const wbsJSON = (workbook) => {
// 	let result = {};

// 	workbook.SheetNames.forEach(function(sheetName) {
// 		let roa = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { header: "A", raw: false });
// 		if (roa.length) result[sheetName] = roa;
// 	});
// 	return result
// 	// return JSON.stringify(result, 2, 2);
// }






/* find worksheet range */
// var range = xlsx.utils.decode_range(ws['!ref']);
// var out = []
// /* walk the columns */
// for(var C = range.s.c; C <= range.e.c; ++C) {
//   /* create the typed array */
//   var ta = new Float32Array(range.e.r - range.s.r + 1);
//   /* walk the rows */
//   for(var R = range.s.r; R <= range.e.r; ++R) {
//     /* find the cell, skip it if the cell isn't numeric or boolean */
//     var cell = ws[XLSX.utils.encode_cell({r:R, c:C})];
//     if(!cell || cell.t != 'n' && cell.t != 'b') continue;
//     /* assign to the typed array */
//     ta[R - range.s.r] = cell.v;
//   }
//   out.push(ta);
// }

