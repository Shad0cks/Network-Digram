import { useEffect, useState } from 'react';
import createEngine, { 
    DiagramModel,
    DiagramEngine,
    DefaultNodeModel,
    PortModelAlignment
} from '@projectstorm/react-diagrams';
import { SimplePortFactory } from '../custom-node/SimplePortFactory';
import { DiamondPortModel } from '../custom-node/DiamondPortModel';
import { DiamondNodeFactory } from '../custom-node/DiamondNodeFactory';
import { DiamondNodeModel } from '../custom-node/DiamondNodeModel';

function useForceUpdate(){
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

        engine
		.getPortFactories()
		.registerFactory(new SimplePortFactory('diamond', (config) => new DiamondPortModel(PortModelAlignment.LEFT, "example")));
	engine.getNodeFactories().registerFactory(new DiamondNodeFactory());

       var node2 = new DiamondNodeModel();
	    node2.setPosition(250, 108);

        model.addAll(node2);
        engine.setModel(model);
    
        setActiveModel(model);
        setDiagramEngine(engine);
    }
    
    return {activeModel, diagramEngine, updateEngine}
}

export default useGraphEngine;