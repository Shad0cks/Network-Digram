import { Button, Label, TextInput } from 'flowbite-react';

import { DiagramEngine } from '@projectstorm/react-diagrams';
import { useState } from 'react';
import pcLogo from '../images/device-logo/pc.png'; // with import
import { AddIpToDevice, CreateNewDevice, LinkDerviceToExistingNetwork } from '../utils/addNewDevice';

function CreateClient({ diagramEngine, updateEngine }: { diagramEngine: DiagramEngine, updateEngine: () => void }) {

    const [ips, setIp] = useState<string>("")
    const [ports, setPorts] = useState<string>("")
    const [host, setHost] = useState<string>("")

    const addCLient = () => {

        const node = CreateNewDevice(host, pcLogo, ports.split(";"))

        if (AddIpToDevice(node, ips.split(";"), diagramEngine) === null) {
            console.log("Error: Duplicated Ip");
        }
        else {
            LinkDerviceToExistingNetwork(node, diagramEngine);

            diagramEngine.getModel().addNode(node);
            updateEngine();
        }


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
                    <TextInput id="iot-ip" type="text" placeholder="127.0.0.1" value={ips} onChange={(e) => setIp(e.target.value)} />
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