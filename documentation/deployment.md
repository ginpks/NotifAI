# QUICK INFO

Access VM (up until late June 2025): http://20.169.212.247:9500 for frontend, http://20.169.212.247:3000 for backend

Currently, frontend server, backend server, and postgres database are on same machine, I believe all three can be on 3 separate machines, 
but haven't tested this (3 virtual machines too expensive, haha). **So, the guide below assumes deployment of all 3 on same machine.**

# HOW TO DEPLOY (NO CLOUD)

Configure .env file so that frontend, backend have the right ip addresses and port numbers. This will need you to find the ip address of your machine. For Macbook, go to Settings,
Wi-Fi, for the network you are connected to, click details, find your ip address. **This is not your computer's actual ip address**, just a temporary one provided by the network you are connected 
to, so it's ok to share this info. For Windows users, I am unsure, hopefully something similar. 

<img width="612" alt="Screenshot 2025-04-30 at 2 34 13 PM" src="https://github.com/user-attachments/assets/7b46ba9d-3ef7-46f8-9eda-064c0a1fbba9" />

<img width="612" alt="Screenshot 2025-04-30 at 2 34 52 PM" src="https://github.com/user-attachments/assets/ba59e15b-a88a-4687-8967-cd3cba81458d" />

Set the environment variable for FRONTEND_HOST and BACKEND_HOST to that ip address. 

<img width="1107" alt="Screenshot 2025-04-30 at 2 36 45 PM" src="https://github.com/user-attachments/assets/9a9119b1-e9e1-4ddc-80b7-194f6824b3a3" />

After this, when starting frontend and backend, any device on same local area network can use app. To expand outside of local area network to the internet, this is where I am unsure. Need
to configure router that provides the internet connection, also something about port forwarding (like forward to port 9500 on your machine to use frontend server at that port). To go internet level,
easier to deploy on cloud.

**EDIT:** After deploying on a Beaglebone microcontroller as bare metal server, more info is available. If deploying on your bare metal machine, if it has a network card, meaning it can access the internet, only thing left to make your computer publicly available is to configure port forwarding. Find your router than is supplying your machine with the internet connection, it should look like a small rectangular box. On its back should be instructions to sign into it via a browser using a URL and password. After signing in, configure port forwarding to forward frontend and backend port from router to your computer. Example, if your frontend on port 9500, and backend on port 3000, configure all TCP requests coming to router on port 9500 & 3000 to be redirected to ports 9500 and 3000 of your machine via its ip address. This ip address is not its actual ip address, just the ip address of computer associated with current network. Boom! It should work now. 

If your machine does not have a network card, meaning machine cannot use internet by itself (test with ping 8.8.8.8, if no response, means no network card), need to connect machine to router using Ethernet cable. We will make machine use internet via the router's connection instead. This is a bit complicated, so I have link for Beaglebone as example https://ofitselfso.com/Beagle/NetworkingSetupConnectingTheBeagleboneBlack.php#:~:text=The%20ethernet%20cable%20should%20be,its%20IP%20address%20via%20DHCP.

# HOW TO DEPLOY (MICROSOFT AZURE CLOUD)

No need for anything fancy such as multiple frontend/backend servers and load balancers, as not much experience with distributed systems. This will just be for creating 1 frontend and 1
backend server on one Ubuntu (Linux based) virtual machine. Since these virtual machines are managed by companies, they are configured to be accessible over internet. Any Ubuntu Cloud VM can 
work, not just one provided by Azure. But, Azure has 100 credit (dollar) plan for students. **Also, undecided on using Docker in VM, it is already a bit slow without Docker, adding Docker will surely make application more slow, also takes up more memory**.

## If don't have Ubuntu Cloud VM

1. Sign up or create microsoft azure account https://azure.microsoft.com/en-us
2. Go to here to register account for 100 credit student plan https://azure.microsoft.com/en-us/free/students
3. Now, sign in to go to Azure Dashboard. There is a lot of stuff here, so don't get overwhelmed by all the buttons on the screen. Just focus on the virtual machines button and click there
   
<img width="935" alt="Screenshot 2025-04-30 at 2 50 11 PM" src="https://github.com/user-attachments/assets/235753b8-8ff4-44cb-98d7-167cc83e40bd" />

4. Press "Create", then "Azure Virtual Machine"
5. For Subscription, "Azure for Students" should be an option, choose it. For resource group, create a new one and give it a name (just a place to store info about the VM being created). Give the virtual machine a name, and a region (prefer a place close to where you are to speed up NotiAI response time). For Availability options, choose "No infrastructure redundancy required". You can choose an Availability Zone instead of have multiple zones each with a VM, this means if one bare metal machine holding your VM catches fire and blow up in a data center, you have backups. Maybe too much for scope of this project. For image, choose an Ubuntu image. For processor, choose any, I dont think processor matters much (I just chose x86). 
   
<img width="974" alt="Screenshot 2025-04-30 at 2 54 10 PM" src="https://github.com/user-attachments/assets/a2d35b43-f41e-47cc-afd7-bce002b1310d" />

