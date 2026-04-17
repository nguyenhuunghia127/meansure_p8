const { spawn } = require('node:child_process');
const path = require('node:path');

const port = process.env.PORT || '3000';
const url = `http://localhost:${port}`;
const nestCliPath = path.join(
  process.cwd(),
  'node_modules',
  '@nestjs',
  'cli',
  'bin',
  'nest.js',
);

let browserOpened = false;

const child = spawn(process.execPath, [nestCliPath, 'start', '--watch'], {
  cwd: process.cwd(),
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: false,
});

function maybeOpenBrowser(chunk) {
  const output = chunk.toString();
  process.stdout.write(output);

  if (
    !browserOpened &&
    (output.includes('Nest application successfully started') ||
      output.includes(`Application is running on: ${url}`))
  ) {
    browserOpened = true;
    openBrowser(url);
  }
}

function relayError(chunk) {
  process.stderr.write(chunk.toString());
}

function openBrowser(targetUrl) {
  if (process.platform === 'win32') {
    spawn('cmd', ['/c', 'start', '', targetUrl], {
      detached: true,
      stdio: 'ignore',
    }).unref();
    return;
  }

  if (process.platform === 'darwin') {
    spawn('open', [targetUrl], {
      detached: true,
      stdio: 'ignore',
    }).unref();
    return;
  }

  spawn('xdg-open', [targetUrl], {
    detached: true,
    stdio: 'ignore',
  }).unref();
}

child.stdout.on('data', maybeOpenBrowser);
child.stderr.on('data', relayError);

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

process.on('SIGINT', () => child.kill('SIGINT'));
process.on('SIGTERM', () => child.kill('SIGTERM'));
