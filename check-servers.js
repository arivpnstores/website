const net = require('net');
const fs = require('fs');
const path = require('path');

const SERVERS = [
  { name: 'SG VIP', host: 'ssl-sgvip.rajaserver.web.id' },
  { name: 'SG VVIP', host: 'ssl-sgvvip.rajaserver.web.id' },
  { name: 'SG VVIP 2', host: 'ssl-sgvvip2.rajaserver.web.id' },
  { name: 'SG VVIP 3', host: 'ssl-sgvvip3.rajaserver.web.id' },
  { name: 'ID Biznet VIP', host: 'ssl-idbiznetvip.rajaserver.web.id' },
  { name: 'ID Biznet VIP 2', host: 'ssl-idbiznetvip2.rajaserver.web.id' },
  { name: 'ID Biznet VIP 3', host: 'ssl-idbiznetvip3.rajaserver.web.id' },
  { name: 'EDU-1 DIRECT', host: 'eduserv1.aiosc.my.id' },
  { name: 'EDU-2 DIRECT', host: 'eduserv2.aiosc.my.id' },
  { name: 'EDU-3 DIRECT', host: 'eduserv3.aiosc.my.id' },
  { name: 'CLOUDFRONT REGULER', host: 'd1lnzdlpso56a0.cloudfront.net' },
  { name: 'VIP CLOUDFRONT PREMIUM', host: 'd1jrahl0hl8ghp.cloudfront.net' },
  { name: 'BOT ALIBABA', host: 'bot.rajaserver.web.id' },
];

const PORTS = [80, 443];
const TIMEOUT = 5000;

function tcpCheck(host, port) {
  return new Promise((resolve) => {
    const start = Date.now();
    const socket = new net.Socket();
    socket.setTimeout(TIMEOUT);

    socket.on('connect', () => {
      const latency = Date.now() - start;
      socket.destroy();
      resolve({ status: 'open', latency });
    });

    socket.on('timeout', () => {
      const latency = Date.now() - start;
      socket.destroy();
      resolve({ status: 'timeout', latency });
    });

    socket.on('error', (err) => {
      const latency = Date.now() - start;
      socket.destroy();
      if (err.code === 'ECONNREFUSED') {
        resolve({ status: 'closed', latency });
      } else {
        resolve({ status: 'closed', latency, detail: err.code });
      }
    });

    socket.connect(port, host);
  });
}

async function checkServer(server) {
  const results = await Promise.all(
    PORTS.map((port) => tcpCheck(server.host, port))
  );

  const ping = results[1]?.status === 'open' ? results[1].latency
    : results[0]?.status === 'open' ? results[0].latency
    : null;

  const openPorts = results.filter((r) => r.status === 'open').length;
  const totalPorts = PORTS.length;
  const overall = openPorts === totalPorts ? 'online' : openPorts === 0 ? 'offline' : 'degraded';

  return {
    name: server.name,
    host: server.host,
    ping,
    port80: results[0],
    port443: results[1],
    overall,
  };
}

async function main() {
  const results = await Promise.all(SERVERS.map(checkServer));

  const total = results.length;
  const online = results.filter((r) => r.overall === 'online').length;
  const offlineCount = results.filter((r) => r.overall === 'offline').length;
  const pings = results.map((r) => r.ping).filter((p) => p !== null);
  const avgPing = pings.length > 0
    ? Math.round(pings.reduce((a, b) => a + b, 0) / pings.length)
    : null;

  const output = {
    timestamp: new Date().toISOString(),
    summary: { total, online, offline: offlineCount, avgLatency: avgPing },
    servers: results,
  };

  const outDir = path.join(__dirname, 'status');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'status.json'), JSON.stringify(output, null, 2));
  console.log(JSON.stringify(output, null, 2));
}

main().catch(console.error);
