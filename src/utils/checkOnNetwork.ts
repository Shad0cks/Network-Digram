function cidrToNetmask(cidr: string) {
    let maskLength: number = parseInt(cidr.split('/')[1], 10);
    let mask = '';

    for (let i = 0; i < 4; i++) {
        const byte = Math.min(maskLength, 8);
        mask += (256 - Math.pow(2, 8 - byte)).toString();
        maskLength -= byte;
        if (i < 3) mask += '.';
    }

    return mask;
}

export function isSameNetwork(routerIP: string, cidr: string, deviceIP: string) {
    const routerMask = cidrToNetmask(cidr);

    // Convertir les adresses IP en tableaux d'octets
    const routerOctets = routerIP.split('.').map(Number);
    const maskOctets = routerMask.split('.').map(Number);
    const deviceOctets = deviceIP.split('.').map(Number);

    // Calculer le réseau du routeur
    const networkOctets = [];
    for (let i = 0; i < 4; i++) {
        networkOctets.push(routerOctets[i] & maskOctets[i]);
    }

    // Vérifier si l'adresse IP du périphérique appartient au même réseau que le routeur
    for (let i = 0; i < 4; i++) {
        if ((deviceOctets[i] & maskOctets[i]) !== networkOctets[i]) {
            return false; // Les adresses IP ne sont pas dans le même réseau
        }
    }

    return true; // Les adresses IP sont dans le même réseau
}