import { DefaultLinkModel, DefaultPortModel, DiagramEngine, NodeModel, NodeModelGenerics, PortModelAlignment } from "@projectstorm/react-diagrams";
import { RouterNodeModel } from "../custom-nodes/router-node/RouterNodeModel";
import { getRouterNodes, isSubnet } from "./checkOnNetwork";
import { DevicePortModel } from "../custom-nodes/device-node/DevicePortModel";
import { DeviceNodeModel } from "../custom-nodes/device-node/DeviceNodeModel";
import ipRangeCheck from "ip-range-check"

function checkNoDuplicatedNetworkIpInDiagram(allRouter: RouterNodeModel[], wantedIp: string, wantedMask: string) {
    for (let router of allRouter) {
        if (router.iot_addr === wantedIp && router.iot_mask === wantedMask)
            return false
    }
    return true
}


export function CreateNewRouter(routerIP: string, description: string, routerLogo: string, routerMask: string) {
    return new RouterNodeModel(routerIP, description, routerLogo, routerMask);
}




export function LinkRouterForSubnet(newRouterNode: RouterNodeModel, engine: DiagramEngine) {
    const model = engine.getModel()
    const AllRouters = getRouterNodes(engine);
    if (!checkNoDuplicatedNetworkIpInDiagram(AllRouters, newRouterNode.iot_addr, newRouterNode.iot_mask)) {
        console.log("Duplicate Network");
        return null
    }
    // check if newRouter is a subnet of existing network
    AllRouters.map((router) => {
        if (Object.keys(router.getPort("in")!.getLinks()).length >= 1)
            return

        if (isSubnet(router.iot_addr + router.iot_mask, newRouterNode.iot_addr + newRouterNode.iot_mask)) {
            // newRouter is subnet of existing router
            const exitingRouterPort = router.getPort("out") as DefaultPortModel
            const newRouterPort = newRouterNode.getPort("in") as DefaultPortModel
            const links = exitingRouterPort.getLinks();

            if (newRouterPort && exitingRouterPort) {

                Object.keys(links).map((linkId) => {
                    const link = links[linkId] as DefaultLinkModel
                    const targetLinkPort = link.getSourcePort()
                    // check if links of existing router part of 
                    if (targetLinkPort instanceof DevicePortModel) {
                        if (ipRangeCheck(targetLinkPort.getName(), newRouterNode.iot_addr + newRouterNode.iot_mask)) {
                            // const newLink = targetLinkPort.link(newRouterPort)
                            // model.addLink(newLink)
                            model.removeLink(link)
                        }
                    }
                })
                const Routerlink = exitingRouterPort.link(newRouterPort)
                model.addLink(Routerlink);
            }
        }

        else if (isSubnet(newRouterNode.iot_addr + newRouterNode.iot_mask, router.iot_addr + router.iot_mask)) {
            //existing router is subnet of newRouter 
            const exitingRouterPort = router.getPort("in") as DefaultPortModel
            const newRouterPort = newRouterNode.getPort("out")
            if (newRouterPort && exitingRouterPort) {
                const link = exitingRouterPort.link(newRouterPort)
                model.addLink(link);
            }
        }
    })
}

export function LinkRouterToDevice(newRouterNode: RouterNodeModel, engine: DiagramEngine) {
    const model = engine.getModel()
    model.getNodes().map((node) => {
        if (node instanceof DeviceNodeModel) {
            Object.keys(node.getPorts()).map((ip) => {
                if (ipRangeCheck(ip, newRouterNode.iot_addr + newRouterNode.iot_mask)) {
                    const devicePort = node.getPort(ip) as DefaultPortModel
                    const routerPort = newRouterNode.getPort("out")
                    if (devicePort && routerPort) {
                        let link = devicePort.link(routerPort);
                        model.addLink(link)
                    }
                }
            })
        }
    })
}