6. For Size, **This is very important**. Our application is currently around 350 MB in files including dependencies, but I estimate that our application needs around **4 GB** total. Storage is also needed for nodejs, npm, git, and postgres. To be safe, however, I recommend 8 GB of memory and 4 GB of RAM. For Size, I chose the Bv2 from the B series. 30$ a month, ow. For authentication, choose ssh key if comfortable with that, otherwise go with the old fashioned username and password. **Save your username and password somewhere, for ssh key need to go to VM in azure portal to request for a key to be generated.** For inbound port rules, **Must allow ssh port 22**, that is how we will enter the VM through the SSH (secure shell) protocol. After that, click review and create. No need to worry about other tabs apart from Basics tab.

<img width="974" alt="Screenshot 2025-04-30 at 3 00 52 PM" src="https://github.com/user-attachments/assets/0801a791-1b23-40f4-9663-08d4f6f66242" />

7. Azure VM now created! View the VM on the Azure platform. Here is what is looks like. In red is a button for refreshing VM, might find it helpful, also in red is public ip address. 

<img width="1317" alt="Screenshot 2025-04-30 at 3 22 36 PM" src="https://github.com/user-attachments/assets/f9e5e5f6-c01b-42b8-99be-173f3893a7d1" />

## If already have Ubuntu Cloud VM

1. Sign into VM via ssh. Use command ssh [username]@[public VM ip address], and type in password if chose username and password for authentication. **I prefer to access VM through VS Code's ssh     extension, as it allows me to open/edit files much easier.** Here is a link https://code.visualstudio.com/docs/remote/ssh
2. Clone repository from Github into VM using git clone [url to github]. This will create the directory NotifAI. Git should be already installed on VM.
   
4. Install nodejs and npm. **NOTE: traditional way to install, sudo apt install nodejs, would not work because that gives outdated version of nodejs, incompatible with our app**. I found this that works instead for nodejs:

```
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
```
```
sudo apt-get install --yes nodejs
```

Found on this link https://stackoverflow.com/questions/34594314/why-do-i-get-old-versions-of-nodejs-and-npm-when-installing-with-apt-get
   
7. Check if nodejs is installed using node -v, also check npm using npm -v, I think above command also installs npm, if not, try "sudo apt install npm" (hopefully this won't be updated).
8. Enter NotifAI directory, run ./installation.sh. There should be no issues here (hopefully).
   
9. Run command "sudo apt install postgresql", backend needs local database. Connect to database using

```
sudo -u postgres psql
```
Run command in psql shell

```
ALTER USER postgres with encrypted password 'your_password';
```
Then create database called "users" by typing in psql shell:
```
CREATE DATABASE users;
```
    
Password and database name can be anything, can configure environment variable so that your password and database works. Postgres with Ubuntu is based on this link https://documentation.ubuntu.com/server/how-to/databases/install-postgresql/index.html

10. Create .env file in NotifAI root directory, copy all of .env.example into .env, modify .env so that matches your setup. Both frontend and backend should have VM's public ip address (found on Azure portal). ***Be sure to set BACKEND_IN_VIRTUAL_MACHINE = 1***.

11. Now, on Azure portal, allow ports for frontend and backend to be used. In my example, it is 9500 and 3000. Click on Network Setting under Networking on your virtual machine dashboard. Then, click Create Port Rule for Inbound Port.
    
<img width="1045" alt="Screenshot 2025-04-30 at 3 44 15 PM" src="https://github.com/user-attachments/assets/73109a36-a6a6-4520-975e-52bc917e15c2" />

12. Choose * for source, and ports for frontend and backend as destination (9500,3000). This means users can connect to ports 9500 and 3000 on VM from any port. Protocol is TCP, Action is allow. Then do the same for Outbound Port by clicking Create Port Rule, then Outbound Port. This time, choose ports for frontend and backend (9500,3000) as source, and * as destination. This means that frontend and backend at those ports can send response to user at any of the user's ports. Below example is for inbound.
    
<img width="1038" alt="Screenshot 2025-04-30 at 3 48 02 PM" src="https://github.com/user-attachments/assets/3b8f9568-db34-40c9-bb00-5a46da8d7880" />

13. Try ./start_backend.sh, and ./start_frontend.sh, and type http://[VM public ip address]:[frontend port number]. You should be able to sign in and use app!

14. Right now, if exit ssh, frontend and backend shuts down too. To enable it that they run at all times, instead of ./start_frontend.sh or ./start_backend.sh, do:
    
```
nohup ./start_backend.sh > backend_log &
```
```
nohup ./start_frontend.sh > frontend_log &
```
This command starts both frontend and backend in the background, as prevents them from terminating on shell exit. Also, console output from frontend and backend go into files called backend_log and frontend_log. When sign back into shell, those two programs will still be running, to termiante them, run 
```
sudo ss -lptn 'sport = :<port number>'
```
This returns the process id running at the port number, then run
```
kill <process id>
```
This terminates the process. ***BUT WHATEVER YOU DO, DONT DELETE THE WRONG PROCESS ID! THAT COULD BE VERY BAD, IF YOUR VM ACTS WEIRD, MIGHT HAVE DELETED SOMETHING IMPORTANT, RESTART VM USING AZURE VM DASHBOARD.*** An example of right way to do it below with port number 3000. 
<img width="1401" alt="Screenshot 2025-04-30 at 3 55 27 PM" src="https://github.com/user-attachments/assets/c4751553-ece0-40b4-bc43-5691f0a4cfc9" />
