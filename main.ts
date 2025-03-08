import './setupGlobalLogger';
import {spawn} from "child_process";
import fs from "node:fs";
// @ts-ignore
import os from "os";

function startProcess(name: string, command: string, cwd: string) {
    const isWindows = os.platform() === "win32";

    const proc = spawn(command, {
        shell: isWindows ? "cmd.exe" : "/bin/sh",
        cwd,
        stdio: "inherit",
    });

    proc.on("error", (err) => {
        global.logger.error(`❌ Erreur lors du lancement de ${name}: ${err.message}`);
    });

    proc.on("close", (code) => {
        global.logger.error(`❌ ${name} s'est arrêté avec le code ${code} (no error)`);
    });

    return proc;
}

function installDependencies(cwd: string): Promise<void> {
    return new Promise((resolve, reject) => {

        const isWindows = os.platform() === "win32";

        const nodeModulesInstalled = fs.existsSync(`${cwd}/node_modules`);

        if (nodeModulesInstalled) {
            global.logger.warn(`Dependencies for ${cwd} already installed, skipping...`);
            return resolve();
        } else {
            global.logger.info(`Installing dependencies for ${cwd}...`);
        }
        const proc = spawn("npm install", {
            shell: isWindows ? "cmd.exe" : "/bin/sh",
            cwd,
            stdio: "inherit",
        });

        proc.on("error", (err) => {
            global.logger.error(`❌ Erreur lors du lancement de ${cwd} : ${err.message}`);
            reject(err);
        });

        proc.on("close", (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Installation failed with exit code ${code}`));
            }
        });
    });
}

// Vérification des dependence
Promise.all([
    installDependencies("./nuxt-app")
])
    .then(() => {
        // Lancement des services
        global.logger.info("🚀 Lancement des services...");
        startProcess("API", "npm run start:api", "./api");
        startProcess("BOT", "npm run start:bot", "./bot");
        startProcess("WEBAPP", "pnpm run dev", "./nuxt-app");
    })




