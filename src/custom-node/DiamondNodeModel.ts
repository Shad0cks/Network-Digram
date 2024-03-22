import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams';
import { DiamondPortModel } from './DiamondPortModel';

export interface DiamondNodeModelGenerics {
	PORT: DiamondPortModel;
}

export class DiamondNodeModel extends NodeModel<NodeModelGenerics & DiamondNodeModelGenerics> {
	constructor() {
		super({
			type: 'diamond'
		});
		this.addPort(new DiamondPortModel(PortModelAlignment.LEFT, "Port 80"));
		this.addPort(new DiamondPortModel(PortModelAlignment.LEFT, "Port 443"));
		this.addPort(new DiamondPortModel(PortModelAlignment.LEFT, "Port 3389"));


	}
}