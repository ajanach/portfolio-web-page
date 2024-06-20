---
title: "K3s Production Cluster with Calico Full Documentation"
date: 
draft: false
---
# K3s Production Cluster with Calico Full Documentation

## Infrastructure Specifications

This section encompasses all the detailed specifications of Kubernetes virtual machines, load balancer virtual machines, and databases for services/applications. It provides a clear overview of the hardware configurations and networking details for each component in infrastructure setup.

### Kubernetes virtual machines specifications:

| VM | CPUs | Memory | NICs | Disks | Primary IP Address | Network #1 | Disk [GB] | Access | NFS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| prod-cp-01 | 2 | 4096 | 1 | 1 | 192.168.1.10 | Bridge | 30 | SSH key | Mounted |
| prod-cp-02 | 2 | 4096 | 1 | 1 | 192.168.1.11 | Bridge | 30 | SSH key | Mounted |
| prod-cp-03 | 2 | 4096 | 1 | 1 | 192.168.1.12 | Bridge | 30 | SSH key | Mounted |
| prod-wn-01 | 4 | 8192 | 1 | 1 | 192.168.1.13 | Bridge | 50 | SSH key | Mounted |
| prod-wn-02 | 4 | 8192 | 1 | 1 | 192.168.1.14 | Bridge | 50 | SSH key | Mounted |
| prod-wn-03 | 4 | 8192 | 1 | 1 | 192.168.1.15 | Bridge | 50 | SSH key | Mounted |

### Load balancer virtual machines specifications:

| Load Balancer | CPUs | Memory | NICs | Disks | Primary IP Address | Network #1 | Disk [GB] | Access | NFS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| prod-internal-lb | 2 | 4096 | 1 | 1 | 192.168.1.20 | Bridge | 100 | SSH key | / |
| prod-external-lb | 4 | 8192 | 1 | 1 | 192.168.1.21 | Bridge | 100 | SSH key | / |

### Databases specifications for services:

| VM | CPUs | Memory | NICs | Disks | Primary IP Address | Network #1 | Disk [GB] | Access | NFS | Replication |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| psql1 | 8 | 16384 | 1 | 2 | 192.168.1.30 | Bridge | 100 | Password-based authentication | / | Yes |
| psql2 | 8 | 16384 | 1 | 2 | 192.168.1.31 | Bridge | 100 | Password-based authentication | / | Yes |

### Service publishing:

| Services Publishing | External Traffic | External Port | TLS Termination | Internal Traffic | LB Pool |
| --- | --- | --- | --- | --- | --- |
| prod-external-lb | By Domain | 443 | On prod-external-lb | 192.168.1.21 | 192.168.1.10, 192.168.1.11, 192.168.1.12 , 192.168.1.13, 192.168.1.14, 192.168.1.15 |
| prod-external-lb | By Domain | 6443 | On prod-external-lb | 192.168.1.21 | 192.168.1.10, 192.168.1.11, 192.168.1.12 , 192.168.1.13, 192.168.1.14, 192.168.1.15 |
💡 Control plane nodes IP addresses don't need to be in LB pool.


## Control Plane Setup

This section outlines the setup details for the control plane nodes, highlighting the integrated etcd K3s database configuration in HA mode.

### Setting Up K3s Cluster on prod-cp-01

Execute the following bash command:

```bash
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--write-kubeconfig-mode 644 --flannel-backend=none --disable-network-policy --disable traefik --cluster-init" sh -s - server --node-taint CriticalAddonsOnly=true:NoExecute --tls-san 192.168.1.20
```
💡 When executing the command above, please check if the node taint is applied. If not, execute the following command:

```bash
kubectl taint nodes prod-cp-01 CriticalAddonsOnly=true:NoExecute
```

### Setting Up K3s Cluster on prod-cp-02 & prod-cp-03

For setting up the K3s cluster on the other nodes, execute the following bash command:

