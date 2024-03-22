import { Button, Checkbox, Label, Modal, Select, TextInput, Textarea } from 'flowbite-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { DeviceNodeModel } from '../custom-nodes/device-node/DeviceNodeModel';
import pcLogo from '../images/device-logo/pc.png'; // with import
import { DevicePortModel } from '../custom-nodes/device-node/DevicePortModel';
import { DiagramEngine, PortModelAlignment } from '@projectstorm/react-diagrams';
import { RouterNodeModel } from '../custom-nodes/router-node/RouterNodeModel';
import router from '../images/device-logo/router.png'; // with import

interface Service {
    protocol: string;
    state: string;
    service: string;
}

interface HostResult {
    hostname: string;
    services: { [port: string]: Service };
    macAddress: string | null;
}

interface NmapResults {
    [host: string]: HostResult;
}

function NmapImportModal({ show, setOpenModal, diagramEngine, updateEngine }: { show: boolean, setOpenModal: Dispatch<SetStateAction<boolean>>, diagramEngine: DiagramEngine, updateEngine: () => void }) {
    const [commandOutput, setcommandOutput] = useState('');
    const [algo, setAlgo] = useState("nmap");

    function onCloseModal() {
        setcommandOutput('');
        setOpenModal(false)
    }

    function parseNmapOutput(nmapOutput: string) {
        const results: NmapResults = {}

        let currentHost = null;

        // Expression régulière pour extraire les informations pertinentes
        let regex = /Nmap scan report for (\S+)\n(?:Host is up \(([\d.]+) latency\)\.\n)?([\s\S]*?)(?=\n\nNmap scan report|\nNmap done)/g;

        let match;
        while ((match = regex.exec(nmapOutput)) !== null) {
            let host = match[1];
            currentHost = host;
            let ip = match[2] || null;
            let servicesBlock = match[3];

            let servicesRegex = /\n(\d+)\/(tcp|udp)\s+(\S+)\s+(\S+)/g;
            const services: Record<string, Service> = {}
            let serviceMatch;
            while ((serviceMatch = servicesRegex.exec(servicesBlock)) !== null) {
                let port = serviceMatch[1];
                let protocol = serviceMatch[2];
                let state = serviceMatch[3];
                let service = serviceMatch[4];
                services[port] = { protocol, state, service };
            }

            let macAddressRegex = /MAC Address: ([0-9A-Fa-f:]+)/;
            let macAddressMatch = macAddressRegex.exec(servicesBlock);
            let macAddress = macAddressMatch ? macAddressMatch[1] : null;

            let hostnameRegex = /(?:\n.*\n)?MAC Address: [\da-fA-F:]+ \((.*?)\)/;
            let hostnameMatch = hostnameRegex.exec(servicesBlock);
            let hostname = hostnameMatch ? hostnameMatch[1] : "Unknown";

            // Stocker les informations dans le dictionnaire
            results[host] = {
                hostname: hostname,
                services: services,
                macAddress: macAddress
            };
        }

        return results;
    }

    const generateNmapNetwork = () => {
        const result = parseNmapOutput(commandOutput)

        Object.keys(result).map((ip, key) => {
            const device = result[ip];
            const node = new DeviceNodeModel(
                ip, device.hostname, pcLogo
            );

            node.setPosition((key * 110) % 1100, Math.floor((key / 10) + 1) * 300);

            Object.keys(device.services).map((port) => {
                if (device.services[port].state === "open")
                    node.addPort(new DevicePortModel(port + " / " + device.services[port].protocol, PortModelAlignment.LEFT, true))
                else if (device.services[port].state === "filtered")
                    node.addPort(new DevicePortModel(port + " / " + device.services[port].protocol + " filtered", PortModelAlignment.LEFT, true))
            })

            diagramEngine.getModel().addNode(node);
        })
        updateEngine();
        setOpenModal(false)
    }

    const algoSelector = () => {
        switch (algo) {
            case "nmap":
                generateNmapNetwork();
                break;
            case "netstat":
                generateNetstatNetwork();
                break;
            default:
                break;
        }
    }

    const GenerateNetstat = (output: string) => {
        const routes: { destination: string, gateway: string }[] = [];
        const lines = output.trim().split('\n');

        // Parcourir chaque ligne de la sortie netstat
        lines.forEach(line => {
            const ipv4Pattern = /\d+\.\d+\.\d+\.\d+/; // Expression régulière pour une adresse IPv4

            // Vérifier si la ligne contient une adresse IPv4
            const parts = line.trim().split(/\s+/);
            if (parts.length >= 2) {
                const destination: string = parts[0];
                const gateway: string = parts[1];
                if (ipv4Pattern.test(gateway) && gateway !== "127.0.0.1") {
                    routes.push({ destination, gateway });
                }
            }
        });
        return routes;
    }

    const generateNetstatNetwork = () => {
        const result = GenerateNetstat(commandOutput)

        result.map((route, key) => {

            const node = new RouterNodeModel(
                route.gateway, route.destination, router, "/24"
            );

            node.setPosition((key * 100) % 1000, Math.floor((key / 10) + 1) * 300);



            diagramEngine.getModel().addNode(node);
        })
        updateEngine();
        setOpenModal(false)
    }

    return (
        <>
            <Modal className='dark' dismissible show={show} size="6xl" onClose={onCloseModal} popup>
                <Modal.Header>
                    <div className='flex items-center flex-col ml-20'>
                        <Label htmlFor="command" value="Select your command" />
                        <Select id="command" onChange={(e) => setAlgo(e.target.value)}>
                            <option value="nmap">nmap</option>
                            <option value="netstat">netstat -rn</option>
                        </Select>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="max-w">
                        <div className="mb-2 block">
                            <Label htmlFor="output" value="Paste command output here" />
                        </div>
                        <Textarea onChange={(e) => setcommandOutput(e.target.value)} id="output" required rows={20} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={algoSelector}>Generate Network</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NmapImportModal;
