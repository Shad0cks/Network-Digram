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

    // Check if subnetB has a longer mask than subnetA
    return maskLengthA <= maskLengthB && ipA.startsWith(ipB);
}