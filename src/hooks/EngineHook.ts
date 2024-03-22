import { useEffect, useState } from 'react';
import createEngine, {
    DiagramModel,
    DiagramEngine,
    PortModelAlignment,
    DefaultDiagramState,
    DefaultPortModel,
} from '@projectstorm/react-diagrams';
import { DeviceNodeFactory } from '../custom-nodes/device-node/DeviceNodeFactory';
import { DeviceNodeModel } from '../custom-nodes/device-node/DeviceNodeModel';
import pcLogo from '../images/device-logo/pc.png'; // with import
import router from '../images/device-logo/router.png'; // with import
import { DevicePortModel } from '../custom-nodes/device-node/DevicePortModel';
import { RouterNodeModel } from '../custom-nodes/router-node/RouterNodeModel';
import { RouterNodeFactory } from '../custom-nodes/router-node/RouterNodeFactory';
import { SubnetNodeModel } from '../custom-nodes/subnet-node/SubnetNodeModel';
import { SubnetNodeFactory } from '../custom-nodes/subnet-node/SubnetNodeFactory';
import { SimplePortFactory } from '../custom-nodes/SimplePortFactory';

function useForceUpdate() {
    const [, setValue] = useState(0);
    return () => setValue(value => ++value);
}

function useGraphEngine() {
    const [activeModel, setActiveModel] = useState<DiagramModel | null>(null)
    const [diagramEngine, setDiagramEngine] = useState<DiagramEngine | null>(null)
    const updateEngine = useForceUpdate();

    useEffect(() => {
        initEngine();
    }, []);

    const initEngine = () => {
        const engine = createEngine();

        const model = new DiagramModel();

        const state = engine.getStateMachine().getCurrentState();
        if (state instanceof DefaultDiagramState) {
            state.dragNewLink.config.allowLooseLinks = false;
        }
        // engine
        // .getPortFactories()
        // .registerFactory(new SimplePortFactory('Device', (config) => new DevicePortModel("example")));

        //factory import
        engine.getNodeFactories().registerFactory(new DeviceNodeFactory());
        engine.getNodeFactories().registerFactory(new RouterNodeFactory());
        engine.getNodeFactories().registerFactory(new SubnetNodeFactory());

        var node2 = new DeviceNodeModel('192.0.0.2', "Target A", pcLogo);
        node2.setPosition(250, 108);
        node2.addPort(new DefaultPortModel(true, '192.0.0.2'))

        var node4 = new SubnetNodeModel('Subnet', "192.0.0.2/24");
        node4.setPosition(250, 308);

        var node3 = new RouterNodeModel('192.0.0.1', "Router", router);
        node3.setPosition(50, 108);

        model.addAll(node2, node3, node4);
        engine.setModel(model);

        setActiveModel(model);
        setDiagramEngine(engine);
    }

    return { activeModel, diagramEngine, updateEngine }
}

export default useGraphEngine;