# Minimarket "Full Ahorro" - Inventory Management System

## Group Members

- Christopher Pallo
- Brayan Davila

## Table of Contents

1. [Problem Statement](#problem-statement)
   - [Proposed Solution](#proposed-solution)
   - [Backend](#backend)
   - [Frontend](#frontend)
2. [Benefits of Using Microservices](#benefits-of-using-microservice)
3. [Installation](#installation)
   - [Requirements](#requirements)
   - [Clone the Repository](#clone-the-repository)
   - [Install Dependencies](#install-dependencies)
   - [Run the Application](#run-the-application)
   - [Evidence](#evidence)
4. [Program Execution](#program-execution)
   - [Create Docker Image](#create-docker-image)
5. [DockerHub](#dockerhub)
   - [DockerHub Repository](#dockerhub-repository)
6. [AWS ECR, EC2 Evidences](#aws-ecr-ec2-evidences)
   - [Configuration](#configuration)
   - [Docker](#docker)


## Problem Statement

Minimarket "Full Ahorro" faces challenges in managing its inventory due to the current manual process, which causes inefficiencies and human errors. An automated system is required to allow administrators to:

1. Add new products.
2. Update the quantity of existing products.
3. View the list of available products and their quantities.

The goal is to create a simple and efficient system that ensures precise inventory management, maintaining adequate stock levels and avoiding shortages or excesses of products.

### Proposed Solution

Implement an application based on microservices, divided into two main parts:

### 1. Backend

- **Product Service:** Responsible for handling the creation, updating, and querying of products.

### 2. Frontend

- **Web Application:** User interface for administrators to interact with the product service, registering new products and updating the quantity of existing ones.

## Benefits of Using Microservices

1. **Independent Scalability:** Each component of the system can scale independently. For example, if product management requires more resources, only the product service can be scaled without affecting other parts of the system.
2. **Independent Development and Deployment:** Each microservice can be developed, deployed, and updated independently. This reduces downtime and facilitates the implementation of new features or fixes.
3. **Maintainability:** The separation of responsibilities into microservices makes the code more modular and easier to maintain. Development teams can work on different services simultaneously without interfering with each other.
4. **Resilience:** If one microservice fails, it does not necessarily affect the other services. This improves the resilience and availability of the system as a whole.

## Installation

### Requirements

- npm (Node Package Manager)

### Clone the Repository

```sh
git clone https://github.com/ChristopherPalloArias/Frontend-MinimarketMicroservices.git
```

### Install Dependencies
```sh
npm install
```

### Run the Application
```sh
npm run dev
```
The application will be available at http://localhost:3001.

### Evidence
![image](https://github.com/ChristopherPalloArias/Frontend-MinimarketMicroservices/assets/87538474/ef7228b9-e7e1-47c9-adf8-ebb7d39775b2)

## Program Execution
### Create Docker Image with DockerFile
```sh
docker build -t minimarket-frontend .
```
![Imagen de WhatsApp 2024-07-08 a las 00 45 24_9145bfe5](https://github.com/ChristopherPalloArias/Frontend-MinimarketMicroservices/assets/87538474/f4e6520c-bc06-4b46-854b-52b6ff55f2f0)

## DockerHub
### DockerHub Repository

[christopherpallo2000/cp-minimarket-frontend](https://hub.docker.com/r/christopherpallo2000/cp-minimarket-frontend)

Docker Pull Command
```sh
docker pull christopherpallo2000/cp-minimarket-frontend
```

## AWS ECR, EC2 Evidences
### Configuration
**✔️ Step 1: Create a Repository in AWS ECR.**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/66a50fd9-5b95-4b2b-b5ff-90bbe408b304)

**Enter a name for your repository and click Create repository**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/1fb26ed2-b9a4-4755-ad0b-dcf541fb5f8f)
![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/11b15815-5c26-4071-b2db-363c966e3669)
![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/5fa66a08-d8ef-4305-8a16-46a64448f61f)
![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/5eb841d7-4866-43e8-864b-fa48754161e0)

**Once the Repo is created, select the repo and click on view push commands.**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/41d54233-fa4f-43cd-9e26-fe190603a26a)

**✔️ Step 2: Create an IAM role to access AWS ECR.**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/db70df71-b5ec-4162-8ebb-b6b91b018013)

**✔️ Step 3: Attach an IAM role to the AWS EC2 Instance.**
In the AWS console select your AWS EC2 instance and click on Actions. From the drop-down menu select Security then Modify IAM role.

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/f3673bfc-a5bc-47ce-9cd8-01ce483b62b8)

**Under choose IAM role from the drop down menu select ec2-ecr-role.**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/6ada0dce-739b-4bcf-ad56-2754d1510358)

**✔️ Step 4: Log in to AWS ECR from AWS EC2.**

**Here head back to your ECR Dashboard and select your repository. In your repository window on the right top corner click on View Push Commands.
Select the login command provided and run it in your terminal as shown below.
This will successfully login you into your AWS ECR repository.**

**But before entering the AWS CLI we must generate a secret key with our user to be able to access**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/3d87bb79-f219-4e03-926a-b9d181719865)

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/b2c4df57-b1a4-4df6-9fee-63db68acab67)

**✔️ Step 5: Install Docker in instance EC2**

**Install necessary packages to add additional repositories and manage certificates, download and add the GPG key for the official Docker repository, add the official Docker repository to APT sources, update the package list, install Docker Engine and related components, start the Docker service, enable Docker to start on boot, Add your user to the Docker group so you can run Docker commands without sudo**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/a4ebcffc-5701-43bf-9e70-f98d25d2816b)

**We verify that Docker has been installed correctly**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/94b8fba1-8a01-4828-8ca4-2dee1dd309ea)

**✔️ Step 5: Install DockerCompose in instance EC2**

**To begin the installation of DockerCompose we must ensure that we have downloaded the .pem file that is generated when creating our instance for login**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/21cdc5df-9bd7-42ca-b941-4f8b751372de)

**Now in the command console we will locate the path of this file**

**Now in the command console we will locate the path of this file and execute the following command, this command is essential for using SSH to connect to the remote instance, this step is essential to be able to install and configure Docker and Docker Compose. Once connected, we can perform all the necessary configurations and then run docker-compose to stand up the services**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/95739dd8-a115-4c2a-8379-8537c59333f9)

**We create a new volume with the minimum resources, since this volume will help us save our volumes generated by Docker Compose which must be mounted in the containers.**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/d595c1f4-31b5-472c-a708-b7dcb39a972d)

**Before doing this we make sure that creating this new volume does not generate additional expenses, I always try to use the free tier**
![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/ef65630a-9e87-461f-a602-01ebf3d8dace)

**Once the volume is created and attached to our instance, we will mount this new volume within our EC2 system, list the block devices to verify that the volume is attached, Format the volume with the XFS file system and Create a backup point. mounting in the system**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/0b9e2d18-ae80-441c-8cbd-794e6d4c0aea)

**As a last configuration step we are going to copy files from our local machine to our EC2 instance in AWS and run Docker Compose on that instance.**
**We copy the Nginx configuration file along with the PEM (private key) file to authenticate to the EC2 instance, edit the Nginx configuration file, move Nginx configuration file to correct location and restart Nginx**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/58ae894a-08c0-4b4d-82eb-6790111941b4)

### Docker

**First we create the folders for each microservice and for the frontend**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/caa43f27-0774-4aba-b19e-c9bff3691343)

**Then we will access each of the folders where we will clone our projects uploaded to Github**
**We will do this step the same for each repository in its corresponding folder**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/b0be1449-956e-4a8f-93b5-b750364e13c0)

**Then we will access each Clone folder to build the Docker image and execute the push commands from the ECR repositories to EC2**
**We must remember that these commands are in each of the repositories that we create**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/f079260e-8ef0-4e97-b6de-e2b5b93d71be)

**We will do this step for each repository**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/09205cc5-c1fd-4e96-98b3-d7c85be744d9)

**We verify that the images have been created correctly**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/8e501f41-1f26-4a39-93de-ecd0ecdb6722)

**We proceed to create our docker-compose.yml file and configure it with the id of our new images and verify that they have been created correctly**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/fd295f6a-371a-4796-9e5a-cc7c2e0c719b)

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/687a429c-c008-48f4-8cd7-9e38b47f9948)

**We go to our instance on EC2 to verify and capture the IPv4 Public to access our application**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/85205217-b9e3-4587-93e0-1b22983ff446)

**We paste the url in the browser followed by the ports in which we raise the docker-compose**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/f89609bf-f23e-4d06-9494-cf45358bc200)

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/97b028e4-1226-465f-afa1-991a383aabbf)

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/554f1d3a-3712-4c45-aad2-d6f91c778fcb)

**We make a change and check the console to verify that everything is working correctly**

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/634da2c5-0475-4ee8-b54f-19494357cff1)

![image](https://github.com/ChristopherPalloArias/Microservice-CreateProduct-Service/assets/167264603/efedfde4-ec67-48dc-aa12-f42bcbb2b5d5)
