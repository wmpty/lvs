# 🚀 Quick Start Guide - How to Run This Project

## Run the Project in 3 Steps

### Step 1: Install Node.js

If you don't have Node.js installed on your computer:

1. Visit [Node.js Official Website](https://nodejs.org/)
2. Download the LTS (Long Term Support) version
3. Follow the installation wizard to complete the installation

**Verify installation:**
Open your command line (Windows: CMD or PowerShell; Mac/Linux: Terminal), and type:
```bash
node --version
```
If you see a version number (e.g., v18.x.x), the installation was successful.

### Step 2: Install Project Dependencies

In the command line, navigate to the project folder and install dependencies:

```bash
# Navigate to project folder (if not already there)
cd lvs

# Install dependencies
npm install
```

Wait for the installation to complete (this may take a few minutes).

### Step 3: Start the Project

Run the following command to start the server:

```bash
npm start
```

When you see this message, the server has started successfully:
```
毛驴育种管理系统服务器运行在端口 3000
Donkey Breeding Management System server running on port 3000
访问 http://localhost:3000 查看系统
```

### Step 4: Open in Browser

Enter this in your browser address bar:
```
http://localhost:3000
```

You should now see the system interface! 🎉

---

## Common Issues

### ❓ Port Already in Use Error?

If you see an error that port 3000 is already in use:

**Method 1: Use a Different Port**
```bash
PORT=3001 npm start
```
Then visit `http://localhost:3001`

**Method 2: Close the Program Using the Port**
- Windows: Open Task Manager, find and end the program using the port
- Mac/Linux: Run `lsof -ti:3000 | xargs kill` in terminal

### ❓ npm install Slow or Failing?

Try using a mirror registry:
```bash
# Using Taobao mirror (for users in China)
npm install --registry=https://registry.npmmirror.com

# Or use the default npm registry
npm install --registry=https://registry.npmjs.org
```

### ❓ How to Stop the Server?

Press `Ctrl + C` in the command line window where the server is running

### ❓ How to Access from Mobile?

1. Ensure your phone and computer are on the same WiFi network
2. Find your computer's IP address:
   - Windows: Run `ipconfig`, look for IPv4 Address
   - Mac/Linux: Run `ifconfig` or `ip addr`
3. On your phone's browser, enter: `http://YOUR_COMPUTER_IP:3000`
   - For example: `http://192.168.1.100:3000`

---

## Feature Overview

After starting the system, you can:

- 📊 **View Statistics Dashboard** - Homepage displays total donkeys, breeding count, and other key metrics
- 🐴 **Manage Donkey Information** - Add and view donkey breed, bloodline, and health status
- 💕 **Record Breeding** - Track breeding between male and female donkeys
- 🍼 **Register Foals** - Record information about newborn foals
- 🥛 **Track Milk Production** - Daily milk production records
- 💊 **Disease Management** - Record disease detection and treatment
- 💉 **Vaccination Records** - Manage vaccination schedules
- 📜 **Pedigree Registration** - Query and manage three-generation pedigree information

---

## Next Steps

- 📖 For detailed usage instructions, see [User Guide](USER_GUIDE.md)
- 🔧 For technical documentation, see [README.md](README.md)
- 💡 For questions or issues, please use GitHub Issues

---

**Enjoy using the system!** 🎉
