const Koa = require('koa');
const formidable = require('formidable');
const xlsx = require('xlsx');
const fs = require('fs-extra');

const app = new Koa();

app.on('error', (err) => {
	console.error('server error', err);
});

app.use(async (ctx, next) => {
	if (ctx.url === '/api/upload' && ctx.method.toLowerCase() === 'post') {
		const form = formidable({ multiples: true });

		await new Promise((resolve, reject) => {
			form.parse(ctx.req, (err, fields, files) => {
				if (err) {
					reject(err);
					return;
				}
				const file = files.xlsx.path

				ctx.set('Content-Type', 'application/json');
				ctx.status = 200;
				ctx.state = { fields, files };
				ctx.body = ctx.state
				//ctx.body = JSON.stringify( ctx.state.files.xlsx.path, null, 2);
				console.log(files.xlsx.path)

				resolve();
			});
		});
		await next();
		return;
	}

	// show a file upload form
	ctx.set('Content-Type', 'text/html');
	ctx.status = 200;
	ctx.body = `<form action="/api/upload" enctype="multipart/form-data" method="post">
    <div>Certificate: <input type="input" name="title" /></div>
    <div>File: <input type="file" name="xlsx" multiple="multiple" /></div>
    <input type="submit" value="Upload" />
    </form>`;
});

app.use((ctx) => {
	console.log('The next middleware is called');

	//console.log( Object(ctx.state.files.xlsx)  )
	// console.log('Results:', ctx.state);


});

app.listen(3000, () => {
	console.log('Server listening on http://localhost:3000');
});