// @ts-ignore
import colors, {Color} from 'colors';
import type { Flags } from "./interfaces/LoggerInterfaces";
import type { Header } from "./interfaces/LoggerInterfaces";
import type { LogLevel, HeaderKey } from './types/LoggerLevel'

class Logger {
    private FLAGS: Flags;
    private HEADERS: Header;

    constructor() {
        this.FLAGS = {
            info: "ℹ️",
            warn: "⚠️",
            error: "🛑",
            debug: "🐞",
        };
        this.HEADERS = {
            bot: "Bot",
            http: "Express",
            db: "Database",
            app: "Application",
        };
    }

    determineFlag(flag: LogLevel): string {
        return this.FLAGS[flag] || this.FLAGS.info;
    }
    determineColor(flag: LogLevel): Color {
        switch (flag) {
            case 'info':
                return colors.blue;
            case 'warn':
                return colors.yellow;
            case 'error':
                return colors.red;
            case 'debug':
                return colors.green;
            default:
                return colors.blue;
        }
    }

    log(flag: LogLevel, header: HeaderKey, message: string, arg?: any ): void {
        const formattedMessage = this.determineColor(flag)(`[${this.determineFlag(flag)}] ${this.HEADERS[header]} - ${message}`);

        arg ? console.log(formattedMessage, arg) : console.log(formattedMessage);
    }

    info(message: string): void {
        this.log('info', 'app', message);
    }

    warn(message: string): void {
        this.log('warn', 'app', message);
    }

    error(message: string): void {
        this.log('error', 'app', message);
    }

    debug(message: string): void {
        this.log('debug', 'app', message);
    }
}

export default Logger;
