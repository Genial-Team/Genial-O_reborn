import Logger from '../Logger';

declare global {
    // never remplace var by let or const or I will destroy you
    var logger: Logger;
}

export {};

