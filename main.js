console.log('Starting...')
let { spawn } = require('child_process')
let path = require('path')


require("http").createServer((_, res) => res.end("Uptime!")).listen(8080)
function start() {
	let args = [path.join(__dirname, 'connect/index.js'), ...process.argv.slice(2)]
	console.log([process.argv[0], ...args].join('\n'))
	let p = spawn(process.argv[0], args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] })
	.on('message', data => {
		if (data == 'reset') {
			console.log('Restarting Bot...')
			p.kill()
			start()
			delete p
		}
	})
	.on('exit', code => {
		console.error('Exited with code:', code)
		if (code == 1) start()
	})
}
start()