```bash
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--write-kubeconfig-mode 644 --flannel-backend=none --disable-network-policy --disable traefik --server https://1192.168.1.10:6443 --token <TOKEN>" sh -s - server --node-taint CriticalAddonsOnly=true:NoExecute --tls-san 10.231.6.62
```
💡 Retrieve the node token with:

```bash
sudo cat /var/lib/rancher/k3s/server/node-token
```

## Worker Nodes Setup

### Setting Up K3s Worker Nodes

For setting up K3s worker nodes, use the following command:

```bash
curl -sfL https://get.k3s.io | K3S_URL=https://192.168.1.10:6443 K3S_TOKEN=<TOKEN> sh -
```

## Installing Calico

Execute the following command to install the Calico operator and custom resource definitions:

```bash
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.27.3/manifests/tigera-operator.yaml
```
💡 Due to the large size of the CRD bundle, `kubectl apply` might exceed request limits. Therefore, it is recommended to use `kubectl create` or `kubectl replace`.

Create the necessary custom resource by executing the following command:

```bash
kubectl create -f https://raw.githubusercontent.com/projectcalico/calico/v3.27.3/manifests/custom-resources.yaml
```
💡 Before creating this manifest, read its contents and make sure its settings are correct for your environment. For example, you may need to change the default IP pool CIDR to match your pod network CIDR.

# Cluster

```
$ kubectl get nodes -o wide
 
NAME             STATUS   ROLES                       AGE   VERSION        INTERNAL-IP   EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION       CONTAINER-RUNTIME
prod-cp-01   Ready    control-plane,etcd,master   24h   v1.29.4+k3s1   192.168.1.10   <none>        Ubuntu 22.04.4 LTS   5.15.0-107-generic   containerd://1.7.15-k3s1
prod-cp-02   Ready    control-plane,etcd,master   24h   v1.29.4+k3s1   192.168.1.11   <none>        Ubuntu 22.04.4 LTS   5.15.0-107-generic   containerd://1.7.15-k3s1
prod-cp-03   Ready    control-plane,etcd,master   24h   v1.29.4+k3s1   192.168.1.12   <none>        Ubuntu 22.04.4 LTS   5.15.0-107-generic   containerd://1.7.15-k3s1
prod-wn-01   Ready    <none>                      24h   v1.29.4+k3s1   192.168.1.13   <none>        Ubuntu 22.04.4 LTS   5.15.0-107-generic   containerd://1.7.15-k3s1
prod-wn-02   Ready    <none>                      24h   v1.29.4+k3s1   192.168.1.14   <none>        Ubuntu 22.04.4 LTS   5.15.0-107-generic   containerd://1.7.15-k3s1
prod-wn-03   Ready    <none>                      24h   v1.29.4+k3s1   192.168.1.15   <none>        Ubuntu 22.04.4 LTS   5.15.0-107-generic   containerd://1.7.15-k3s1
```

## Installing Ingress Nginx Controller

The following YAML manifest can be copied and pasted from this URL into a file called `ingress-controller.yaml`:

```yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    app.kubernetes.io/component: controller
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
    app.kubernetes.io/version: 1.10.1
  name: ingress-nginx-controller
  namespace: ingress-nginx
spec:
  ipFamilies:
  - IPv4
  ipFamilyPolicy: SingleStack
  ports:
    - appProtocol: http
      name: http
      port: 80
      protocol: TCP
      targetPort: http
      nodePort: 32101
    - appProtocol: https
      name: https
      port: 443
      protocol: TCP
      targetPort: https
      nodePort: 32102
  selector:
    app.kubernetes.io/component: controller
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
  type: LoadBalancer
```

We can test Ingress Nginx by referencing the screenshot below (404 means Ingress Nginx is working):

```bash
curl 10.231.6.62
```

Expected output:

```bash
<html>
<head><title>404 Not Found</title></head>
<body>
<center><h1>404 Not Found</h1></center>
<hr><center>nginx</center>
</body>
</html>
```
