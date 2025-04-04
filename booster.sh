#!/bin/bash
echo "Optimizing CPU, RAM, and Performance..."

# Mengurangi penggunaan swap agar lebih fokus ke RAM
sysctl -w vm.swappiness=10
sysctl -w vm.vfs_cache_pressure=50

# Optimasi cache dan file system
sysctl -w vm.dirty_ratio=20
sysctl -w vm.dirty_background_ratio=10

# Menghapus cache sistem
echo "Cleaning Memory Cache..."
sync; echo 3 > /proc/sys/vm/drop_caches

# Optimasi CPU scheduler agar prioritas lebih stabil
sysctl -w kernel.sched_latency_ns=10000000
sysctl -w kernel.sched_min_granularity_ns=5000000
sysctl -w kernel.sched_wakeup_granularity_ns=7500000

# Mengaktifkan mode performa untuk CPU jika tersedia
if command -v cpufreq-set >/dev/null 2>&1; then
    cpufreq-set -r -g performance
fi

# Optimasi disk I/O
echo "Optimizing Disk I/O..."
sysctl -w vm.dirty_expire_centisecs=200
sysctl -w vm.dirty_writeback_centisecs=100

# Menonaktifkan TCP slow start untuk koneksi lebih cepat
sysctl -w net.ipv4.tcp_slow_start_after_idle=0

# Menyesuaikan konfigurasi network TCP untuk performa lebih baik
sysctl -w net.core.somaxconn=1024
sysctl -w net.ipv4.tcp_max_syn_backlog=4096
sysctl -w net.ipv4.tcp_fin_timeout=15
sysctl -w net.ipv4.tcp_tw_reuse=1
sysctl -w net.ipv4.tcp_keepalive_time=600
sysctl -w net.ipv4.tcp_keepalive_intvl=60
sysctl -w net.ipv4.tcp_keepalive_probes=10

echo "System Optimization Completed!"
