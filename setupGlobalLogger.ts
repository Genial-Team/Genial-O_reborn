/// <reference path="./utils/types/global.d.ts" />
import Logger from './utils/Logger';

if (typeof global !== 'undefined') {
    global.logger = new Logger();
} else if (typeof window !== 'undefined') {
    (window as any).logger = new Logger();
}

global.logger = new Logger();
