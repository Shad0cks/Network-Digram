import { useEffect, useState } from 'react';
import createEngine, {
    DiagramModel,
    DiagramEngine,
    DefaultDiagramState,
    DefaultPortModel,
    RightAngleLinkFactory,
    PathFindingLinkFactory,
} from '@projectstorm/react-diagrams';
import { DeviceNodeFactory } from '../custom-nodes/device-node/DeviceNodeFactory';
import { DeviceNodeModel } from '../custom-nodes/device-node/DeviceNodeModel';
import pcLogo from '../images/device-logo/pc.png'; // with import
import router from '../images/device-logo/router.png'; // with import
import { RouterNodeModel } from '../custom-nodes/router-node/RouterNodeModel';
import { RouterNodeFactory } from '../custom-nodes/router-node/RouterNodeFactory';
import { SubnetNodeModel } from '../custom-nodes/subnet-node/SubnetNodeModel';
import { SubnetNodeFactory } from '../custom-nodes/subnet-node/SubnetNodeFactory';

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

        //factory import
        engine.getLinkFactories().registerFactory(new RightAngleLinkFactory());
        engine.getLinkFactories().registerFactory(new PathFindingLinkFactory());



        engine.getNodeFactories().registerFactory(new DeviceNodeFactory());
        engine.getNodeFactories().registerFactory(new RouterNodeFactory());
        engine.getNodeFactories().registerFactory(new SubnetNodeFactory());

        engine.setModel(model);

        setActiveModel(model);
        setDiagramEngine(engine);
    }

    return { activeModel, diagramEngine, updateEngine }
}

export default useGraphEngine;