import { Button, Label, TextInput } from 'flowbite-react';
import { DiagramEngine, NodeModel, NodeModelGenerics } from '@projectstorm/react-diagrams';
import { useState } from 'react';
import { RouterNodeModel } from '../custom-nodes/router-node/RouterNodeModel';
import router from '../images/device-logo/router.png'; // with import
import { isSameNetwork } from '../utils/checkOnNetwork';

function CreateRouter({ diagramEngine, updateEngine }: { diagramEngine: DiagramEngine, updateEngine: () => void }) {

    const [ip, setIp] = useState<string>("")
    const [host, setHost] = useState<string>("")
    const [mask, setMask] = useState<string>("")


    function disposerCarresEnCercle(nodePricipale: RouterNodeModel, newNodes: NodeModel<NodeModelGenerics>[]) {
        // Nombre de carrés à disposer
        var nombreCarres = newNodes.length;

        // Rayon du cercle (peut être ajusté en fonction de la taille des carrés)
        var rayon = 1000;

        // Angle d'incrémentation pour chaque carré
        var angleIncrement = (2 * Math.PI) / nombreCarres;


        // Disposer les carrés autour du carré principal en cercle
        newNodes.forEach(function (carre, index) {
            var angle = index * angleIncrement;
            carre.setPosition(nodePricipale.getPosition().x + rayon * Math.cos(angle), nodePricipale.getPosition().y + rayon * Math.sin(angle))
        });
    }

    const addRouter = () => {

        const newNode = new RouterNodeModel(
            ip, host, router, mask
        );
        const posNode: NodeModel<NodeModelGenerics>[] = []

        newNode.setPosition(400, 400);
        const model = diagramEngine.getModel()
        diagramEngine.getModel().getNodes().map((node: any, i) => {
            if (isSameNetwork(ip, mask, node.iot_addr)) {

                const iotPort = node.getPort("in")
                const routerPort = newNode.getPort("out")
                if (iotPort && routerPort) {
                    let link = iotPort.link(routerPort);
                    model.addLink(link)
                    posNode.push(node)
                }
            }
        })
        disposerCarresEnCercle(newNode, posNode)
        diagramEngine.getModel().addNode(newNode);
        updateEngine();

        setHost("")
        setIp("")
        setMask("")
    }

    return (
        <form onKeyUp={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} onSubmit={(e) => {
            e.preventDefault();
            addRouter();
        }}>
            <div className="max-w-md flex flex-col gap-2">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="iot-ip" value="IP address" />
                    </div>
                    <TextInput id="iot-ip" type="text" placeholder="127.0.0.1" value={ip} onChange={(e) => setIp(e.target.value)} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="iot-mask" value="Router mask" />
                    </div>
                    <TextInput id="iot-mask" type="text" placeholder="/24" value={mask} onChange={(e) => setMask(e.target.value)} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="iot-host" value="Hostname" />
                    </div>
                    <TextInput id="iot-host" type="text" value={host} onChange={(e) => setHost(e.target.value)} />
                </div>
            </div>
            <Button color="dark" className='mt-5' type="submit">Add</Button>
        </form>

    );
}

export default CreateRouter;