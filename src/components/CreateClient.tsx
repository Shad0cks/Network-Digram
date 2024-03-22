import { Button, Label, Sidebar, TextInput } from 'flowbite-react';

import { DiagramEngine, PortModelAlignment } from '@projectstorm/react-diagrams';
import { useState } from 'react';
import { DeviceNodeModel } from '../custom-nodes/device-node/DeviceNodeModel';
import pcLogo from '../images/device-logo/pc.png'; // with import
import { DevicePortModel } from '../custom-nodes/device-node/DevicePortModel';

function CreateClient({ diagramEngine, updateEngine }: { diagramEngine: DiagramEngine, updateEngine: () => void }) {

    const [ip, setIp] = useState<string>("")
    const [ports, setPorts] = useState<string>("")
    const [host, setHost] = useState<string>("")

    const addCLient = () => {

        const node = new DeviceNodeModel(
            ip, host, pcLogo
        );

        node.setPosition(0, 0);

        ports.split(";").forEach((port) => {
            node.addPort(new DevicePortModel(port, PortModelAlignment.LEFT, true))
        })

        diagramEngine.getModel().addNode(node);
        updateEngine();

        setHost("")
        setIp("")
        setPorts("")
    }

    return (
        <form onKeyUp={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} onSubmit={(e) => {
            e.preventDefault();
            addCLient();
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
                        <Label htmlFor="iot-host" value="Hostname" />
                    </div>
                    <TextInput id="iot-host" type="text" value={host} onChange={(e) => setHost(e.target.value)} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="iot-port" value="Port(s)" />
                    </div>
                    <TextInput id="iot-port" type="text" placeholder="80;443;3389;..." value={ports} onChange={(e) => setPorts(e.target.value)} />
                </div>
            </div>
            <Button color="dark" className='mt-5' type="submit">Add</Button>
        </form>

    );
}

export default CreateClient;