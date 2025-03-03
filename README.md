# Génial-Reborn

Génial-Reborn is a feature-rich Discord bot built for server moderation and fun, leveraging the latest technologies for optimal performance and a seamless user experience. This project also includes a web interface for enhanced server management and interaction.

---

## 📌 Project Overview

Génial-Reborn serves as a comprehensive Discord bot and website combination to simplify server moderation while keeping the community entertained. From managing server rules to offering engaging features, Génial-Reborn does it all.

## 🚀 Features

- **Moderation**: Tools for banning, kicking, muting, and warning members.
- **Fun Commands**: Engaging commands to entertain your server members.
- **Logs**: Real-time logging for all moderation activities.
- **Custom Commands**: Flexibility to create and manage custom bot commands.
- **Web Dashboard**: Easy-to-use interface for managing bot settings and monitoring activity.

---

## 🔧 Technologies Used

### Bot
- **Node.js**: Efficient runtime for server-side operations.
- **TypeScript**: Strongly-typed language to maintain clean and manageable code.
- **discord.js**: Library for interacting with the Discord API.
- **SQL**: For storing user and server data efficiently.

### Website
- **Express**: A custom backend server for the web interface.
- **Node.js API**: To facilitate communication between the bot and website.
- **SQL**: Shared database for seamless data synchronization.

---

## 📂 Project Structure

- **/bot**: All the bot-related code written in Node.js and TypeScript.
- **/api**: Node.js API to handle requests between the bot and the website.
- **/utils**: Some utility code used anywhere
---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 
- SQL Database
- Discord bot token

### Steps to Run Locally
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Genial-Team/Genial-Reborn.git
   cd genial-reborn
   ```
### Bot Setup
2. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Configure Environment Variables**:
   - Create a `.env` file in the root directory. (.env.development for development, .env.production for production).
   - Add the following environment variables:
   ```dotenv
        #Database
        DB_HOST='MyHost'
        DB_PORT='MyPort'
        DB_USER='MyUser'
        DB_PASSWORD='MySecretPassword'
        DB_DNAME='MyDatabaseName'
        #Discord bot
        DISCORD_TOKEN='MyDiscordToken'
        DISCORD_CLIENT_ID='MyClientId'
        DISCORD_GUILD_ID='myGuildId' # only for development
        #Express
        EXPRESS_PORT='MyApiPort'
   ```
3. **Run the Bot**:

there is two-way to run the bot:
- **Development Mode**:
   ```bash
   npm run dev
   ```
- **Production Mode**:
   ```bash
    npm run prod
    ```
  make sure to create the .env file with the right extension !

### 📈 Future Enhancements
---
Interactive Mod Dashboard: A more intuitive interface for real-time moderation.
Leaderboard and Gamification: Add points and ranking systems for active members.
Extended API Functionality: Improve bot and website communication for richer features.

### 🛡️ Security & Privacy
---
Data Security: User and server data are securely stored in an SQL database.
Privacy: We only collect and store data necessary for moderation and bot functionality.

### 🛠️ Contributors
---
LyneQ - Lead Developer
marwank270 - Co-developer and Graphic Designer
Feel free to contact us for any queries or contributions!

### 📜 License
---
This project is licensed under a private license. Unauthorized use, distribution, or reproduction is prohibited.

   
   

   


