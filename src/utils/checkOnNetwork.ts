import { DefaultPortModel, DiagramEngine } from "@projectstorm/react-diagrams";
import { RouterNodeModel } from "../custom-nodes/router-node/RouterNodeModel";
import  ipRangeCheck  from 'ip-range-check';

export function ValidateIPaddress(ipaddress: string) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return (true)
    }
    return (false)
}

export function getRouterNodes(engine: DiagramEngine) {
    const routerList: RouterNodeModel[] = []
    engine.getModel().getNodes().map((node) => {
        if (node instanceof RouterNodeModel) {
            routerList.push(node)
        }
    })
    return routerList;
}


export function isSubnet(reseau1: string, reseau2: string) {
    // Convertir les réseaux en objets représentant les plages d'adresses IP
    let reseau1Plage = creerPlage(reseau1);
    let reseau2Plage = creerPlage(reseau2);

    // Vérifier si la plage d'adresses IP de reseau1 est incluse dans celle de reseau2
    return reseau2Plage.debut >= reseau1Plage.debut && reseau2Plage.fin >= reseau1Plage.fin;
}

function creerPlage(reseau: string) {
    let [adresse, masque] = reseau.split('/');
    let debut = ipEnNombre(adresse);
    let fin = debut | (0xffffffff >> (32 - parseInt(masque)));
    return { debut, fin };
}

function ipEnNombre(ip: string) {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

export function getSmallestNetworkNodeForDeviceIp(ip: string, AllRouters: RouterNodeModel[]) : RouterNodeModel| null{
    let smallestNetwork: string | null = null
    let tmpRouterPort: null | RouterNodeModel = null

    AllRouters.map((routerNode) => {
        if (ipRangeCheck(ip, routerNode.iot_addr + routerNode.iot_mask)) {
            if (smallestNetwork == null || isSubnet(smallestNetwork, routerNode.iot_addr + routerNode.iot_mask)) {
                tmpRouterPort = routerNode
                smallestNetwork = routerNode.iot_addr + routerNode.iot_mask
            }
        }
    })
    return tmpRouterPort
}

export function getSmallestNetworkNodeForRouter(ip: string, mask: string, AllRouters: RouterNodeModel[]) : RouterNodeModel| null{
    let smallestNetwork: string | null = null
    let tmpRouterPort: null | RouterNodeModel = null

    AllRouters.map((routerNode) => {
        if (ipRangeCheck(ip, routerNode.iot_addr + routerNode.iot_mask)) {
            if (smallestNetwork == null || isSubnet(smallestNetwork, routerNode.iot_addr + routerNode.iot_mask)) {
                tmpRouterPort = routerNode
                smallestNetwork = routerNode.iot_addr + routerNode.iot_mask
            }
        }
    })
    return tmpRouterPort
}