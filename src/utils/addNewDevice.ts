import { DefaultPortModel, DiagramEngine, NodeModel, NodeModelGenerics, PortModelAlignment } from "@projectstorm/react-diagrams";
import { DeviceNodeModel } from "../custom-nodes/device-node/DeviceNodeModel";
import { DevicePortModel } from "../custom-nodes/device-node/DevicePortModel";
import { ValidateIPaddress, getRouterNodes, getSmallestNetworkNodeForDeviceIp, isSubnet } from "./checkOnNetwork";
import { RouterNodeModel } from "../custom-nodes/router-node/RouterNodeModel";
import ipRangeCheck from "ip-range-check"
function checkNoDuplicatedDeviceIpInDiagram(allIot: NodeModel<NodeModelGenerics>[], wantedIp: string) {
    for (let iot of allIot) {
        if (iot instanceof DeviceNodeModel && iot.getPorts()[wantedIp] !== undefined)
            return true
    }
    return false
}

export function CreateNewDevice(description: string, pcLogo: string, device_ports: string[]) {
    return new DeviceNodeModel(
        description, pcLogo, device_ports
    );
}

export function AddIpToDevice(deviceNode: DeviceNodeModel, device_ips: string[], engine: DiagramEngine) {
    const allNode = engine.getModel().getNodes()
    let hasIp = false;

    //remove duplicated element
    const ips_no_duplicated = device_ips.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });

    if (ips_no_duplicated.length !== device_ips.length) {
        ips_no_duplicated.filter(x => device_ips.includes(x)).map((ip) => {
            console.log("Removed " + ip + " : duplicate IP");
        })
    }

    ips_no_duplicated.forEach((ip) => {
        if (ValidateIPaddress(ip) && !checkNoDuplicatedDeviceIpInDiagram(allNode, ip)) {
            hasIp = true;
            deviceNode.addPort(new DevicePortModel(ip, PortModelAlignment.LEFT, true))
        }
    })
    if (hasIp)
        return deviceNode
    else return null
}

export function LinkDerviceToExistingNetwork(deviceNode: DeviceNodeModel, engine: DiagramEngine) {

    // const posNode: NodeModel<NodeModelGenerics>[] = []
    const model = engine.getModel()
    const routerNodeList = getRouterNodes(engine);

    Object.keys(deviceNode.getPorts()).map((ip, k) => {

        let smallestNetworkNode = getSmallestNetworkNodeForDeviceIp(ip, routerNodeList)

        if (smallestNetworkNode !== null) {
            const devicePort = deviceNode.getPort(ip) as DefaultPortModel
            const RouterPort = smallestNetworkNode.getPort("out")
            if (devicePort && RouterPort) {
                let link = devicePort.link(RouterPort);
                model.addLink(link)
                // posNode.push(node)
            } else {
                console.log("Somethig went wrong this auto linking")
            }
        }
    })


    // disposerCarresEnCercle(newNode, posNode)
    // diagramEngine.getModel().addNode(newNode);
    // updateEngine();
}