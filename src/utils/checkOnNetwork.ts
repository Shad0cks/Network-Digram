import { DiagramEngine } from "@projectstorm/react-diagrams";
import { RouterNodeModel } from "../custom-nodes/router-node/RouterNodeModel";

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

export function isSubnet(RouterIp: string, SubnetIp: string) {
    // Extract IP address and subnet mask length
    const [ipA, maskA] = RouterIp.split('/');
    const [ipB, maskB] = SubnetIp.split('/');

    // Convert subnet masks to numbers
    const maskLengthA = parseInt(maskA, 10);
    const maskLengthB = parseInt(maskB, 10);

    // Convert IP addresses to binary strings
    const ipABinary = ipToBinary(ipA);
    const ipBBinary = ipToBinary(ipB);

    // Check if subnetB has a longer mask than or equal to subnetA and if subnetA IP starts with subnetB IP
    return maskLengthA <= maskLengthB && ipABinary.slice(0, maskLengthB) === ipBBinary.slice(0, maskLengthB);
}

// Function to convert IP address to binary string
function ipToBinary(ip: string) {
    return ip.split('.').map(part => parseInt(part).toString(2).padStart(8, '0')).join('');
}
