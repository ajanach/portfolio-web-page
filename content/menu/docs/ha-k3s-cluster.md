# K3s - Kubernetes Cluster
---
title: "HA K3s Cluster with External Database"
draft: false
---

# Guide

Vmware workstation:

NAT: 192.168.1.0/24

GW: 192.168.1.1

# Cluster Datastore

1. Installation: [https://ubuntu.com/server/docs/install-and-configure-a-mysql-server](https://ubuntu.com/server/docs/install-and-configure-a-mysql-server)
    1. sudo vim /etc/mysql/mysql.conf.d/mysqld.cnf 
    2. change bind-address to 0.0.0.0
    3. sudo systemctl restart mysql.service
    4. sudo ufw enable
    5. sudo ufw allow 22/tcp
    6. sudo ufw allow 3306/tcp
2. Create db and new user:
    1. `mysql -u root -p`
    2. CREATE DATABASE k3s_db;
    3. CREATE USER 'k3s'@'%' IDENTIFIED BY 'wasd';
    4. GRANT ALL PRIVILEGES ON `*.*` TO 'k3s'@'%' WITH GRANT OPTION;
    5. FLUSH PRIVILEGES;
    6. `exit;`
        
        ![Untitled](K3s%20-%20Kubernetes%20Cluster%201b7fccc10748426e8ed96bfc61c236ae/Untitled.png)
        
3. Change character set and collate of DB:
    1. **ALTER** **DATABASE** **`k3s_db`**
    2. **DEFAULT** **CHARACTER** **SET** latin1
    3. **DEFAULT** **COLLATE** latin1_swedish_ci;

## Load Balancer

Create a load balancer using `nginx`

`nginx.conf`

```bash
#uncomment this next line if you are NOT running nginx in docker
load_module /usr/lib/nginx/modules/ngx_stream_module.so;

events {}

stream {
  upstream k3s_servers {
    server 192.168.60.20:6443;
    server 192.168.60.21:6443;
  }

  server {
    listen 6443;
    proxy_pass k3s_servers;
  }
}
```

Turn on UFW, enable 6443 and 22

# On master:

```bash
export K3S_DATASTORE_ENDPOINT='mysql://k3s:wasd@tcp(192.168.1.40:3306)/k3s_db'
```

```bash
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--write-kubeconfig-mode 644" sh -s - server --node-taint CriticalAddonsOnly=true:NoExecute --tls-san 192.168.1.30
```

```bash
sudo cat /var/lib/rancher/k3s/server/node-token
```

For masterb and masterc:

```bash
export K3S_DATASTORE_ENDPOINT='mysql://k3s:wasd@tcp(192.168.1.40:3306)/k3s_db'
```

```bash
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--write-kubeconfig-mode 644" sh -s - server --token=SECRET --node-taint CriticalAddonsOnly=true:NoExecute --tls-san 192.168.1.30
```

# On worker:

```bash
curl -sfL https://get.k3s.io | K3S_URL=https://load_balancer_ip_or_hostname:6443 K3S_TOKEN=mynodetoken sh -
```